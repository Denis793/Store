import type { Item } from '@/store/cart.context';
import { ITEMS } from './items';

export type Catalog = Record<string, Item>;

// Індекс для швидкого доступу за id
export const CATALOG: Catalog = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
