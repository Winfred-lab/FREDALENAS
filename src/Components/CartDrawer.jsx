// ─────────────────────────────────────────────────────────────
// src/Components/CartDrawer.jsx
//
// Slide-in cart panel that opens when the ShoppingCart icon
// in the Navbar is clicked.
//
// FEATURES:
//  • Lists every cart item with image, name, weight, unit price
//  • +/- quantity buttons that update total price live
//  • Remove (✕) button per item
//  • Custom orders shown with "Price TBD" badge
//  • Running subtotal at the bottom
//  • Checkout button
//  • Empty state with a friendly illustration
//  • Closes on Escape key or backdrop click
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import { useCart } from "../context/Cartcontext";

// Format number as ₦14,500
function formatPrice(n) {
  return "₦" + n.toLocaleString("en-NG");
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQty,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart();

  const drawerRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    // Full-screen overlay
    <div
      className="fixed inset-0 z-[998] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel — slides in from the right */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="relative z-10 flex flex-col w-full max-w-md
                   bg-white shadow-2xl outline-none
                   animate-[slideInRight_0.3s_ease]"
        style={{ animation: "slideInRight 0.28s cubic-bezier(.4,0,.2,1)" }}
      >
        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5
                        border-b border-[#E8DDD0] bg-white sticky top-0 z-10">
          <div>
            <h2 className="font-display3 text-xl font-bold text-[#1A1A1A]">
              Your Cart
            </h2>
            <p className="text-xs text-[#7A7A7A] mt-0.5">
              {totalCount === 0
                ? "No items yet"
                : `${totalCount} item${totalCount !== 1 ? "s" : ""}`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Clear all — only show when cart has items */}
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[11px] text-[#7A7A7A] hover:text-[#8B1A1A]
                           transition-colors underline underline-offset-2"
              >
                Clear all
              </button>
            )}
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close cart"
              className="w-8 h-8 rounded-full bg-[#FBF6EF] flex items-center
                         justify-center text-[#8B1A1A] hover:bg-[#F5E9D0]
                         transition-colors text-base font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── BODY ───────────────────────────────────────────── */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">

          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="mb-4 text-6xl">🛒</div>
              <p className="font-display3 text-lg font-bold text-[#1A1A1A] mb-2">
                Your cart is empty
              </p>
              <p className="text-xs text-[#7A7A7A] max-w-[220px] leading-relaxed">
                Add some delicious Fredalenas snacks to get started!
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 bg-[#8B1A1A] text-white text-xs font-bold
                           tracking-widest uppercase px-6 py-2.5 rounded
                           hover:bg-[#6B1212] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Cart items list */
            <ul className="flex flex-col gap-4" role="list">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex gap-3 bg-[#FEFCF9] border border-[#E8DDD0]
                             rounded-xl p-3 relative"
                >
                  {/* Product image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden
                                  flex-shrink-0 bg-[#F5E9D0]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-2xl">🍰</div>
                    )}
                  </div>

                  {/* Item details */}
                  <div className="flex-1 min-w-0">
                    {/* Name + remove button */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-xs font-bold text-[#1A1A1A] leading-snug">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 w-5 h-5 rounded-full bg-[#F5E9D0]
                                   flex items-center justify-center text-[#8B1A1A]
                                   hover:bg-[#8B1A1A] hover:text-white
                                   transition-colors text-[10px] font-bold"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Weight tag */}
                    <span className="inline-block text-[9px] tracking-widest
                                     uppercase text-[#C9893A] mb-2">
                      {item.weight}
                    </span>

                    {/* Custom order badge */}
                    {item.isCustom && (
                      <div className="inline-flex items-center gap-1 bg-[#FBF6EF]
                                      border border-[#C9893A] rounded px-2 py-0.5
                                      mb-2 ml-2">
                        <span className="text-[9px] text-[#C9893A] font-bold">
                          ✏ Custom — Price TBD
                        </span>
                      </div>
                    )}

                    {/* Price + quantity controls */}
                    <div className="flex items-center justify-between">
                      {/* Unit price × qty */}
                      <div>
                        {item.isCustom ? (
                          <span className="text-xs font-bold text-[#C9893A]">
                            Price quoted within 24hrs
                          </span>
                        ) : (
                          <div className="flex flex-col">
                            <span className="text-[10px] text-[#7A7A7A]">
                              {formatPrice(item.price)} × {item.qty}
                            </span>
                            <span className="text-sm font-bold text-[#8B1A1A]">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* − qty + controls */}
                      {!item.isCustom && (
                        <div className="flex items-center border border-[#E8DDD0]
                                        rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(item.key, -1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 bg-[#FBF6EF] flex items-center
                                       justify-center text-[#4A4A4A] text-base
                                       hover:bg-[#F5E9D0] transition-colors
                                       font-bold"
                          >
                            −
                          </button>
                          <span
                            className="w-8 text-center text-xs font-bold
                                       text-[#1A1A1A]"
                            aria-live="polite"
                          >
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.key, +1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 bg-[#FBF6EF] flex items-center
                                       justify-center text-[#4A4A4A] text-base
                                       hover:bg-[#F5E9D0] transition-colors
                                       font-bold"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── FOOTER — sticky at bottom ──────────────────────── */}
        {items.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-[#E8DDD0]
                          px-6 py-5">

            {/* Custom order note if any */}
            {items.some((i) => i.isCustom) && (
              <p className="text-[10px] text-[#C9893A] mb-3 leading-relaxed
                            bg-[#FBF6EF] rounded-lg px-3 py-2 border border-[#E8DDD0]">
                ✏ Custom order prices will be quoted within 24 hours.
                We'll contact you via the details you provided.
              </p>
            )}

            {/* Order summary */}
            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex justify-between text-xs text-[#4A4A4A]">
                <span>Subtotal ({totalCount} items)</span>
                <span className="font-semibold">
                  {totalPrice > 0 ? formatPrice(totalPrice) : "—"}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#7A7A7A]">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-[#E8DDD0] pt-2 mt-1 flex justify-between">
                <span className="text-sm font-bold text-[#1A1A1A]">Total</span>
                <span className="text-base font-bold text-[#8B1A1A]">
                  {totalPrice > 0 ? formatPrice(totalPrice) : "TBD"}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              className="w-full bg-[#8B1A1A] text-white font-bold tracking-widest
                         uppercase text-sm py-4 rounded-xl hover:bg-[#6B1212]
                         transition-colors shimmer-btn flex items-center
                         justify-center gap-2"
              onClick={() => alert("Proceeding to checkout…\n\nWire this to your payment gateway (Paystack, Flutterwave, etc.)")}
            >
              🛒 Proceed to Checkout
            </button>

            <p className="text-center text-[10px] text-[#7A7A7A] mt-3">
              🔒 Secure checkout · Free delivery on orders above ₦10,000
            </p>
          </div>
        )}
      </div>

      {/* Slide-in keyframe — injected inline since Tailwind v4 supports arbitrary animations */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}