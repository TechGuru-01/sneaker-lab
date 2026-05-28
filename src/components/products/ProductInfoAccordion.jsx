import React, { useState } from "react";
import { ChevronUp, ChevronDown, Layers } from "lucide-react";

export const ProductInfoAccordion = ({ product }) => {
  const [techOpen, setTechOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);

  return (
    <div className="border-t border-brand-grey/35 font-mono text-xs">
      {/* Tech & Materials Accordion */}
      <div>
        <button
          onClick={() => setTechOpen(!techOpen)}
          className="w-full py-5 flex justify-between items-center text-brand-white hover:text-brand-accent transition-all"
        >
          <span>TECH & MATERIALS</span>
          {techOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {techOpen && (
          <div className="pb-6 text-left text-brand-lightgrey/60 space-y-4 font-sans text-xs">
            {(product.features || []).map((feat, index) => (
              <div key={index} className="flex gap-3">
                <Layers
                  size={14}
                  className="text-brand-accent shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-mono text-[10px] tracking-widest font-bold text-white uppercase mb-0.5">
                    {feat.title}
                  </p>
                  <p className="leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipping & Returns Accordion */}
      <div className="border-t border-brand-grey/35">
        <button
          onClick={() => setShippingOpen(!shippingOpen)}
          className="w-full py-5 flex justify-between items-center text-brand-white hover:text-brand-accent transition-all"
        >
          <span>SHIPPING & RETURNS</span>
          {shippingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {shippingOpen && (
          <div className="pb-6 text-left text-brand-lightgrey/60 space-y-2 leading-relaxed text-xs">
            <p>• Premium courier air logistics standard on signature lines.</p>
            <p>
              • 15-day return threshold with authentic, untorn technical tags.
            </p>
            <p>
              • Secure carbon neutral custom premium boxes with packaging wrap
              paper.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
