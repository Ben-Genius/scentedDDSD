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
        rate: 1 / 16.50, // 16.50 cedis to 1 pound
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
    setCurrency: (currency: Currency) => void;
    formatPrice: (amountGHS: number) => string;
    detectCurrency: () => Promise<void>;
    convert: (amountGHS: number) => number;
}

export const useCurrency = create<CurrencyState>()(
    persist(
        (set, get) => ({
            currency: 'GHS',
            exchangeRate: CURRENCIES.GHS.rate,
            isAutoDetected: false,
            hasUserSelected: false,
            version: 2, // version 2 adds UK GBP detection

            setCurrency: (currency: Currency) => {
                const config = CURRENCIES[currency] || CURRENCIES.GHS;
                set({
                    currency,
                    exchangeRate: config.rate,
                    isAutoDetected: true,
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
                const state = get();
                // If user has explicitly chosen a currency, do not override
                if (state.hasUserSelected) return;
                // If already detected under current version, do not re-detect
                if (state.isAutoDetected && state.version === 2) return;

                let detectedCountryCode: string | null = null;

                // 1. Try ipwho.is (CORS enabled, highly reliable)
                try {
                    const response = await fetch('https://ipwho.is/');
                    if (response.ok) {
                        const data = await response.json();
                        if (data.success && data.country_code) {
                            detectedCountryCode = String(data.country_code).toUpperCase();
                        }
                    }
                } catch {
                    // Fall back to next method
                }

                // 2. Try ipapi.co as secondary provider
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
                        // Fall back to next method
                    }
                }

                // 3. Heuristic fallback based on browser timezone and language
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

                const config = CURRENCIES[resolvedCurrency];
                set({
                    currency: resolvedCurrency,
                    exchangeRate: config.rate,
                    isAutoDetected: true,
                    version: 2,
                });
            },
        }),
        {
            name: 'scented-currency-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
