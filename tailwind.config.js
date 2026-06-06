// ─────────────────────────────────────────────────────────────
// tailwind.config.js
//
// Tailwind configuration for the Fredalenas project.
//
// IMPORTANT ADDITIONS:
//   1. `ticker` keyframe + animation — used by Ticker.jsx
//      for the scrolling marquee strip.
//   2. `fontFamily` — adds Playfair Display (serif) and
//      Lato (sans) so you can use them as Tailwind classes.
//
// HOW TO USE THE CUSTOM FONT IN JSX:
//   className="font-serif"   → Playfair Display
//   className="font-sans"    → Lato
// ─────────────────────────────────────────────────────────────

/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for class names.
  // This keeps the final CSS small by removing unused styles.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      // ── CUSTOM FONTS ───────────────────────────────────────
      fontFamily: {
        // font-serif → Playfair Display (headlines)
        serif: ['"Playfair Display"', "Georgia", "serif"],
        // font-sans  → Lato (body text)
        sans:  ["Lato", "Arial", "sans-serif"],
      },

      // ── CUSTOM COLORS (optional — for cleaner class names) ─
      // Instead of text-[#8B1A1A] everywhere, you can use text-maroon
      colors: {
        maroon:     "#8B1A1A",
        "maroon-dk":"#6B1212",
        gold:       "#C9893A",
        "gold-lt":  "#E8C97A",
        cream:      "#FBF6EF",
        sand:       "#F5E9D0",
        border:     "#E8DDD0",
      },

      // ── TICKER ANIMATION ───────────────────────────────────
      // Used in Ticker.jsx as: animate-[ticker_22s_linear_infinite]
      // Or if you want a shorter class name, use it as animate-ticker
      keyframes: {
        ticker: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // Gives you the class `animate-ticker` in your JSX
        ticker: "ticker 22s linear infinite",
      },
    },
  },

  plugins: [],
};
