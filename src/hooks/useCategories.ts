import { useEffect, useState } from 'react';
import { API } from '@/data/products.api';

export type CategoryInfo = {
  name: string;
  image?: string;
  count: number;
};

type ApiProduct = {
  category?: string | null;
  image?: string | null;
};

const norm = (s: string) => s.trim().toLowerCase();

export function useCategories() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: unknown = await res.json();
        const list = Array.isArray(data) ? (data as ApiProduct[]) : [];

        const map = new Map<string, CategoryInfo>();
        for (const p of list) {
          const cat = (p.category ?? '').toString().trim();
          if (!cat) continue;

          const key = norm(cat);
          const img = (p.image ?? undefined) || undefined;

          if (!map.has(key)) {
            map.set(key, { name: cat, image: img, count: 1 });
          } else {
            const curr = map.get(key)!;
            curr.count += 1;
          }
        }

        if (!cancelled) {
          setCategories(Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name)));
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const message = e instanceof Error ? e.message : 'Failed to load categories';
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, []);

  return { categories, loading, error };
}
