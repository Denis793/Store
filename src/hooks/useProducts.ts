import { useEffect, useState, useCallback } from 'react';

export type ApiProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

type Options = { limit?: number; offset?: number };

export function useProducts({ limit = 10, offset = 0 }: Options = {}) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const ctrl = new AbortController();
    try {
      setLoading(true);
      setError(null);
      const url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ApiProduct[] = await res.json();
      setProducts(data);
    } catch (e: any) {
      if (e.name !== 'AbortError') setError(e?.message ?? 'Failed to load products');
    } finally {
      setLoading(false);
    }
    return () => ctrl.abort();
  }, [limit, offset]);

  useEffect(() => {
    void load();
  }, [load]);

  return { products, loading, error, refresh: load };
}
