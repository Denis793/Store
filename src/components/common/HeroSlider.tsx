import { useEffect, useState } from 'react';

interface HeroSliderProps {
  images: string[];
  children?: React.ReactNode;
  interval?: number;
}

export default function HeroSlider({ images, children, interval = 5000 }: HeroSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images, interval]);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center">
        <div className="w-full text-white max-w-2xl" style={{ marginLeft: '10%' }}>
          {children}
        </div>
      </div>
    </section>
  );
}
