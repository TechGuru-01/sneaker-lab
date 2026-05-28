import React, { useState } from 'react';

export default function NewUpload({ onCancel, onCommit, editingProduct }) {
  const isEditing = !!editingProduct;

  // Form State
  const [productName, setProductName] = useState(editingProduct?.name || '');
  const [sku, setSku] = useState(editingProduct?.sku || '');
  const [description, setDescription] = useState(editingProduct?.description || '');
  const [category, setCategory] = useState(editingProduct?.category || 'PERFORMANCE');
  const [releaseDate, setReleaseDate] = useState(editingProduct?.releaseDate || '2026-05-21');
  const [season, setSeason] = useState(editingProduct?.season || 'FW/26');
  
  // Pricing and stock
  const [price, setPrice] = useState(editingProduct?.price || 0);
  const [costToProduce, setCostToProduce] = useState(editingProduct?.price ? Math.floor(editingProduct.price * 0.4) : 0);
  const [sizeStock, setSizeStock] = useState(
    editingProduct?.sizeStock || { '7': 12, '8': 24, '9': 48, '10': 64, '11': 32, '12': 18, '13': 0 }
  );

  // Styling materials specs
  const [upperMaterials, setUpperMaterials] = useState(
    editingProduct?.upperMaterial || ['DYNEEMA', 'TPU OVERLAY']
  );
  const [newMaterialInput, setNewMaterialInput] = useState('');
  const [midsoleTech, setMidsoleTech] = useState(editingProduct?.midsoleTech || 'NITRO-GLIDE PRO');
  const [outsoleCompound, setOutsoleCompound] = useState(editingProduct?.outsoleCompound || 'VIBRAM MEGAGRIP');
  const [lacingSystem, setLacingSystem] = useState(
    editingProduct?.lacingSystem || 'TRADITIONAL'
  );
  const [waterproof, setWaterproof] = useState(editingProduct?.waterproof || false);
  const [recycled, setRecycled] = useState(editingProduct?.recycled || false);

  // Asset image link
  const [imageLink, setImageLink] = useState(
    editingProduct?.imageLink || 'https://lh3.googleusercontent.com/aida-public/AB6AXuARmeR2DCYrvKaugw4RDWLVNPBOHAcQgBw4gXtI1-mOqbJtUrdB3q6nZR5MB1FufTtqOY9BL-STFPVymeQkGtmx2_OXVdIxQOdFsIOQfJOUIU-4dV5jmX5LGb1JX7p4Xcp7QYd8a856YjMjFMTIkAXV4GLrADIXDSuWCI_CznHDE6F9ZVnfanxZ8dwPVDaLou1yU7H37UKxE6gGHBVcVI67kvW1nRt9ZQ82MtJ-PTnoG-m1f2UGffU-jEtAWsmOeRmiEgkoV0XZPaVW'
  );

  const [formStatus, setFormStatus] = useState('DRAFTING');

  // Multi-option preloads for high-contrast shoe imagery
  const imagePresets = [
    { label: 'Cyber White Technical (Default)', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARmeR2DCYrvKaugw4RDWLVNPBOHAcQgBw4gXtI1-mOqbJtUrdB3q6nZR5MB1FufTtqOY9BL-STFPVymeQkGtmx2_OXVdIxQOdFsIOQfJOUIU-4dV5jmX5LGb1JX7p4Xcp7QYd8a856YjMjFMTIkAXV4GLrADIXDSuWCI_CznHDE6F9ZVnfanxZ8dwPVDaLou1yU7H37UKxE6gGHBVcVI67kvW1nRt9ZQ82MtJ-PTnoG-m1f2UGffU-jEtAWsmOeRmiEgkoV0XZPaVW' },
    { label: 'Crimson Red Performance', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN0m4_CkdGwrjgw4Rn1SAQi7bbI-9hPgXRzefwj0tqAex4HE8rxnPvMdxPQtVfWQxPmkhnlgQcyEPoz9WR9wl1mAdpu7HVyV0LLPAhu0L0kaIo3cxvOa9f1Qo7yHB-p0Efvkht_2sS14mYhEOKsSoXo2gFDGOdBOYlz0nvmFYSYgORrwiYF_ET1FUcdFh2HYYisdr2ssZ-U-qk9nGlFIN5CT_eoK28T9svYaI02bsqKSz-3s_54rO-WxAhDg1YMAkcRax7HzsGsu0h' },
    { label: 'Vortex Obsidian Chrome', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCaQi_Ig6IRHH-j-FTfXAfnqWOBEuYQ9BO9cxIUf2n60DM31OQjQG-ZRqoTrTjB07HHOvn_CROqpr3Lrg5MwRDM7MTs82oDHC5xTP8I7PVTcqNggwINhM78j7A8lpB_IP2z_mQODRq32hXIU8SiUBW5cW2orlfu0Q95e40TSBW2mdhHBCIuOz7gdzVTNfqOvZ-Yhg77MHxiMWUxm4yVJ_nlNyBPcFw8OOF5I2ypNElHZ6MjP8M8DQ71kHShhhAYU-1Zgg4FRx9C9i9' },
    { label: 'Urban Kinetic Blue', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEX5cJtB2_Hmc-wW9_ELD7zol6llM1IiT4W7-KLOGeLlBdlpmcZtO0v8ZYYMi23p4V8kUIC2ZaM2uz5BxzmbSBtAARCJmsKYA_oQiiAcAYb2kd2adzZ4-InLNluJEBkKafAFp1ZtjqtR72UthWscs_sORgVTI7ZAJK3q-exC9Es144HfKRXCy57uBbuqQrcPEx-RCsKDzN6q63JwKLzYL_XrC1GzOKdVZW6NbgtIBxz0rM_DJJZ49RcDLvorV65f6cDN-4AEBaI2sN' },
    { label: 'Beige Minimalist Suede', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpl9ngZyn_dVoX-D7KRtCwwxcbGXetn5b94EfgS5bTllqs_rdkTUgPw2L_ToIR3_50iyIGIA_pgRHCWr2062qCl1AIaMC75eaT4fmkEuWY7wdxZo_tUBz7Fta8Yciu8EGs3xWnfSlfxJHWCeclAiEt0Pc0Xdfkx7efrGDY3YKmWhhlTBxHCsOye3sPKPBSDHQ_LN5FDmXAGHTzBUpsEt-M0PZX0YGf0FPVYUWDXED4J8mdYNqQO7vm0bZNS724ZUdx0s8w2Z5Pl2X-' }
  ];

  const handleStockValueChange = (sizeKey, val) => {
    setSizeStock(prev => ({ ...prev, [sizeKey]: Math.max(0, val) }));
  };

  const handleAddMaterial = () => {
    if (newMaterialInput.trim()) {
      setUpperMaterials(prev => [...prev, newMaterialInput.trim().toUpperCase()]);
      setNewMaterialInput('');
    }
  };

  const handleRemoveMaterial = (index) => {
    setUpperMaterials(prev => prev.filter((_, i) => i !== index));
  };

  const calculateProgress = () => {
    let completedFields = 0;
    const totalFields = 7;
    
    if (productName) completedFields++;
    if (sku) completedFields++;
    if (description) completedFields++;
    if (price > 0) completedFields++;
    if (upperMaterials.length > 0) completedFields++;
    if (midsoleTech) completedFields++;
    if (imageLink) completedFields++;

    return Math.floor((completedFields / totalFields) * 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !sku) {
      alert("ERROR: Name and unique SKU must be declared before ledger emission.");
      return;
    }

    setFormStatus('COMMITTING');

    // Determine Status
    const totalUnitsCount = Object.values(sizeStock).reduce((a, b) => a + b, 0);
    let itemStatus = 'IN STOCK';
    if (totalUnitsCount === 0) {
      itemStatus = 'OUT OF STOCK';
    } else if (totalUnitsCount < 18) {
      itemStatus = 'LOW STOCK';
    }

    const constructedProduct = {
      id: editingProduct?.id || sku,
      name: productName.toUpperCase(),
      sku: sku.toUpperCase(),
      category: category,
      colorway: editingProduct?.colorway || 'WHITE / METALLIC SILVER',
      sizeRange: `US 7-${Math.max(...Object.keys(sizeStock).map(Number))}`,
      price: Number(price),
      status: itemStatus,
      salesUnits: editingProduct?.salesUnits || 0,
      salesValue: editingProduct?.salesValue || 0,
      performanceScore: editingProduct?.performanceScore || 85,
      imageLink: imageLink,
      description: description,
      releaseDate: releaseDate,
      season: season,
      sizeStock: sizeStock,
      upperMaterial: upperMaterials,
      midsoleTech: midsoleTech,
      outsoleCompound: outsoleCompound,
      lacingSystem: lacingSystem,
      waterproof: waterproof,
      recycled: recycled
    };

    setTimeout(() => {
      setFormStatus('SUCCESS');
      onCommit(constructedProduct);
    }, 1200);
  };

  return (
    <div className="space-y-12 animate-fade-in text-[#e5e2e1]">
      
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#2e2e2e] pb-8 gap-4">
        <div>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold leading-none tracking-tight">
            {isEditing ? 'RE-COMPILE SPEC' : 'NEW UPLOAD'}
          </h1>
          <p className="font-mono text-[10px] text-[#3368ff] flex items-center gap-2 mt-3 font-semibold uppercase">
            <span className="w-2 h-2 bg-[#3368ff]"></span>
            TECHNICAL SPECIFICATION INPUT SEGMENT
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-[#e5e2e1] text-[#e5e2e1] hover:bg-[#1c1b1b] font-mono text-[10px] tracking-wider uppercase font-bold"
          >
            CANCEL
          </button>
          <button 
            type="button"
            onClick={() => {
              alert("SPECIFICATION DRAFT STATE SIGNED OFFLINE.");
              onCancel();
            }}
            className="px-6 py-2.5 bg-white text-black hover:bg-[#3368ff] hover:text-white transition-all font-mono text-[10px] tracking-wider uppercase font-bold"
          >
            DRAFT SAVE
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16 pb-32">
        
        {/* PHASE 01: IDENTITY & ORIGIN */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="step-1">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] text-[#cfc4c5]/60 block mb-2 font-bold select-none">PHASE 01</span>
            <h2 className="font-display text-2xl lg:text-3xl leading-tight uppercase font-extrabold mb-3">Identity &amp;<br />Origin</h2>
            <p className="text-[#cfc4c5] font-sans text-xs md:text-sm leading-relaxed">Define the core identification markers and narrative for the footwear unit.</p>
          </div>
          <div className="lg:col-span-8 space-y-8 bg-[#0e0e0e] border border-[#2e2e2e] p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Product Name</label>
                <input 
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-4 font-sans text-sm text-[#e5e2e1] focus:outline-none tracking-wide" 
                  placeholder="e.g. CYBERWALK X-1" 
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">SKU Identifier</label>
                <input 
                  required
                  disabled={isEditing}
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-4 font-mono text-xs text-[#e5e2e1] focus:outline-none tracking-widest disabled:opacity-50" 
                  placeholder="SL-2024-CWX1" 
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Technical Description</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-4 font-sans text-xs text-[#e5e2e1] focus:outline-none resize-none leading-relaxed" 
                placeholder="Describe the architectural intent and performance goals..." 
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Category Segment</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-3 font-mono text-xs text-[#e5e2e1] focus:outline-none appearance-none cursor-pointer uppercase"
                >
                  <option value="PERFORMANCE">PERFORMANCE</option>
                  <option value="LIFESTYLE">LIFESTYLE</option>
                  <option value="TECH">TECH</option>
                  <option value="COLLECTOR">COLLECTOR</option>
                  <option value="PROTOTYPE">PROTOTYPE</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Scheduled Release</label>
                <input 
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-3 font-mono text-xs text-[#e5e2e1] focus:outline-none uppercase color-scheme-dark" 
                  type="date"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Target Season Spec</label>
                <input 
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-4 font-mono text-xs text-[#e5e2e1] focus:outline-none tracking-widest" 
                  placeholder="FW/26" 
                  type="text"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PHASE 02: Pricing and size stock */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="step-2">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] text-[#cfc4c5]/60 block mb-2 font-bold select-none">PHASE 02</span>
            <h2 className="font-display text-2xl lg:text-3xl leading-tight uppercase font-extrabold mb-3">Value &amp;<br />Volume</h2>
            <p className="text-[#cfc4c5] font-sans text-xs md:text-sm leading-relaxed">Commercial parameters and global availability metrics.</p>
          </div>
          <div className="lg:col-span-8 bg-[#0e0e0e] border border-[#2e2e2e] p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Retail Price (USD)</label>
                <div className="relative border-b border-[#2e2e2e]">
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 font-display text-xl text-white font-bold">$</span>
                  <input 
                    required
                    min={1}
                    value={price || ''}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPrice(val);
                      setCostToProduce(Math.floor(val * 0.4));
                    }}
                    className="pl-8 w-full bg-[#1c1b1b] focus:border-[#3368ff] py-3.5 px-4 font-display text-xl text-white font-bold focus:outline-none" 
                    placeholder="000.00" 
                    type="number"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] text-[#cfc4c5]/60 uppercase tracking-widest font-semibold">Cost to Produce</label>
                <div className="relative border-b border-[#2e2e2e]">
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 font-display text-xl text-[#cfc4c5]/60">$</span>
                  <input 
                    value={costToProduce || ''}
                    onChange={(e) => setCostToProduce(Number(e.target.value))}
                    className="pl-8 w-full bg-[#1c1b1b] focus:border-[#3368ff] py-3.5 px-4 font-display text-xl text-[#cfc4c5] focus:outline-none" 
                    placeholder="000.00" 
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold block">Sizes Distribution Matrix (UNITS IN DC-01)</label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {Object.keys(sizeStock).map((sz) => (
                  <div key={sz} className="flex flex-col items-center gap-1.5 p-1 border border-[#2e2e2e] bg-[#131313]">
                    <span className="font-mono text-[9px] text-[#cfc4c5]/60">US {sz}</span>
                    <input 
                      value={sizeStock[sz]} 
                      onChange={(e) => handleStockValueChange(sz, Number(e.target.value))}
                      className="w-full bg-[#1c1b1b] border-0 text-center py-1.5 px-1 font-mono text-xs text-white focus:outline-none focus:bg-[#3368ff] focus:text-white"
                      type="number" 
                      min={0}
                    />
                  </div>
                ))}
                
                {/* Simulated add size button */}
                <button 
                  type="button" 
                  onClick={() => {
                    const nextSize = String(Math.max(...Object.keys(sizeStock).map(Number)) + 1);
                    setSizeStock(prev => ({ ...prev, [nextSize]: 0 }));
                  }}
                  className="w-full aspect-square border-2 border-dashed border-[#2e2e2e] flex items-center justify-center hover:border-[#3368ff] hover:bg-[#1c1b1b] text-[#cfc4c5] transition-colors"
                  title="Include Next Custom Size Bracket"
                >
                  <span className="material-symbols-outlined text-sm font-semibold">add</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PHASE 03: TECHNICAL SPECS ACCORDION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="step-3">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] text-[#cfc4c5]/60 block mb-2 font-bold select-none">PHASE 03</span>
            <h2 className="font-display text-2xl lg:text-3xl leading-tight uppercase font-extrabold mb-3">Anatomy &amp;<br />Engine</h2>
            <p className="text-[#cfc4c5] font-sans text-xs md:text-sm leading-relaxed">Material composition and proprietary cushioning technology details.</p>
          </div>
          <div className="lg:col-span-8 bg-[#0e0e0e] border border-[#2e2e2e] p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Upper Materials with tag constructor */}
              <div className="space-y-3">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold block">Upper Material</label>
                <div className="flex flex-wrap gap-2 p-1 border border-[#2e2e2e] bg-[#131313] min-h-[48px] items-center">
                  {upperMaterials.map((tag, idx) => (
                    <span key={idx} className="bg-white text-black font-mono text-[9px] px-2.5 py-1 font-bold flex items-center gap-1.5">
                      {tag} 
                      <button type="button" onClick={() => handleRemoveMaterial(idx)} className="text-[#ffb4ab] hover:text-red-700 font-extrabold">
                        ×
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center w-full mt-2 gap-1 px-1">
                    <input 
                      value={newMaterialInput}
                      onChange={(e) => setNewMaterialInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMaterial())}
                      className="bg-transparent border-b border-[#2e2e2e] pb-1 px-2 text-white font-mono text-[10px] focus:outline-none focus:border-[#3368ff] flex-1" 
                      placeholder="Add material tag..." 
                    />
                    <button type="button" onClick={handleAddMaterial} className="text-white hover:text-[#3368ff] font-bold text-xs p-1">
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Midsole technogy */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Midsole Technology Spec</label>
                <input 
                  value={midsoleTech}
                  onChange={(e) => setMidsoleTech(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-4 font-mono text-xs text-[#e5e2e1] focus:outline-none tracking-widest placeholder:opacity-20" 
                  placeholder="NITRO-GLIDE PRO" 
                  type="text"
                />
              </div>

              {/* Outsole compound */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Outsole Compound Spec</label>
                <input 
                  value={outsoleCompound}
                  onChange={(e) => setOutsoleCompound(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-4 font-mono text-xs text-[#e5e2e1] focus:outline-none tracking-widest placeholder:opacity-20" 
                  placeholder="VIBRAM MEGAGRIP" 
                  type="text"
                />
              </div>

              {/* Lacing dropdown */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold">Lacing System Segment</label>
                <select 
                  value={lacingSystem}
                  onChange={(e) => setLacingSystem(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] py-3.5 px-3 font-mono text-xs text-[#e5e2e1] focus:outline-none appearance-none cursor-pointer uppercase"
                >
                  <option value="TRADITIONAL">TRADITIONAL</option>
                  <option value="BOA DIAL">BOA DIAL</option>
                  <option value="SPEED-LACE">SPEED-LACE</option>
                  <option value="TOGGLE-LOCK">TOGGLE-LOCK</option>
                </select>
              </div>
            </div>

            {/* Overrides technical block */}
            <div className="p-6 border border-[#2e2e2e] bg-[#1c1b1b]">
              <h3 className="font-mono text-[10px] text-white tracking-widest font-bold uppercase mb-4">TECHNICAL OVERRIDES</h3>
              <div className="flex flex-wrap items-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={waterproof}
                    onChange={(e) => setWaterproof(e.target.checked)}
                    className="w-5 h-5 rounded-none bg-[#131313] border-[#2e2e2e] text-[#3368ff] focus:ring-0"
                  />
                  <span className="font-mono text-[10px] text-white tracking-wider font-semibold">WATERPROOF (GORE-TEX SEGMENTED)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={recycled}
                    onChange={(e) => setRecycled(e.target.checked)}
                    className="w-5 h-5 rounded-none bg-[#131313] border-[#2e2e2e] text-[#3368ff] focus:ring-0"
                  />
                  <span className="font-mono text-[10px] text-white tracking-wider font-semibold">RECYCLED CONTENT (30%+)</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* PHASE 04: VISUAL ASSET MANAGEMENT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="step-4">
          <div className="lg:col-span-4">
            <span className="font-mono text-[10px] text-[#cfc4c5]/60 block mb-2 font-bold select-none">PHASE 04</span>
            <h2 className="font-display text-2xl lg:text-3xl leading-tight uppercase font-extrabold mb-3">Visual<br />Assets</h2>
            <p className="text-[#cfc4c5] font-sans text-xs md:text-sm leading-relaxed">High-resolution imagery and 360-degree technical render sequence presets.</p>
          </div>
          
          <div className="lg:col-span-8 space-y-8">
            {/* Custom image option selector */}
            <div className="bg-[#0e0e0e] border border-[#2e2e2e] p-6 space-y-4">
              <label className="font-mono text-[10px] text-[#cfc4c5] uppercase tracking-widest font-semibold block">CHOOSE PRESET ENTERPRISE OR CUSTOM RENDER LINK</label>
              
              {/* Presets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {imagePresets.map((pr, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageLink(pr.url)}
                    className={`p-3 text-[10px] font-mono text-left uppercase transition-all duration-300 flex flex-col gap-2 relative ${
                      imageLink === pr.url ? 'bg-[#3368ff]/10 border border-[#3368ff] text-white' : 'bg-[#1c1b1b] border border-[#2e2e2e] hover:border-white text-[#cfc4c5]'
                    }`}
                  >
                    <span className="font-bold relative z-10">{pr.label}</span>
                    <div className="w-full h-12 overflow-hidden bg-[#131313] p-1 border border-[#2e2e2e]">
                      <img src={pr.url} alt="Preset visual" className="w-full h-full object-contain filter brightness-90" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Explicit Link Input */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="font-mono text-[9px] text-[#cfc4c5]/50 block">EXPLICIT IMAGE REF link EX-DUMP</span>
                <input 
                  type="text" 
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="bg-[#1c1b1b] border-b border-[#2e2e2e] pb-1 px-4 text-white font-mono text-[10px] focus:outline-none w-full"
                  placeholder="Insert image asset link..."
                />
              </div>
            </div>

            {/* Dynamic drag - drop zone mock preview */}
            <div className="relative w-full aspect-[16/9] bg-[#0e0e0e] border-2 border-dashed border-[#2e2e2e] hover:border-[#3368ff] group cursor-pointer overflow-hidden flex flex-col items-center justify-center transition-all">
              <div className="text-center z-10 p-8 select-none">
                <span className="material-symbols-outlined text-[48px] mb-4 text-[#cfc4c5]/50 group-hover:text-[#3368ff] transition-all">
                  cloud_upload
                </span>
                <h3 className="font-display font-bold text-sm md:text-base mb-2">HERO SPEC ASSET REGISTERED</h3>
                <p className="font-mono text-[9px] text-[#cfc4c5]/60 tracking-widest">
                  DRAG &amp; DROP HIGH-RES PNG (MIN 4000PX / 16:9 segment)
                </p>
              </div>
              <img 
                alt="Construction preview" 
                className="absolute inset-0 w-full h-full object-contain opacity-20 group-hover:opacity-40 transition-opacity"
                src={imageLink} 
              />
            </div>

            {/* Simulated multiside shots slots */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square bg-[#0e0e0e] border border-[#2e2e2e] hover:border-[#3368ff] flex flex-col items-center justify-center gap-2 cursor-pointer p-4">
                <span className="material-symbols-outlined text-sm text-[#cfc4c5]">view_in_ar</span>
                <span className="font-mono text-[9px] text-[#cfc4c5] tracking-tight text-center">360 SEQUENCE</span>
              </div>
              <div className="aspect-square bg-[#0e0e0e] border border-[#2e2e2e] hover:border-[#3368ff] flex flex-col items-center justify-center gap-2 cursor-pointer p-4">
                <span className="material-symbols-outlined text-sm text-[#cfc4c5]">image</span>
                <span className="font-mono text-[9px] text-[#cfc4c5] tracking-tight text-center">LATERAL SPEC</span>
              </div>
              <div className="aspect-square bg-[#0e0e0e] border border-[#2e2e2e] hover:border-[#3368ff] flex flex-col items-center justify-center gap-2 cursor-pointer p-4">
                <span className="material-symbols-outlined text-sm text-[#cfc4c5]">image</span>
                <span className="font-mono text-[9px] text-[#cfc4c5] tracking-tight text-center">MEDIAL SPEC</span>
              </div>
              <div className="aspect-square bg-[#0e0e0e] border border-[#2e2e2e] hover:border-[#3368ff] flex flex-col items-center justify-center gap-2 cursor-pointer p-4">
                <span className="material-symbols-outlined text-sm text-[#cfc4c5]">add</span>
                <span className="font-mono text-[9px] text-[#cfc4c5] tracking-tight text-center">ADD EXTRA</span>
              </div>
            </div>
          </div>
        </section>

      </form>

      {/* STICKY FINAL PROGRESS CONTROL BOARD FOOTER */}
      <div className="fixed bottom-0 right-0 left-0 lg:left-64 bg-[#0e0e0e]/95 backdrop-blur-xl border-t border-[#2e2e2e] px-6 md:px-12 h-24 flex items-center justify-between z-40 animate-fade-in-delayed">
        <div className="flex items-center gap-8">
          <div className="hidden md:block">
            <p className="font-mono text-[9px] text-[#cfc4c5]/60 uppercase ml-1 block mb-1">Upload Progress</p>
            <div className="w-48 h-1.5 bg-[#2a2a2a] rounded-none overflow-hidden">
              <div className="h-full bg-[#3368ff] transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div>
            </div>
          </div>
          <span className="font-mono text-xs text-white">
            STATUS: <span className="text-[#3368ff] font-bold uppercase">{formStatus}</span> ({calculateProgress()}%)
          </span>
        </div>

        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => {
              if (!productName || !sku) {
                alert("Please declare product name and SKU to test preview render frame.");
                return;
              }
              alert(`PREVIEW RENDER FRAME ACTIVE FOR:\n${productName.toUpperCase()}\nSKU: ${sku.toUpperCase()}\nRendering preview canvas...`);
            }}
            className="px-6 py-2 border border-[#cfc4c5] text-white hover:bg-neutral-800 transition-colors uppercase font-mono text-[10px] tracking-wider font-bold"
          >
            PREVIEW SPEC
          </button>
          
          <button 
            type="submit"
            onClick={handleSubmit}
            disabled={formStatus === 'COMMITTING' || formStatus === 'SUCCESS'}
            className="px-8 py-2.5 bg-white text-black hover:bg-[#3368ff] hover:text-white transition-all duration-300 font-mono text-[11px] uppercase tracking-wider font-extrabold disabled:opacity-30 flex items-center justify-center min-w-[150px]"
          >
            {formStatus === 'COMMITTING' ? 'PROCESSING...' : isEditing ? 'RE-UPLOAD SPEC' : 'COMMIT TO LEDGER'}
          </button>
        </div>
      </div>

    </div>
  );
}
