import type { Item } from '@/types/item';
import { useCart } from '@/store/useCart';
import { formatMoney } from '@/lib/currency';
import FavoriteButton from '@/components/common/FavoriteButton';

export default function ProductCard({ item, showFavorite }: { item: Item; showFavorite?: boolean }) {
  const cart = useCart();

  return (
    <article className="bg-white rounded-xl border p-4 hover:shadow-lg transition flex flex-col h-full group">
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-90"
        />
        {showFavorite && (
          <div className="absolute top-2 right-2">
            <FavoriteButton id={item.id} title={item.title} image={item.img} price={item.price} />
          </div>
        )}
      </div>

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
