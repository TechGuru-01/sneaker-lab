import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { PRODUCTS } from "../data";

// Sub-components Imports
import { Breadcrumb } from "../components/BreadCrumb";
import { ProductGallery } from "../components/ProductGallery";

import { ProductInfoAccordion } from "../components/ProductInfoAccordion";
import { ProductComplements } from "../components/ProductComplements";

export const ProductDetail = ({
  selectedProductId,
  navigateToPdp,
  addToCart,
  onTriggerNotification,
  setActivePage,
  setFilters,
}) => {
  const selectedProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [pdpSelectedSize, setPdpSelectedSize] = useState(9);
  const [pdpMainImage, setPdpMainImage] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setPdpMainImage(selectedProduct.defaultImage);
      if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
        setPdpSelectedSize(
          selectedProduct.sizes[2] || selectedProduct.sizes[0],
        );
      }
    }
  }, [selectedProductId, selectedProduct]);

  return (
    <motion.div
      key="pdp"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-6 md:px-16 py-12"
    >
      <Breadcrumb
        setActivePage={setActivePage}
        setFilters={setFilters}
        productName={selectedProduct.name}
      />

      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start text-left">
        <ProductGallery
          product={selectedProduct}
          mainImage={pdpMainImage}
          setMainImage={setPdpMainImage}
        />

        {/* Right Info Section */}
        <div className="col-span-12 lg:col-span-4 flex flex-col text-left font-sans">
          <div className="mb-8 border-b border-brand-grey/20 pb-6">
            <span className="font-mono text-[10px] text-brand-accent tracking-widest uppercase block mb-1">
              {selectedProduct.series}
            </span>
            <h1 className="text-3xl font-syne font-extrabold text-white mb-2 leading-none uppercase tracking-tighter">
              {selectedProduct.name}
            </h1>
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-xl font-syne font-bold text-white">
                ${selectedProduct.price.toFixed(2)}
              </span>
              <span className="font-mono text-[9px] text-brand-lightgrey/40 tracking-wider">
                INCL. DUTIES & TAXES
              </span>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-sm text-brand-lightgrey/80 leading-relaxed mb-6 font-sans">
              {selectedProduct.description}
            </p>
            <div className="flex items-center gap-2 text-brand-accent font-mono text-[10px] font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 bg-brand-accent animate-pulse"></span>
              <span>HIGH REACTIVITY SYSTEM ACTIVE</span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3 text-xs">
              <span className="font-mono font-bold text-brand-white uppercase tracking-wider">
                SELECT SIZE (US)
              </span>
              <button
                onClick={() =>
                  onTriggerNotification(
                    "Standard US sizing applies. Select 1 size up for a wider fit.",
                  )
                }
                className="text-brand-accent font-mono text-[10px] underline tracking-wide hover:text-white"
              >
                SIZE GUIDE
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              {selectedProduct.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setPdpSelectedSize(sz)}
                  className={`h-11 border flex items-center justify-center font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                    pdpSelectedSize === sz
                      ? "bg-white text-black border-white scale-1"
                      : "text-brand-white border-brand-grey/50 hover:border-brand-accent hover:text-brand-accent"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Action Call to Buttons Stack */}
          <div className="flex flex-col gap-3 mb-10 text-xs font-mono font-bold tracking-wider">
            <button
              onClick={() => addToCart(selectedProduct, pdpSelectedSize)}
              className="w-full h-14 bg-white text-black hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-98"
            >
              ADD TO BAG
            </button>
            <button
              onClick={() =>
                onTriggerNotification(
                  `Product ${selectedProduct.name} successfully updated inside your wishlist.`,
                )
              }
              className="w-full h-14 border border-white text-white hover:bg-brand-dark/40 transition-colors cursor-pointer"
            >
              WISHLIST
            </button>
          </div>

          <ProductInfoAccordion product={selectedProduct} />
        </div>
      </div>

      <ProductComplements
        navigateToPdp={navigateToPdp}
        setFilters={setFilters}
        setActivePage={setActivePage}
      />
    </motion.div>
  );
};
