import { useState } from "react";
import { illustrations } from "../data/illustrations";
import ProductsPage from "../Pages/Productspage";

// Badge colour map → Tailwind bg class
const badgeBg = {
  Sale: "bg-[#8B1A1A]",
  Hot:  "bg-[#C04A18]",
  New:  "bg-[#C9893A]",
};

// Renders filled / unfilled stars
function Stars({ count }) {
  return (
    <span className="text-[10px]" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= count ? "#C9893A" : "#D8CCB8" }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ProductCard({ product, onAddToCart }) {
  // Which weight chip is selected (index)
  const [selectedWeight, setSelectedWeight] = useState(0);
  // Quantity counter
  const [qty, setQty] = useState(1);
  // Wishlist toggle
  const [wished, setWished] = useState(false);
  // Add to Cart feedback
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    onAddToCart();
    setTimeout(() => setAdded(false), 1800);
  }

  function changeQty(delta) {
    setQty((n) => Math.max(1, Math.min(99, n + delta)));
  }

  // Pick the right SVG for this product's category
  const art = illustrations[product.category] ?? illustrations["cakes"];

  return (
    // Card wrapper
    <article
      className="bg-white border border-[#E8DDD0] rounded-lg overflow-hidden
                 transition-all duration-200 hover:-translate-y-1
                 hover:shadow-[0_8px_24px_rgba(139,26,26,0.12)]"
      aria-label={product.name}
    >
      {/* ── IMAGE AREA ───────────────────────────────────────── */}
      <div
        className="relative flex items-center justify-center w-full h-auto"
        style={{ background: product.imgBg }}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute z-10 flex gap-1 top-2 left-2">
            <span
              className={`${badgeBg[product.badge]} text-white text-[8px]
                          font-bold px-2 py-0.5 rounded-sm tracking-widest uppercase`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist heart */}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute z-10 flex items-center justify-center text-sm transition-colors rounded-full top-2 right-2 w-7 h-7 bg-white/90"
          style={{ color: wished ? "#8B1A1A" : "#7A7A7A" }}
        >
          {wished ? "♥" : "♡"}
        </button>

        {/* SVG illustration */}
        {art}
      </div>

      {/* ── CARD BODY ────────────────────────────────────────── */}
      <div className="p-3.5">

        {/* Tag + Rating row */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] tracking-widest uppercase text-[#C9893A]">
            {product.tag}
          </span>
          <div className="flex items-center gap-1">
            <Stars count={product.stars} />
            <span className="text-[9px] text-[#7A7A7A]">{product.rating}</span>
          </div>
        </div>

        {/* Product name */}
        <h3 className="text-[13px] font-bold text-[#1A1A1A] mb-1 leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[10px] text-[#7A7A7A] leading-relaxed mb-2.5">
          {product.desc}
        </p>

        {/* Weight chips */}
        <div className="flex gap-1.5 flex-wrap mb-2.5" role="group" aria-label="Select size">
          {product.weights.map((w, i) => (
            <button
              key={i}
              onClick={() => setSelectedWeight(i)}
              aria-pressed={selectedWeight === i}
              className={`px-2.5 py-0.5 text-[9px] rounded-full border transition-colors
                ${selectedWeight === i
                  ? "bg-[#8B1A1A] text-white border-[#8B1A1A]"
                  : "border-[#E8DDD0] text-[#4A4A4A] hover:border-[#8B1A1A]"
                }`}
            >
              {w}
            </button>
          ))}
        </div>

        {/* Prices */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] text-[#7A7A7A] line-through">
            {product.oldPrice}
          </span>
          <span className="text-base font-bold text-[#8B1A1A]">
            {product.newPrice}
          </span>
        </div>

        {/* Sales count */}
        <p className="text-[9px] text-[#7A7A7A] mb-2.5">
          🛒 {product.sales} Sales
        </p>

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-2">

          {/* − qty + */}
          <div className="flex items-center border border-[#E8DDD0] rounded overflow-hidden flex-shrink-0">
            <button
              onClick={() => changeQty(-1)}
              aria-label="Decrease quantity"
              className="w-7 h-7 bg-[#FBF6EF] text-[#4A4A4A] text-sm
                         flex items-center justify-center hover:bg-[#F5E9D0] transition-colors"
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
              className="w-7 h-7 bg-[#FBF6EF] text-[#4A4A4A] text-sm
                         flex items-center justify-center hover:bg-[#F5E9D0] transition-colors"
            >
              +
            </button>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`flex-1 py-2 text-[10px] font-bold tracking-widest uppercase
                        rounded text-white transition-colors duration-200
                        ${added ? "bg-[#2A7A2A]" : "bg-[#8B1A1A] hover:bg-[#6B1212]"}`}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
