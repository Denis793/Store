import { createContext, useReducer, useEffect, useMemo, useCallback, useContext, type ReactNode } from 'react';
import type { Item } from '@/types/item';

export type CartLine = { id: string; qty: number };
type State = { lines: CartLine[]; isOpen: boolean };
type Action =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }
  | { type: 'ADD'; id: string; qty?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'CLEAR' };
export type Catalog = Record<string, Item>;

const DISCOUNT_THRESHOLD = 150;
const DISCOUNT_RATE = 0.1;

export type CartContextType = {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  mergeWithCatalog: (catalog: Catalog) => (Item & { qty: number; lineTotal: number })[];
  total: (catalog: Catalog) => number;
  discount: (catalog: Catalog) => number;
  grandTotal: (catalog: Catalog) => number;
  discountMeta: { threshold: number; rate: number };
};

export const CartContext = createContext<CartContextType | null>(null);

// persistence
const KEY = 'store_cart_v1';
const load = (): CartLine[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
};
const save = (lines: CartLine[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {}
};

// reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    case 'ADD': {
      const qty = action.qty ?? 1;
      const lines = state.lines.some((l) => l.id === action.id)
        ? state.lines.map((l) => (l.id === action.id ? { ...l, qty: l.qty + qty } : l))
        : [...state.lines, { id: action.id, qty }];
      return { ...state, lines };
    }
    case 'REMOVE':
      return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
    case 'SET_QTY':
      return {
        ...state,
        lines: state.lines.map((l) => (l.id === action.id ? { ...l, qty: Math.max(1, action.qty) } : l)),
      };
    case 'CLEAR':
      return { ...state, lines: [] };
    default:
      return state;
  }
}

// provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], isOpen: false });

  useEffect(() => {
    const stored = load();
    if (stored.length) {
      stored.forEach((l) => dispatch({ type: 'ADD', id: l.id, qty: l.qty }));
      dispatch({ type: 'CLOSE' });
    }
  }, []);

  useEffect(() => {
    save(state.lines);
  }, [state.lines]);

  // actions
  const open = useCallback(() => dispatch({ type: 'OPEN' }), []);
  const close = useCallback(() => dispatch({ type: 'CLOSE' }), []);
  const toggle = useCallback(() => dispatch({ type: 'TOGGLE' }), []);
  const add = useCallback((id: string, qty?: number) => dispatch({ type: 'ADD', id, qty }), []);
  const remove = useCallback((id: string) => dispatch({ type: 'REMOVE', id }), []);
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: 'SET_QTY', id, qty }), []);
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  // helpers
  const count = useMemo(() => state.lines.reduce((s, l) => s + l.qty, 0), [state.lines]);

  const mergeWithCatalog = useCallback(
    (catalog: Catalog) =>
      state.lines
        .map((l) => {
          const it = catalog[l.id];
          return it ? { ...it, qty: l.qty, lineTotal: it.price * l.qty } : null;
        })
        .filter((x): x is Item & { qty: number; lineTotal: number } => x !== null),
    [state.lines]
  );

  const total = useCallback(
    (catalog: Catalog) => mergeWithCatalog(catalog).reduce((s, it) => s + it.lineTotal, 0),
    [mergeWithCatalog]
  );

  const discount = useCallback(
    (catalog: Catalog) => {
      const subtotal = total(catalog);
      return subtotal >= DISCOUNT_THRESHOLD ? +(subtotal * DISCOUNT_RATE).toFixed(2) : 0;
    },
    [total]
  );

  const grandTotal = useCallback(
    (catalog: Catalog) => {
      const subtotal = total(catalog);
      return +(subtotal - discount(catalog)).toFixed(2);
    },
    [total, discount]
  );

  const value: CartContextType = {
    lines: state.lines,
    isOpen: state.isOpen,
    open,
    close,
    toggle,
    add,
    remove,
    setQty,
    clear,
    count,
    mergeWithCatalog,
    total,
    discount,
    grandTotal,
    discountMeta: { threshold: DISCOUNT_THRESHOLD, rate: DISCOUNT_RATE },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// hook
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
