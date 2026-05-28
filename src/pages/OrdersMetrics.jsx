import React, { useState } from 'react';

export default function OrdersMetrics({ orders, onStatusChange }) {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL STATUSES');
  const [selectedTimeframe, setSelectedTimeframe] = useState('LATEST 30 DAYS');
  const [editingOrderId, setEditingOrderId] = useState(null);

  // Filter lists based on status selection
  const filteredOrders = orders.filter(ord => {
    if (selectedStatusFilter === 'ALL STATUSES') return true;
    return ord.status === selectedStatusFilter;
  });

  const dailyRevenueRange = "$142,500";
  const authRatePercent = "99.8%";

  const handleExportReport = () => {
    alert("GENERATING ENCRYPTED ORDER REPORT SYSTEM\n• Processing records...\n• Authentication logs linked.\nDocument downloaded in console sandbox.");
    console.log("EXPORTED SNEAKER LAB ORDER METRICS REGISTER:", orders);
  };

  return (
    <div className="space-y-12 animate-fade-in text-[#e5e2e1]">
      {/* Header and KPI side metrics */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-8 border-b border-[#2e2e2e]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#3368ff]"></div>
            <span className="font-mono text-xs font-bold text-[#3368ff] tracking-widest uppercase">
              LIVE LAB STATUS
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-none">
            Orders &amp;<br />Metrics
          </h1>
        </div>

        {/* Highlight board stats right align */}
        <div className="grid grid-cols-2 gap-12 w-full lg:w-auto font-mono">
          <div className="border-l border-[#2e2e2e] pl-6 py-2">
            <p className="text-[10px] text-[#cfc4c5]/60 mb-2 tracking-widest font-bold uppercase">DAILY REVENUE</p>
            <p className="text-2xl md:text-3xl font-extrabold text-white">{dailyRevenueRange}</p>
          </div>
          <div className="border-l border-[#2e2e2e] pl-6 py-2">
            <p className="text-[10px] text-[#cfc4c5]/60 mb-2 tracking-widest font-bold uppercase">AUTH RATE</p>
            <p className="text-2xl md:text-3xl font-extrabold text-[#3368ff]">{authRatePercent}</p>
          </div>
        </div>
      </section>

      {/* Control filters panel */}
      <section className="flex flex-wrap items-center justify-between gap-6 pb-2">
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          {/* Status Dropdown selector */}
          <div className="relative group w-full sm:w-56">
            <select 
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full bg-[#1c1b1b] border border-[#2e2e2e] hover:border-[#3368ff] px-5 py-3.5 pr-10 font-mono text-xs tracking-wider uppercase focus:outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="ALL STATUSES">ALL STATUSES</option>
              <option value="AUTHENTICATING">AUTHENTICATING</option>
              <option value="PROCESSING">PROCESSING</option>
              <option value="SHIPPED">SHIPPED</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#cfc4c5] text-base">
              expand_more
            </span>
          </div>

          {/* Timeframe Dropdown selector */}
          <div className="relative group w-full sm:w-56">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="w-full bg-[#1c1b1b] border border-[#2e2e2e] hover:border-[#3368ff] px-5 py-3.5 pr-10 font-mono text-xs tracking-wider uppercase focus:outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="LATEST 30 DAYS">LATEST 30 DAYS</option>
              <option value="THIS QUARTER">THIS QUARTER</option>
              <option value="ARCHIVE 2025">ARCHIVE 2025</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#cfc4c5] text-base">
              calendar_today
            </span>
          </div>
        </div>

        <button 
          onClick={handleExportReport}
          className="w-full sm:w-auto bg-[#e5e2e1] text-[#131313] px-8 py-3.5 font-mono text-xs font-bold hover:bg-[#3368ff] hover:text-white transition-all uppercase tracking-wider block"
        >
          EXPORT REPORT
        </button>
      </section>

      {/* Orders Bento Table block */}
      <section className="space-y-4">
        {/* Table Headers (Hidden on Mobile) */}
        <div className="grid grid-cols-12 px-6 py-4 border border-[#2e2e2e] bg-[#0e0e0e] hidden md:grid">
          <div className="col-span-1 font-mono text-[10px] text-[#cfc4c5] tracking-widest font-bold uppercase font-semibold">ORDER REGISTER ID</div>
          <div className="col-span-4 font-mono text-[10px] text-[#cfc4c5] tracking-widest font-bold uppercase font-semibold">COLLECTION SPECIMEN</div>
          <div className="col-span-2 font-mono text-[10px] text-[#cfc4c5] tracking-widest font-bold uppercase font-semibold">CUSTOMER ACCOUNT</div>
          <div className="col-span-2 font-mono text-[10px] text-[#cfc4c5] tracking-widest font-bold uppercase font-semibold">LEDGER VALUE</div>
          <div className="col-span-2 font-mono text-[10px] text-[#cfc4c5] tracking-widest font-bold uppercase font-semibold">PROCESS STATUS</div>
          <div className="col-span-1 font-mono text-[10px] text-[#cfc4c5] tracking-widest font-bold uppercase text-right font-semibold">ACTION</div>
        </div>

        {/* Orders List items */}
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono border border-[#2e2e2e] text-[#cfc4c5]/50 uppercase tracking-widest">
            NO SNEAKER ORDER HAS REGISTERED WITH SPECIFIED STATUS QUERY.
          </div>
        ) : (
          filteredOrders.map((order) => {
            let badgeDot = 'bg-[#3368ff]';
            let badgeText = 'text-[#3368ff]';
            
            if (order.status === 'PROCESSING') {
              badgeDot = 'bg-[#cfc4c5]';
              badgeText = 'text-[#cfc4c5]';
            } else if (order.status === 'SHIPPED') {
              badgeDot = 'bg-[#4ade80]';
              badgeText = 'text-[#4ade80]';
            }

            return (
              <div 
                key={order.id}
                className="grid grid-cols-1 md:grid-cols-12 items-center px-6 py-8 border border-[#2e2e2e] hover:border-[#3368ff] transition-all bg-[#0e0e0e] md:bg-transparent hover:bg-[#1c1b1b]/30 gap-y-4"
              >
                {/* ID Column */}
                <div className="col-span-1 font-mono text-xs text-[#3368ff] font-bold">
                  {order.id}
                </div>

                {/* Sneaker product specifications */}
                <div className="col-span-4 flex items-center gap-6">
                  <div className="w-20 h-20 bg-[#2a2a2a] overflow-hidden flex-shrink-0 relative border border-[#2e2e2e]">
                    <img 
                      alt={order.productName} 
                      className="w-full h-full object-cover filter brightness-95"
                      src={order.productImage} 
                    />
                  </div>
                  <div>
                    <p className="font-display text-sm md:text-base font-bold uppercase tracking-tight text-white">
                      {order.productName}
                    </p>
                    <p className="font-mono text-[10px] text-[#cfc4c5]/60 mt-1 uppercase">
                      SIZE: {order.size} / {order.gender}
                    </p>
                  </div>
                </div>

                {/* Customer information details */}
                <div className="col-span-2">
                  <p className="font-sans text-xs md:text-sm text-[#e5e2e1] font-semibold">
                    {order.customerName}
                  </p>
                  <p className="font-mono text-[9px] text-[#cfc4c5]/60">
                    {order.customerTier}
                  </p>
                </div>

                {/* Price Ledger */}
                <div className="col-span-2">
                  <p className="font-mono text-sm font-bold text-white">
                    ${order.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <span className="font-mono text-[9px] text-[#cfc4c5]/40 uppercase block mt-0.5">
                    TRANSACTION SIGNED
                  </span>
                </div>

                {/* Live status tag with pulse trigger */}
                <div className="col-span-2 flex flex-col items-start gap-1">
                  {editingOrderId === order.id ? (
                    <div className="relative w-full z-10">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          onStatusChange(order.id, e.target.value);
                          setEditingOrderId(null);
                        }}
                        onBlur={() => setEditingOrderId(null)}
                        className="bg-[#1c1b1b] border border-[#3368ff] text-white p-1 text-[10px] font-mono uppercase tracking-widest focus:outline-none"
                        autoFocus
                      >
                        <option value="AUTHENTICATING">AUTHENTICATING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                      </select>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setEditingOrderId(order.id)}
                      className="flex items-center gap-2 cursor-pointer group/status hover:opacity-80 border border-transparent hover:border-[#2e2e2e] p-1 -ml-1"
                    >
                      <span className={`w-2 h-2 rounded-none ${badgeDot} ${order.status === 'AUTHENTICATING' ? 'animate-pulse' : ''}`}></span>
                      <span className={`font-mono text-[10px] font-semibold tracking-wider ${badgeText}`}>
                        {order.status}
                      </span>
                      <span className="material-symbols-outlined text-[10px] opacity-0 group-hover/status:opacity-50 text-white">
                        edit
                      </span>
                    </div>
                  )}
                  <span className="font-mono text-[9px] text-[#cfc4c5]/40 lowercase mt-0.5">
                    {order.timeAgo}
                  </span>
                </div>

                {/* Edit details link */}
                <div className="col-span-1 text-right">
                  <button 
                    onClick={() => {
                      const newStatusMap = {
                        AUTHENTICATING: 'PROCESSING',
                        PROCESSING: 'SHIPPED',
                        SHIPPED: 'AUTHENTICATING'
                      };
                      onStatusChange(order.id, newStatusMap[order.status]);
                    }}
                    className="material-symbols-outlined text-[#cfc4c5] hover:text-[#3368ff] transition-colors"
                    title="Advance / Cycle Order State"
                  >
                    open_in_new
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Pagination component matching design specs */}
      <section className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-[#2e2e2e] pt-6 gap-4">
        <p className="font-mono text-[10px] text-[#cfc4c5]/60 uppercase tracking-widest">
          SHOWING {filteredOrders.length} OF {orders.length} REGISTERED ORDERS
        </p>
        <div className="flex gap-2">
          <button className="w-10 h-10 border border-[#2e2e2e] flex items-center justify-center hover:bg-[#1c1b1b] transition-all disabled:opacity-35 cursor-not-allowed text-[#cfc4c5]" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 border border-[#3368ff] bg-[#3368ff]/10 flex items-center justify-center font-mono text-xs font-bold text-[#e5e2e1]">
            1
          </button>
          <button className="w-10 h-10 border border-[#2e2e2e] flex items-center justify-center hover:bg-[#1c1b1b] transition-all font-mono text-xs text-[#cfc4c5]">
            2
          </button>
          <button className="w-10 h-10 border border-[#2e2e2e] flex items-center justify-center hover:bg-[#1c1b1b] transition-all font-mono text-xs text-[#cfc4c5]">
            3
          </button>
          <button className="w-10 h-10 border border-[#2e2e2e] flex items-center justify-center hover:bg-[#1c1b1b] transition-all text-[#cfc4c5]">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );
}
