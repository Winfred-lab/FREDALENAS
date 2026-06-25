// ─────────────────────────────────────────────────────────────
// src/Pages/Productspage.jsx
//
// CHANGE FROM YOUR VERSION:
//   Removed `cartCount` state and `handleAddToCart` function.
//   ProductCard now uses useCart() directly — no prop drilling.
//   The cart count badge is managed globally in CartContext
//   and displayed in Nav.jsx on the ShoppingCart icon.
//
//   Everything else (filters, sidebar, ticker, layout) unchanged.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import ProductCard from "../Components/ProductCard";
import Sidebar from "../Components/Sidebar";
import { products, filterTabs } from "../data/products";

// Inline Ticker component
const tickerItems = [
  "Event Snack Catering", "Crispy Chin Chin", "Celebration Cakes",
  "Premium Baked Peanut", "Wholesale Orders", "Baked Meatpie",
];

function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="bg-[#EDC483] py-2.5 overflow-hidden whitespace-nowrap" aria-hidden="true">
      <div className="inline-block animate-scroll-left">
        {doubled.map((item, i) => (
          <span key={i} className="inline-block text-[#6B1A2A] text-[10px] tracking-[0.22em] uppercase px-5">
            <span className="text-[#6B1A2A] mr-2">✦</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sidebarOpen,  setSidebarOpen]  = useState(false);
  const [sortBy,       setSortBy]       = useState("popular");

  const filteredProducts = useMemo(() => {
    let list = activeFilter === "all"
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

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] font-display5 pt-18">

      {/* Hero band */}
      <section className="relative bg-[#770523] text-center px-5 py-12 md:py-16 overflow-hidden">
        <span className="block text-[10px] tracking-[0.35em] uppercase text-[#E8C97A] mb-3">
          — Our Products —
        </span>
        <h1 className="mb-3 text-3xl font-bold leading-snug text-white font-display3 md:text-4xl">
          Best Seller <em className="not-italic text-[#E8C97A]">Products</em>
        </h1>
        <p className="max-w-sm mx-auto text-xs leading-relaxed text-white/70">
          Handcrafted fresh every single day. Every bite tells a story of quality and care.
        </p>
      </section>

      <Ticker />

      {/* Filter bar */}
      <div className="bg-[#FBF6EF] border-b border-[#E8DDD0] px-5 py-3 md:px-8
                      flex flex-wrap items-center gap-3">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          aria-expanded={sidebarOpen}
          className="md:hidden flex items-center gap-1.5 text-[11px] font-bold
                     text-[#8B1A1A] border border-[#E8DDD0] bg-white px-3 py-1.5 rounded"
        >
          ☰ Filters
        </button>

        <div className="flex flex-wrap gap-1.5 flex-1" role="tablist">
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
                            : "bg-white text-[#4A4A4A] border-[#E8DDD0] hover:bg-[#8B1A1A] hover:text-white"
                          }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* <span className="text-[11px] text-[#7A7A7A] whitespace-nowrap">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </span> */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
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

      {/* Main body */}
      <div className="flex min-h-[500px]">

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed top-0 bottom-0 left-0 z-50 w-64 overflow-y-auto shadow-2xl md:hidden" role="dialog" aria-modal="true">
              <div className="flex justify-end p-3 bg-white border-b border-[#E8DDD0]">
                <button onClick={() => setSidebarOpen(false)}
                        className="text-[#8B1A1A] font-bold text-sm">
                  ✕ Close
                </button>
              </div>
              <Sidebar activeFilter={activeFilter} onFilter={handleFilter} />
            </div>
          </>
        )}

        {/* Desktop sidebar */}
        <div className="hidden md:block w-[220px] shrink-0">
          <Sidebar activeFilter={activeFilter} onFilter={handleFilter} />
        </div>

        {/* Products grid */}
        <main className="flex-1 bg-[#FBF6EF] p-4 md:p-6" role="main">


          <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9893A] mb-1">
                Best Seller
              </p>
              <h2 className="font-display3 text-xl md:text-2xl font-bold text-[#8B1A1A]">
                Our Best Seller Products
              </h2>
            </div>
            {/* <button className="bg-[#8B1A1A] text-white text-[10px] font-bold
                               tracking-widest uppercase px-4 py-2 rounded-sm
                               hover:bg-[#6B1212] transition-colors">
              View All Products →
            </button> */}
          </div>

          {/* Grid — no onAddToCart prop needed */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
              {filteredProducts.map((product) => (
                <div key={product.id} role="listitem">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="mb-4 text-4xl">🍽️</p>
              <p className="font-display3 text-xl text-[#8B1A1A] mb-2">No products found</p>
              <p className="text-xs text-[#7A7A7A] mb-5">Try a different category above.</p>
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

      {/* Newsletter */}
      <section className="bg-white border-t border-[#E8DDD0] px-5 py-14 text-center">
        <span className="block text-[10px] tracking-[0.35em] uppercase text-[#C9893A] mb-3">
          Our Newsletter
        </span>
        <h2 className="font-display3 text-2xl font-bold text-[#8B1A1A] mb-2">
          Subscribe to Get Updates<br />on Our Latest Offers
        </h2>
        <p className="text-xs text-[#7A7A7A] mb-5">
          Get 20% off your first order just by subscribing.
        </p>
        <div className="flex max-w-sm mx-auto">
          <input type="email" placeholder="Your Email"
                 className="flex-1 px-4 py-2.5 border border-r-0 border-[#E8DDD0]
                            bg-[#FBF6EF] text-xs rounded-l outline-none" />
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