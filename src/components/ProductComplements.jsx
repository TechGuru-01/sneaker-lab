import React from "react";
import { PRODUCTS } from "../data";

export const ProductComplements = ({
  navigateToPdp,
  setFilters,
  setActivePage,
}) => {
  // Filters out the curated companion inventory
  const accessories = PRODUCTS.filter((p) =>
    ["vanguard-shell", "modular-pack-12l", "tech-knit-crew"].includes(p.id),
  );

  return (
    <section className="mt-28 border-t border-brand-grey/25 pt-16">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-4 text-left">
        <div>
          <h2 className="text-xs font-mono font-bold tracking-widest text-brand-accent uppercase mb-2">
            COMPLEMENTS
          </h2>
          <h3 className="text-2xl md:text-3xl font-syne font-bold uppercase text-white">
            Complete The Look
          </h3>
        </div>
        <button
          onClick={() => {
            setFilters((prev) => ({ ...prev, category: "accessories" }));
            setActivePage("collections");
          }}
          className="font-mono text-xs font-bold tracking-wider border-b border-brand-accent text-brand-accent pb-1 hover:text-white hover:border-white transition-colors cursor-pointer w-fit"
        >
          VIEW ACCESSORIES
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accessories.map((item) => (
          <div
            key={item.id}
            onClick={() => navigateToPdp(item.id)}
            className="group cursor-pointer text-left"
          >
            <div className="aspect-[3/4] bg-brand-dark overflow-hidden border border-brand-grey/25 mb-4 group-hover:border-white/30 transition-all duration-300">
              <img
                src={item.defaultImage}
                alt={item.name}
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-500"
              />
            </div>

            <div className="flex justify-between items-start font-mono text-xs">
              <div>
                <span className="text-[10px] text-brand-lightgrey/40 block uppercase tracking-widest">
                  {item.series}
                </span>
                <h4 className="font-bold text-white uppercase group-hover:text-brand-accent transition-colors mt-0.5">
                  {item.name}
                </h4>
              </div>
              <span className="text-brand-accent font-bold">
                ${item.price.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
