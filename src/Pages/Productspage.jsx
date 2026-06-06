// ─────────────────────────────────────────────────────────────
// src/Pages/Productspage.jsx
//
// FIXES APPLIED:
//  1. Removed the duplicate <nav> block — Nav.jsx already
//     renders the navbar via App.jsx. Two navbars = white gap.
//  2. Removed the duplicate <footer> — Footer renders in App.jsx.
//  3. Added the Ticker directly inside this file as a small
//     component — no separate Ticker.jsx needed.
//  4. Fixed the missing Ticker import that caused a crash
//     (blank white screen = JS crash from missing component).
//  5. Added pt-20 to the top to account for the fixed navbar
//     height so content isn't hidden behind it.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import ProductCard from "../Components/ProductCard";
import Sidebar from "../Components/Sidebar";
import { products, filterTabs } from "../data/products";

import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../Components/AnimatedSection';


// ── MAIN PAGE ────────────────────────────────────────────────
export default function ProductsPage() {

  const [activeFilter, setActiveFilter] = useState("all");
  const [cartCount,    setCartCount]    = useState(0);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [sortBy,       setSortBy]       = useState("popular");

  // Filter + sort products
  const filteredProducts = useMemo(() => {
    let list =
      activeFilter === "all"
        ? products
        : products.filter((p) => p.category === activeFilter);

    if (sortBy === "most-sales")  list = [...list].sort((a, b) => b.sales - a.sales);
    if (sortBy === "least-sales") list = [...list].sort((a, b) => a.sales - b.sales);
    if (sortBy === "top-rated")   list = [...list].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

    return list;
  }, [activeFilter, sortBy]);

  function handleFilter(value) {
    setActiveFilter(value);
    setSidebarOpen(false);
  }

  function handleAddToCart() {
    setCartCount((n) => n + 1);
  }

  return (
    /*
      pt-20 → pushes content below the fixed navbar (Nav.jsx is position:fixed).
      Without this, the hero section would hide behind the navbar.
    */
    <div className=" text-[#1A1A1A] font-display5 pt-20   bg-[#770523]">
      
      {/* ── HERO BAND ──────────────────────────────────────── */}
      <section className="relative px-5 py-12 mx-auto overflow-hidden text-center md:py-16 max-w-7xl">
        

        <span className="block text-[10px] tracking-[0.35em] uppercase text-[#E8C97A] mb-3">
          — Our Products —
        </span>
        <h1 className="mb-3 text-3xl font-bold leading-snug text-white font-display3 md:text-4xl">
          Best Seller <em className="not-italic text-[#E8C97A]">Products</em>
        </h1>
        <p className="max-w-sm mx-auto text-xs leading-relaxed text-white/70">
          Handcrafted fresh every single day. From celebration cakes to crispy
          chin-chin — every bite tells a story of quality and care.
        </p>
      </section>

      {/* ── TICKER STRIP ───────────────────────────────────── */}
      <div className='bg-[#EDC483]'>
      <div className='py-4 text-[#6B1A2A] max-w-7xl mx-auto overflow-x-hidden text-[0.72rem]'>
                <motion.div
                  className='flex w-max whitespace-nowrap'
                  animate={{ x: [0, '-50%'] }}
                  transition={{
                    ease: 'linear',
                    duration: 20,
                    repeat: Infinity,
                  }}
                >
                  <div className='flex gap-9 tracking-[2px]'>
                    <p>✦ CELEBRATION CAKES</p>
                    <p>✦ CRISPY CHIN CHIN</p>
                    <p>✦ WHOLESALE ORDERS</p>
                    <p>✦ PREMIUM BAKED PEANUT</p>
                    <p>✦ BAKED MEATPIE</p>
                    <p className='mr-6'>EVENT SNACK CATERING</p>
                  </div>
                  <div className='flex gap-8 tracking-[2px]'>
                    <p>✦ CELEBRATION CAKES</p>
                    <p>✦ CRISPY CHIN CHIN</p>
                    <p>✦ WHOLESALE ORDERS</p>
                    <p>✦ PREMIUM BAKED PEANUT</p>
                    <p>✦ BAKED MEATPIE</p>
                    <p>✦ EVENT SNACK CATERING</p>
                  </div>
                </motion.div>
      </div>          
      </div>

      {/* ── FILTER BAR ─────────────────────────────────────── */}
      <div className="bg-[#FBF6EF] border-b border-[#E8DDD0] px-5 py-3 md:px-8 flex flex-wrap items-center gap-3 max-w-7xl mx-auto">

        {/* Mobile only: open sidebar drawer */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          aria-expanded={sidebarOpen}
          className="md:hidden flex items-center gap-1.5 text-[11px] font-bold
                     text-[#8B1A1A] border border-[#E8DDD0] bg-white px-3 py-1.5 rounded cursor-pointer"
        >
          ☰ Filters
        </button>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-1.5 flex-1" role="tablist" aria-label="Filter by category">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeFilter === tab.value}
              onClick={() => handleFilter(tab.value)}
              className={`px-4 py-1.5 text-[11px] font-semibold tracking-wide rounded-sm border
                          transition-all duration-150 cursor-pointer
                          ${activeFilter === tab.value
                            ? "bg-[#8B1A1A] text-white border-[#8B1A1A]"
                            : "bg-white text-[#4A4A4A] border-[#E8DDD0] hover:bg-[#8B1A1A] hover:text-white hover:border-[#8B1A1A]"
                          }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Count + Sort */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[11px] text-[#7A7A7A] whitespace-nowrap">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
            className="text-[11px] border border-[#E8DDD0] bg-white text-[#4A4A4A]
                       rounded px-2 py-1.5 cursor-pointer outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="most-sales">Most Sales</option>
            <option value="least-sales">Least Sales</option>
            <option value="top-rated">Top Rated</option>
          </select>
        </div>
      </div>

      {/* ── MAIN BODY: SIDEBAR + PRODUCTS ──────────────────── */}
      <div className="flex min-h-[600px] max-w-7xl mx-auto">

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <>
            {/* Dark backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <div
              className="fixed top-0 bottom-0 left-0 z-50 w-64 overflow-y-auto shadow-2xl md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
            >
              <div className="flex justify-end p-3 bg-white border-b border-[#E8DDD0]">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-[#8B1A1A] font-bold text-sm"
                  aria-label="Close filters"
                >
                  ✕ Close
                </button>
              </div>
              <Sidebar activeFilter={activeFilter} onFilter={handleFilter} />
            </div>
          </>
        )}

        {/* Desktop sidebar — hidden on mobile */}
        <div className="hidden md:block w-[220px] shrink-0">
          <Sidebar activeFilter={activeFilter} onFilter={handleFilter} />
        </div>

        {/* Products area */}
        <main className="flex-1 bg-[#FBF6EF] p-4 md:p-6" role="main">

          {/* Promo banner */}
          <div className="flex flex-wrap items-center justify-between gap-3
                          bg-[#F5E9D0] border border-dashed border-[#C9893A]
                          rounded-lg px-5 py-4 mb-5">
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#C9893A] mb-1">
                Limited Offer
              </p>
              <p className="font-display3 text-base font-bold text-[#8B1A1A]">
                Get 20% off your first order!
              </p>
            </div>
            <p className="text-[11px] text-[#4A4A4A]">
              Use code: <strong className="text-[#8B1A1A]">FREDA20</strong>
            </p>
            <button className="bg-[#8B1A1A] text-white text-[11px] font-bold
                               tracking-widest px-4 py-2 rounded-sm cursor-pointer
                               hover:bg-[#6B1212] transition-colors shimmer-btn">
              Claim Offer
            </button>
          </div>

          {/* Section header */}
          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9893A] mb-1">
                Best Seller
              </p>
              <h2 className="font-display3 text-xl md:text-2xl font-bold text-[#8B1A1A]">
                Our Best Seller Products
              </h2>
            </div>
            <button className="bg-[#8B1A1A] text-white text-[10px] font-bold
                               tracking-widest uppercase px-4 py-2 rounded-sm
                               hover:bg-[#6B1212] transition-colors">
              View All Products →
            </button>
          </div>

          {/* Product grid or empty state */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
              {filteredProducts.map((product) => (
                <div key={product.id} role="listitem">
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center" role="alert">
              <p className="mb-4 text-4xl">🍽️</p>
              <p className="font-display3 text-xl text-[#8B1A1A] mb-2">No products found</p>
              <p className="text-xs text-[#7A7A7A] mb-5">Try selecting a different category above.</p>
              <button
                onClick={() => handleFilter("all")}
                className="bg-[#8B1A1A] text-white text-[11px] font-bold
                           tracking-widest uppercase px-6 py-2.5 rounded-sm
                           hover:bg-[#6B1212] transition-colors"
              >
                Show All Products
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── NEWSLETTER ─────────────────────────────────────── */}
      <section className="bg-white border-t border-[#E8DDD0] px-5 py-14 text-center">
        <span className="block text-[10px] tracking-[0.35em] uppercase text-[#C9893A] mb-3">
          Our Newsletter
        </span>
        <h2 className="font-display3 text-2xl font-bold text-[#8B1A1A] mb-2">
          Subscribe to Get Updates<br />on Our Latest Offers
        </h2>
        <p className="text-xs text-[#7A7A7A] mb-5">
          Get 20% off your first order just by subscribing to our newsletter.
        </p>
        <div className="flex max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Your Email"
            className="flex-1 px-4 py-2.5 border border-r-0 border-[#E8DDD0]
                       bg-[#FBF6EF] text-xs rounded-l outline-none"
          />
          <button className="bg-[#8B1A1A] text-white text-[11px] font-bold
                             tracking-widest px-5 py-2.5 rounded-r
                             hover:bg-[#6B1212] transition-colors">
            Subscribe
          </button>
        </div>
      </section>

    </div>
  );
}