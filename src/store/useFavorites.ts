import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FavItem = {
  id: number | string;
  title: string;
  image?: string;
  price?: number;
};

type FavoritesState = {
  items: Record<string | number, FavItem>;
  add: (item: FavItem) => void;
  remove: (id: string | number) => void;
  toggle: (item: FavItem) => void;
  clear: () => void;
  has: (id: string | number) => boolean;
};

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: {},
      add: (item) => set((s) => ({ items: { ...s.items, [item.id]: item } })),
      remove: (id) =>
        set((s) => {
          const { [id]: _removed, ...rest } = s.items;
          return { items: rest };
        }),
      toggle: (item) => {
        const exists = get().items[item.id];
        if (exists) get().remove(item.id);
        else get().add(item);
      },
      clear: () => set({ items: {} }),
      has: (id) => Boolean(get().items[id]),
    }),
    { name: 'favorites-store' }
  )
);

export const selectFavItemsMap = (s: FavoritesState) => s.items;
export const selectFavCount = (s: FavoritesState) => Object.keys(s.items).length;
export const selectFavHas = (id: string | number) => (s: FavoritesState) => Boolean(s.items[id]);
