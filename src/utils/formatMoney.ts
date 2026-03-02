import { useCurrency } from '@/hooks/useCurrency';

export const formatMoney = (amount: number): string => {
  return useCurrency.getState().formatPrice(amount);
};
