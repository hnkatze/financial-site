import { describe, it, expect } from 'vitest';
import {
  calculateLoan,
  calculateMonthlyPayment,
  calculateAmortizationSchedule,
  formatCurrency,
  formatMonthYear,
  formatDate,
} from './calculator';

describe('calculateMonthlyPayment', () => {
  it('calculates correct monthly payment for a standard loan', () => {
    const payment = calculateMonthlyPayment({
      amount: 100_000,
      annualRate: 12,
      termMonths: 12,
    });

    // Known value: L100,000 at 12% annual for 12 months ≈ L8,884.88
    expect(payment).toBeCloseTo(8884.88, 0);
  });

  it('returns simple division when interest rate is 0%', () => {
    const payment = calculateMonthlyPayment({
      amount: 120_000,
      annualRate: 0,
      termMonths: 12,
    });

    expect(payment).toBe(10_000);
  });

  it('returns 0 for zero amount', () => {
    expect(calculateMonthlyPayment({ amount: 0, annualRate: 12, termMonths: 12 })).toBe(0);
  });

  it('returns 0 for zero term', () => {
    expect(calculateMonthlyPayment({ amount: 100_000, annualRate: 12, termMonths: 0 })).toBe(0);
  });

  it('returns 0 for negative amount', () => {
    expect(calculateMonthlyPayment({ amount: -50_000, annualRate: 12, termMonths: 12 })).toBe(0);
  });

  it('handles very high interest rate', () => {
    const payment = calculateMonthlyPayment({
      amount: 100_000,
      annualRate: 100,
      termMonths: 12,
    });

    expect(payment).toBeGreaterThan(0);
    expect(Number.isFinite(payment)).toBe(true);
  });

  it('handles very small loan amount', () => {
    const payment = calculateMonthlyPayment({
      amount: 1_000,
      annualRate: 12,
      termMonths: 6,
    });

    expect(payment).toBeGreaterThan(0);
    expect(payment).toBeLessThan(1_000);
  });

  it('handles long term (120 months)', () => {
    const payment = calculateMonthlyPayment({
      amount: 500_000,
      annualRate: 15,
      termMonths: 120,
    });

    expect(payment).toBeGreaterThan(0);
    expect(payment).toBeLessThan(500_000 / 120 * 3);
  });
});

describe('calculateLoan', () => {
  it('returns complete loan result with correct totals', () => {
    const result = calculateLoan({
      amount: 100_000,
      annualRate: 12,
      termMonths: 12,
    });

    expect(result.monthlyPayment).toBeCloseTo(8884.88, 0);
    expect(result.totalPayment).toBeCloseTo(result.monthlyPayment * 12, 2);
    expect(result.totalInterest).toBeCloseTo(result.totalPayment - 100_000, 2);
    expect(result.totalInterest).toBeGreaterThan(0);
    expect(result.schedule).toHaveLength(12);
  });

  it('includes start and end dates', () => {
    const start = new Date(2026, 0, 15); // Jan 15, 2026
    const result = calculateLoan(
      { amount: 100_000, annualRate: 12, termMonths: 24 },
      start,
    );

    expect(result.startDate).toBeTruthy();
    expect(result.endDate).toBeTruthy();
    // End date should be 24 months after start
    expect(result.endDate).toContain('2028');
  });

  it('total interest is 0 when rate is 0%', () => {
    const result = calculateLoan({
      amount: 60_000,
      annualRate: 0,
      termMonths: 12,
    });

    expect(result.monthlyPayment).toBe(5_000);
    expect(result.totalPayment).toBe(60_000);
    expect(result.totalInterest).toBe(0);
  });

  it('returns zeroed result for invalid input', () => {
    const result = calculateLoan({ amount: 0, annualRate: 12, termMonths: 12 });

    expect(result.monthlyPayment).toBe(0);
    expect(result.totalPayment).toBe(0);
    expect(result.totalInterest).toBe(0);
    expect(result.schedule).toHaveLength(0);
  });

  it('totalPayment equals sum of all schedule payments', () => {
    const result = calculateLoan({
      amount: 200_000,
      annualRate: 10,
      termMonths: 24,
    });

    const sumPayments = result.schedule.reduce((sum, row) => sum + row.payment, 0);
    expect(result.totalPayment).toBeCloseTo(sumPayments, 0);
  });
});

describe('calculateAmortizationSchedule', () => {
  it('generates correct number of entries', () => {
    const schedule = calculateAmortizationSchedule({
      amount: 100_000,
      annualRate: 12,
      termMonths: 24,
    });

    expect(schedule).toHaveLength(24);
  });

  it('first month has higher interest than last month', () => {
    const schedule = calculateAmortizationSchedule({
      amount: 100_000,
      annualRate: 12,
      termMonths: 12,
    });

    expect(schedule[0].interest).toBeGreaterThan(schedule[11].interest);
  });

  it('first month has lower principal than last month', () => {
    const schedule = calculateAmortizationSchedule({
      amount: 100_000,
      annualRate: 12,
      termMonths: 12,
    });

    expect(schedule[0].principal).toBeLessThan(schedule[11].principal);
  });

  it('last month balance is 0', () => {
    const schedule = calculateAmortizationSchedule({
      amount: 100_000,
      annualRate: 12,
      termMonths: 12,
    });

    expect(schedule[11].balance).toBe(0);
  });

  it('balance decreases every month', () => {
    const schedule = calculateAmortizationSchedule({
      amount: 100_000,
      annualRate: 12,
      termMonths: 12,
    });

    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].balance).toBeLessThan(schedule[i - 1].balance);
    }
  });

  it('each payment equals principal + interest', () => {
    const schedule = calculateAmortizationSchedule({
      amount: 100_000,
      annualRate: 12,
      termMonths: 12,
    });

    for (const entry of schedule) {
      expect(entry.payment).toBeCloseTo(entry.principal + entry.interest, 1);
    }
  });

  it('month numbers are sequential from 1', () => {
    const schedule = calculateAmortizationSchedule({
      amount: 50_000,
      annualRate: 10,
      termMonths: 6,
    });

    schedule.forEach((entry, i) => {
      expect(entry.month).toBe(i + 1);
    });
  });

  it('each entry has a date string', () => {
    const start = new Date(2026, 2, 1); // Mar 1, 2026
    const schedule = calculateAmortizationSchedule(
      { amount: 50_000, annualRate: 10, termMonths: 6 },
      start,
    );

    for (const entry of schedule) {
      expect(entry.date).toBeTruthy();
      expect(typeof entry.date).toBe('string');
    }
    // First payment is 1 month after start
    expect(schedule[0].date).toContain('2026');
  });

  it('returns empty array for invalid input', () => {
    expect(calculateAmortizationSchedule({ amount: 0, annualRate: 12, termMonths: 12 })).toEqual([]);
    expect(calculateAmortizationSchedule({ amount: 100_000, annualRate: 12, termMonths: 0 })).toEqual([]);
    expect(calculateAmortizationSchedule({ amount: -1, annualRate: 12, termMonths: 12 })).toEqual([]);
  });
});

describe('formatMonthYear', () => {
  it('formats date as month and year', () => {
    const date = new Date(2026, 5, 15); // June 2026
    const result = formatMonthYear(date);
    expect(result).toContain('2026');
  });
});

describe('formatDate', () => {
  it('formats date with day, month, and year', () => {
    const date = new Date(2026, 0, 15); // Jan 15, 2026
    const result = formatDate(date);
    expect(result).toContain('2026');
    expect(result).toContain('15');
  });
});

describe('formatCurrency', () => {
  it('formats with L prefix and 2 decimals', () => {
    const result = formatCurrency(1234.5);
    expect(result).toContain('L');
    expect(result).toMatch(/1[,.]?234[.,]50/);
  });

  it('formats zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('L');
    expect(result).toMatch(/0[.,]00/);
  });

  it('formats large numbers with separators', () => {
    const result = formatCurrency(1_000_000);
    expect(result).toContain('L');
    expect(result).toContain('000');
  });
});
