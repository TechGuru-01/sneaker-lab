import React from 'react';

export default function AnalyticsEngines() {
  return (
    <div className="space-y-12 animate-fade-in text-[#e5e2e1]">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#2e2e2e] pb-8 gap-4">
        <div>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold uppercase leading-none tracking-tight">
            ANALYTICS ENGINES
          </h1>
          <p className="font-mono text-[10px] text-[#3368ff] flex items-center gap-2 mt-3 font-semibold uppercase">
            <span className="w-2 h-2 bg-[#3368ff]"></span>
            Footwear sales, return frequencies and technical forecasts
          </p>
        </div>
        <div className="font-mono text-xs text-[#cfc4c5]/60 pr-2">
          METRICS SEGMENT / <span className="text-[#3368ff]">LIVE QUANTUM FORECAST V2</span>
        </div>
      </div>

      {/* Core analytics specs layout stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section A: sales stats */}
        <div className="bg-[#1c1b1b] border border-[#2e2e2e] p-6 space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#3368ff]">
            CATEGORY PERFORMANCE SHARES
          </h3>
          <div className="space-y-4 pt-2 font-mono text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>TECH RUNNERS</span>
                <span className="font-bold">42.4% SHARE</span>
              </div>
              <div className="w-full h-1.5 bg-[#131313] rounded-none overflow-hidden">
                <div className="h-full bg-[#3368ff]" style={{ width: '42.4%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>LIFESTYLE PREMIUM</span>
                <span className="font-bold">35.8% SHARE</span>
              </div>
              <div className="w-full h-1.5 bg-[#131313] rounded-none overflow-hidden">
                <div className="h-full bg-[#3368ff]" style={{ width: '35.8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>COLLECTOR GRAILS</span>
                <span className="font-bold">14.2% SHARE</span>
              </div>
              <div className="w-full h-1.5 bg-[#131313] rounded-none overflow-hidden">
                <div className="h-full bg-[#3368ff]" style={{ width: '14.2%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section B: operations stats */}
        <div className="bg-[#1c1b1b] border border-[#2e2e2e] p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-4">
              VELOCITY INDICATOR SEGMENTS
            </h3>
            <p className="font-sans text-[#cfc4c5] text-xs leading-relaxed max-w-sm">
              Our machine learning algorithms forecast a +14.2% increase in Running Category demand upcoming season. Double-check your upper Dyneema materials stock thresholds.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 font-mono text-center pt-4 border-t border-[#2e2e2e]/40">
            <div>
              <div className="text-[10px] text-[#cfc4c5]/60 mb-0.5">ESTIMATED GROWTH</div>
              <div className="text-xl font-bold text-[#4ade80]">+24.5% MOY</div>
            </div>
            <div>
              <div className="text-[10px] text-[#cfc4c5]/60 mb-0.5">LEAST SECURE UNIT</div>
              <div className="text-xl font-bold text-[#ffb4ab]">VIVID JORDANS</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
