import React from "react";
import { Globe, Instagram, Twitter, MapPin, ChevronRight } from "lucide-react";

export const Footer = ({ onTriggerNotification }) => {
  return (
    <footer className="w-full mt-24 bg-brand-darkest border-t border-brand-grey/20 relative overflow-hidden select-none">
      
     
      <div className="absolute -bottom-10 left-6 md:left-12 select-none pointer-events-none opacity-[0.06] flex items-center justify-start z-0 font-syne font-extrabold tracking-tighter w-full">
        <span className="text-7xl md:text-[140px] uppercase font-bold whitespace-nowrap leading-none select-none">
          LOGO.
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-12 gap-8 md:gap-gutter px-6 md:px-16 py-16 max-w-7xl mx-auto text-left w-full">
        
        {/* Main Info Column */}
        <div className="col-span-12 lg:col-span-4 mb-8 lg:mb-0">
          <h4 className="text-base md:text-lg font-syne font-bold text-white mb-4 tracking-wider uppercase">
            LOGO.
          </h4>
          <p className="text-xs text-brand-lightgrey/60 max-w-xs mb-8 leading-relaxed font-sans font-medium">
            The ultimate destination for premium footwear and technical streetwear apparel. Curating the future of style since 2024.
          </p>
          <div className="flex gap-4">
            <button onClick={() => onTriggerNotification("Redirecting to international portal...")} className="text-brand-lightgrey/50 hover:text-brand-accent transition-colors cursor-pointer" title="International Portal">
              <Globe size={18} />
            </button>
            <button onClick={() => onTriggerNotification("Opening premium Instagram feed...")} className="text-brand-lightgrey/50 hover:text-brand-accent transition-colors cursor-pointer" title="Instagram">
              <Instagram size={18} />
            </button>
            <button onClick={() => onTriggerNotification("Opening Twitter / X handle...")} className="text-brand-lightgrey/50 hover:text-brand-accent transition-colors cursor-pointer" title="Twitter">
              <Twitter size={18} />
            </button>
          </div>
        </div>

        {/* Nav column 1 */}
        <div className="col-span-6 lg:col-span-2">
          <h5 className="text-[10px] font-mono tracking-widest text-white mb-5 font-bold uppercase">
            NAVIGATE
          </h5>
          <ul className="flex flex-col gap-3 font-mono text-[10px] tracking-widest text-brand-lightgrey/50 font-bold uppercase">
            <li>
              <button onClick={() => onTriggerNotification("Directing to brand story...")} className="hover:text-white transition-colors cursor-pointer text-left">
                BRAND STORY
              </button>
            </li>
            <li>
              <button onClick={() => onTriggerNotification("Opening sustainability manifesto...")} className="hover:text-white transition-colors cursor-pointer text-left">
                SUSTAINABILITY
              </button>
            </li>
            <li>
              <button onClick={() => onTriggerNotification("Directing to careers portal...")} className="hover:text-white transition-colors cursor-pointer text-left">
                CAREERS
              </button>
            </li>
            <li>
              <button onClick={() => onTriggerNotification("Loading store locations map...")} className="hover:text-white transition-colors cursor-pointer text-left">
                STORES
              </button>
            </li>
          </ul>
        </div>

        {/* Nav column 2 */}
        <div className="col-span-6 lg:col-span-2">
          <h5 className="text-[10px] font-mono tracking-widest text-white mb-5 font-bold uppercase">
            SUPPORT
          </h5>
          <ul className="flex flex-col gap-3 font-mono text-[10px] tracking-widest text-brand-lightgrey/50 font-bold uppercase">
            <li>
              <button onClick={() => onTriggerNotification("Loading shipping logistics rules...")} className="hover:text-white transition-colors cursor-pointer text-left">
                SHIPPING
              </button>
            </li>
            <li>
              <button onClick={() => onTriggerNotification("Loading easy returns panel...")} className="hover:text-white transition-colors cursor-pointer text-left">
                RETURNS
              </button>
            </li>
            <li>
              <button onClick={() => onTriggerNotification("Opening FAQ helpdesk...")} className="hover:text-white transition-colors cursor-pointer text-left">
                FAQ
              </button>
            </li>
            <li>
              <button onClick={() => onTriggerNotification("Opening support portal contact form...")} className="hover:text-white transition-colors cursor-pointer text-left">
                CONTACT
              </button>
            </li>
          </ul>
        </div>

        {/* Flagship Boutique card column */}
        <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
          <h5 className="text-[10px] font-mono tracking-widest text-white mb-5 font-bold uppercase">
            FIND A BOUTIQUE
          </h5>
          <div 
            onClick={() => onTriggerNotification("VIP reservation system loaded. Contacting NYC Flagship managers: elijahboon986@gmail.com")}
            className="p-5 border border-brand-grey/30 flex items-center justify-between hover:border-brand-accent transition-all cursor-pointer group bg-brand-dark/15 font-mono"
          >
            <div className="flex items-center gap-3">
              <MapPin className="text-brand-accent shrink-0 animate-bounce" size={16} />
              <span className="text-[10px] tracking-widest font-bold text-white uppercase">
                NYC FLAGSHIP
              </span>
            </div>
            <ChevronRight className="group-hover:translate-x-1.5 transition-transform text-white" size={14} />
          </div>
        </div>

        {/* Bottom copyright declaration block */}
        <div className="col-span-12 mt-16 border-t border-brand-grey/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-brand-lightgrey/40 font-bold uppercase tracking-widest relative z-10 w-full">
          <span>© 2026 SNEAKER LAB. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6">
            <button onClick={() => onTriggerNotification("Loading privacy policies terms...")} className="hover:text-white transition-all cursor-pointer">
              PRIVACY POLICY
            </button>
            <button onClick={() => onTriggerNotification("Loading terms of service details...")} className="hover:text-white transition-all cursor-pointer">
              TERMS OF SERVICE
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
