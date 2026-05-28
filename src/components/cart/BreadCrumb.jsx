import React from "react";
import { ChevronRight } from "lucide-react";

export const Breadcrumb = ({ setActivePage, setFilters, productName }) => {
  return (
    <nav className="mb-10 flex items-center gap-2 font-mono text-[9px] text-brand-lightgrey/50 text-left">
      <button
        onClick={() => setActivePage("home")}
        className="hover:text-white transition-colors"
      >
        SNEAKER LAB
      </button>
      <ChevronRight size={10} />
      <button
        onClick={() => {
          setFilters((prev) => ({ ...prev, category: "all" }));
          setActivePage("collections");
        }}
        className="hover:text-white transition-colors"
      >
        COLLECTIONS
      </button>
      <ChevronRight size={10} />
      <span className="text-white uppercase font-bold">{productName}</span>
    </nav>
  );
};
