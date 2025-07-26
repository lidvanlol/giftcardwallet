import { formatCurrency, formatDate } from '../utils/helpers';

describe('Helper Functions', () => {
  describe('formatCurrency', () => {
    test('formats positive numbers correctly', () => {
      expect(formatCurrency(50)).toBe('$50.00');
      expect(formatCurrency(25.5)).toBe('$25.50');
      expect(formatCurrency(100.99)).toBe('$100.99');
    });

    test('formats zero correctly', () => {
      expect(formatCurrency(0)).toBe('$0.00');
    });

    test('formats negative numbers correctly', () => {
      expect(formatCurrency(-25)).toBe('-$25.00');
      expect(formatCurrency(-10.5)).toBe('-$10.50');
    });

    test('handles large numbers', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });
  });

  describe('formatDate', () => {
    test('formats valid dates correctly', () => {
      const date1 = new Date('2024-12-31T00:00:00.000Z');
      expect(formatDate(date1.toISOString())).toBe('Dec 31, 2024');

      const date2 = new Date('2024-06-15T00:00:00.000Z');
      expect(formatDate(date2.toISOString())).toBe('Jun 15, 2024');
    });

    test('handles different date formats', () => {
      const date = new Date('2024-01-01T00:00:00.000Z');
      expect(formatDate(date.toISOString())).toBe('Jan 1, 2024');
    });

    test('handles invalid dates gracefully', () => {
      expect(formatDate('invalid-date')).toBe('Invalid Date');
    });
  });
});
