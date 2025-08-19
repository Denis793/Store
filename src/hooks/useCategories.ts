import { useEffect, useState } from 'react';
import { API } from '@/data/products.api';

export type CategoryInfo = {
  name: string;
  image?: string;
  count: number;
};

const norm = (s: string) => s.trim().toLowerCase();

export function useCategories() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const map = new Map<string, CategoryInfo>();
        for (const p of data ?? []) {
          if (!p?.category) continue;
          const key = norm(p.category);
          if (!map.has(key)) {
            map.set(key, {
              name: p.category,
              image: p.image,
              count: 1,
            });
          } else {
            const curr = map.get(key)!;
            curr.count += 1;
          }
        }

        if (!cancelled) {
          setCategories(Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name)));
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load categories');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, loading, error };
}
