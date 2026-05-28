import React from "react";

export const ProductGallery = ({ product, mainImage, setMainImage }) => {
  const gallery = product.galleryImages || [product.defaultImage];

  return (
    <div className="col-span-12 lg:col-span-8 flex flex-col md:flex-row gap-6">
      {/* Vertical slider gallery column */}
      <div className="hidden md:flex flex-col gap-4 w-20 shrink-0 custom-scrollbar overflow-y-auto max-h-[500px]">
        {gallery.map((imgUrl, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(imgUrl)}
            className={`border aspect-square overflow-hidden bg-brand-dark filter brightness-90 hover:brightness-100 hover:border-brand-accent transition-all duration-300 ${
              mainImage === imgUrl
                ? "border-brand-accent p-0.5"
                : "border-brand-grey/40"
            }`}
          >
            <img
              src={imgUrl}
              alt="gallery snap"
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Product frame detailed showcase */}
      <div className="flex-grow bg-brand-darkest aspect-square relative border border-brand-grey/20 max-h-[600px] overflow-hidden">
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 font-mono text-[9px] font-bold">
          <span className="bg-brand-accent text-white px-3 py-1 uppercase tracking-widest leading-none">
            {product.status || "LIMITED RELEASE"}
          </span>
          <span className="bg-brand-grey/90 text-brand-lightgrey px-3 py-1 uppercase tracking-widest leading-none">
            V.01.24
          </span>
        </div>

        <img
          src={mainImage || product.defaultImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
        />
      </div>
    </div>
  );
};
