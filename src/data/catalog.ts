import type { Item } from '@/types/item';
import { ITEMS } from './items';

export type Catalog = Record<string, Item>;

export const CATALOG: Catalog = ITEMS.reduce<Catalog>((acc, it) => {
  acc[String(it.id)] = it;
  return acc;
}, {});
