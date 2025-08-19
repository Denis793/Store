// src/components/layout/Header.tsx
import { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '@/store/useCart';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, HeartIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useFavorites, selectFavItemsMap } from '@/store/useFavorites';
import { useTheme } from '@/hooks/useTheme';

export default function Header() {
  const cart = useCart();
  const favMap = useFavorites(selectFavItemsMap);
  const favCount = useMemo(() => Object.keys(favMap).length, [favMap]);
  const [open, setOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { to: '/', label: 'Mainpage' },
    { to: '/items', label: 'All items' },
    { to: '/about', label: 'About us' },
    { to: '/statistics', label: 'Statistics' },
  ];

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-black dark:text-white font-semibold'
      : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white';

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-white dark:bg-neutral-900 shadow-sm dark:border-neutral-800">
      <div className="container">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="text-lg font-semibold">
            <Link to="/" onClick={() => setOpen(false)}>
              Store
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 list-none">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={linkCls}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Favorites */}
            <Link to="/favorites" className="relative" aria-label="Open favorites">
              <HeartIcon className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white" />
              {favCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1 rounded">{favCount}</span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={cart.toggle} className="relative" aria-label="Open cart">
              <ShoppingCartIcon className="w-6 h-6 text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white" />
              {cart.count > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-black text-white px-1 rounded">{cart.count}</span>
              )}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 text-yellow-400" />
              ) : (
                <MoonIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t bg-white dark:bg-neutral-900 transition-[max-height] duration-300 overflow-hidden ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="container py-6">
          <ul className="flex flex-col items-center gap-6 list-none text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={linkCls} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
