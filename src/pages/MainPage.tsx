import { Link } from 'react-router-dom';
import Section from '../components/common/Section';
import HeroSlider from '../components/common/HeroSlider';
import { useProducts } from '@/hooks/useProducts';
import { StarIcon } from '@heroicons/react/24/solid';
import { reviews } from '@/data/reviews';

function CategoryTile({ name, image, to, big }: { name: string; image?: string; to: string; big?: boolean }) {
  return (
    <Link
      to={to}
      className={`card relative group block rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
        big ? 'min-h-[260px]' : 'min-h-[200px]'
      }`}
      aria-label={`Open category ${name}`}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
      )}

      <div className="absolute bottom-0 left-0 w-full bg-black/70 px-4 py-3">
        <h3 className="text-white font-bold text-lg md:text-xl tracking-wide">{name.toUpperCase()}</h3>
      </div>
    </Link>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} className={`w-4 h-4 ${i <= value ? 'text-amber-500' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <article className="card rounded-2xl border  p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
        <div className="min-w-0">
          <div className="font-medium leading-tight truncate">{r.name}</div>
          <div className="text-xs text-gray-500">{new Date(r.date).toLocaleDateString()}</div>
        </div>
        <div className="ml-auto">
          <Stars value={r.rating} />
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-700">{r.comment}</p>
    </article>
  );
}

export default function MainPage() {
  const { products, loading, error } = useProducts({ limit: 50, offset: 0 });

  const heroImages: string[] = Object.values(
    import.meta.glob('/src/img/heroSlider/*.{jpg,jpeg,png,webp}', {
      eager: true,
      as: 'url',
    })
  ).sort();

  type Category = { name: string; image?: string };
  const categories: Category[] = (() => {
    const map = new Map<string, string | undefined>();
    for (const p of products ?? []) {
      if (!p?.category) continue;
      if (!map.has(p.category)) {
        map.set(p.category, p?.image);
      }
    }
    return Array.from(map.entries()).map(([name, image]) => ({
      name,
      image,
    }));
  })();

  const linkToCategory = (name: string) => `/items?category=${encodeURIComponent(name)}`;

  return (
    <>
      <HeroSlider images={heroImages}>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-lg">
          Shop Smart,
          <br />
          Live Better
        </h1>

        <p className="mt-3 md:text-3xl text-gray-100/90 drop-shadow">
          Discover quality you can trust, designed to inspire your lifestyle. Every product tells a story of care.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/items" className="card bg-white text-black px-4 py-2 rounded">
            All items
          </Link>
        </div>
      </HeroSlider>

      <Section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Featured Categories</h2>
            <p className="text-sm text-gray-600">Explore our top picks — updated regularly.</p>
          </div>
          <Link to="/items" className="text-sm text-amber-600 hover:text-amber-700">
            Browse all →
          </Link>
        </div>

        {loading && <p className="text-gray-500">Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && categories.length > 0 && (
          <div className="card rounded-3xl p-6 border">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                {categories.slice(0, 2).map((c) => (
                  <CategoryTile key={c.name} name={c.name} image={c.image} to={linkToCategory(c.name)} />
                ))}
              </div>

              {categories[2] && (
                <CategoryTile
                  name={categories[2].name}
                  image={categories[2].image}
                  to={linkToCategory(categories[2].name)}
                  big
                />
              )}
            </div>
          </div>
        )}
      </Section>

      <Section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">What customers say</h2>
          <Link to="/history" className="text-sm text-amber-600 hover:text-amber-700">
            Read more →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 5).map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      </Section>
    </>
  );
}
