import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CollectionsPagination = ({ onTriggerNotification }) => {
  return (
    <div className="mt-20 border-t border-brand-grey/20 pt-10 flex justify-center items-center gap-12 font-mono text-xs">
      <button
        onClick={() =>
          onTriggerNotification(
            "Catalog Navigation locked inside Preview boundaries.",
          )
        }
        className="text-brand-lightgrey hover:text-white cursor-pointer active:scale-95 transition-all"
      >
        <ArrowLeft size={16} />
      </button>

      <div className="flex gap-6 items-center">
        <span className="text-white border-b-2 border-brand-accent pb-1 font-bold">
          01
        </span>
        <span
          onClick={() =>
            onTriggerNotification(
              "Simulation sandbox limited to Page 01 catalog indices.",
            )
          }
          className="text-brand-lightgrey/50 hover:text-white cursor-pointer transition-colors"
        >
          02
        </span>
        <span
          onClick={() =>
            onTriggerNotification(
              "Simulation sandbox limited to Page 01 catalog indices.",
            )
          }
          className="text-brand-lightgrey/50 hover:text-white cursor-pointer transition-colors"
        >
          03
        </span>
        <span className="text-brand-lightgrey/40">...</span>
        <span
          onClick={() =>
            onTriggerNotification(
              "Simulation sandbox limited to Page 01 catalog indices.",
            )
          }
          className="text-brand-lightgrey/50 hover:text-white cursor-pointer transition-colors font-bold"
        >
          12
        </span>
      </div>

      <button
        onClick={() =>
          onTriggerNotification(
            "Catalog Navigation locked inside Preview boundaries.",
          )
        }
        className="text-brand-lightgrey hover:text-white cursor-pointer active:scale-95 transition-all"
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
};
