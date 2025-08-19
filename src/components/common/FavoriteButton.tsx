import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useFavorites, selectFavHas } from '@/store/useFavorites';

type Props = {
  id: number | string;
  title: string;
  image?: string;
  price?: number;
  className?: string;
};

export default function FavoriteButton({ id, title, image, price, className }: Props) {
  const has = useFavorites(selectFavHas(id));
  const toggle = useFavorites((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={() => toggle({ id, title, image, price })}
      aria-pressed={has}
      aria-label={has ? 'Remove from favorites' : 'Add to favorites'}
      className={`inline-flex items-center justify-center rounded-full p-2 bg-white/90 hover:bg-white shadow-sm ${
        className || ''
      }`}
    >
      {has ? <HeartSolid className="w-5 h-5 text-red-500" /> : <HeartOutline className="w-5 h-5 text-gray-700" />}
    </button>
  );
}
