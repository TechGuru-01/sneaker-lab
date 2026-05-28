import React from 'react';

export default function CustomersSegment() {
  return (
    <div className="space-y-12 animate-fade-in text-[#e5e2e1]">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2e2e2e] pb-8 gap-4">
        <div>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold uppercase leading-none tracking-tight">
            CUSTOMERS SEGMENT
          </h1>
          <p className="font-mono text-[10px] text-[#3368ff] flex items-center gap-2 mt-3 font-semibold uppercase">
            <span className="w-2 h-2 bg-[#3368ff]"></span>
            Premium Registered Client Indices
          </p>
        </div>
        <div className="font-mono text-xs text-[#cfc4c5]/60 pr-2">
          CLIENT SEGMENTS / <span className="text-[#3368ff]">99.8% RETENTION</span>
        </div>
      </div>

      {/* Customers Overview Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        <div className="p-5 bg-[#1c1b1b] border border-[#2e2e2e]">
          <span className="text-[9px] text-[#cfc4c5]/55 block font-bold mb-1 uppercase">TOTAL ACCOUNTS</span>
          <p className="text-2xl font-bold">5,482 MEMBERS</p>
        </div>
        <div className="p-5 bg-[#1c1b1b] border border-[#2e2e2e]">
          <span className="text-[9px] text-[#cfc4c5]/55 block font-bold mb-1 uppercase text-[#3368ff]">VIP COLLECTORS</span>
          <p className="text-2xl font-bold text-[#3368ff]">482 HIGH-VALUE</p>
        </div>
        <div className="p-5 bg-[#1c1b1b] border border-[#2e2e2e]">
          <span className="text-[9px] text-[#cfc4c5]/55 block font-bold mb-1 uppercase">AVG LIFETIME LEDGER</span>
          <p className="text-2xl font-bold">$2,845.00 NET</p>
        </div>
      </div>

      {/* Customers visual directory list */}
      <div className="bg-[#131313] border border-[#2e2e2e] overflow-hidden">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="bg-[#1c1b1b] border-b border-[#2e2e2e] text-[10px] text-[#cfc4c5] uppercase tracking-wider">
              <th className="p-4">Customer Segment</th>
              <th className="p-4">Membership Level</th>
              <th className="p-4">Total Purchases</th>
              <th className="p-4">% Authentication Clearance</th>
              <th className="p-4 text-right">Operational Log</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2e2e2e]/40">
            <tr className="hover:bg-[#1c1b1b] transition-colors leading-relaxed">
              <td className="p-4 font-bold text-white">Marcus Thorne</td>
              <td className="p-4">
                <span className="text-[#3368ff] bg-[#3368ff]/10 border border-[#3368ff] px-2 py-0.5 text-[9px] font-bold">
                  PREMIUM MEMBER
                </span>
              </td>
              <td className="p-4">12 Purchases</td>
              <td className="p-4 text-[#4ade80]">100% SECURE</td>
              <td className="p-4 text-right text-[#cfc4c5]">2 Mins Ago via Stripe</td>
            </tr>
            <tr className="hover:bg-[#1c1b1b] transition-colors leading-relaxed">
              <td className="p-4 font-bold text-white">Elena Rodriguez</td>
              <td className="p-4">
                <span className="bg-[#2a2a2a] text-[#cfc4c5] px-2 py-0.5 text-[9px] font-bold">
                  STANDARD MEMBER
                </span>
              </td>
              <td className="p-4">4 Purchases</td>
              <td className="p-4 text-[#4ade80]">100% SECURE</td>
              <td className="p-4 text-right text-[#cfc4c5]">14 Mins Ago via Stripe</td>
            </tr>
            <tr className="hover:bg-[#1c1b1b] transition-colors leading-relaxed">
              <td className="p-4 font-bold text-white">Kaito Tanaka</td>
              <td className="p-4">
                <span className="text-[#ffb4ab] bg-[#ffb4ab]/10 border border-[#ffb4ab] px-2 py-0.5 text-[9px] font-bold">
                  COLLECTOR SPECIAL
                </span>
              </td>
              <td className="p-4">48 Purchases</td>
              <td className="p-4 text-[#4ade80]">100% SECURE</td>
              <td className="p-4 text-right text-[#cfc4c5]">1 Hour Ago via Ledger</td>
            </tr>
            <tr className="hover:bg-[#1c1b1b] transition-colors leading-relaxed">
              <td className="p-4 font-bold text-white">Vance Prescott</td>
              <td className="p-4">
                <span className="text-[#3368ff] bg-[#3368ff]/10 border border-[#3368ff] px-2 py-0.5 text-[9px] font-bold">
                  PREMIUM MEMBER
                </span>
              </td>
              <td className="p-4">9 Purchases</td>
              <td className="p-4 text-[#3368ff]">99.2% RE-AUTH</td>
              <td className="p-4 text-right text-[#cfc4c5]">2 Days Ago via Wire</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
