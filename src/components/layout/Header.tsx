import { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '@/store/useCart';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useFavorites, selectFavItemsMap } from '@/store/useFavorites';

export default function Header() {
  const cart = useCart();
  const favMap = useFavorites(selectFavItemsMap);
  const favCount = useMemo(() => Object.keys(favMap).length, [favMap]);
  const [open, setOpen] = useState(false);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black';

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 border-b bg-white shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between py-3">
            <div className="text-lg font-semibold">
              <Link to="/" onClick={() => setOpen(false)}>
                Store
              </Link>
            </div>

            <nav className="hidden md:block">
              <ul className="flex gap-6">
                <li>
                  <NavLink to="/" className={linkCls}>
                    Mainpage
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/shop" className={linkCls}>
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/history" className={linkCls}>
                    Our history
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/items" className={linkCls}>
                    All items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={linkCls}>
                    About us
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/favorites" className="relative" aria-label="Open favorites">
                <HeartIcon className="w-6 h-6 text-gray-700 hover:text-black" />
                {favCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1 rounded">
                    {favCount}
                  </span>
                )}
              </Link>

              <button onClick={cart.toggle} className="relative" aria-label="Open cart">
                <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:text-black" />
                {cart.count > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-black text-white px-1 rounded">
                    {cart.count}
                  </span>
                )}
              </button>

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

        <div
          id="mobile-menu"
          className={`md:hidden border-t bg-white transition-[max-height] duration-300 overflow-hidden ${
            open ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="container py-3">
            <ul className="flex flex-col gap-3">
              <li>
                <NavLink to="/" className={linkCls} onClick={() => setOpen(false)}>
                  Mainpage
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={linkCls} onClick={() => setOpen(false)}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/history" className={linkCls} onClick={() => setOpen(false)}>
                  Our history
                </NavLink>
              </li>
              <li>
                <NavLink to="/items" className={linkCls} onClick={() => setOpen(false)}>
                  All items
                </NavLink>
              </li>
              <li>
                <NavLink to="/favorites" className={linkCls} onClick={() => setOpen(false)}>
                  Favorites
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
