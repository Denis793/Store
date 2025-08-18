import { useMemo, useState } from 'react';
import ItemsGrid from '../components/items/ItemsGrid';
import Filters, { type FiltersState } from '../components/items/Filters';
import { useCatalog } from '@/store/catalog.context';

export default function ItemsPage() {
  const { items, loading, error } = useCatalog();

  const priceMaxAbs = useMemo(() => (items.length ? Math.ceil(Math.max(...items.map((i) => i.price))) : 0), [items]);

  const [filters, setFilters] = useState<FiltersState>({
    q: '',
    topic: 'All',
    maxPrice: priceMaxAbs,
  });

  if (priceMaxAbs && filters.maxPrice === 0) {
    setFilters((f) => ({ ...f, maxPrice: priceMaxAbs }));
  }

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const byTopic = (title: string) => {
      if (filters.topic === 'All') return true;
      if (filters.topic === 'Food') return /food/i.test(title);
      if (filters.topic === 'Toys') return /toy/i.test(title);
      if (filters.topic === 'Clothes') return /hoodie|shirt|clothes/i.test(title);
      return !/food|toy|hoodie|shirt|clothes/i.test(title);
    };
    return items
      .filter((i) => byTopic(i.title))
      .filter((i) => (filters.maxPrice ? i.price <= filters.maxPrice : true))
      .filter((i) => (q ? i.title.toLowerCase().includes(q) : true));
  }, [items, filters]);

  return (
    <div className="py-8">
      <div className="container">
        <h2 className="text-2xl font-semibold">All Items</h2>

        {loading && <p className="mt-4 text-gray-500">Loading…</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-[280px_1fr] gap-6 mt-4">
            <Filters value={filters} onChange={setFilters} priceMaxAbs={priceMaxAbs || 1000} />
            <ItemsGrid items={filtered} />
          </div>
        )}
      </div>
    </div>
  );
}
