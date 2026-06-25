// ─────────────────────────────────────────────────────────────
// src/context/CartContext.jsx
//
// WHAT IS THIS FILE?
// A React Context that holds the cart state globally.
// This means Nav.jsx, ProductCard.jsx, and CartDrawer.jsx
// all share the SAME cart data without prop drilling.
//
// HOW IT WORKS:
// 1. Wrap your entire app in <CartProvider> (done in main.jsx or App.jsx)
// 2. Any component can call useCart() to read or update the cart
//
// CART ITEM STRUCTURE:
// {
//   id:        number   — unique product id
//   name:      string   — product name
//   price:     number   — unit price in Naira (parsed from newPrice)
//   image:     string   — image URL
//   qty:       number   — quantity (starts at 1, changed by +/-)
//   weight:    string   — selected weight/size
//   isCustom:  boolean  — true if it came from the custom order modal
//   orderData: object   — only set for custom orders
// }
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

// Helper: parse "₦14,500" → 14500
function parsePrice(priceStr) {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10) || 0;
}

export function CartProvider({ children }) {
  // Array of cart items
  const [items, setItems] = useState([]);
  // Controls cart drawer visibility
  const [isOpen, setIsOpen] = useState(false);

  // ── ADD TO CART ─────────────────────────────────────────────
  // Called from ProductCard "Add to Cart" button.
  // If the same product+weight already exists, increment qty.
  const addToCart = useCallback((product, weight, qty = 1) => {
    const key = `${product.id}-${weight}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          key,
          id:       product.id,
          name:     product.name,
          price:    parsePrice(product.newPrice),
          image:    product.image,
          qty,
          weight,
          isCustom: false,
        },
      ];
    });
  }, []);

  // ── ADD CUSTOM ORDER ────────────────────────────────────────
  // Called from CustomOrderModal "Place Order" button.
  const addCustomOrder = useCallback((product, orderData) => {
    const key = `custom-${product.id}-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        key,
        id:        product.id,
        name:      `${product.name} (Custom)`,
        price:     0,           // Custom price TBD — shown as "TBD"
        image:     product.image,
        qty:       1,
        weight:    "Custom",
        isCustom:  true,
        orderData,              // full order details for reference
      },
    ]);
  }, []);

  // ── UPDATE QUANTITY ─────────────────────────────────────────
  // Called by the +/- buttons inside the CartDrawer.
  // If qty drops to 0, the item is removed automatically.
  const updateQty = useCallback((key, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  // ── REMOVE ITEM ─────────────────────────────────────────────
  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  // ── CLEAR CART ──────────────────────────────────────────────
  const clearCart = useCallback(() => setItems([]), []);

  // ── COMPUTED VALUES ─────────────────────────────────────────
  // Total number of items (sum of all quantities) — shown on badge
  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

  // Total price — custom orders count as 0 until quoted
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addToCart,
        addCustomOrder,
        updateQty,
        removeItem,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook — import this wherever you need cart access
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}