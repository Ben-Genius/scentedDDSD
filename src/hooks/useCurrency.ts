import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Currency = 'GHS' | 'USD' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  label: string;
  symbol: string;
  country: string;
  flag: string;
  rate: number; // multiplier from GHS to target currency
  locale: string;
}

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  GHS: {
    code: 'GHS',
    label: 'Ghana (GHS)',
    symbol: 'GH₵',
    country: 'Ghana',
    flag: '🇬🇭',
    rate: 1,
    locale: 'en-GH',
  },
  GBP: {
    code: 'GBP',
    label: 'UK (GBP)',
    symbol: '£',
    country: 'United Kingdom',
    flag: '🇬🇧',
    rate: 1 / 16.5, // 16.50 cedis to 1 pound
    locale: 'en-GB',
  },
  USD: {
    code: 'USD',
    label: 'US (USD)',
    symbol: '$',
    country: 'United States',
    flag: '🇺🇸',
    rate: 1 / 15.0, // 1 USD = 15 GHS
    locale: 'en-US',
  },
};

interface CurrencyState {
  currency: Currency;
  exchangeRate: number;
  isAutoDetected: boolean;
  hasUserSelected: boolean;
  version: number;
  detectedAt: number | null;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amountGHS: number) => string;
  detectCurrency: () => Promise<void>;
  convert: (amountGHS: number) => number;
}

const DETECTION_TTL_MS = 24 * 60 * 60 * 1000;
let inFlight: Promise<void> | null = null;

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: 'GHS',
      exchangeRate: CURRENCIES.GHS.rate,
      isAutoDetected: false,
      hasUserSelected: false,
      version: 2, // version 2 adds UK GBP detection
      detectedAt: null,

      setCurrency: (currency: Currency) => {
        const config = CURRENCIES[currency] || CURRENCIES.GHS;
        try {
          sessionStorage.setItem('scented_user_currency', currency);
        } catch {
          // Ignore storage errors
        }
        set({
          currency,
          exchangeRate: config.rate,
          isAutoDetected: false,
          hasUserSelected: true,
        });
      },

      convert: (amountGHS: number) => {
        const { currency } = get();
        const config = CURRENCIES[currency] || CURRENCIES.GHS;
        if (currency === 'GHS') return amountGHS;
        return amountGHS * config.rate;
      },

      formatPrice: (amountGHS: number) => {
        const { currency } = get();
        const config = CURRENCIES[currency] || CURRENCIES.GHS;
        const converted = currency === 'GHS' ? amountGHS : amountGHS * config.rate;

        return new Intl.NumberFormat(config.locale, {
          style: 'currency',
          currency: config.code,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(converted);
      },

      detectCurrency: async () => {
        // If user deliberately chose a currency during this active browser session, respect it
        try {
          const manualSession = sessionStorage.getItem('scented_user_currency');
          if (
            manualSession &&
            (manualSession === 'GHS' || manualSession === 'USD' || manualSession === 'GBP')
          ) {
            return;
          }
        } catch {
          // Ignore storage errors
        }

        // A persisted manual choice wins across sessions; a recent detection is reused
        // instead of hitting rate-limited geo APIs on every page load.
        const { hasUserSelected, detectedAt } = get();
        if (hasUserSelected) return;
        if (detectedAt && Date.now() - detectedAt < DETECTION_TTL_MS) return;

        // Dedupe concurrent calls (e.g. React StrictMode double-invoking effects)
        if (inFlight) return inFlight;
        inFlight = (async () => {
          let detectedCountryCode: string | null = null;

          // 1. Cloudflare's same-origin trace endpoint: free, no rate limit, works once deployed on Cloudflare
          try {
            const response = await fetch('/cdn-cgi/trace');
            if (response.ok) {
              const match = (await response.text()).match(/^loc=([A-Z]{2})$/m);
              if (match && match[1] !== 'XX') detectedCountryCode = match[1];
            }
          } catch {
            // Not on Cloudflare (e.g. local dev) - fall back
          }

          // 2. Try api.country.is
          if (!detectedCountryCode) {
            try {
              const response = await fetch('https://api.country.is/');
              if (response.ok) {
                const data = await response.json();
                if (data.country) {
                  detectedCountryCode = String(data.country).toUpperCase();
                }
              }
            } catch {
              // Fall back
            }
          }

          // 3. Try ipwho.is (low free-tier rate limit, so only as a fallback)
          if (!detectedCountryCode) {
            try {
              const response = await fetch('https://ipwho.is/');
              if (response.ok) {
                const data = await response.json();
                if (data.success && data.country_code) {
                  detectedCountryCode = String(data.country_code).toUpperCase();
                }
              }
            } catch {
              // Fall back
            }
          }

          // 4. Try ipapi.co
          if (!detectedCountryCode) {
            try {
              const response = await fetch('https://ipapi.co/json/');
              if (response.ok) {
                const data = await response.json();
                if (data.country_code && !data.error) {
                  detectedCountryCode = String(data.country_code).toUpperCase();
                }
              }
            } catch {
              // Fall back
            }
          }

          // 5. Heuristic fallback based on browser timezone
          if (!detectedCountryCode) {
            try {
              const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
              if (tz.includes('London') || tz.includes('Belfast') || tz === 'GB') {
                detectedCountryCode = 'GB';
              } else if (tz.includes('Accra') || tz === 'Africa/Accra') {
                detectedCountryCode = 'GH';
              }
            } catch {
              // Ignore
            }
          }

          // Resolve detected currency:
          // UK (GB or UK) -> GBP
          // Ghana (GH) -> GHS
          // International -> USD
          let resolvedCurrency: Currency = 'GHS';
          if (detectedCountryCode === 'GB' || detectedCountryCode === 'UK') {
            resolvedCurrency = 'GBP';
          } else if (detectedCountryCode === 'GH') {
            resolvedCurrency = 'GHS';
          } else if (detectedCountryCode) {
            resolvedCurrency = 'USD';
          }

          console.log(
            `[Scented] Geolocation: Country ${detectedCountryCode || 'Unknown'} -> Currency set to ${resolvedCurrency}`
          );

          const config = CURRENCIES[resolvedCurrency];
          set({
            currency: resolvedCurrency,
            exchangeRate: config.rate,
            isAutoDetected: true,
            hasUserSelected: false,
            // Only cache a real detection, so an all-providers-failed result is retried next load
            detectedAt: detectedCountryCode ? Date.now() : null,
          });
        })().finally(() => {
          inFlight = null;
        });
        return inFlight;
      },
    }),
    {
      name: 'scented-currency-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
