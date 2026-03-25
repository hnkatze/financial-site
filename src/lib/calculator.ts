import type { LoanInput, LoanResult, AmortizationEntry } from '../types/index';

/** Format a Date as "MMM YYYY" in Spanish (e.g., "Abr 2026") */
export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('es-HN', { month: 'short', year: 'numeric' });
}

/** Format a Date as "DD/MM/YYYY" */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('es-HN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * Standard amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 * Handles zero interest as a special case (simple division).
 */
export function calculateLoan(input: LoanInput, startDate: Date = new Date()): LoanResult {
  const { amount, annualRate, termMonths } = input;

  if (amount <= 0 || termMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalPayment: 0,
      totalInterest: 0,
      startDate: formatDate(startDate),
      endDate: formatDate(startDate),
      schedule: [],
    };
  }

  const monthlyPayment = calculateMonthlyPayment(input);
  const totalPayment = monthlyPayment * termMonths;
  const totalInterest = totalPayment - amount;
  const schedule = calculateAmortizationSchedule(input, startDate);

  const endDateObj = new Date(startDate);
  endDateObj.setMonth(endDateObj.getMonth() + termMonths);

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    startDate: formatDate(startDate),
    endDate: formatDate(endDateObj),
    schedule,
  };
}

export function calculateMonthlyPayment(input: LoanInput): number {
  const { amount, annualRate, termMonths } = input;

  if (amount <= 0 || termMonths <= 0) return 0;

  // Zero interest — simple division
  if (annualRate === 0) return amount / termMonths;

  const monthlyRate = annualRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, termMonths);

  return (amount * monthlyRate * factor) / (factor - 1);
}

export function calculateAmortizationSchedule(input: LoanInput, startDate: Date = new Date()): AmortizationEntry[] {
  const { amount, annualRate, termMonths } = input;

  if (amount <= 0 || termMonths <= 0) return [];

  const monthlyPayment = calculateMonthlyPayment(input);
  const monthlyRate = annualRate / 100 / 12;
  const schedule: AmortizationEntry[] = [];
  let balance = amount;

  for (let month = 1; month <= termMonths; month++) {
    const paymentDate = new Date(startDate);
    paymentDate.setMonth(paymentDate.getMonth() + month);

    const interestPortion = balance * monthlyRate;
    const principalPortion = monthlyPayment - interestPortion;

    // Last month adjustment to avoid floating-point dust
    const newBalance = month === termMonths ? 0 : balance - principalPortion;

    schedule.push({
      month,
      date: formatMonthYear(paymentDate),
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPortion * 100) / 100,
      interest: Math.round(interestPortion * 100) / 100,
      balance: Math.round(Math.max(newBalance, 0) * 100) / 100,
    });

    balance = newBalance;
  }

  return schedule;
}

/** Format a number as Lempiras: L 1,234.56 */
export function formatCurrency(amount: number): string {
  return `L ${amount.toLocaleString('es-HN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
