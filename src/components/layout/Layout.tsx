import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartSidebar from '@/components/cart/CartSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-primary transition-colors">
      <Header />
      <main className="pt-16 flex-1">{children}</main>
      <Footer />
      <CartSidebar />
    </div>
  );
}
