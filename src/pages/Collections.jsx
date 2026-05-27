import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Info } from "lucide-react";
import { PRODUCTS } from "../data";
import { ProductCard } from "../components/ProductCard.jsx";
import { CollectionsFilters } from "../components/CollectionsFilters.jsx";

import { CollectionsPagination } from "../components/CollectionsPagination.jsx";
export const Collections = ({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  navigateToPdp,
  onTriggerNotification,
}) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);

  // Multi-attribute Filter Logic for Collections catalog
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (filters.category !== "all" && product.category !== filters.category) {
        return false;
      }
      if (filters.gender !== "all") {
        if (filters.gender === "kids") {
          if (product.gender !== "kids") return false;
        } else if (filters.gender === "men") {
          if (product.gender !== "men" && product.gender !== "unisex")
            return false;
        } else if (filters.gender === "women") {
          if (product.gender !== "women" && product.gender !== "unisex")
            return false;
        }
      }
      if (filters.size !== null && !product.sizes.includes(filters.size)) {
        return false;
      }
      if (filters.colorway !== null) {
        const queryLower = filters.colorway.toLowerCase();
        if (
          !product.colorsStr.toLowerCase().includes(queryLower) &&
          !product.name.toLowerCase().includes(queryLower)
        ) {
          return false;
        }
      }
      if (product.price > filters.maxPrice) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const sLower = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(sLower) ||
          product.series.toLowerCase().includes(sLower) ||
          product.colorsStr.toLowerCase().includes(sLower)
        );
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "PRICE: LOW TO HIGH") return a.price - b.price;
      if (filters.sortBy === "PRICE: HIGH TO LOW") return b.price - a.price;
      if (filters.sortBy === "MOST POPULAR")
        return (b.status ? 2 : 1) - (a.status ? 2 : 1);
      return b.price - a.price; // Default: NEWEST FIRST
    });
  }, [filters, searchQuery]);

  return (
    <motion.div
      key="collections"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 md:px-16 py-12"
    >
      {/* Catalog Info Header */}
      <div className="mb-16 flex flex-col md:flex-row justify-between md:items-end gap-6 text-left">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-syne font-extrabold text-white mb-4 leading-none uppercase tracking-tighter">
            ENGINEERED PERFORMANCE
          </h1>
          <p className="text-sm text-brand-lightgrey/60 leading-relaxed">
            Technical silhouettes meeting urban necessity. Our curated
            collection focuses on architectural integrity and sustainable
            material designs.
          </p>
        </div>

        {/* Sort Selector Dropdown */}
        <div className="flex items-center gap-3 font-mono text-xs font-semibold shrink-0">
          <span className="text-brand-lightgrey/40 uppercase">SORT BY:</span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
            }
            className="bg-transparent border-b border-brand-grey text-brand-white focus:border-brand-accent py-2 outline-none font-bold pr-4 cursor-pointer text-xs"
          >
            <option className="bg-brand-black" value="NEWEST FIRST">
              NEWEST FIRST
            </option>
            <option className="bg-brand-black" value="PRICE: LOW TO HIGH">
              PRICE: LOW TO HIGH
            </option>
            <option className="bg-brand-black" value="PRICE: HIGH TO LOW">
              PRICE: HIGH TO LOW
            </option>
            <option className="bg-brand-black" value="MOST POPULAR">
              MOST POPULAR
            </option>
          </select>
        </div>
      </div>

      {/* Main Layout Split */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <CollectionsFilters
          filters={filters}
          setFilters={setFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onTriggerNotification={onTriggerNotification}
        />

        {/* Catalog Products Grid */}
        <section className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="border border-brand-grey/20 p-16 text-center text-brand-lightgrey/50 font-mono">
              <Info className="mx-auto mb-3" size={24} />
              NO CORRESPONDING SNEAKERS FOUND. <br />
              TRY LIMITING FILTER SELECTIONS OR SEARCH PARAMETERS.
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 select-none">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => navigateToPdp(product.id)}
                    isHovered={hoveredProductId === product.id}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  />
                ))}
              </div>

              {/* Pagination Section */}
              <CollectionsPagination
                onTriggerNotification={onTriggerNotification}
              />
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};
