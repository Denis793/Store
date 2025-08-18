import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Item } from '@/types/item';
import { API } from '@/data/products.api';

export type CatalogCtx = {
  items: Item[];
  byId: Record<string, Item>;
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const CatalogContext = createContext<CatalogCtx | null>(null);

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
      const items = data
        .filter((p: any) => typeof p.id === 'number' && p.title && typeof p.price === 'number')
        .map((p: any) => ({
          id: String(p.id),
          title: p.title,
          price: p.price,
          img: p.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
        }));
      setItems(items);
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

  return (
    <CatalogContext.Provider value={{ items, byId, loading, error, refresh: load }}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider');
  return ctx;
}
