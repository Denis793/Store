import { useContext } from 'react';
import { CartContext, type CartContextType } from './cart.context';

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
