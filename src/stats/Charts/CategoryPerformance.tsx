export function CategoryPerformance({
  className,
  data,
}: {
  className?: string;
  data: { name: string; value: number; prev: number; color: string }[];
}) {
  return (
    <div className={className}>
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium text-gray-700">Category performance (share)</h3>
      </div>
      <div className="p-4 grid gap-3">
        {data.map((r) => (
          <div key={r.name} className="flex items-center justify-between rounded-xl border px-3 py-2">
            <div className="flex items-center gap-3">
              <span className="inline-block w-8 h-8 rounded-full" style={{ backgroundColor: r.color, opacity: 0.2 }} />
              <div>
                <div className="text-sm font-medium text-gray-800">{r.name}</div>
                <div className="text-xs text-gray-500">Share of sales by category</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{r.value}%</div>
              <div className="text-xs text-gray-500">VS {r.prev}% (Prev)</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
