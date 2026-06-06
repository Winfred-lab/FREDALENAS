// ─────────────────────────────────────────────────────────────
// src/components/products/Sidebar.jsx
//
// Left sidebar. Contains:
//   1. Categories  (clickable — synced with filter tabs)
//   2. Availability (static checkboxes)
//   3. Order Type   (static checkboxes)
//
// Rating and Price Range have been removed.
//
// PROPS:
//   activeFilter → currently selected category string
//   onFilter     → function(value) — called on category click
// ─────────────────────────────────────────────────────────────

import { sidebarCategories } from "../data/products";

export default function Sidebar({ activeFilter, onFilter }) {
  return (
    <aside
      className="bg-white border-r border-[#E8DDD0] p-6 h-full"
      aria-label="Product filters"
    >

      {/* ── 1. CATEGORIES ──────────────────────────────────── */}
      <div className="mb-6 pb-6 border-b border-[#E8DDD0]">
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#8B1A1A] mb-3">
          Categories
        </p>

        {sidebarCategories.map((cat) => (
          <div
            key={cat.value}
            onClick={() => onFilter(cat.value)}
            role="button"
            tabIndex={0}
            aria-pressed={activeFilter === cat.value}
            onKeyDown={(e) => e.key === "Enter" && onFilter(cat.value)}
            className={`flex items-center justify-between py-1.5 px-2 rounded cursor-pointer
                        transition-colors mb-0.5
                        ${activeFilter === cat.value
                          ? "bg-[#F5E9D0]"
                          : "hover:bg-[#FBF6EF]"
                        }`}
          >
            {/* Checkbox + label */}
            <label className="flex items-center gap-2 text-xs text-[#4A4A4A] cursor-pointer">
              <input
                type="checkbox"
                readOnly
                checked={activeFilter === cat.value}
                className="accent-[#8B1A1A] w-3 h-3"
                aria-hidden="true"
              />
              {cat.label}
            </label>

            {/* Count pill */}
            <span className="text-[9px] text-[#7A7A7A] bg-[#FBF6EF] px-2 py-0.5 rounded-full">
              {cat.count}
            </span>
          </div>
        ))}
      </div>

      {/* ── 2. AVAILABILITY ────────────────────────────────── */}
      <div className="mb-6 pb-6 border-b border-[#E8DDD0]">
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#8B1A1A] mb-3">
          Availability
        </p>

        {[
          { label: "In Stock",  count: 8,    checked: true  },
          { label: "Pre-order", count: 1,    checked: false },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-1.5 px-2 hover:bg-[#FBF6EF] rounded mb-0.5"
          >
            <label className="flex items-center gap-2 text-xs text-[#4A4A4A] cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={item.checked}
                className="accent-[#8B1A1A] w-3 h-3"
              />
              {item.label}
            </label>
            <span className="text-[9px] text-[#7A7A7A] bg-[#FBF6EF] px-2 py-0.5 rounded-full">
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* ── 3. ORDER TYPE ──────────────────────────────────── */}
      <div>
        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#8B1A1A] mb-3">
          Order Type
        </p>

        {["Retail", "Wholesale", "Custom Order"].map((type, i) => (
          <div
            key={type}
            className="flex items-center py-1.5 px-2 hover:bg-[#FBF6EF] rounded mb-0.5"
          >
            <label className="flex items-center gap-2 text-xs text-[#4A4A4A] cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={i === 0}
                className="accent-[#8B1A1A] w-3 h-3"
              />
              {type}
            </label>
          </div>
        ))}
      </div>

    </aside>
  );
}
