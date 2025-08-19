import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemsGrid from '../components/items/ItemsGrid';
import Filters, { type FiltersState } from '../components/items/Filters';
import { useCatalog } from '@/store/useCatalog';

const PAGE_SIZE = 12;

const norm = (s: string) => s.trim().toLowerCase();

export default function ItemsPage() {
  const { items, loading, error, categories } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();

  // Значення категорії з URL: ?category=...
  const categoryFromQS = useMemo(() => (searchParams.get('category') ?? '').trim(), [searchParams]);

  // Абсолютний максимум ціни
  const priceMaxAbs = useMemo(() => (items.length ? Math.ceil(Math.max(...items.map((i) => i.price))) : 0), [items]);

  // Список тем для фільтра (категорій) з "All" попереду
  const topics = useMemo(() => {
    const base = Array.isArray(categories) ? categories.filter(Boolean) : [];
    const unique = Array.from(new Set(base));
    return ['All', ...unique];
  }, [categories]);

  // Вибираємо точне ім'я категорії з магазину за значенням з URL (без урахування регістру)
  const resolvedTopicFromQS = useMemo(() => {
    if (!categoryFromQS) return 'All';
    const exact = topics.find((t) => norm(t) === norm(categoryFromQS));
    return exact ?? categoryFromQS; // якщо ще не завантажились topics — тимчасово використовуємо значення з URL
  }, [categoryFromQS, topics]);

  // ---- ФІЛЬТРИ ----
  const [filters, setFilters] = useState<FiltersState>(() => ({
    q: '',
    topic: resolvedTopicFromQS || 'All',
    maxPrice: 0, // оновимо нижче, коли порахується priceMaxAbs
    tags: [],
    sort: 'none',
  }));

  // Коли порахувався абсолютний максимум ціни — підставити у фільтр, якщо там 0
  useEffect(() => {
    if (priceMaxAbs && filters.maxPrice === 0) {
      setFilters((f) => ({ ...f, maxPrice: priceMaxAbs }));
    }
  }, [priceMaxAbs]); // eslint-disable-line react-hooks/exhaustive-deps

  // Якщо змінюється ?category в URL або оновились topics — синхронізуємо filters.topic
  useEffect(() => {
    setFilters((f) => {
      if (f.topic === resolvedTopicFromQS) return f;
      return { ...f, topic: resolvedTopicFromQS };
    });
  }, [resolvedTopicFromQS]);

  // Пагінація: при зміні будь-якого фільтра — скидаємо до першої сторінки
  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisible(PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.q, filters.topic, filters.maxPrice, filters.sort, JSON.stringify(filters.tags)]);

  // Фільтрація + сортування
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

  // Обгортка для керування Filters, яка також синхронізує URL ?category
  const handleFiltersChange = (next: FiltersState) => {
    setFilters(next);

    // Синхронізуємо тільки категорію в URL:
    const sp = new URLSearchParams(searchParams);
    if (next.topic && next.topic !== 'All') {
      sp.set('category', next.topic);
    } else {
      sp.delete('category');
    }
    setSearchParams(sp, { replace: true });
  };

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
