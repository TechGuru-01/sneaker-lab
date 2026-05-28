import React from "react";
import { Minus, Plus } from "lucide-react";

export const CartItemRow = ({ item, updateCartQty, removeCartItem }) => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 items-center border-b border-brand-grey/15 pb-6 text-left group animate-fade-in">
      {/* Product Thumbnail Frame */}
      <div className="col-span-4 md:col-span-3 aspect-square bg-brand-darkest relative overflow-hidden border border-brand-grey/10 group-hover:border-white/10 transition-colors">
        <img
          src={item.product.defaultImage}
          alt={item.product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-brand-black/90 border border-brand-grey/30 px-2 py-0.5 text-[8px] font-mono tracking-widest text-neutral-300">
          {item.product.id === "vortex-runner"
            ? "LE-01"
            : item.product.id === "tech-shell-jacket"
              ? "ED-09"
              : "LE-02"}
        </div>
      </div>

      {/* Product details row */}
      <div className="col-span-8 md:col-span-9 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left font-mono">
          <h3 className="text-base font-bold text-white uppercase leading-none group-hover:text-brand-accent transition-colors">
            {item.product.name}
          </h3>
          <p className="text-[10px] text-brand-lightgrey/50 tracking-wider mt-1.5 uppercase font-medium">
            COLOR: {item.product.colorsStr} / SIZE: US {item.selectedSize}
          </p>

          {/* Action counts */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border border-brand-grey h-9 hover:border-white transition-colors">
              <button
                onClick={() => updateCartQty(item.id, -1)}
                className="px-3 hover:text-brand-accent cursor-pointer transition-colors"
              >
                <Minus size={11} />
              </button>
              <span className="px-3 text-[10px] font-bold text-white select-none">
                {item.quantity}
              </span>
              <button
                onClick={() => updateCartQty(item.id, 1)}
                className="px-3 hover:text-brand-accent cursor-pointer transition-colors"
              >
                <Plus size={11} />
              </button>
            </div>

            <button
              onClick={() => removeCartItem(item.id, item.product.name)}
              className="text-[10px] font-mono hover:text-red-500 active:scale-95 transition-all text-brand-lightgrey/60 underline uppercase tracking-widest cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>

        {/* Price Display */}
        <div className="text-left md:text-right font-syne font-bold">
          <p className="text-base text-brand-white">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
          {item.quantity > 1 && (
            <p className="text-[10px] text-brand-lightgrey/40 font-mono font-medium leading-none mt-1">
              ${item.product.price.toFixed(2)} / item
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
