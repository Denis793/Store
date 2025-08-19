import { useCatalog } from '@/store/useCatalog';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ItemsGrid from '../components/items/ItemsGrid';
import Filters, { type FiltersState } from '../components/items/Filters';

const PAGE_SIZE = 12;
const norm = (s: string) => s.trim().toLowerCase();

export default function ItemsPage() {
  const { items, loading, error, categories } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromQS = useMemo(() => (searchParams.get('category') ?? '').trim(), [searchParams]);
  const priceMaxAbs = useMemo(() => (items.length ? Math.ceil(Math.max(...items.map((i) => i.price))) : 0), [items]);

  const topics = useMemo(() => {
    const base = Array.isArray(categories) ? categories.filter(Boolean) : [];
    const unique = Array.from(new Set(base.map((c) => c.trim())));
    return ['All', ...unique.filter((c) => c.toLowerCase() !== 'all')];
  }, [categories]);

  const resolvedTopicFromQS = useMemo(() => {
    if (!categoryFromQS) return 'All';
    const exact = topics.find((t) => norm(t) === norm(categoryFromQS));
    return exact ?? categoryFromQS;
  }, [categoryFromQS, topics]);

  const [filters, setFilters] = useState<FiltersState>(() => ({
    q: '',
    topic: resolvedTopicFromQS || 'All',
    maxPrice: 0,
    tags: [],
    sort: 'none',
  }));

  useEffect(() => {
    if (priceMaxAbs && filters.maxPrice === 0) setFilters((f) => ({ ...f, maxPrice: priceMaxAbs }));
  }, [priceMaxAbs]);

  useEffect(() => {
    setFilters((f) => (f.topic === resolvedTopicFromQS ? f : { ...f, topic: resolvedTopicFromQS }));
  }, [resolvedTopicFromQS]);

  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filters.q, filters.topic, filters.maxPrice, filters.sort, JSON.stringify(filters.tags)]);

  const filteredSorted = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const byCategory = (cat?: string) => (filters.topic === 'All' ? true : (cat || 'Other') === filters.topic);
    const byTags = (it: any) =>
      !filters.tags?.length ? true : (it.tags || []).every((t: string) => filters.tags.includes(t));

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

  const handleFiltersChange = (next: FiltersState) => {
    setFilters(next);
    const sp = new URLSearchParams(searchParams);
    if (next.topic && next.topic !== 'All') sp.set('category', next.topic);
    else sp.delete('category');
    setSearchParams(sp, { replace: true });
  };

  return (
    <div className="page">
      <div className="container py-8">
        <h2>All Items</h2>

        {loading && <p className="mt-4">Loading…</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-[280px_1fr] gap-6 mt-4">
              <Filters
                value={filters}
                onChange={handleFiltersChange}
                priceMaxAbs={priceMaxAbs || 1000}
                topics={topics}
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
