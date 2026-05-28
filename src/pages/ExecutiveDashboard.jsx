import React, { useState } from "react";

export default function ExecutiveDashboard({
  products = [],
  orders = [],
  activity = [],
  alerts = [],
  onNavigateToProduct = () => {},
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const chartData = [
    { wk: "WK 01", val: "$112,400", valNum: 112400 },
    { wk: "WK 02", val: "$128,500", valNum: 128500 },
    { wk: "WK 03", val: "$104,800", valNum: 104800 },
    { wk: "WK 04", val: "$148,000", valNum: 148000 },
    { wk: "WK 05", val: "$135,200", valNum: 135200 },
    { wk: "WK 06", val: "$176,900", valNum: 176900 },
    { wk: "WK 07", val: "$158,400", valNum: 158400 },
    { wk: "WK 08", val: "$210,000", valNum: 210000 },
    { wk: "WK 09", val: "$198,300", valNum: 198300 },
    { wk: "WK 10", val: "$248,500", valNum: 248500 },
  ];

  const width = 1000;
  const height = 280;
  const paddingX = 40;
  const paddingY = 30;

  const points = chartData.map((d, idx) => {
    const x =
      paddingX + (idx / (chartData.length - 1)) * (width - paddingX * 2);
    const y =
      height -
      paddingY -
      ((d.valNum - 80000) / (260000 - 80000)) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return acc + `${idx === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)} `;
  }, "");

  const areaD =
    pathD +
    ` L${points[points.length - 1].x.toFixed(1)},${(height - paddingY).toFixed(1)} L${points[0].x.toFixed(1)},${(height - paddingY).toFixed(1)} Z`;

  const displayProducts =
    products.length > 0
      ? products
      : [
          {
            id: "N-2024-MX-001",
            name: "PHANTOM VORTEX-01",
            sku: "PH-VTX-2026",
            sizeStock: { 9: 12, 10: 15 },
            salesValue: 142300.0,
            performanceScore: 92,
            imageLink: "",
          },
          {
            id: "A-2024-UB-082",
            name: "NEO-SHELL JACKET",
            sku: "NS-JKT-99",
            sizeStock: { M: 8, L: 14 },
            salesValue: 98400.0,
            performanceScore: 78,
            imageLink: "",
          },
          {
            id: "J-2023-LG-992",
            name: "VELOCITY RUNNER R",
            sku: "VR-R-880",
            sizeStock: { 8: 3, 9: 2 },
            salesValue: 12400.0,
            performanceScore: 24,
            imageLink: "",
          },
        ];

  const displayActivity =
    activity.length > 0
      ? activity
      : [
          {
            id: "act-01",
            type: "BATCH STOCK CRITICAL",
            details: "Velocity Runner R dropped below safety threshold.",
            time: "2 MINS AGO",
          },
          {
            id: "act-02",
            type: "ORDER FULLFILLMENT",
            details: "Inbound checkout verification batch #8849 secure.",
            time: "14 MINS AGO",
          },
          {
            id: "act-03",
            type: "SYSTEM SNAPSHOT",
            details: "Database replication sync with US-EAST-01 complete.",
            time: "1 HR AGO",
          },
        ];

  const topPerformers = displayProducts.filter((p) => p !== undefined);

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-[#3368ff] mb-2 block font-medium uppercase">
            SYSTEM STATUS: OPTIMAL
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#e5e2e1] uppercase tracking-tight leading-none">
            Executive Dashboard
          </h1>
        </div>
        <div className="text-right font-mono text-xs text-[#cfc4c5]/60">
          SECURE SECTOR /{" "}
          <span className="text-[#3368ff]">LIVE LATENCY FLOW</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1c1b1b] border border-[#2e2e2e] p-6 flex flex-col justify-between h-40 relative group overflow-hidden transition-all duration-300 hover:border-[#3368ff]">
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#3368ff]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-[#cfc4c5] tracking-wider font-semibold uppercase">
              TOTAL REVENUE
            </span>
            <span className="text-[#3368ff] text-[10px] font-mono border border-[#3368ff]/40 bg-[#3368ff]/5 px-2 py-0.5 font-semibold">
              +12.4%
            </span>
          </div>
          <div>
            <div className="font-display text-2xl lg:text-3xl font-bold text-[#e5e2e1] tracking-tight">
              $1,248,302.00
            </div>
            <div className="font-mono text-[10px] text-[#cfc4c5]/55 mt-1 tracking-wider uppercase">
              CURRENCY: USD
            </div>
          </div>
        </div>

        <div className="bg-[#1c1b1b] border border-[#2e2e2e] p-6 flex flex-col justify-between h-40 relative group overflow-hidden transition-all duration-300 hover:border-[#3368ff]">
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#3368ff]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-[#cfc4c5] tracking-wider font-semibold uppercase">
              TOTAL ORDERS
            </span>
            <span className="text-[#3368ff] text-[10px] font-mono border border-[#3368ff]/40 bg-[#3368ff]/5 px-2 py-0.5 font-semibold">
              +4.2%
            </span>
          </div>
          <div>
            <div className="font-display text-2xl lg:text-3xl font-bold text-[#e5e2e1] tracking-tight">
              14,821
            </div>
            <div className="font-mono text-[10px] text-[#cfc4c5]/55 mt-1 tracking-wider uppercase">
              LAST 30 DAYS
            </div>
          </div>
        </div>

        <div className="bg-[#1c1b1b] border border-[#2e2e2e] p-6 flex flex-col justify-between h-40 relative group overflow-hidden transition-all duration-300 hover:border-[#ffb4ab]">
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#ffb4ab]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-[#cfc4c5] tracking-wider font-semibold uppercase">
              AVG ORDER VALUE
            </span>
            <span className="text-[#ffb4ab] text-[10px] font-mono border border-[#ffb4ab]/40 bg-[#ffb4ab]/5 px-2 py-0.5 font-semibold">
              -1.5%
            </span>
          </div>
          <div>
            <div className="font-display text-2xl lg:text-3xl font-bold text-[#e5e2e1] tracking-tight">
              $248.50
            </div>
            <div className="font-mono text-[10px] text-[#cfc4c5]/55 mt-1 tracking-wider uppercase">
              PER TRANSACTION
            </div>
          </div>
        </div>

        <div className="bg-[#1c1b1b] border border-[#2e2e2e] p-6 flex flex-col justify-between h-40 relative group overflow-hidden transition-all duration-300 hover:border-[#3368ff]">
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#3368ff]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-[#cfc4c5] tracking-wider font-semibold uppercase">
              CONVERSION RATE
            </span>
            <span className="text-[#3368ff] text-[10px] font-mono border border-[#3368ff]/40 bg-[#3368ff]/5 px-2 py-0.5 font-semibold">
              +0.8%
            </span>
          </div>
          <div>
            <div className="font-display text-2xl lg:text-3xl font-bold text-[#e5e2e1] tracking-tight">
              3.82%
            </div>
            <div className="font-mono text-[10px] text-[#cfc4c5]/55 mt-1 tracking-wider uppercase">
              STOREWIDE AVG
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1c1b1b] border border-[#2e2e2e] overflow-hidden">
        <div className="p-6 md:p-8 border-b border-[#2e2e2e] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-mono text-xs font-semibold text-[#e5e2e1] uppercase tracking-wider">
              WEEKLY REVENUE TRENDS
            </h3>
            <p className="font-mono text-[10px] text-[#cfc4c5] uppercase mt-1">
              Technical Sales Analytics Model v2
            </p>
          </div>
          <button
            type="button"
            className="bg-[#e5e2e1] text-[#131313] px-5 py-2.5 font-mono text-xs font-bold uppercase transition-colors hover:bg-[#3368ff] hover:text-white"
          >
            EXPORT DATA
          </button>
        </div>

        <div className="p-6 overflow-x-auto custom-scrollbar bg-[#131313]">
          <div className="relative min-w-[900px] h-[320px] chart-grid">
            <svg
              className="w-full h-[280px]"
              viewBox={`0 0 ${width} ${height}`}
            >
              <defs>
                <linearGradient
                  id="chartGrad"
                  x1="0%"
                  x2="0%"
                  y1="0%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#3368ff", stopOpacity: 0.35 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#3368ff", stopOpacity: 0.0 }}
                  />
                </linearGradient>
              </defs>

              <line
                x1={paddingX}
                y1={paddingY}
                x2={width - paddingX}
                y2={paddingY}
                stroke="#2a2a2a"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1={paddingX}
                y1={height / 2}
                x2={width - paddingX}
                y2={height / 2}
                stroke="#2a2a2a"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1={paddingX}
                y1={height - paddingY}
                x2={width - paddingX}
                y2={height - paddingY}
                stroke="#2a2a2a"
                strokeWidth="2"
              />

              <path d={areaD} fill="url(#chartGrad)" />
              <path
                d={pathD}
                fill="none"
                stroke="#3368ff"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {points.map((p, idx) => (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() =>
                    setHoveredPoint({
                      index: idx,
                      x: p.x,
                      y: p.y,
                      val: p.val,
                      wk: p.wk,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={hoveredPoint?.index === idx ? 8 : 4}
                    fill={hoveredPoint?.index === idx ? "#ffffff" : "#3368ff"}
                    stroke="#131313"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                  <circle cx={p.x} cy={p.y} r={16} fill="transparent" />
                </g>
              ))}
            </svg>

            {hoveredPoint && (
              <div
                className="absolute bg-[#1c1b1b] border border-[#3368ff] p-3 text-left font-mono text-xs z-10 shadow-xl pointer-events-none"
                style={{
                  left: `${(hoveredPoint.x / width) * 100}%`,
                  top: `${(hoveredPoint.y / height) * 100 - 15}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div className="text-[#cfc4c5]/60 text-[10px] uppercase font-bold">
                  {hoveredPoint.wk} SALES
                </div>
                <div className="text-[#e5e2e1] font-bold text-sm mt-0.5">
                  {hoveredPoint.val}
                </div>
                <div className="text-[#3368ff] text-[9px] mt-1">
                  CLICK FOR DEEPER ANALYSIS
                </div>
              </div>
            )}

            <div className="absolute bottom-1 left-10 right-10 flex justify-between font-mono text-[10px] text-[#cfc4c5] tracking-widest">
              {chartData.map((d, i) => (
                <span key={i}>{d.wk}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1c1b1b] border border-[#2e2e2e] flex flex-col justify-between">
          <div className="p-6 border-b border-[#2e2e2e]">
            <h3 className="font-mono text-xs font-semibold text-[#e5e2e1] uppercase tracking-wider">
              TOP PERFORMING MODELS
            </h3>
          </div>
          <div className="overflow-x-auto custom-scrollbar pb-2">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="border-b border-[#2e2e2e] font-mono text-[10px] text-[#cfc4c5] uppercase">
                  <th className="px-6 py-4">Product Specs</th>
                  <th className="px-6 py-4">Current Stock</th>
                  <th className="px-6 py-4">Sales Amount</th>
                  <th className="px-6 py-4">Performance Indicator</th>
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {topPerformers.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#2e2e2e]/50 hover:bg-[#131313] transition-colors cursor-pointer group"
                    onClick={() => onNavigateToProduct(product.id)}
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#2a2a2a] overflow-hidden flex-shrink-0 flex items-center justify-center p-1 border border-[#2e2e2e] group-hover:border-[#3368ff] transition-colors">
                        {product.imageLink && (
                          <img
                            alt={product.name}
                            src={product.imageLink}
                            className="w-full h-full object-contain filter brightness-95 group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-[#e5e2e1] group-hover:text-[#3368ff] transition-colors">
                          {product.name}
                        </div>
                        <div className="text-[9px] text-[#cfc4c5]/60 mt-0.5">
                          SKU: {product.sku}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#cfc4c5]">
                      {product.sizeStock
                        ? Object.values(product.sizeStock).reduce(
                            (a, b) => a + b,
                            0,
                          )
                        : 0}{" "}
                      UNITS
                    </td>
                    <td className="px-6 py-4 text-[#e5e2e1] font-bold">
                      $
                      {product.salesValue?.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-[#2a2a2a] rounded-none overflow-hidden flex-shrink-0">
                          <div
                            className={`h-full ${product.performanceScore && product.performanceScore < 30 ? "bg-[#ffb4ab]" : "bg-[#3368ff]"}`}
                            style={{
                              width: `${product.performanceScore || 50}%`,
                            }}
                          ></div>
                        </div>
                        <span
                          className={`text-[10px] font-bold ${product.performanceScore && product.performanceScore < 30 ? "text-[#ffb4ab]" : "text-[#3368ff]"}`}
                        >
                          {product.performanceScore}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-[#131313] border-t border-[#2e2e2e] text-center">
            <span className="font-mono text-[9px] text-[#cfc4c5]/50 uppercase tracking-widest">
              LATEST LIVE SNAPSHOT AT {new Date().toLocaleTimeString()} UTC
            </span>
          </div>
        </div>

        <div className="bg-[#1c1b1b] border border-[#2e2e2e]">
          <div className="p-6 border-b border-[#2e2e2e] flex justify-between items-center">
            <h3 className="font-mono text-xs font-semibold text-[#e5e2e1] uppercase tracking-wider">
              RECENT ACTIVITY
            </h3>
            <span
              className="material-symbols-outlined text-[#cfc4c5] text-sm animate-spin cursor-pointer hover:text-white"
              style={{ animationDuration: "6s" }}
            >
              refresh
            </span>
          </div>
          <div className="p-6 space-y-6">
            {displayActivity.map((act, index) => {
              let dotColor = "bg-[#3368ff]";
              if (act.type.includes("RESTOCK"))
                dotColor = "bg-[#cfc4c5] border border-[#4c4546]";
              if (act.type.includes("LOW")) dotColor = "bg-[#ffb4ab]";
              if (act.type.includes("SYSTEM"))
                dotColor = "bg-[#cfc4c5]/40 border border-[#2e2e2e]";

              return (
                <div key={act.id} className="flex gap-4 relative">
                  {index < displayActivity.length - 1 && (
                    <div className="absolute left-1.5 top-6 bottom-[-24px] w-[1px] bg-[#2e2e2e]"></div>
                  )}
                  <div
                    className={`w-3 h-3 rounded-full ${dotColor} mt-1.5 z-10 flex-shrink-0`}
                  ></div>
                  <div>
                    <div className="font-mono text-[11px] font-bold text-[#e5e2e1] tracking-wider uppercase">
                      {act.type}
                    </div>
                    <div className="font-mono text-xs text-[#cfc4c5]/80 mt-1">
                      {act.details}
                    </div>
                    <div className="font-mono text-[9px] text-[#3368ff] opacity-65 mt-1 uppercase tracking-wider font-semibold">
                      {act.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="pt-12 border-t border-[#2e2e2e] flex flex-col md:flex-row justify-between items-center gap-6 text-[#cfc4c5]/75 pb-4">
        <div className="flex flex-wrap justify-center gap-8 font-mono text-[10px] tracking-widest uppercase">
          <div>
            SERVER:{" "}
            <span className="text-[#e5e2e1] font-semibold">US-EAST-01</span>
          </div>
          <div>
            LATENCY: <span className="text-[#3368ff] font-semibold">24MS</span>
          </div>
          <div>
            UPTIME: <span className="text-[#e5e2e1] font-semibold">99.98%</span>
          </div>
          <div>
            GRID CORRECTIONS:{" "}
            <span className="text-[#3368ff] font-semibold">ACTIVE</span>
          </div>
        </div>
        <div className="font-mono text-[10px] tracking-wider text-[#cfc4c5]/50">
          © 2026 SNEAKER LAB OPERATIONS — ENTERPRISE ENCRYPTED
        </div>
      </footer>
    </div>
  );
}
