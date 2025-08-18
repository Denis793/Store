import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Item } from '@/types/item';
import { fetchProducts } from '@/data/products.api';

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
      const data = await fetchProducts();
      setItems(data);
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
