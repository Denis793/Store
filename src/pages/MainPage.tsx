import { Link } from 'react-router-dom';
import Section from '../components/common/Section';
import HeroSlider from '../components/common/HeroSlider';
import { useProducts } from '@/hooks/useProducts';

function CategoryTile({ name, image, to, big }: { name: string; image?: string; to: string; big?: boolean }) {
  return (
    <Link
      to={to}
      className={`relative group block rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="relative z-10 p-10  flex items-end h-full">
        <h3 className="text-white font-semibold text-xl drop-shadow">{name}</h3>
      </div>
    </Link>
  );
}

export default function MainPage() {
  const { products, loading, error } = useProducts({ limit: 50, offset: 0 });

  const heroImages: string[] = Object.values(
    import.meta.glob('/src/img/heroSlider/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' })
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
    return Array.from(map.entries()).map(([name, image]) => ({ name, image }));
  })();

  const linkToCategory = (name: string) => `/items?category=${encodeURIComponent(name)}`;

  return (
    <>
      <HeroSlider images={heroImages}>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow">
          Discover
          <br />
          Fox Life
        </h1>
        <p className="mt-3 text-gray-100/90 drop-shadow">
          Lorem ipsum dolor sit amet consectetur. Pharetra turpis sem ultricies.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/items" className="bg-white text-black px-4 py-2 rounded">
            All items
          </Link>
          <Link to="/shop" className="border border-white text-white px-4 py-2 rounded">
            Shop
          </Link>
        </div>
      </HeroSlider>

      <Section>
        {loading && <p className="text-gray-500">Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && categories.length > 0 && (
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
        )}
      </Section>
    </>
  );
}
