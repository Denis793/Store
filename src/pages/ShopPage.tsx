import { useEffect, useState } from 'react';
import { useCart } from '@/store/useCart';
import { API } from '@/data/products.api';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ShopPage() {
  const cart = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load products', err));
  }, []);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 flex flex-col">
            <img src={p.image} alt={p.title} className="h-100 w-full object-contain mb-3" />
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600 flex-1">{p.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold">${p.price}</span>
              <button
                onClick={() => cart.add(String(p.id))}
                className="bg-black text-white text-sm px-3 py-1 rounded hover:bg-gray-800"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + 12)}
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
