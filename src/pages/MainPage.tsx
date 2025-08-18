import { Link } from 'react-router-dom';
import Section from '../components/common/Section';
import HeroSlider from '../components/common/HeroSlider';
import { useProducts } from '@/hooks/useProducts';

function CardTile({
  title,
  description,
  img,
  big,
}: {
  title: string;
  description: string;
  img?: string;
  big?: boolean;
}) {
  return (
    <article
      className={`relative p-5 border rounded-xl flex items-center justify-between gap-4 ${big ? 'min-h-[220px]' : ''}`}
    >
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
      <img className="object-cover w-[55%] h-[100%] rounded" src={img} alt={title} />
    </article>
  );
}

export default function MainPage() {
  const { products, loading, error } = useProducts({ limit: 3, offset: 0 });
  const heroImages: string[] = Object.values(
    import.meta.glob('/src/img/heroSlider/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' })
  ).sort();

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
        {!loading && !error && products.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {products.slice(0, 2).map((p) => (
                <CardTile key={p.id} title={p.title} description={p.description} img={p.image} />
              ))}
            </div>
            {products[2] && (
              <CardTile title={products[2].title} description={products[2].description} img={products[2].image} big />
            )}
          </div>
        )}
        <Link to="/items" className="mt-6 inline-flex bg-black text-white px-4 py-2 rounded">
          All items
        </Link>
      </Section>
    </>
  );
}
