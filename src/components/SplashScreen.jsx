import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";

export const SplashScreen = ({ onComplete }) => {
  const [splashProgress, setSplashProgress] = useState(0);
  const [currentSplashLog, setCurrentSplashLog] = useState("INITIALIZING SNEAKER LAB CORE SYSTEMS...");
  const [showSplash, setShowSplash] = useState(true);

  // Splash loader simulated timer logic
  useEffect(() => {
    let progressInterval = setInterval(() => {
      setSplashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setShowSplash(false);
            onComplete();
          }, 300);
          return 100;
        }
        // Rapid random additions for technical loader feel
        const step = Math.floor(Math.random() * 8) + 6;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 110);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  // Sync log strings according to current loader percentages
  useEffect(() => {
    if (splashProgress < 20) {
      setCurrentSplashLog("STABILIZING DECONSTRUCTED MATRIX RAILS...");
    } else if (splashProgress < 40) {
      setCurrentSplashLog("CALIBRATING CARBON-FIBER HEEL SUPPORT CODES...");
    } else if (splashProgress < 65) {
      setCurrentSplashLog("RETRIEVING SPECTRAL VOLT GRADIENT CHANNELS...");
    } else if (splashProgress < 85) {
      setCurrentSplashLog("RESOLVING OPTIMAL STRESS-STREAK LUG EQUATIONS...");
    } else {
      setCurrentSplashLog("SNEAKER ARCHITECT SYSTEM ONLINE. DEPLOYING PORTAL...");
    }
  }, [splashProgress]);

  const handleSkip = () => {
    setShowSplash(false);
    onComplete();
  };

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            y: -30,
            filter: "blur(12px)",
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[99999] bg-brand-black flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Top Line HUD Metadata */}
          <div className="flex justify-between items-start border-b border-brand-grey/20 pb-6 font-mono text-[9px] md:text-xs text-brand-lightgrey/40">
            <div className="flex flex-col gap-1">
              <div>[SYSTEM INTRO PORTAL // LAB CHANNELS LOADED]</div>
              <div className="text-brand-accent font-bold">[ONLINE STATUS // FULL ENVIRONMENT ACTIVE]</div>
            </div>
            <div className="text-right hidden sm:block">
              <div>HOST // 0.0.0.0:3000</div>
              <div>LOC // HIGH-FIDELITY TESTING AREA</div>
            </div>
          </div>

          {/* Central Logo and Animated Progress */}
          <div className="flex-1 flex flex-col items-center justify-center py-12 max-w-4xl mx-auto w-full relative">
            {/* Ambient Back Glow */}
            <div className="absolute w-[280px] h-[280px] md:w-[480px] md:h-[480px] bg-brand-accent/5 rounded-full filter blur-[80px] pointer-events-none animate-pulse"></div>

            {/* Technical grid crosshairs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border border-brand-grey/10 rounded-full hidden md:block"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-brand-grey/5 rounded-full hidden md:block"></div>
            
            {/* Visual Branding Title */}
            <div className="text-center z-10 space-y-4 md:space-y-6">
              <span className="text-brand-accent text-[9px] md:text-xs font-mono font-black tracking-[0.25em] uppercase block animate-pulse">
                // LOGO. CORE RE-BOOT //
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-syne font-extrabold text-white leading-none tracking-tighter uppercase select-none">
               LOGO.
              </h1>
              
              {/* Brutalist loading meter */}
              <div className="pt-8 max-w-md mx-auto space-y-4">
                <div className="flex justify-between text-xs font-mono tracking-widest text-brand-lightgrey/60">
                  <span className="uppercase text-[9px] text-brand-lightgrey/40">PREPARING DIRECTORY ASSETS...</span>
                  <span className="text-white font-bold">{Math.round(splashProgress)}%</span>
                </div>
                
                {/* Horizontal progress stack */}
                <div className="h-[2px] bg-brand-grey/25 w-full relative overflow-hidden">
                  <div 
                    className="h-full bg-brand-accent transition-all duration-150 ease-out"
                    style={{ width: `${splashProgress}%` }}
                  ></div>
                </div>

                {/* Simulated live logs ticker */}
                <div className="text-[10px] font-mono text-brand-accent/90 tracking-widest h-4 overflow-hidden text-center uppercase min-h-[16px]">
                  {currentSplashLog}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Control & Info HUD */}
          <div className="border-t border-brand-grey/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
            <p className="text-brand-lightgrey/30 text-[9px] uppercase text-center sm:text-left">
              ©2026 SNEAKER LAB CORE ESTABLISHED. ALL RIGHTS PROTECTED.
            </p>
            <button
              onClick={handleSkip}
              className="px-5 py-2.5 bg-white/5 hover:bg-brand-accent text-white hover:text-white uppercase text-[10px] tracking-widest font-black transition-all duration-300 border border-white/10 hover:border-brand-accent flex items-center gap-2 group cursor-pointer"
            >
              SKIP SYSTEM INTRO
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
