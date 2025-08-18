import { useEffect, useMemo, useState } from 'react';
import ItemsGrid from '../components/items/ItemsGrid';
import Filters, { type FiltersState } from '../components/items/Filters';
import { useCatalog } from '@/store/useCatalog';

const PAGE_SIZE = 12;

export default function ItemsPage() {
  const { items, loading, error, categories } = useCatalog();

  const priceMaxAbs = useMemo(() => (items.length ? Math.ceil(Math.max(...items.map((i) => i.price))) : 0), [items]);

  const [filters, setFilters] = useState<FiltersState>({
    q: '',
    topic: 'All',
    maxPrice: priceMaxAbs,
    tags: [],
    sort: 'none',
  });

  useEffect(() => {
    if (priceMaxAbs && filters.maxPrice === 0) {
      setFilters((f) => ({ ...f, maxPrice: priceMaxAbs }));
    }
  }, [priceMaxAbs]);

  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filters.q, filters.topic, filters.maxPrice, filters.sort, JSON.stringify(filters.tags)]);

  const filteredSorted = useMemo(() => {
    const q = filters.q.trim().toLowerCase();

    const byCategory = (cat?: string) => (filters.topic === 'All' ? true : (cat || 'Other') === filters.topic);

    const byTags = (it: any) => {
      if (!filters.tags?.length) return true;
      const tags: string[] = it.tags || [];
      return filters.tags.every((t) => tags.includes(t));
    };

    let res = items
      .filter((i) => byCategory((i as any).category))
      .filter((i) => (filters.maxPrice ? i.price <= filters.maxPrice : true))
      .filter((i) => (q ? i.title.toLowerCase().includes(q) : true))
      .filter((i) => byTags(i));

    if (filters.sort === 'price-asc') res = [...res].sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') res = [...res].sort((a, b) => b.price - a.price);

    return res;
  }, [items, filters]);

  const visibleItems = filteredSorted.slice(0, visible);
  const canShowMore = visible < filteredSorted.length;

  return (
    <div className="py-8">
      <div className="container">
        <h2 className="text-2xl font-semibold">All Items</h2>

        {loading && <p className="mt-4 text-gray-500">Loading…</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-[280px_1fr] gap-6 mt-4">
              <Filters
                value={filters}
                onChange={setFilters}
                priceMaxAbs={priceMaxAbs || 1000}
                topics={categories ?? ['All']}
                availableTags={[]}
                showSort
              />
              <ItemsGrid items={visibleItems} />
            </div>

            {canShowMore && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="px-6 py-2 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Show more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
