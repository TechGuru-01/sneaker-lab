import React from "react";

export const ProductCard = ({
  product,
  onClick,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group cursor-pointer text-left"
    >
      {/* Image frame container */}
      <div className="relative aspect-[3/4] bg-brand-darkest overflow-hidden border border-brand-grey/10 group-hover:border-white/20 transition-all duration-300">
        
        {/* State Tags standard overlays */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 font-mono text-[9px] font-bold tracking-widest">
          {product.status === "NEW ARRIVAL" && (
            <span className="bg-brand-accent text-white px-2.5 py-1">
              NEW ARRIVAL
            </span>
          )}
          {product.status === "LIMITED RELEASE" && (
            <span className="bg-yellow-600 text-white px-2.5 py-1">
              LIMITED RELEASE
            </span>
          )}
          {product.status === "LIMITED" && (
            <span className="bg-white text-black px-2.5 py-1">
              LIMITED
            </span>
          )}
          {product.status === "OUT OF STOCK" && (
            <span className="bg-brand-grey text-brand-lightgrey px-2.5 py-1">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Standard alternate image crossfade triggers */}
        <img
          src={product.defaultImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          referrerPolicy="no-referrer"
        />
        <img
          src={product.secondaryImage}
          alt={product.name + " alternate"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100 scale-102 animate-scale-soft" : "opacity-0"
          }`}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Dynamic specifications metadata labels */}
      <div className="mt-5 flex justify-between items-start font-mono leading-none">
        <div>
          <p className="text-[10px] tracking-widest text-brand-lightgrey/40 mb-1 leading-none">
            {product.series}
          </p>
          <h4 className="text-sm font-bold text-white group-hover:text-brand-accent transition-colors">
            {product.name}
          </h4>
        </div>
        <span className="text-xs text-brand-accent font-bold">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <p className="text-[11px] font-mono text-brand-lightgrey/60 mt-2">
        {product.colorsStr}
      </p>
    </div>
  );
};
