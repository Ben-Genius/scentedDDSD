import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Currency = 'GHS' | 'USD';

interface CurrencyState {
    currency: Currency;
    exchangeRate: number; // GHS to USD (e.g., 0.067)
    isAutoDetected: boolean;
    setCurrency: (currency: Currency) => void;
    formatPrice: (amountGHS: number) => string;
    detectCurrency: () => Promise<void>;
    convert: (amountGHS: number) => number;
}

// Fixed rate for now, can be updated later via API if needed
const GHS_TO_USD_RATE = 1 / 15.0; // 1 USD = 15 GHS

export const useCurrency = create<CurrencyState>()(
    persist(
        (set, get) => ({
            currency: 'GHS',
            exchangeRate: GHS_TO_USD_RATE,
            isAutoDetected: false,

            setCurrency: (currency: Currency) => set({ currency, isAutoDetected: true }),

            convert: (amountGHS: number) => {
                const { currency, exchangeRate } = get();
                if (currency === 'GHS') return amountGHS;
                return amountGHS * exchangeRate;
            },

            formatPrice: (amountGHS: number) => {
                const { currency, exchangeRate } = get();
                const converted = currency === 'GHS' ? amountGHS : amountGHS * exchangeRate;

                return new Intl.NumberFormat(currency === 'GHS' ? 'en-GH' : 'en-US', {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(converted);
            },

            detectCurrency: async () => {
                if (get().isAutoDetected) return;

                try {
                    const response = await fetch('https://ipapi.co/json/');
                    const data = await response.json();

                    if (data.country_code && data.country_code !== 'GH') {
                        set({ currency: 'USD', isAutoDetected: true });
                    } else {
                        set({ currency: 'GHS', isAutoDetected: true });
                    }
                } catch (error) {
                    console.error('Failed to detect location:', error);
                    // Default to GHS if detection fails and not manually set
                    if (!get().isAutoDetected) {
                        set({ currency: 'GHS', isAutoDetected: true });
                    }
                }
            },
        }),
        {
            name: 'scented-currency-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
