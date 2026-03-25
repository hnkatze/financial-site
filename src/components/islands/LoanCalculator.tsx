import { useState, useMemo } from 'preact/hooks';
import { calculateLoan, formatCurrency } from '../../lib/calculator';

const TERM_OPTIONS = [6, 12, 18, 24, 36, 48, 60, 72, 84, 96, 120];

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [termMonths, setTermMonths] = useState(36);
  const [showTable, setShowTable] = useState(false);

  const result = useMemo(
    () =>
      calculateLoan({
        amount: principal,
        annualRate: rate,
        termMonths,
      }),
    [principal, rate, termMonths],
  );

  const isValid = principal > 0 && termMonths > 0 && rate >= 0;
  const highRateWarning = rate > 50;

  // Ratio of principal vs interest for the visual bar
  const interestRatio = result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0;

  return (
    <div class="rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        {/* ── Input section ── */}
        <div class="p-6 sm:p-8 lg:p-10">
          <h3 class="text-xl font-bold text-neutral-900 mb-6">
            Datos del Préstamo
          </h3>

          {/* Monto del préstamo */}
          <div class="mb-6">
            <label
              htmlFor="calc-principal"
              class="mb-2 block text-sm font-medium text-neutral-700"
            >
              Monto del préstamo
            </label>
            <div class="flex items-center gap-3">
              <input
                id="calc-principal"
                type="number"
                min={1000}
                max={1000000}
                step={1000}
                value={principal}
                onInput={(e) => {
                  const v = Number((e.target as HTMLInputElement).value);
                  if (!Number.isNaN(v)) setPrincipal(v);
                }}
                class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 shadow-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus-visible:outline-none"
              />
            </div>
            <input
              type="range"
              min={1000}
              max={1000000}
              step={1000}
              value={principal}
              onInput={(e) => setPrincipal(Number((e.target as HTMLInputElement).value))}
              aria-label="Ajustar monto del préstamo"
              class="mt-3 w-full cursor-pointer accent-[oklch(0.53_0.15_175)]"
            />
            <div class="mt-1 flex justify-between text-xs text-neutral-500">
              <span>L 1,000</span>
              <span>{formatCurrency(principal)}</span>
              <span>L 1,000,000</span>
            </div>
            {principal <= 0 && (
              <p class="mt-1 text-sm text-red-500" role="alert">El monto debe ser mayor a cero.</p>
            )}
          </div>

          {/* Tasa de interés anual */}
          <div class="mb-6">
            <label
              htmlFor="calc-rate"
              class="mb-2 block text-sm font-medium text-neutral-700"
            >
              Tasa de interés anual (%)
            </label>
            <input
              id="calc-rate"
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={rate}
              onInput={(e) => {
                const v = Number((e.target as HTMLInputElement).value);
                if (!Number.isNaN(v)) setRate(v);
              }}
              class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 shadow-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus-visible:outline-none"
            />
            <input
              type="range"
              min={0}
              max={50}
              step={0.5}
              value={rate}
              onInput={(e) => setRate(Number((e.target as HTMLInputElement).value))}
              aria-label="Ajustar tasa de interés"
              class="mt-3 w-full cursor-pointer accent-[oklch(0.53_0.15_175)]"
            />
            <div class="mt-1 flex justify-between text-xs text-neutral-500">
              <span>0%</span>
              <span>{rate.toFixed(1)}%</span>
              <span>50%</span>
            </div>
            {highRateWarning && (
              <p class="mt-1 text-sm text-amber-600" role="alert">
                Atención: tasa superior al 50%. Verifique que sea correcta.
              </p>
            )}
          </div>

          {/* Plazo en meses */}
          <div class="mb-2">
            <label
              htmlFor="calc-term"
              class="mb-2 block text-sm font-medium text-neutral-700"
            >
              Plazo en meses
            </label>
            <select
              id="calc-term"
              value={termMonths}
              onChange={(e) => setTermMonths(Number((e.target as HTMLSelectElement).value))}
              class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 shadow-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus-visible:outline-none"
            >
              {TERM_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} meses ({(m / 12).toFixed(m % 12 === 0 ? 0 : 1)} años)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Results section ── */}
        <div class="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-800 p-6 sm:p-8 lg:p-10 text-white">
          <h3 class="text-xl font-bold mb-6 text-primary-100">Resultados</h3>

          <div aria-live="polite" aria-atomic="true">
            {isValid ? (
              <div>
                {/* Monthly payment — prominently displayed */}
                <div class="mb-8">
                  <p class="text-sm font-medium text-primary-200/80 mb-1">Cuota mensual</p>
                  <p class="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {formatCurrency(result.monthlyPayment)}
                  </p>
                </div>

                {/* Secondary metrics */}
                <div class="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <p class="text-sm font-medium text-primary-200/80 mb-1">Total a pagar</p>
                    <p class="text-xl font-bold">{formatCurrency(result.totalPayment)}</p>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-primary-200/80 mb-1">Total intereses</p>
                    <p class="text-xl font-bold">{formatCurrency(result.totalInterest)}</p>
                  </div>
                </div>

                {/* Principal vs interest visual bar */}
                <div class="mb-2">
                  <p class="text-sm font-medium text-primary-200/80 mb-2">Capital vs Intereses</p>
                  <div class="h-4 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                      class="h-full rounded-full bg-white transition-all duration-300"
                      style={{ width: `${100 - interestRatio}%` }}
                    />
                  </div>
                  <div class="mt-1 flex justify-between text-xs text-primary-200/80">
                    <span>Capital: {(100 - interestRatio).toFixed(1)}%</span>
                    <span>Intereses: {interestRatio.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <p class="text-primary-200/80">
                Ingrese valores válidos para ver los resultados.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Amortization table ── */}
      {isValid && result.schedule.length > 0 && (
        <div class="border-t border-neutral-200">
          <button
            type="button"
            onClick={() => setShowTable(!showTable)}
            aria-expanded={showTable}
            aria-controls="amortization-table"
            class="flex w-full items-center justify-between px-6 py-4 text-left font-medium text-neutral-700 hover:bg-neutral-50 transition-colors sm:px-8 lg:px-10 min-h-[44px]"
          >
            <span>
              Tabla de amortización ({result.schedule.length} meses)
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class={`size-5 transition-transform duration-200 ${showTable ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {showTable && (
            <div id="amortization-table" class="max-h-[400px] overflow-auto px-6 pb-6 sm:px-8 lg:px-10">
              <table class="w-full min-w-[500px] text-sm">
                <thead class="sticky top-0 bg-neutral-100">
                  <tr>
                    <th class="px-3 py-2 text-left font-semibold text-neutral-700">Mes</th>
                    <th class="px-3 py-2 text-right font-semibold text-neutral-700">Cuota</th>
                    <th class="px-3 py-2 text-right font-semibold text-neutral-700">Capital</th>
                    <th class="px-3 py-2 text-right font-semibold text-neutral-700">Interés</th>
                    <th class="px-3 py-2 text-right font-semibold text-neutral-700">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr
                      key={row.month}
                      class="border-t border-neutral-100 even:bg-neutral-50"
                    >
                      <td class="px-3 py-2 text-neutral-600">{row.month}</td>
                      <td class="px-3 py-2 text-right text-neutral-900">
                        {formatCurrency(row.payment)}
                      </td>
                      <td class="px-3 py-2 text-right text-neutral-900">
                        {formatCurrency(row.principal)}
                      </td>
                      <td class="px-3 py-2 text-right text-neutral-900">
                        {formatCurrency(row.interest)}
                      </td>
                      <td class="px-3 py-2 text-right text-neutral-900">
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
