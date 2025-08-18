import { useCart } from '@/store/useCart';
import CartItem from './CartItem';
import { useCatalog } from '@/store/catalog.context';
import type { Item } from '@/types/item';

type FullItem = Item & { qty: number; lineTotal: number };

export default function CartSidebar() {
  const cart = useCart();
  const { byId } = useCatalog();
  if (!cart.isOpen) return null;

  const items: FullItem[] = cart.lines
    .map((l) => {
      const it = byId[l.id];
      return it ? { ...it, qty: l.qty, lineTotal: it.price * l.qty } : null;
    })
    .filter((x): x is FullItem => x !== null);

  const subtotal = cart.total(byId);
  const discount = typeof cart.discount === 'function' ? cart.discount(byId) : 0;
  const total = typeof cart.grandTotal === 'function' ? cart.grandTotal(byId) : subtotal - discount;

  const { threshold, rate } = cart.discountMeta;

  const leftToDiscount = Math.max(0, threshold - subtotal);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={cart.close} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col">
        <header className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Your Cart ({cart.count})</h3>
          <button onClick={cart.close} className="text-xl leading-none">
            &times;
          </button>
        </header>

        {/* Discount banner */}
        <div
          className={`px-4 py-3 text-sm ${
            subtotal >= threshold ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
          } border-b`}
        >
          {subtotal >= threshold ? (
            <>
              🎉 Discount {Math.round(rate * 100)}% applied: <b>- ${discount.toFixed(2)}</b>
            </>
          ) : (
            <>
              Add <b>${leftToDiscount.toFixed(2)}</b> more to get {Math.round(rate * 100)}% discount.
            </>
          )}
        </div>

        <div className="p-4 flex-1 overflow-auto space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty</p>
          ) : (
            items.map((it) => (
              <CartItem
                key={it.id}
                item={it}
                onInc={() => cart.setQty(it.id, it.qty + 1)}
                onDec={() => cart.setQty(it.id, Math.max(1, it.qty - 1))}
                onRemove={() => cart.remove(it.id)}
              />
            ))
          )}
        </div>

        <footer className="p-4 border-t space-y-2">
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Discount" value={discount ? `- $${discount.toFixed(2)}` : '$0.00'} muted />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={cart.clear} className="border rounded px-3 py-2 w-1/2">
              Clear
            </button>
            <button className="bg-black text-white rounded px-3 py-2 w-1/2" disabled={items.length === 0}>
              Checkout
            </button>
          </div>
        </footer>
      </aside>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className={`flex justify-between text-sm ${muted ? 'text-gray-500' : ''}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
