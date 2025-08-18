import { useState } from 'react';
import { PLACEHOLDER_IMG } from '@/data/products.api';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string;
};

export default function SafeImg({ src, fallback = PLACEHOLDER_IMG, ...rest }: Props) {
  const [broken, setBroken] = useState(false);
  const safe = typeof src === 'string' && src.trim() ? src : undefined;

  if (!safe && !fallback) return null;

  return <img {...rest} src={broken ? fallback : safe || fallback} onError={() => setBroken(true)} alt={rest.alt} />;
}
