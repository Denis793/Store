import { useEffect, useState, useCallback } from 'react';
import { API } from '@/data/products.api';

export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

type UseProductsArgs = {
  limit?: number;
  offset?: number;
  category?: string;
};

const normalize = (s: string) => s.trim().toLowerCase();

export function useProducts({ limit = 20, offset = 0, category }: UseProductsArgs = {}) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const ctrl = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: ApiProduct[] = await res.json();

      const filtered = category
        ? data.filter((p) => p?.category && normalize(p.category) === normalize(category))
        : data;

      const start = Math.max(0, offset);
      const end = Math.max(start, start + limit);
      const page = filtered.slice(start, end);

      setProducts(page);
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') {
        setError(e.message || 'Failed to load products');
      }
    } finally {
      setLoading(false);
    }

    return () => ctrl.abort();
  }, [limit, offset, category]);

  useEffect(() => {
    void load();
  }, [load]);

  return { products, loading, error, refresh: load };
}
