// ─────────────────────────────────────────────────────────────
// src/Components/Nav.jsx
//
// CHANGES FROM YOUR VERSION:
//  1. Imported useCart() — reads totalCount for the badge
//     and setIsOpen to open the CartDrawer on icon click.
//  2. ShoppingCart button now shows a red notification badge
//     with the live cart count (white number, red circle).
//  3. CartDrawer is rendered here at the root nav level
//     so it overlays the entire page properly.
//  4. Everything else (logo, links, mobile menu) unchanged.
// ─────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/Cartcontext";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { label: "Home",       to: "/"         },
  { label: "About Us",   to: "/about"    },
  { label: "Products",   to: "/products" },
  { label: "Contact Us", to: "/contact"  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Pull cart count and drawer toggle from global context
  const { totalCount, setIsOpen: setCartOpen } = useCart();

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="fixed z-50 w-full px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center justify-between mx-auto text-black max-w-7xl">

          {/* LOGO */}
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-2xl font-bold text-black hover:text-[#770523] transition-colors">
              FREDALENAS
            </h1>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="items-center hidden gap-8 lg:flex font-display5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-black hover:text-[#EDC483] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE — Cart button */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart — ${totalCount} item${totalCount !== 1 ? "s" : ""}`}
              className="relative p-2 rounded-full hover:bg-[#FBF6EF]
                         transition-colors text-[#770523]"
            >
              {/* Shopping cart icon */}
              <ShoppingCart size={24} />

              {/* Red notification badge — only shown when cart has items */}
              {totalCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
                             bg-red-600 text-white text-[10px] font-bold rounded-full
                             flex items-center justify-center leading-none
                             shadow-md animate-bounce"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {/* Cap display at 99+ to avoid overflow */}
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
            </button>
            {/* Mobile hamburger */}
            <button
              className="text-black lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <ul className="text-[#770523] lg:hidden flex flex-col gap-6
                         mt-6 text-center py-6 border-t border-[#E8DDD0]">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={closeMenu}
                  className="hover:text-[#EDC483] transition-colors duration-200 font-display5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/*
        CartDrawer renders here at the Nav level.
        It uses a fixed overlay so it covers the full viewport.
        isOpen state is controlled via CartContext.
      */}
      <CartDrawer />
    </>
  );
}