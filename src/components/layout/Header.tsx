import { Link, NavLink } from 'react-router-dom';
import { useCart } from '@/store/useCart';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const cart = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 border-b bg-white shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between py-3">
            <div className="text-lg font-semibold">
              <Link to="/">Store</Link>
            </div>

            <nav className="hidden md:block">
              <ul className="flex gap-6">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                    }
                  >
                    Mainpage
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                      isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                    }
                  >
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/history"
                    className={({ isActive }) =>
                      isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                    }
                  >
                    Our history
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/items"
                    className={({ isActive }) =>
                      isActive ? 'text-black font-medium' : 'text-gray-600 hover:text-black'
                    }
                  >
                    All items
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <button onClick={cart.toggle} className="relative" aria-label="Open cart">
                <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:text-black" />
                {cart.count > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-black text-white px-1 rounded">
                    {cart.count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
