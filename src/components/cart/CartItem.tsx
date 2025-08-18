import type { CartItemFull } from '@/types/item';

type Props = { item: CartItemFull; onInc: () => void; onDec: () => void; onRemove: () => void };

export default function CartItem({ item, onInc, onDec, onRemove }: Props) {
  return (
    <article className="flex gap-3 border rounded-lg p-3">
      <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="font-medium">{item.title}</h4>
          <button onClick={onRemove} className="text-sm opacity-70 hover:opacity-100">
            ×
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center border rounded">
            <button onClick={onDec} className="px-2 py-1">
              -
            </button>
            <span className="px-3">{item.qty}</span>
            <button onClick={onInc} className="px-2 py-1">
              +
            </button>
          </div>
          <div className="font-medium">${item.lineTotal.toFixed(2)}</div>
        </div>
      </div>
    </article>
  );
}
