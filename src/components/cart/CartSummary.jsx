import React from "react";
import { ArrowRight } from "lucide-react";

export const CartSummary = ({
  checkoutZip,
  setCheckoutZip,
  isZipCalculated,
  handleZipCalculate,
  cartSubtotal,
  estimatedTax,
  cartTotal,
  onTriggerNotification,
  setCart,
}) => {
  return (
    <aside className="col-span-12 lg:col-span-4 font-sans font-medium text-xs leading-relaxed text-brand-lightgrey/60">
      <div className="bg-brand-darkest p-6 md:p-8 border border-brand-grey/25 sticky top-28">
        <h2 className="text-base font-syne font-bold border-b border-brand-grey/25 pb-4 mb-6 uppercase text-white tracking-wide">
          Order Summary
        </h2>

        <div className="space-y-4 mb-8 font-sans">
          <div className="flex justify-between font-mono">
            <span className="text-brand-lightgrey/40 text-[11px] font-bold">
              SUBTOTAL
            </span>
            <span className="text-white font-bold">
              ${cartSubtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-mono">
            <span className="text-brand-lightgrey/40 text-[11px] font-bold">
              TAX (ESTIMATED)
            </span>
            <span className="text-white font-bold">
              ${estimatedTax.toFixed(2)}
            </span>
          </div>

          {/* Shipping Input Panel */}
          <div className="pt-4 border-t border-brand-grey/20">
            <label className="text-[10px] font-mono tracking-widest text-brand-white uppercase block mb-1.5">
              Shipping Calculator
            </label>
            <form onSubmit={handleZipCalculate} className="relative font-mono">
              <input
                type="text"
                required
                value={checkoutZip}
                onChange={(e) => setCheckoutZip(e.target.value)}
                placeholder="ZIP CODE"
                className="bg-transparent border-0 border-b border-brand-grey focus:border-brand-accent text-white uppercase text-xs w-full pb-2 outline-none placeholder:text-brand-lightgrey/30"
                style={{ borderRadius: "0px" }}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-2 text-[10px] font-bold tracking-widest text-brand-accent hover:text-white transition-colors cursor-pointer"
              >
                CALCULATE
              </button>
            </form>

            <div className="flex justify-between mt-4 font-mono">
              <span className="text-brand-lightgrey/40 text-[11px] font-bold">
                SHIPPING
              </span>
              <span className="text-green-400 font-bold tracking-widest text-[11px]">
                {isZipCalculated ? "FREE" : "CALCULATING"}
              </span>
            </div>
          </div>
        </div>

        {/* Calculated final totals */}
        <div className="flex justify-between items-baseline border-t border-brand-accent pt-6 mb-8 font-mono">
          <span className="text-brand-white font-bold tracking-widest text-xs">
            TOTAL
          </span>
          <span className="text-2xl md:text-3xl font-syne font-extrabold text-white leading-none">
            ${cartTotal.toFixed(2)}
          </span>
        </div>

        {/* Checkout Actions Buttons Stack */}
        <div className="space-y-3 font-mono font-bold text-xs tracking-wider">
          <button
            onClick={() => {
              onTriggerNotification(
                `Checkout successful! Simulated batch secure order verified.`,
              );
              setCart([]);
            }}
            className="w-full bg-white text-black h-14 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300 flex items-center justify-center cursor-pointer group active:scale-98"
          >
            FAST CHECKOUT
            <ArrowRight
              size={14}
              className="ml-2 group-hover:translate-x-2 transition-transform"
            />
          </button>

          <div className="grid grid-cols-2 gap-3 text-[10px]">
            <button
              onClick={() =>
                onTriggerNotification(
                  "Apple Pay integration loaded. Double tap side bounds to execute.",
                )
              }
              className="flex items-center justify-center border border-brand-grey/40 h-11 hover:bg-brand-dark hover:border-white transition-all cursor-pointer"
            >
              <span className="uppercase text-[9px] font-bold">APPLE PAY</span>
            </button>
            <button
              onClick={() =>
                onTriggerNotification(
                  "Google Pay integration loaded. Verification successful for elijahboon986@gmail.com.",
                )
              }
              className="flex items-center justify-center border border-brand-grey/40 h-11 hover:bg-brand-dark hover:border-white transition-all cursor-pointer"
            >
              <span className="uppercase text-[9px] font-bold">GOOGLE PAY</span>
            </button>
          </div>
        </div>

        <p className="text-[9px] font-mono tracking-widest text-brand-lightgrey/40 text-center uppercase mt-6 block leading-none">
          30-day effortless return policy enabled
        </p>
      </div>
    </aside>
  );
};
