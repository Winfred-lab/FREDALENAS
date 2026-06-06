// ─────────────────────────────────────────────────────────────
// src/Components/Nav.jsx
//
// FIX APPLIED:
//   The "Product" nav link now points to "/products" — this
//   exactly matches the Route path="/products" in App.jsx.
//
//   Before: to: "/product"  → no matching route → blank page
//   After:  to: "/products" → matches Route → ProductsPage loads
//
//   Everything else is unchanged from your original Nav.jsx.
// ─────────────────────────────────────────────────────────────

import React from 'react';
import { useState } from 'react';
import MainLogo from '../assets/logo.png';
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: 'Home',       to: '/'          },
  { label: 'About Us',   to: '/about'     },
  { label: 'Products',   to: '/products'  }, // ← FIXED: was "/product", now "/products"
  { label: 'Contact Us', to: '/contact'   },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed z-50 w-full px-6 py-5 bg-white">

      <div className="flex items-center justify-between mx-auto text-black max-w-7xl">

        {/* LOGO */}
        <Link to="/" onClick={closeMenu}>
          <h1 className="text-2xl font-bold text-black hover:text-[#770523] transition-colors">
            FREDALENAS
          </h1>
        </Link>

        {/* DESKTOP MENU */}
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

        {/* ORDER BUTTON */}
        <button className="shadow-xl shimmer-btn hidden md:block bg-[#770523] text-white py-2 px-5 rounded font-display5">
          Order now
        </button>

        {/* MOBILE HAMBURGER */}
        <button
          className="text-black lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <ul className="text-[#770523] lg:hidden flex flex-col gap-6 mt-6 text-center py-6">
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
  );
}