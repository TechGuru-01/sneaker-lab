import React, { useState } from 'react';

export default function AdminProductDetail({ product, onBackToInventory, onAddToBag }) {
  const [activeTab, setActiveTab] = useState('DETAILS');
  const [selectedSize, setSelectedSize] = useState(null);
  const [bagStatus, setBagStatus] = useState('ADD');

  if (!product) return null;

  // Active size Stock units to render size selection chips
  const sizeKeys = Object.keys(product.sizeStock);
  const totalStockUnits = Object.values(product.sizeStock).reduce((a, b) => a + b, 0);

  // Suggested secondary styles/assets matching screenshot layout
  const secondaryComplements = [
    { name: 'VANGUARD SHELL', price: 580, category: 'APPAREL', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdfJ_9hLmnKJSAAUy8xkxyc8ET2AvSq0d0-7Rf0RrMpZfohMz1x6KOid-rUJLp3yko64yXbaNyseH2j3iDCD5pzFjAFMCtrvZ_xJGIAG6PWU8qsjAPfAW5XltjkztmFwkKw9J-2zdOOjS6zZyCxXA9bLziHbpUa2elJmBnrKwP_kutGBfdDyxEBvUIPTbMjThGizu6IOs8h1RymgUQKEj2-FITGQiD7JW50RZDbsD7AA87eBTJ8YO9WUWNySmfdKxEeHG2_gJaYe7V' },
    { name: 'MODULAR PACK 12L', price: 240, category: 'ACCESSORIES', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI1QZoHio5WJ_Ds3Y13Uu4wjmxlF-I2eT2QDpGnI6NOdGIzWIJ3i3Urs-zkQ8x7Tlb6cs14qL7oipXY23rkWdaU5YH2WtFXxTDTftk5EcGhBFjlmlsth7gsd5iwWV0KHqNF055zjswcdzXcSxAAIGdRlS4SHPAb-5ENrPJqkwa9NMLwfegP-fm8tmml9SmXkm9EW39EB_csgGSwpr0boF7oMPGYLZWymD6U1bdz8xgKN8OGY2ZxMwpgBRr0YIOQdFQ0q86a0xvy1nT' },
    { name: 'TECH-KNIT CREW', price: 45, category: 'PERFORMANCE', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKGthe5yKhzSZOr3czSi8xR4Kg0BHCyQF2BQtJMP-8eLAeA_gqNwiqdPgKJpKghKc4OFCbOhqcVB_ircp4fxiYuaypGmAkkUxugzvkwM0xPJvJ4Bs8s88SD9vlj_WexvQgU_ggY1Jy8g3qoKCBTPRiZXTj1TTLkkkRbfLbTI7R4a6tR385E5AgiLXo88nwAkf8bbLt8k9Q_seTGZS2T5LOoN09eaNpZRiRqVghaeE4CJ1zX_LXTEoqKqBqh7E6ZTez5KgwIsSo0aWc' }
  ];

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("ATTENTION:\nPlease select a US shoe size spec before placing an order.");
      return;
    }

    setBagStatus('ADDING');
    setTimeout(() => {
      setBagStatus('ADDED');

      // Create a mock order to push to parent context
      const simulatedOrder = {
        id: `#SL-${Math.floor(1000 + Math.random() * 9000)}`,
        productName: product.name,
        productImage: product.imageLink,
        size: `${selectedSize} US`,
        gender: 'UNISEX',
        customerName: 'SNEAKER LAB OPERATOR',
        customerTier: 'Enterprise Admin',
        price: product.price,
        status: 'PROCESSING',
        timeAgo: 'Just now'
      };

      onAddToBag(product, selectedSize);

      // Reset
      setTimeout(() => setBagStatus('ADD'), 2000);
    }, 1200);
  };

  return (
    <div className="space-y-12 animate-fade-in text-[#e5e2e1]">
      {/* Upper Navigation and spec indicator */}
      <nav className="flex items-center justify-between border-b border-[#2e2e2e] pb-6">
        <button 
          onClick={onBackToInventory}
          className="flex items-center gap-3 font-mono text-xs text-[#cfc4c5] hover:text-[#3368ff] transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          RETURN TO DIRECTORY
        </button>
        <div className="font-mono text-[10px] tracking-widest text-[#cfc4c5]/60 block uppercase">
          ASSET ID: <span className="text-[#3368ff] font-bold">{product.id}</span>
        </div>
      </nav>

      {/* Main product representation layout dual-pane */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left side column: Large image, aura shadow */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-[4/3] bg-[#0e0e0e] border border-[#2e2e2e] flex items-center justify-center p-8 group overflow-hidden">
            {/* Visual Aura */}
            <div className={`absolute w-96 h-96 rounded-full blur-[100px] opacity-25 bg-[#3368ff] pointer-events-none transition-transform duration-700 group-hover:scale-125`}></div>
            
            <img 
              alt={product.name} 
              className="relative max-h-[82%] object-contain filter brightness-95 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"
              src={product.imageLink} 
            />

            {/* Micro badge waterproof label */}
            {product.waterproof && (
              <span className="absolute top-4 left-4 bg-black/70 border border-[#2e2e2e] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#3368ff] font-bold">
                GORE-TEX INTEGRATED
              </span>
            )}
          </div>

          {/* Sub-images thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            <div className="aspect-[4/3] bg-[#0e0e0e] border-2 border-[#3368ff] p-2 flex items-center justify-center cursor-pointer">
              <img src={product.imageLink} alt="Thumbnail side" className="max-h-full object-contain filter brightness-90" />
            </div>
            <div className="aspect-[4/3] bg-[#0e0e0e] border border-[#2e2e2e] hover:border-[#3368ff] p-2 flex items-center justify-center cursor-pointer transition-all opacity-40 hover:opacity-100">
              <img src={product.imageLink} alt="Thumbnail angle" className="max-h-full object-contain filter brightness-90 transform scale-x-[-1]" />
            </div>
            <div className="aspect-[4/3] bg-[#0e0e0e] border border-[#2e2e2e] hover:border-[#3368ff] flex flex-col items-center justify-center cursor-pointer transition-all gap-1.5 hover:text-[#3368ff] opacity-40 hover:opacity-100">
              <span className="material-symbols-outlined text-lg">view_in_ar</span>
              <span className="font-mono text-[9px] uppercase font-bold tracking-widest">360 SPEC</span>
            </div>
          </div>
        </div>

        {/* Right side column: specs detailing and size matrix selection */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <span className="bg-[#2a2a2a] text-[#cfc4c5] border border-[#2e2e2e] px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
              {product.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-5xl font-extrabold uppercase mt-4 tracking-tight text-[#e5e2e1]">
              {product.name}
            </h1>
            <p className="font-mono text-xs text-[#cfc4c5] mt-2 uppercase">Colorway: {product.colorway}</p>
            <p className="font-display text-3xl font-extrabold text-white mt-4">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="font-sans text-xs md:text-sm leading-relaxed text-[#cfc4c5]">
            {product.description}
          </p>

          {/* Selected Sizes Selector */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="tracking-wider uppercase text-[#cfc4c5] font-semibold">SELECT US SIZE SPEC:</span>
              <span className="text-[#3368ff] font-bold">STOCK: {totalStockUnits} UNITS</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizeKeys.map((key) => {
                const stockAmt = product.sizeStock[key];
                const isOutOfStock = stockAmt === 0;
                const isSelected = selectedSize === key;

                return (
                  <button
                    key={key}
                    disabled={isOutOfStock}
                    onClick={() => setSelectedSize(key)}
                    className={`min-w-[64px] h-14 border p-2 flex flex-col items-center justify-center font-mono relative transition-all ${
                      isOutOfStock 
                        ? 'bg-[#131313] border-[#202020] text-neutral-700 cursor-not-allowed opacity-25 line-through' 
                        : isSelected 
                        ? 'bg-[#3368ff] border-[#3368ff] text-white font-bold scale-105' 
                        : 'bg-[#1c1b1b] border-[#2e2e2e] text-[#e5e2e1] hover:border-white'
                    }`}
                  >
                    <span className="text-[11px] font-bold">US {key}</span>
                    <span className="text-[8px] opacity-65 mt-0.5">{stockAmt} left</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Checkout transaction control */}
          <div className="space-y-4 pt-4 border-t border-[#2e2e2e]">
            {/* Action buttons */}
            <button 
              onClick={handleAddToBag}
              disabled={bagStatus === 'ADDING' || totalStockUnits === 0}
              className="w-full bg-[#e5e2e1] text-[#131313] py-5 font-mono text-xs font-bold hover:bg-[#3368ff] hover:text-white transition-all uppercase tracking-widest disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center"
            >
              {totalStockUnits === 0 
                ? 'OUT OF COMPLIANCE STOCK' 
                : bagStatus === 'ADDING' 
                ? 'ISSUING ORDER...' 
                : bagStatus === 'ADDED' 
                ? 'ORDER LEDGER COMMITTED ✓' 
                : 'INITIATE ACQUISITION ORDER'
              }
            </button>
          </div>
        </div>

      </section>

      {/* Accordions details and technology attributes */}
      <section className="pt-12 border-t border-[#2e2e2e]">
        <div className="flex gap-1 border-b border-[#2e2e2e] p-0.5 bg-[#131313] w-full max-w-sm mb-8 font-mono text-[10px]">
          {['DETAILS', 'TECHNOLOGY', 'REVIEWS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-center uppercase tracking-wider ${
                activeTab === tab 
                  ? 'bg-[#3368ff] text-white font-bold' 
                  : 'text-[#cfc4c5] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content panels */}
        {activeTab === 'DETAILS' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs animate-fade-in leading-relaxed text-[#cfc4c5]">
            <div className="space-y-4">
              <span className="text-[9px] text-white tracking-widest block uppercase font-bold">MATERIAL CONSTRAINTS</span>
              <ul className="space-y-2 list-none">
                <li className="flex justify-between pb-1 border-b border-[#2e2e2e]/40">
                  <span>UPPER COMPOSITION:</span>
                  <span className="text-white font-bold uppercase">{product.upperMaterial?.join(', ') || 'DYNEEMA / HIGH OVERLAYS'}</span>
                </li>
                <li className="flex justify-between pb-1 border-b border-[#2e2e2e]/40">
                  <span>LACING MECHANISM:</span>
                  <span className="text-white font-bold uppercase">{product.lacingSystem || 'SPEED-LACE'}</span>
                </li>
                <li className="flex justify-between">
                  <span>ENVIRONMENT GRADE:</span>
                  <span className="text-white font-bold uppercase">{product.recycled ? 'RECYCLED COMPLIANT' : 'TRADITIONAL CLASS'}</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <span className="text-[9px] text-white tracking-widest block uppercase font-bold">ORIGIN TIMELINE</span>
              <ul className="space-y-2 list-none">
                <li className="flex justify-between pb-1 border-b border-[#2e2e2e]/40">
                  <span>RELEASE EMISSION DATE:</span>
                  <span className="text-white font-bold">{product.releaseDate || '2024-03-12'}</span>
                </li>
                <li className="flex justify-between pb-1 border-b border-[#2e2e2e]/40">
                  <span>TARGET SEASON SPEC:</span>
                  <span className="text-white font-bold">{product.season || 'SS/24'}</span>
                </li>
                <li className="flex justify-between">
                  <span>INVENTORY HUB STATUS:</span>
                  <span className="text-[#4ade80] font-bold uppercase">SECURED ACTIVE</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'TECHNOLOGY' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs animate-fade-in leading-relaxed text-[#cfc4c5]">
            <div className="border border-[#2e2e2e] p-6 bg-[#0e0e0e]">
              <span className="text-[9px] text-[#3368ff] tracking-widest block uppercase font-bold mb-3">MIDSOLE UNIT SHOCK LAYER</span>
              <p className="text-white font-bold text-sm mb-2 uppercase">{product.midsoleTech || 'NITRO-GLIDE PRO'}</p>
              <p className="font-sans">
                Engineered for continuous vertical expansion upon heel compression. Maximizes forward momentum kinetic energy rebound by 18.2%.
              </p>
            </div>
            <div className="border border-[#2e2e2e] p-6 bg-[#0e0e0e]">
              <span className="text-[9px] text-[#3368ff] tracking-widest block uppercase font-bold mb-3">OUTSOLE HIGH SPEED SECTOR</span>
              <p className="text-white font-bold text-sm mb-2 uppercase">{product.outsoleCompound || 'VIBRAM MEGAGRIP'}</p>
              <p className="font-sans">
                Advanced rubber density prevents slipping across low-friction metal composites or elements wet terrain. Multi-directional lugs.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'REVIEWS' && (
          <div className="space-y-6 font-mono text-xs animate-fade-in text-[#cfc4c5]">
            <div className="border border-[#2e2e2e] p-5">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-white text-[11px] uppercase">[VETTED LAB VERIFIED] ARCH_USER_92</span>
                <span className="text-[#3368ff]">★★★★★</span>
              </div>
              <p className="font-sans text-xs">
                Upper Dyneema mesh is incredibly robust. Resisted high tension abrasion tests without any micro-tears. Support rebound layer feels pristine.
              </p>
            </div>
            <div className="border border-[#2e2e2e] p-5">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-white text-[11px] uppercase">[VETTED LAB VERIFIED] PACER_00</span>
                <span className="text-[#3368ff]">★★★★☆</span>
              </div>
              <p className="font-sans text-xs">
                Extremely lightweight speed runner profile. The Nitro Glide midsole is exceptionally snappy, though size US 11 runs a fraction narrow. Recommended.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Suggested other complements list related sidebar layout */}
      <section className="pt-16 border-t border-[#2e2e2e] space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#3368ff]"></div>
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#e5e2e1]">
            CO-ORDINATING ASSETS SEGMENT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs">
          {secondaryComplements.map((item, key) => (
            <div key={key} className="border border-[#2e2e2e] hover:border-[#3368ff] p-4 bg-[#0e0e0e] flex flex-col justify-between h-80 group transition-all">
              <div className="aspect-[4/3] bg-[#1a1919] flex items-center justify-center p-2 mb-4 relative overflow-hidden">
                <img 
                  alt={item.name} 
                  src={item.image} 
                  className="max-h-[88%] object-contain group-hover:scale-110 transition-transform duration-300 filter brightness-90" 
                />
                <span className="absolute top-2 left-2 text-[8px] bg-black border border-[#2e2e2e] px-2 py-0.5 font-bold tracking-widest uppercase">
                  {item.category}
                </span>
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-tight">{item.name}</p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#2e2e2e]/60">
                  <span className="font-bold text-white">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => {
                      alert(`CO-ORDINATING TRANSACTION INITIATED:\n• Item: ${item.name}\nEstablishing transfer payload...`);
                    }}
                    className="text-[#cfc4c5] hover:text-[#3368ff] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1"
                  >
                    DEPLOY ASSET
                    <span className="material-symbols-outlined text-[10px] leading-none">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
