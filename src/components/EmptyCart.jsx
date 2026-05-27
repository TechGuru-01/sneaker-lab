import React from "react";
import { ShoppingCart } from "lucide-react";

export const EmptyCart = ({ setFilters, setActivePage }) => {
  return (
    <div className="border border-brand-grey/20 p-20 text-center text-brand-lightgrey/50 font-mono">
      <ShoppingCart className="mx-auto mb-4" size={32} />
      <p className="mb-6">YOUR SNEAKER BAG IS REMAINING ENTIRELY EMPTY.</p>
      <button
        onClick={() => {
          setFilters((prev) => ({ ...prev, category: "all" }));
          setActivePage("collections");
        }}
        className="bg-white text-black px-8 py-3 text-xs font-bold tracking-widest hover:bg-brand-accent hover:text-white transition-colors cursor-pointer"
      >
        START SHOPPING
      </button>
    </div>
  );
};
