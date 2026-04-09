import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { IoBagCheckSharp } from "react-icons/io5";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [cartItems, setCartItems] = useState(0);
  const selector = useSelector((state) => state.cart.totalQuantity);

  // Sync cart items count from Redux store
  useEffect(() => {
    setCartItems(selector);
  }, [selector]);

  // Sync theme with HTML root element
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  // Handle window resize to manage mobile menu state
  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setOpen(false);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-light-surface dark:bg-dark-surface text-md font-semibold border-b border-light-border dark:border-dark-border transition-colors duration-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-light-primary dark:text-dark-primary"
          >
            SHOPPY-GLOBE
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-16">
            <NavLink
              to="/"
              className="text-gray-700 dark:text-dark-text flex gap-1 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              <IoHome className="mt-1" />
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="text-gray-700 dark:text-dark-text flex gap-1 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              <AiFillProduct className="mt-1" />
              Products
            </NavLink>

            <NavLink
              to="/checkout"
              className="text-gray-700 dark:text-dark-text flex gap-1 relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              <IoBagCheckSharp className="mt-1" />
              Checkout
            </NavLink>
          </div>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <NavLink
              to="/cart"
              className="p-2 relative hover:bg-light-border dark:hover:bg-dark-border rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-light-text dark:text-dark-text" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-light-accent dark:bg-dark-accent text-white dark:text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </NavLink>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition-colors"
              aria-label="Toggle menu"
            >
              {open ? (
                <X className="w-6 h-6 text-light-text dark:text-dark-text" />
              ) : (
                <Menu className="w-6 h-6 text-light-text dark:text-dark-text" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          open
            ? "opacity-100 visible backdrop-blur-sm bg-light-text/20 dark:bg-black/40"
            : "opacity-0 invisible backdrop-blur-0"
        }`}
        onClick={() => setOpen(false)}
      >
        {/* MOBILE MENU DRAWER */}
        <div
          className={`absolute top-0 right-0 w-3/4 max-w-xs h-screen bg-light-surface dark:bg-dark-surface shadow-2xl transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header inside drawer to align with main nav height */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-light-border dark:border-dark-border">
            <span className="text-xl font-bold text-light-primary dark:text-dark-primary">
              Menu
            </span>
            <button onClick={() => setOpen(false)} className="p-2">
              <X className="w-6 h-6 text-light-text dark:text-dark-text" />
            </button>
          </div>

          <div className="flex flex-col p-4 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary"
                    : "text-light-text dark:text-dark-text hover:bg-light-border/50 dark:hover:bg-dark-border/50"
                }`
              }
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `p-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary"
                    : "text-light-text dark:text-dark-text hover:bg-light-border/50 dark:hover:bg-dark-border/50"
                }`
              }
              onClick={() => setOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="/checkout"
              className={({ isActive }) =>
                `p-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-light-primary/10 text-light-primary dark:bg-dark-primary/10 dark:text-dark-primary"
                    : "text-light-text dark:text-dark-text hover:bg-light-border/50 dark:hover:bg-dark-border/50"
                }`
              }
              onClick={() => setOpen(false)}
            >
              Checkout
            </NavLink>

            <NavLink
              to="/cart"
              className="flex items-center justify-between p-3 rounded-xl text-light-text dark:text-dark-text hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="font-semibold">My Cart</span>
              {cartItems > 0 && (
                <span className="bg-dark-primary text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
