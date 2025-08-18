import type { Item } from '@/types/item';
import ProductCard from './ProductCard';

export default function ItemsGrid({ items }: { items: Item[] }) {
  if (!items.length) return <p className="text-sm text-gray-500">No items found</p>;
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <ProductCard key={it.id} item={it} />
      ))}
    </section>
  );
}
