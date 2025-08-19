const mockRows = Array.from({ length: 8 }).map((_, i) => ({
  no: String(i + 1).padStart(2, '0'),
  code: `#ORD${(102340 + i).toString()}`,
  product: [
    'Fox Hoodie',
    'Silver Ring',
    'Bluetooth Headset',
    'Classic T-Shirt',
    '4K Action Cam',
    'Leather Belt',
    'Gold Necklace',
    'Winter Jacket',
  ][i],
  stock: 199 + i * 3,
}));

export function RecentTransactions({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="p-4 border-b flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-700">Recent transactions</h3>
        <div className="w-full max-w-[280px]">
          <input
            className="card w-full px-3 py-2 rounded-lg border text-sm"
            placeholder="Search orders, customers, items…"
          />
        </div>
      </div>

      {/* MOBILE LIST (xs/sm) */}
      <div className="p-4 grid gap-3 md:hidden">
        {mockRows.map((row) => (
          <div key={row.code} className="rounded-xl border p-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{row.product}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {row.code} · Stock {row.stock.toLocaleString()}
              </div>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <button className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600 border">View</button>
              <button className="px-2 py-1 text-xs rounded bg-emerald-50 text-emerald-600 border">Inv</button>
              <button className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-600 border">Hold</button>
              <button className="px-2 py-1 text-xs rounded bg-rose-50 text-rose-600 border">Ref</button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE (md+) */}
      <div className="p-4 overflow-x-auto hidden md:block">
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr className="text-left">
              <th className="py-2 pr-4">No</th>
              <th className="py-2 pr-4">Order ID</th>
              <th className="py-2 pr-4">Item</th>
              <th className="py-2 pr-4">Qty / Stock</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockRows.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 pr-4">{row.no}</td>
                <td className="py-2 pr-4">{row.code}</td>
                <td className="py-2 pr-4">{row.product}</td>
                <td className="py-2 pr-4 tabular-nums">{row.stock.toLocaleString()}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600 border">View</button>
                    <button className="px-2 py-1 text-xs rounded bg-emerald-50 text-emerald-600 border">Invoice</button>
                    <button className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-600 border">Hold</button>
                    <button className="px-2 py-1 text-xs rounded bg-rose-50 text-rose-600 border">Refund</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
