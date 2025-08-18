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
  } catch (error) {
    console.log('Failed to save cart to storage:', error);
  }
}

type CartLine = { id: string; qty: number };
