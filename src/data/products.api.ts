import type { Item } from '@/types/item';

const API = 'https://api.escuelajs.co/api/v1/products';

type ApiProduct = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export async function fetchProducts(): Promise<Item[]> {
  const res = await fetch(API);
  if (!res.ok) throw new Error('Failed to load products');
  const data: ApiProduct[] = await res.json();

  return data
    .filter((p) => typeof p.id === 'number' && p.title && typeof p.price === 'number')
    .map((p) => ({
      id: String(p.id),
      title: p.title,
      price: p.price,
      img: p.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
    }));
}
