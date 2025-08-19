export function KPIs({ className, data }: { className?: string; data: { label: string; value: number }[] }) {
  return (
    <div className={className}>
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium text-gray-700">Store KPIs</h3>
      </div>
      <div className="p-4 grid gap-4 sm:grid-cols-2">
        {data.map((s) => (
          <div key={s.label}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-700">{s.label}</span>
              <span className="font-medium">{s.value}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${s.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
