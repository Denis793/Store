import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

export function CategoryDonut({
  data,
  total,
  className = 'h-[260px]',
}: {
  data: { name: string; value: number; color: string }[];
  total: number;
  className?: string;
}) {
  return (
    <div className="p-4">
      <div className={className}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={2}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs text-gray-500">Total orders (simulated)</div>
        <div className="text-lg font-semibold">{total.toLocaleString()}</div>
      </div>
    </div>
  );
}
