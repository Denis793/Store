import type { Period } from '../data/analyticsMock';

export function exportCSV({
  period,
  line,
  donut,
  categories,
  kpis,
}: {
  period: Period;
  line: { name: string; orders: number; buyers: number }[];
  donut: { name: string; value: number }[];
  categories: { name: string; value: number; prev: number }[];
  kpis: { label: string; value: number }[];
}) {
  const lines: string[] = [];

  lines.push(`Dataset: Store analytics (${period.toUpperCase()})`);
  lines.push('');
  lines.push('Line chart: Orders & Buyers');
  lines.push('Label,Orders,Buyers');
  line.forEach((r) => lines.push(`${r.name},${r.orders},${r.buyers}`));

  lines.push('');
  lines.push('Donut: Category share of sales');
  lines.push('Category,Orders');
  donut.forEach((d) => lines.push(`${d.name},${d.value}`));

  lines.push('');
  lines.push('Category performance (share %, prev %)');
  lines.push('Category,Current %,Prev %');
  categories.forEach((c) => lines.push(`${c.name},${c.value},${c.prev}`));

  lines.push('');
  lines.push('KPIs');
  lines.push('Metric,Value %');
  kpis.forEach((k) => lines.push(`${k.label},${k.value}`));

  const csv = lines.join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  a.href = url;
  a.download = `store-analytics_${period}_${ts}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
