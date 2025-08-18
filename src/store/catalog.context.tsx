import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Item } from '@/types/item';
import { API } from '@/data/products.api';
import { PLACEHOLDER_IMG } from '@/data/products.api';

export type CatalogCtx = {
  items: Item[];
  byId: Record<string, Item>;
  categories: string[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

export const CatalogContext = createContext<CatalogCtx | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API);
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();

      const normalized: Item[] = data
        .filter((p: any) => typeof p.id === 'number' && p.title && typeof p.price === 'number')
        .map((p: any) => ({
          id: String(p.id),
          title: p.title,
          price: p.price,
          img: p.image || PLACEHOLDER_IMG,
          category: p.category || 'Other',
          tags: Array.isArray(p.tags) ? p.tags : [],
        }));

      setItems(normalized);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to load products';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const byId = useMemo(() => Object.fromEntries(items.map((i) => [i.id, i])), [items]);

  const categories = useMemo(() => {
    const cats = items.map((i: any) => i.category || 'Other');
    return ['All', ...Array.from(new Set(cats))];
  }, [items]);

  return (
    <CatalogContext.Provider value={{ items, byId, categories, loading, error, refresh: load }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
