import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
// 💡 FIXED: Isang akyat lang patungong src/ folder mula sa pages/ folder
import { PRODUCTS } from "../data";

import { Breadcrumb } from "../components/cart/BreadCrumb";
import { ProductGallery } from "../components/products/ProductGallery";

export default function ProductDetail({
  selectedProductId,
  navigateToPdp,
  addToCart,
  onTriggerNotification,
  setActivePage,
  setFilters,
  filters,
}) {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const foundProduct = PRODUCTS.find((p) => p.id === selectedProductId);
    setProduct(foundProduct || PRODUCTS[0]);
    setSelectedSize(null); // Reset size kapag nagbago ang produkto
  }, [selectedProductId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-brand-white">
        LOADING_PRODUCT_DATA...
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8">
      {/* Breadcrumb Section */}
      <Breadcrumb
        product={product}
        setActivePage={setActivePage}
        setFilters={setFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        {/* Left Side: Product Gallery */}
        <ProductGallery product={product} />

        {/* Right Side: Product Details & Purchase Controls */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono tracking-widest text-brand-accent uppercase">
              {product.category} // {product.gender}
            </span>
            <h1 className="text-3xl md:text-4xl font-black italic tracking-tight text-brand-white mt-2 uppercase">
              {product.name}
            </h1>
            <p className="text-2xl font-mono text-brand-white font-bold mt-4">
              ${product.price}
            </p>
            <p className="text-sm text-brand-lightgrey/70 mt-6 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono tracking-wider text-brand-lightgrey uppercase">
                Select Size (US)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes &&
                product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border font-mono text-xs transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? "border-brand-accent bg-brand-accent text-white font-bold"
                        : "border-brand-lightgrey/20 text-brand-white hover:border-brand-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => {
                if (!selectedSize) {
                  onTriggerNotification(
                    "Please select a size before adding to bag.",
                  );
                  return;
                }
                addToCart(product, selectedSize);
              }}
              className="w-full h-14 bg-brand-white text-brand-black hover:bg-brand-accent hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
