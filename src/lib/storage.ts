const KEY = 'pet_store_cart_v1';

export function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(lines: CartLine[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Ignore write errors (e.g., storage full, private mode)
  }
}

// ---- Types (щоб не тягнути ззовні)
type CartLine = { id: string; qty: number };
