import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  type TooltipProps,
  type Payload,
} from 'recharts';

type Row = { name: string; orders: number; buyers: number };

function CustomTooltip(props: TooltipProps<number, string>) {
  const { active, payload, label } = props;
  if (!active || !payload || payload.length === 0) return null;

  const arr = payload as Payload<number, string>[];

  const orders = arr.find((p) => String(p.dataKey) === 'orders');
  const buyers = arr.find((p) => String(p.dataKey) === 'buyers');

  return (
    <div className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/95 shadow-lg px-3 py-2">
      <div className="text-xs text-gray-500 dark:text-neutral-400 mb-1">{String(label)}</div>
      {buyers && (
        <div className="text-sm" style={{ color: '#60a5fa' }}>
          buyers : {buyers.value as number}
        </div>
      )}
      {orders && (
        <div className="text-sm" style={{ color: '#ef4444' }}>
          orders : {orders.value as number}
        </div>
      )}
    </div>
  );
}

export function OrdersLineChart({
  data,
  className = 'h-[260px] sm:h-[320px] px-2 pb-4',
}: {
  data: Row[];
  className?: string;
}) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 8, right: 16, top: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={{ r: 2 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="buyers"
            stroke="#60a5fa"
            strokeWidth={2.5}
            dot={{ r: 2 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
