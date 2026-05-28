import React, { useState } from "react";

export default function StockDirectory({
  products = [],
  onAddProductClick,
  onNavigateToProduct,
  onEditProduct,
  onDeleteProduct,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const filteredProducts = products.filter((prod) => {
    if (!prod) return false;

    const name = prod.name || "";
    const sku = prod.sku || "";
    const category = prod.category || "";
    const colorway = prod.colorway || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colorway.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategoryFilter === "ALL" || category === activeCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  const totalSkuCount = products.length * 208;
  const lowStockCount = products.filter(
    (p) => p && p.status === "LOW STOCK",
  ).length;
  const outOfStockCount = products.filter(
    (p) => p && p.status === "OUT OF STOCK",
  ).length;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "NAME",
      "SKU",
      "CATEGORY",
      "COLORWAY",
      "PRICE",
      "STATUS",
      "SALES",
    ];
    const rows = filteredProducts.map((p) => [
      p?.id || "",
      p?.name || "",
      p?.sku || "",
      p?.category || "",
      p?.colorway || "",
      p?.price || 0,
      p?.status || "",
      p?.salesUnits || 0,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sneaker_lab_inventory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12 animate-fade-in text-[#e5e2e1]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none">
            STOCK DIRECTORY
          </h2>
          <p className="text-[#cfc4c5] mt-3 max-w-xl font-sans text-sm md:text-base leading-relaxed">
            Precision inventory control for high-performance footwear assets.
            Manage technical specifications and global stock levels in
            real-time.
          </p>
        </div>
        <button
          onClick={onAddProductClick}
          className="bg-[#e5e2e1] text-[#131313] px-6 py-4 font-mono text-xs font-bold hover:bg-[#3368ff] hover:text-white transition-all flex items-center justify-center gap-2 relative group self-stretch sm:self-start shrink-0"
        >
          <span className="material-symbols-outlined text-sm font-bold">
            add
          </span>
          ADD NEW PRODUCT
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-[#1c1b1b] border border-[#2e2e2e]">
          <p className="font-mono text-[10px] text-[#cfc4c5]/60 mb-2 tracking-widest uppercase">
            TOTAL SKU COUNT
          </p>
          <p className="font-display text-2xl lg:text-3xl font-extrabold">
            {totalSkuCount}
          </p>
        </div>
        <div className="p-5 bg-[#1c1b1b] border border-[#2e2e2e]">
          <p className="font-mono text-[10px] text-[#cfc4c5]/60 mb-2 tracking-widest uppercase text-[#3368ff]">
            LOW STOCK ALERTS
          </p>
          <p className="font-display text-2xl lg:text-3xl font-extrabold text-[#3368ff]">
            {lowStockCount.toString().padStart(2, "0")}
          </p>
        </div>
        <div className="p-5 bg-[#1c1b1b] border border-[#2e2e2e]">
          <p className="font-mono text-[10px] text-[#cfc4c5]/60 mb-2 tracking-widest uppercase text-[#ffb4ab]">
            OUT OF STOCK
          </p>
          <p className="font-display text-2xl lg:text-3xl font-extrabold text-[#ffb4ab]">
            {outOfStockCount.toString().padStart(2, "0")}
          </p>
        </div>
        <div className="p-5 bg-[#1c1b1b] border border-[#2e2e2e]">
          <p className="font-mono text-[10px] text-[#cfc4c5]/60 mb-2 tracking-widest uppercase">
            MONTHLY VELOCITY
          </p>
          <p className="font-display text-2xl lg:text-3xl font-extrabold">
            +18.4%
          </p>
        </div>
      </div>

      <div className="bg-[#131313] border border-[#2e2e2e] overflow-hidden">
        <div className="p-4 border-b border-[#2e2e2e] flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0e0e0e]">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#cfc4c5]/70 text-base">
              search
            </span>
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#1c1b1b] border-b border-[#2e2e2e] focus:border-[#3368ff] px-10 py-2.5 font-mono text-xs uppercase placeholder:text-[#cfc4c5]/35 tracking-wider focus:outline-none focus:ring-0"
              placeholder="SEARCH BY NAME, SKU OR CATEGORY..."
              type="text"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#cfc4c5] hover:text-white font-mono"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
            <div className="flex gap-1 border border-[#2e2e2e] p-0.5 bg-[#131313]">
              {["ALL", "RUNNING", "LIFESTYLE", "TECH"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategoryFilter(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider ${
                    activeCategoryFilter === cat
                      ? "bg-[#3368ff] text-white font-bold"
                      : "text-[#cfc4c5] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFiltersModal(!showFiltersModal)}
              className={`px-4 py-2 border border-[#2e2e2e] font-mono text-[10px] tracking-wider uppercase transition-colors hover:bg-[#1c1b1b] ${showFiltersModal ? "bg-[#3368ff]/10 border-[#3368ff]" : ""}`}
            >
              FILTER{" "}
              {activeCategoryFilter !== "ALL" && `(${activeCategoryFilter})`}
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 border border-[#2e2e2e] font-mono text-[10px] tracking-wider uppercase transition-colors hover:bg-[#1c1b1b]"
            >
              EXPORT CSV
            </button>
          </div>
        </div>

        {showFiltersModal && (
          <div className="bg-[#1c1b1b] border-b border-[#2e2e2e] p-4 font-mono text-xs grid grid-cols-2 sm:grid-cols-5 gap-4 animate-fade-in">
            <div className="space-y-1.5">
              <span className="text-[9px] text-[#cfc4c5]/55 tracking-widest block uppercase font-bold">
                Category Specs
              </span>
              <div className="flex flex-col gap-1">
                {[
                  "ALL",
                  "RUNNING",
                  "LIFESTYLE",
                  "TECH",
                  "COLLECTOR",
                  "PROTOTYPE",
                ].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer text-[#cfc4c5] hover:text-white"
                  >
                    <input
                      type="radio"
                      name="catRadio"
                      checked={activeCategoryFilter === cat}
                      onChange={() => {
                        setActiveCategoryFilter(cat);
                        setCurrentPage(1);
                      }}
                      className="rounded-none bg-[#131313] border-[#2e2e2e] text-[#3368ff] focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[10px] uppercase font-bold">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 col-span-3">
              <span className="text-[9px] text-[#cfc4c5]/55 tracking-widest block uppercase font-bold">
                Active Thresholds
              </span>
              <div className="text-[11px] text-[#cfc4c5] space-y-1 text-xs">
                <div>
                  • Total products registered:{" "}
                  <span className="text-[#3368ff] font-bold">
                    {filteredProducts.length}
                  </span>
                </div>
                <div>
                  • Filters subset matches {filteredProducts.length} of{" "}
                  {products.length} footwear specs.
                </div>
                <div>
                  • Hard-edge styling borders active. Hover items to access
                  detailed edit logs.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#1c1b1b] border-b border-[#2e2e2e]">
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase">
                  PRODUCT SPECIFICATION
                </th>
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase">
                  SKU
                </th>
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase">
                  CATEGORY
                </th>
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase">
                  COLORWAY
                </th>
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase text-center">
                  SIZE RANGE
                </th>
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase">
                  PRICE
                </th>
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase">
                  STATUS
                </th>
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase">
                  SALES RECORD
                </th>
                <th className="p-4 font-mono text-[10px] text-[#cfc4c5] tracking-wider uppercase text-right">
                  SYSTEM ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2e2e2e]">
              {visibleProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="p-12 text-center text-xs font-mono text-[#cfc4c5]/50 uppercase tracking-widest"
                  >
                    NO FOOTWEAR ENTRIES MATCHED ACTIVE REGISTER QUERY
                  </td>
                </tr>
              ) : (
                visibleProducts.map((product) => {
                  if (!product) return null;

                  let statusDot = "bg-[#4ade80]";
                  let statusText = "text-[#4ade80]";
                  if (product.status === "LOW STOCK") {
                    statusDot = "bg-[#3368ff]";
                    statusText = "text-[#3368ff]";
                  } else if (product.status === "OUT OF STOCK") {
                    statusDot = "bg-[#ffb4ab]";
                    statusText = "text-[#ffb4ab]";
                  }

                  const priceValue = product.price || 0;
                  const salesUnitsValue = product.salesUnits || 0;
                  const totalSalesValue =
                    product.salesValue || salesUnitsValue * priceValue;

                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-[#1c1b1b]/70 transition-colors animate-fade-in group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            onClick={() =>
                              onNavigateToProduct &&
                              onNavigateToProduct(product.id)
                            }
                            className="w-16 h-12 bg-[#2a2a2a] border border-[#2e2e2e] group-hover:border-[#3368ff] transition-colors p-0.5 flex-shrink-0 cursor-pointer overflow-hidden flex items-center justify-center"
                          >
                            <img
                              alt={product.name || "Footwear Specification"}
                              className="w-full h-full object-contain filter brightness-95 group-hover:scale-110 transition-transform duration-300"
                              src={product.imageLink || ""}
                            />
                          </div>
                          <div>
                            <span
                              onClick={() =>
                                onNavigateToProduct &&
                                onNavigateToProduct(product.id)
                              }
                              className="font-bold tracking-tight text-[#e5e2e1] group-hover:text-[#3368ff] transition-colors cursor-pointer"
                            >
                              {product.name || "UNNAMED SPEC"}
                            </span>
                            <div className="text-[9px] text-[#cfc4c5]/60 mt-0.5 font-mono uppercase">
                              REACTIVE FLOW SOLE
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-xs text-[#cfc4c5]">
                        {product.sku || "N/A"}
                      </td>

                      <td className="p-4">
                        <span className="bg-[#2a2a2a] text-[#cfc4c5] border border-[#2e2e2e] px-2 py-0.5 font-mono text-[9px] uppercase font-bold tracking-wider">
                          {product.category || "GENERAL"}
                        </span>
                      </td>

                      <td className="p-4 text-[#cfc4c5]">
                        <div
                          className="text-xs uppercase max-w-[120px] truncate"
                          title={product.colorway || ""}
                        >
                          {product.colorway || "DEFAULT"}
                        </div>
                      </td>

                      <td className="p-4 text-center font-mono text-xs text-[#cfc4c5]">
                        {product.sizeRange || "US 7-13"}
                      </td>

                      <td className="p-4 font-mono font-bold text-xs">
                        ${priceValue.toFixed(2)}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-none ${statusDot}`}
                          ></div>
                          <span
                            className={`font-mono text-[10px] font-bold uppercase tracking-wider ${statusText}`}
                          >
                            {product.status || "UNKNOWN"}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-xs text-[#e5e2e1]">
                        <div>{salesUnitsValue.toLocaleString()} Units</div>
                        <div className="text-[9px] text-[#cfc4c5]/50 mt-0.5">
                          $
                          {totalSalesValue.toLocaleString("en-US", {
                            maximumFractionDigits: 0,
                          })}
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() =>
                              onEditProduct && onEditProduct(product)
                            }
                            className="text-[#cfc4c5] hover:text-[#3368ff] transition-all p-1"
                            title="Edit Product Details"
                          >
                            <span className="material-symbols-outlined text-base">
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              onDeleteProduct && onDeleteProduct(product.id)
                            }
                            className="text-[#cfc4c5] hover:text-[#ffb4ab] transition-all p-1"
                            title="Delete Technical Asset"
                          >
                            <span className="material-symbols-outlined text-base">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#2e2e2e] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0e0e0e]">
          <p className="font-mono text-[10px] text-[#cfc4c5]/60 uppercase tracking-widest">
            SHOWING {Math.min(startIndex + 1, filteredProducts.length)}-
            {Math.min(startIndex + itemsPerPage, filteredProducts.length)} OF{" "}
            {filteredProducts.length} SPECIFIED SHOES
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="text-[#cfc4c5] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none p-1"
              >
                <span className="material-symbols-outlined text-lg leading-none">
                  chevron_left
                </span>
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`font-mono text-[10px] px-2 py-1 select-none ${
                      currentPage === idx + 1
                        ? "bg-[#3368ff] text-white font-bold"
                        : "text-[#cfc4c5] hover:text-white"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="text-[#cfc4c5] hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none p-1"
              >
                <span className="material-symbols-outlined text-lg leading-none">
                  chevron_right
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#2e2e2e]">
        <div className="border-l border-[#3368ff] pl-6 py-2 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#e5e2e1]">
            SYSTEM ALERTS
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#3368ff]">
                info
              </span>
              <p className="text-[#cfc4c5] text-xs md:text-sm">
                <span className="text-[#e5e2e1] font-bold">
                  REGIONAL RE-BALANCE:
                </span>{" "}
                Asia-Pacific stock levels are 12% below projected demand.
                Recommend transfer from EU hub.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#ffb4ab]">
                warning
              </span>
              <p className="text-[#cfc4c5] text-xs md:text-sm">
                <span className="text-[#e5e2e1] font-bold">RESTOCK DELAY:</span>{" "}
                Quantum Peak components held at customs. ETA updated to +14
                days.
              </p>
            </li>
          </ul>
        </div>

        <div className="border-l border-[#2e2e2e] pl-6 py-2 space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#e5e2e1]">
            INVENTORY LOGS
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-mono pb-2 border-b border-[#2e2e2e]/40">
              <span className="text-[#cfc4c5]">EDIT: URBAN KINETIC V2</span>
              <span className="text-[#e5e2e1]">14:22 GMT - ADMIN01</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono pb-2 border-b border-[#2e2e2e]/40">
              <span className="text-[#cfc4c5]">DELETE: ARCHIVE_SAMPLE_09</span>
              <span className="text-[#e5e2e1]">12:05 GMT - SYSTEM</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono pb-2">
              <span className="text-[#cfc4c5]">
                NEW PRODUCT: IGNITE SPEEDSTER
              </span>
              <span className="text-[#e5e2e1]">09:15 GMT - ADMIN02</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
