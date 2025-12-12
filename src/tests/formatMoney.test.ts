import { describe, it, expect } from 'vitest';
import { formatMoney } from '../utils/formatMoney';

describe('formatMoney', () => {
  it('formats GHS currency correctly', () => {
    expect(formatMoney(100)).toContain('GHS');
    expect(formatMoney(100)).toContain('100.00');
  });

  it('handles decimals', () => {
    expect(formatMoney(50.5)).toContain('50.50');
  });
});
