import type { Item } from '@/types/item';
import { useCart } from '@/store/useCart';
import { formatMoney } from '@/lib/currency';

export default function ProductCard({ item }: { item: Item }) {
  const cart = useCart();
  return (
    <article className="bg-white rounded-xl border p-4 hover:shadow transition flex flex-col h-full">
      <img src={item.img} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-3" />
      <h3 className="font-medium line-clamp-2 mb-2">{item.title}</h3>
      <div className="mt-auto">
        <div className="text-sm text-gray-600 mb-2">{formatMoney(item.price)}</div>
        <button
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-black text-white w-full hover:bg-gray-800 transition"
          onClick={() => cart.add(item.id, 1)}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
