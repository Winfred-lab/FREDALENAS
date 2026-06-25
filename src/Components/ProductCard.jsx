// ─────────────────────────────────────────────────────────────
// src/Components/ProductCard.jsx
//
// CHANGES FROM YOUR VERSION:
//  1. Removed `onAddToCart` prop — cart is now managed globally
//     via CartContext. ProductCard calls addToCart() directly.
//  2. "Add to Cart" now sends product + selected weight + qty
//     to CartContext so the cart drawer shows the right details.
//  3. Custom order modal calls addCustomOrder() from CartContext.
//  4. Removed unused import of ProductsPage.
//  5. Qty state in the card still controls how many units are
//     added in one "Add to Cart" click — the +/- in the
//     CartDrawer then adjusts individual item quantities.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import CustomOrderModal from "./CustomOrderModal";
import { useCart } from "../context/Cartcontext";

// Badge color map
const badgeBg = {
  Sale: "bg-[#8B1A1A]",
  Hot:  "bg-[#C04A18]",
  New:  "bg-[#C9893A]",
};

// Star rating renderer
function Stars({ count }) {
  return (
    <span className="text-[10px]" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= count ? "#C9893A" : "#D8CCB8" }}>★</span>
      ))}
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addToCart, addCustomOrder } = useCart();

  // Selected weight chip index
  const [selectedWeight, setSelectedWeight] = useState(0);
  // Quantity to add (card-level, before adding to cart)
  const [qty,       setQty]       = useState(1);
  // Wishlist heart toggle
  const [wished,    setWished]    = useState(false);
  // Green "✓ Added!" flash feedback
  const [added,     setAdded]     = useState(false);
  // Custom order modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  // ── ADD TO CART ─────────────────────────────────────────────
  function handleAdd() {
    const weight = product.weights[selectedWeight];
    addToCart(product, weight, qty);   // sends to CartContext
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  // ── CARD QTY CONTROLS ───────────────────────────────────────
  // These control how many items are added IN ONE CLICK.
  // Once in the cart, qty is controlled by CartDrawer's +/-.
  function changeQty(delta) {
    setQty((n) => Math.max(1, Math.min(99, n + delta)));
  }

  // ── WEIGHT CHIP CLICK ───────────────────────────────────────
  function handleWeightClick(weight, index) {
    setSelectedWeight(index);
    if (weight.toLowerCase() === "custom") {
      setModalOpen(true);
    }
  }

  // ── CUSTOM ORDER SUBMITTED ──────────────────────────────────
  function handleOrderSubmit(orderData) {
    addCustomOrder(product, orderData);   // adds to cart as custom item
    setTimeout(() => setModalOpen(false), 3000);
  }

  return (
    <>
      <article
        className="bg-white border border-[#E8DDD0] rounded-lg overflow-hidden
                   transition-all duration-200 hover:-translate-y-1
                   hover:shadow-[0_8px_24px_rgba(139,26,26,0.12)]"
        aria-label={product.name}
      >
        {/* ── IMAGE ────────────────────────────────────────────── */}
        <div className="relative w-full h-48 overflow-hidden">

          {/* Badge */}
          {product.badge && (
            <div className="absolute z-10 flex gap-1 top-2 left-2">
              <span className={`${badgeBg[product.badge]} text-white text-[8px]
                                font-bold px-2 py-0.5 rounded-sm tracking-widest uppercase`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={() => setWished((w) => !w)}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute z-10 flex items-center justify-center text-sm transition-colors rounded-full top-2 right-2 w-7 h-7 bg-white/90"
            style={{ color: wished ? "#8B1A1A" : "#7A7A7A" }}
          >
            {wished ? "♥" : "♡"}
          </button>

          {/* Product photo */}
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* ── BODY ─────────────────────────────────────────────── */}
        <div className="p-3.5">

          {/* Tag + rating */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] tracking-widest uppercase text-[#C9893A]">
              {product.tag}
            </span>
            <div className="flex items-center gap-1">
              <Stars count={product.stars} />
              <span className="text-[9px] text-[#7A7A7A]">{product.rating}</span>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-[13px] font-bold text-[#1A1A1A] mb-1 leading-snug">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-[10px] text-[#7A7A7A] leading-relaxed mb-2.5">
            {product.desc}
          </p>

          {/* Weight chips */}
          <div className="flex gap-1.5 flex-wrap mb-2.5" role="group" aria-label="Select size">
            {product.weights.map((w, i) => {
              const isCustom   = w.toLowerCase() === "custom";
              const isSelected = selectedWeight === i;
              return (
                <button
                  key={i}
                  onClick={() => handleWeightClick(w, i)}
                  aria-pressed={isSelected}
                  aria-haspopup={isCustom ? "dialog" : undefined}
                  className={`px-2.5 py-0.5 text-[9px] rounded-full border transition-all duration-150
                    ${isCustom
                      ? isSelected
                        ? "bg-[#C9893A] text-white border-[#C9893A] font-bold"
                        : "bg-white text-[#C9893A] border-[#C9893A] font-bold hover:bg-[#C9893A] hover:text-white"
                      : isSelected
                        ? "bg-[#8B1A1A] text-white border-[#8B1A1A]"
                        : "border-[#E8DDD0] text-[#4A4A4A] hover:border-[#8B1A1A]"
                    }`}
                >
                  {isCustom ? `✏ ${w}` : w}
                </button>
              );
            })}
          </div>

          {/* Prices */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-[#7A7A7A] line-through">{product.oldPrice}</span>
            <span className="text-base font-bold text-[#8B1A1A]">{product.newPrice}</span>
          </div>

          {/* Custom price note */}
          {product.weights.some((w) => w.toLowerCase() === "custom") && (
            <p className="text-[9px] text-[#C9893A] mb-1 italic">
              ✏ Custom price quoted within 24hrs
            </p>
          )}

          {/* Qty + Add to Cart */}
          <div className="flex items-center gap-2 mt-2.5">

            {/* − qty + (card level — controls how many added at once) */}
            <div className="flex items-center border border-[#E8DDD0] rounded
                            overflow-hidden flex-shrink-0">
              <button
                onClick={() => changeQty(-1)}
                aria-label="Decrease quantity"
                className="w-7 h-7 bg-[#FBF6EF] text-[#4A4A4A] text-sm flex items-center
                           justify-center hover:bg-[#F5E9D0] transition-colors font-bold"
              >
                −
              </button>
              <span
                className="w-7 text-center text-xs font-bold text-[#1A1A1A]"
                aria-live="polite"
              >
                {qty}
              </span>
              <button
                onClick={() => changeQty(1)}
                aria-label="Increase quantity"
                className="w-7 h-7 bg-[#FBF6EF] text-[#4A4A4A] text-sm flex items-center
                           justify-center hover:bg-[#F5E9D0] transition-colors font-bold"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              className={`flex-1 py-2 text-[10px] font-bold tracking-widest uppercase
                          rounded text-white transition-colors duration-200
                          ${added
                            ? "bg-[#2A7A2A]"
                            : "bg-[#8B1A1A] hover:bg-[#6B1212]"
                          }`}
            >
              {added ? "✓ Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </article>

      {/* Custom order modal */}
      {modalOpen && (
        <CustomOrderModal
          product={product}
          onClose={() => {
            setModalOpen(false);
            setSelectedWeight(0);
          }}
          onSubmit={handleOrderSubmit}
        />
      )}
    </>
  );
}