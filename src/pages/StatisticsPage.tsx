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
const numberLg = 'text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight';

export default function StatisticsPage() {
  const [period, setPeriod] = useState<Period>('week');

  // Select line-series by period
  const lineData = useMemo(() => {
    if (period === 'year') return lineDataYear;
    if (period === 'month') return lineDataMonth;
    return lineDataWeek;
  }, [period]);

  // Scale donut values by period (purely for simulation feel)
  const donutData = useMemo(() => {
    const factor = period === 'year' ? 12 : period === 'month' ? 4 : 1;
    return donutDataBase.map((d) => ({ ...d, value: d.value * factor }));
  }, [period]);

  // Adjust KPIs slightly per period (simulated dynamics)
  const kpis = useMemo(() => {
    if (period === 'year') return kpiBase.map((k) => ({ ...k, value: Math.min(100, Math.round(k.value * 1.1)) }));
    if (period === 'month') return kpiBase.map((k) => ({ ...k, value: Math.round(k.value * 1.05) }));
    return kpiBase;
  }, [period]);

  const ordersSum = useMemo(() => lineData.reduce((s, r) => s + r.orders, 0), [lineData]);
  const buyersSum = useMemo(() => lineData.reduce((s, r) => s + r.buyers, 0), [lineData]);
  const refunded = useMemo(() => Math.round(ordersSum * 0.04), [ordersSum]);
  const donutTotal = useMemo(() => donutData.reduce((a, b) => a + b.value, 0), [donutData]);

  return (
    <div className="page">
      <Section title="Store Analytics">
        <HeaderBar
          period={period}
          onChange={setPeriod}
          onExport={() =>
            exportCSV({ period, line: lineData, donut: donutData, categories: categoryPerformance, kpis })
          }
        />

        {/* Mobile KPI strip (desktop KPIs are shown in the chart card header) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:hidden mb-4">
          <div className="rounded-xl border p-3 text-center bg-white">
            <div className="text-[10px] text-gray-500">Orders</div>
            <div className={numberLg}>{ordersSum.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border p-3 text-center bg-white">
            <div className="text-[10px] text-gray-500">Buyers</div>
            <div className={numberLg}>{buyersSum.toLocaleString()}</div>
          </div>
          <div className="rounded-xl border p-3 text-center bg-white">
            <div className="text-[10px] text-gray-500">Refunded</div>
            <div className={numberLg}>{refunded.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Line chart card (with top margin) */}
          <div className={`${cardCls} card lg:col-span-2 mt-4 sm:mt-6`}>
            {/* Desktop header KPIs */}
            <div className="p-4 border-b hidden md:block">
              <div className="flex items-center justify-between">
                <h3 className={panelTitle}>Store report ({period})</h3>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Orders</div>
                    <div className={numberLg}>{ordersSum.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Unique buyers</div>
                    <div className={numberLg}>{buyersSum.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Refunded</div>
                    <div className={numberLg}>{refunded.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart with responsive height (extra top spacing is on the card) */}
            <OrdersLineChart data={lineData} className="h-[200px] sm:h-[240px] md:h-[320px] px-2 pb-4" />
          </div>

          {/* Category performance list (with top margin) */}
          <CategoryPerformance className={`${cardCls} card mt-4 sm:mt-6`} data={categoryPerformance} />

          {/* Donut chart card (with top margin) */}
          <div className={`${cardCls} card mt-4 sm:mt-6`}>
            <div className="p-4 border-b">
              <h3 className={panelTitle}>Category share of sales</h3>
            </div>
            <CategoryDonut data={donutData} total={donutTotal} className=" h-[220px] sm:h-[260px]" />
          </div>

          {/* Transactions (with top margin); includes mobile list + desktop table */}
          <RecentTransactions className={`${cardCls} card lg:col-span-2 mt-4 sm:mt-6`} />

          {/* KPIs progress bars (with top margin) */}
          <KPIs className={`${cardCls} card lg:col-span-3 mt-4 sm:mt-6`} data={kpis} />
        </div>
      </Section>
    </div>
  );
}
