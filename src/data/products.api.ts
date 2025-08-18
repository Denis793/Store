import type { Item } from '@/types/item';

export const API = 'https://fakestoreapi.com/products';
export const PLACEHOLDER_IMG = 'https://via.placeholder.com/400x300?text=No+Image';

type ApiProduct = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string | null;
  rating?: { rate: number; count: number };
};

const toSafeImg = (src?: string | null) => {
  const s = (src ?? '').trim();
  return s ? s : PLACEHOLDER_IMG;
};

export async function fetchProducts(): Promise<Item[]> {
  const res = await fetch(API);
  if (!res.ok) throw new Error('Failed to load products');

  const data: ApiProduct[] = await res.json();

  return data
    .filter((p) => typeof p.id === 'number' && p.title && typeof p.price === 'number')
    .map<Item>((p) => ({
      id: String(p.id),
      title: p.title,
      price: Number(p.price),
      img: toSafeImg(p.image),
      category: p.category || 'Other',
    }));
}
