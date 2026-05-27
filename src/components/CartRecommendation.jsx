import React from "react";
import { Sparkles } from "lucide-react";

export const CartRecommendations = ({
  navigateToPdp,
  setFilters,
  setActivePage,
  onTriggerNotification,
}) => {
  return (
    <section className="mt-28 border-t border-brand-grey/20 pt-16">
      <div className="flex justify-between items-end mb-10 text-left">
        <div>
          <h2 className="text-xs font-mono font-bold tracking-widest text-brand-accent uppercase mb-2">
            RECOMMENDED
          </h2>
          <h3 className="text-2xl md:text-3xl font-syne font-bold uppercase text-white tracking-tight">
            Complete The Look
          </h3>
        </div>
        <button
          onClick={() => {
            setFilters((prev) => ({ ...prev, category: "all" }));
            setActivePage("collections");
          }}
          className="font-mono text-xs font-bold border-b border-brand-accent text-brand-accent pb-1 cursor-pointer tracking-wider hover:text-white"
        >
          VIEW ACCESSORIES
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 select-none font-mono">
        {/* Related jacket card */}
        <div
          onClick={() => navigateToPdp("vanguard-shell")}
          className="group cursor-pointer text-left"
        >
          <div className="aspect-[3/4] bg-brand-dark relative overflow-hidden border border-brand-grey/20 mb-4 group-hover:border-white/20 transition-all duration-300">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoLaAAUP0Fq0JGKB1yS7I9czXQKSz0KQB-oqVuOrfHdXeEb-_WM-nGa44m1Ehx5oUeHGjhVZ0qMk9qrOsguklVnCvFCHbrqZrg_dEBHuQN_cR2PvnTG25iIIkM06b89roC_t5SlYsH58s4xvNJgDJvfHvY2M2_6RxxagxoAHtOp4Z-vq1gXB9PD0xGEF10FM6I4ApPkGkw4G_yUVPP4sb3PUuOvY26Fxzw0h16iHc2WHOpSWLUHdcblDrkF7PIPW3eQXN4jaHDcuEA"
              alt="Tech-Shell Jacket option"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 rounded-none grayscale"
            />
            <div className="absolute bottom-4 left-4 font-mono font-semibold text-[9px]">
              <span className="bg-brand-accent text-white px-2.5 py-1 tracking-widest uppercase">
                NEW
              </span>
            </div>
          </div>
          <h4 className="text-xs font-bold text-white uppercase leading-none group-hover:text-brand-accent">
            TECH-SHELL JACKET
          </h4>
          <p className="text-[11px] text-brand-lightgrey/50 leading-none mt-1.5">
            $185.00
          </p>
        </div>

        {/* Related red runner card */}
        <div
          onClick={() => navigateToPdp("pulse-runner-red")}
          className="group cursor-pointer text-left"
        >
          <div className="aspect-[3/4] bg-brand-dark relative overflow-hidden border border-brand-grey/20 mb-4 group-hover:border-white/20 transition-all duration-300">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAujnomUMqd7BpAtA0XIkY0H8ofXHCQLH5E-FLu7otUrR_TL1J34nAbiMp6hwA6t_dqG8Fk8L5FFxGFIk0VZli4DUCjjWxDOG4pwMXJiRULX_guPSaLBACRA7m4Tfjs1tLZhuVwKxBTYJywOMy6OTP7OQPZfERMGx9cvYOU3muInteZ5Q86Vbl7qvLf9h6vFCI2vhTkq0a1lC88y1ocmNphD-s7Yg83Ntfw6r9bys1OsMkxcPyznKWLJ6PWgzmxutOt4x-iSmme--iS"
              alt="Pulse runner option"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 rounded-none"
            />
          </div>
          <h4 className="text-xs font-bold text-white uppercase leading-none group-hover:text-brand-accent">
            PULSE RUNNER RED
          </h4>
          <p className="text-[11px] text-brand-lightgrey/50 leading-none mt-1.5">
            $220.00
          </p>
        </div>

        {/* Lab membership promotional banner */}
        <div className="col-span-1 md:col-span-2 h-full bg-brand-darkest border border-brand-grey/25 p-8 flex flex-col justify-center items-center text-center">
          <Sparkles
            size={36}
            className="text-brand-accent mb-4 cursor-pointer"
          />
          <h3 className="text-sm md:text-base font-syne font-bold text-white mb-2 uppercase tracking-wide">
            LAB MEMBERSHIP
          </h3>
          <p className="text-xs font-sans text-brand-lightgrey/60 max-w-xs mb-6 leading-relaxed">
            Gain exclusive access to drop alerts, technical archives, and
            member-only performance events.
          </p>
          <button
            onClick={() =>
              onTriggerNotification(
                "Welcome to VIP membership! Early drop access codes sent to elijahboon986@gmail.com.",
              )
            }
            className="border border-white hover:bg-white hover:text-black font-semibold text-[10px] tracking-widest text-white px-6 py-2.5 transition-all text-center cursor-pointer uppercase"
          >
            JOIN THE LAB
          </button>
        </div>
      </div>
    </section>
  );
};
