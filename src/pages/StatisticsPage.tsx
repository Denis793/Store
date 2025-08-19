import { useMemo, useState } from 'react';
import Section from '../components/common/Section';
import { OrdersLineChart } from '@/stats/Charts/OrdersLineChart';
import { CategoryPerformance } from '@/stats/Charts/CategoryPerformance';
import { CategoryDonut } from '@/stats/Charts/CategoryDonut';
import { KPIs } from '@/stats/Charts/KPIs';
import { HeaderBar } from '@/stats/HeaderBar';
import { RecentTransactions } from '@/stats/Table/RecentTransactions';
import {
  Period,
  categoryPerformance,
  donutDataBase,
  kpiBase,
  lineDataMonth,
  lineDataWeek,
  lineDataYear,
} from '@/stats/data/analyticsMock';
import { exportCSV } from '@/stats/utils/exportCsv';

const cardCls = 'bg-white rounded-2xl border shadow-sm';
const panelTitle = 'text-sm font-medium text-gray-700';
const numberLg = 'text-2xl md:text-3xl font-semibold tracking-tight';

export default function StatisticsPage() {
  const [period, setPeriod] = useState<Period>('week');

  const lineData = useMemo(() => {
    if (period === 'year') return lineDataYear;
    if (period === 'month') return lineDataMonth;
    return lineDataWeek;
  }, [period]);

  const donutData = useMemo(() => {
    const factor = period === 'year' ? 12 : period === 'month' ? 4 : 1;
    return donutDataBase.map((d) => ({ ...d, value: d.value * factor }));
  }, [period]);

  const kpis = useMemo(() => {
    if (period === 'year') return kpiBase.map((k) => ({ ...k, value: Math.min(100, Math.round(k.value * 1.1)) }));
    if (period === 'month') return kpiBase.map((k) => ({ ...k, value: Math.round(k.value * 1.05) }));
    return kpiBase;
  }, [period]);

  const donutTotal = useMemo(() => donutData.reduce((a, b) => a + b.value, 0), [donutData]);

  return (
    <div className="page">
      <Section title="Store Analytics">
        <HeaderBar
          period={period}
          onChange={setPeriod}
          onExport={() =>
            exportCSV({
              period,
              line: lineData,
              donut: donutData,
              categories: categoryPerformance,
              kpis,
            })
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className={`${cardCls} lg:col-span-2`}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className={panelTitle}>Store report ({period})</h3>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Orders</div>
                    <div className={numberLg}>{lineData.reduce((s, r) => s + r.orders, 0).toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Unique buyers</div>
                    <div className={numberLg}>{lineData.reduce((s, r) => s + r.buyers, 0).toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Refunded</div>
                    <div className={numberLg}>
                      {Math.round(lineData.reduce((s, r) => s + r.orders, 0) * 0.04).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <OrdersLineChart data={lineData} />
          </div>

          <CategoryPerformance className={cardCls} data={categoryPerformance} />

          <div className={`${cardCls}`}>
            <div className="p-4 border-b">
              <h3 className={panelTitle}>Category share of sales</h3>
            </div>
            <CategoryDonut data={donutData} total={donutTotal} />
          </div>

          <RecentTransactions className={`${cardCls} lg:col-span-2`} />

          <KPIs className={`${cardCls} lg:col-span-3`} data={kpis} />
        </div>
      </Section>
    </div>
  );
}
