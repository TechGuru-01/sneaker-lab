import React from "react";
import { ChevronDown } from "lucide-react";

export const CollectionsFilters = ({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  onTriggerNotification,
}) => {
  const showReset =
    filters.category !== "all" ||
    filters.gender !== "all" ||
    filters.size !== null ||
    filters.colorway !== null ||
    filters.maxPrice < 850 ||
    searchQuery !== "";

  return (
    <aside className="w-full lg:w-60 shrink-0 text-left">
      <div className="sticky top-28 space-y-8 font-sans">
        {/* Filter category stack */}
        <div className="border-t border-brand-grey/30 pt-4">
          <h3 className="text-xs font-mono font-bold tracking-wider text-white mb-4 uppercase flex justify-between items-center cursor-pointer">
            CATEGORY
            <ChevronDown size={14} className="text-brand-lightgrey/40" />
          </h3>
          <ul className="space-y-2.5 text-xs">
            {[
              "all",
              "running",
              "lifestyle",
              "training",
              "apparel",
              "accessories",
            ].map((cat) => (
              <li
                key={cat}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, category: cat }))
                }
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span
                  className={`w-2 h-2 shrink-0 ${
                    filters.category === cat
                      ? "bg-brand-accent"
                      : "border border-brand-grey group-hover:border-white transition-colors"
                  }`}
                ></span>
                <span
                  className={`uppercase font-mono tracking-wider text-[10px] ${
                    filters.category === cat
                      ? "text-white font-bold"
                      : "text-brand-lightgrey/50 hover:text-white transition-colors"
                  }`}
                >
                  {cat === "all" ? "ALL APPAREL & FOOTWEAR" : cat}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter division/gender stack */}
        <div className="border-t border-brand-grey/30 pt-4">
          <h3 className="text-xs font-mono font-bold tracking-wider text-white mb-4 uppercase flex justify-between items-center cursor-pointer">
            DIVISION / GENDER
            <ChevronDown size={14} className="text-brand-lightgrey/40" />
          </h3>
          <ul className="space-y-2.5 text-xs">
            {[
              { id: "all", label: "ALL DIVISIONS" },
              { id: "men", label: "MEN'S COLLECTION" },
              { id: "women", label: "WOMEN'S COLLECTION" },
              { id: "kids", label: "KIDS' COLLECTION" },
            ].map((div) => (
              <li
                key={div.id}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, gender: div.id }))
                }
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span
                  className={`w-2 h-2 shrink-0 ${
                    filters.gender === div.id
                      ? "bg-brand-accent"
                      : "border border-brand-grey group-hover:border-white transition-colors"
                  }`}
                ></span>
                <span
                  className={`uppercase font-mono tracking-wider text-[10px] ${
                    filters.gender === div.id
                      ? "text-white font-bold"
                      : "text-brand-lightgrey/50 hover:text-white transition-colors"
                  }`}
                >
                  {div.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter Sizes US Grid */}
        <div className="border-t border-brand-grey/30 pt-4">
          <h3 className="text-xs font-mono font-bold tracking-wider text-white mb-4 uppercase">
            SIZE (US)
          </h3>
          <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
            {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 13].map((sz) => (
              <button
                key={sz}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    size: prev.size === sz ? null : sz,
                  }))
                }
                className={`h-9 border border-brand-grey/40 font-bold transition-all cursor-pointer ${
                  filters.size === sz
                    ? "bg-white text-black border-white"
                    : "text-brand-white hover:border-brand-accent"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Colorway Options */}
        <div className="border-t border-brand-grey/30 pt-4">
          <h3 className="text-xs font-mono font-bold tracking-wider text-white mb-4 uppercase">
            COLORWAY
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "Noir Black",
                search: "black",
                bg: "bg-black border border-brand-grey",
              },
              {
                label: "Pristine White",
                search: "white",
                bg: "bg-white text-black",
              },
              { label: "Charcoal Grey", search: "charcoal", bg: "bg-zinc-800" },
              {
                label: "Electric Blue",
                search: "blue",
                bg: "bg-brand-accent text-white",
              },
              {
                label: "Cyber Neon",
                search: "green",
                bg: "bg-radial-gradient bg-emerald-500",
              },
            ].map((col) => (
              <button
                key={col.label}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    colorway: prev.colorway === col.search ? null : col.search,
                  }))
                }
                className={`w-6 h-6 ${col.bg} transition-all scale-100 cursor-pointer ${
                  filters.colorway === col.search
                    ? "ring-1 ring-offset-2 ring-offset-brand-black ring-brand-accent scale-110"
                    : "hover:scale-105"
                }`}
                title={col.label}
              ></button>
            ))}
          </div>
        </div>

        {/* Filter Price Range */}
        <div className="border-t border-brand-grey/30 pt-4 pb-2">
          <h3 className="text-xs font-mono font-bold tracking-wider text-white mb-4 uppercase flex justify-between">
            <span>PRICE RANGE</span>
            <span className="text-brand-accent">${filters.maxPrice}</span>
          </h3>
          <div className="space-y-3 font-mono text-[9px] text-brand-lightgrey/50">
            <input
              type="range"
              min="40"
              max="850"
              step="10"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: parseInt(e.target.value),
                }))
              }
              className="w-full accent-brand-accent bg-brand-dark cursor-pointer h-1.5"
            />
            <div className="flex justify-between">
              <span>$40</span>
              <span>$850</span>
            </div>
          </div>
        </div>

        {/* Filter Clear Trigger Button */}
        {showReset && (
          <button
            onClick={() => {
              setFilters({
                category: "all",
                gender: "all",
                size: null,
                colorway: null,
                maxPrice: 850,
                sortBy: "NEWEST FIRST",
              });
              setSearchQuery("");
              onTriggerNotification("Catalog filters successfully reset.");
            }}
            className="w-full py-2 bg-brand-dark hover:bg-brand-grey/20 font-mono text-[10px] tracking-widest text-brand-lightgrey hover:text-white transition-colors"
          >
            RESET FILTERS
          </button>
        )}
      </div>
    </aside>
  );
};
