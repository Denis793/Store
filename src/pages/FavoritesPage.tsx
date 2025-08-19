import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites, selectFavItemsMap } from '@/store/useFavorites';

export default function FavoritesPage() {
  const itemsMap = useFavorites(selectFavItemsMap);
  const clear = useFavorites((s) => s.clear);
  const items = useMemo(() => Object.values(itemsMap), [itemsMap]);

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Favorites</h2>
          {items.length > 0 && (
            <button onClick={clear} className="px-3 py-1.5 text-sm rounded border hover:bg-gray-50">
              Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="mt-6 text-gray-600">
            You have no favorites yet.{' '}
            <Link to="/items" className="underline">
              Browse items
            </Link>
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <article key={p.id} className="border rounded-xl p-4 bg-white shadow-sm">
                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>
                <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                {typeof p.price !== 'undefined' && <p className="text-sm text-gray-700 mt-1">${p.price}</p>}
                <div className="mt-3 flex gap-2">
                  <Link
                    to={`/item/${p.id}`}
                    className="px-3 py-1.5 text-sm rounded bg-black text-white hover:bg-gray-800"
                  >
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
