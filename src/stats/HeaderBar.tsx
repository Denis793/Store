import type { Period } from './data/analyticsMock';

export function HeaderBar({
  period,
  onChange,
  onExport,
}: {
  period: Period;
  onChange: (p: Period) => void;
  onExport: () => void;
}) {
  return (
    <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <p className="text-sm text-gray-500">
        Live analytics from product API simulation (orders, customers, turnover growth)
      </p>
      <div className="flex items-center gap-2">
        <select
          className="px-3 py-2 rounded-lg border bg-white text-sm"
          value={period}
          onChange={(e) => onChange(e.target.value as Period)}
          aria-label="Select period"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <button
          onClick={onExport}
          className="px-3 py-2 rounded-lg border bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
        >
          Export
        </button>
      </div>
    </div>
  );
}
