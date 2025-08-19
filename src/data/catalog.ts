import type { Item } from '@/store/cart.context';
import { ITEMS } from './items';

export type Catalog = Record<string, Item>;
export const CATALOG: Catalog = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
