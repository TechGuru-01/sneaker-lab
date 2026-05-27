import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PRODUCTS } from "../data";
import { ProductCard } from "../components/ProductCard";
import { motion } from "framer-motion";

export const Home = ({
  navigateToPdp,
  onTriggerNotification,
  setFilters,
  setActivePage,
}) => {
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Trending slider ref & actions
  const trendingSliderRef = useRef(null);

  const scrollTrending = (direction) => {
    if (trendingSliderRef.current) {
      const scrollAmount = 420;
      trendingSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    onTriggerNotification(
      `Success! ${newsletterEmail} added to early drops notifications list.`,
    );
    setNewsletterEmail("");
  };

  // Shared animation variants para sa mga scroll-in sections
  const sectionFadeInUp = {
    initial: { opacity: 0, y: 70 },
    whileInView: { opacity: 1, y: 20 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 1, 2, 1] }}
    >
      {/* 1. HERO SECTION */}
      <motion.section
        className="relative h-[85vh] md:h-[90vh] w-full flex items-center overflow-hidden bg-brand-darkest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Parallax Hero Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 2.05, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 0.7 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop"
            alt="Jordan 1 Chicago Side Profile"
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-all duration-1000 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/30 to-transparent"></div>
        </div>

        {/* Grid content aligned left for elegant brutalism */}
        <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full">
          <motion.div
            className="max-w-2xl text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block bg-brand-accent text-white px-3 py-1 text-[10px] font-mono tracking-widest uppercase mb-6">
              HERITAGE CORE SERIES
            </span>

            <h1 className="text-4xl md:text-7xl font-syne font-extrabold text-white mb-6 leading-none tracking-tighter">
              THE CHICAGO <br />
              1985 CHRONICLES
            </h1>

            <p className="text-base md:text-lg text-brand-lightgrey/80 mb-10 max-w-md font-sans leading-relaxed">
              An absolute icon, re-engineered. Fusing the legendary varsity red
              colorway with uncompromising structural integrity and premium
              full-grain leather architecture.
            </p>

            <div className="flex flex-wrap gap-4 font-mono text-xs font-bold tracking-wider">
              <button
                onClick={() => navigateToPdp("architect-01")}
                className="bg-white text-black px-8 py-4 hover:bg-brand-accent hover:text-white transition-all duration-300 cursor-pointer"
              >
                DISCOVER COLLECTION
              </button>
              <button
                onClick={() => {
                  onTriggerNotification(
                    `Lookbook preview module loaded. Full digital manifesto at stores.`,
                  );
                  navigateToPdp("architect-01");
                }}
                className="border border-white/60 text-white px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              >
                VIEW LOOKBOOK
              </button>
            </div>
          </motion.div>
        </div>

        {/* Horizontal / Technical Overlay Specs */}
        <motion.div
          className="absolute bottom-12 right-6 md:right-16 hidden lg:block text-right font-mono text-xs border-r border-brand-accent pr-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="mb-4">
            <span className="block text-[8px] text-brand-lightgrey/50 uppercase tracking-widest">
              Tech Spec 01
            </span>
            <span className="block text-[11px] text-white font-bold tracking-wider uppercase">
              VORTEX CUSHIONING
            </span>
          </div>
          <div>
            <span className="block text-[8px] text-brand-lightgrey/50 uppercase tracking-widest">
              Tech Spec 02
            </span>
            <span className="block text-[11px] text-white font-bold tracking-wider uppercase">
              KINETIC MESH 3.0
            </span>
          </div>
        </motion.div>
      </motion.section>

      {/* 2. TRENDING NOW GALLERY */}
      <motion.section
        className="py-20 md:py-22 bg-brand-black overflow-hidden"
        {...sectionFadeInUp}
      >
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          {/* Header elements and slider arrows */}
          <div className="mb-12 flex justify-between items-end">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl font-syne font-bold uppercase text-white mb-2">
                Trending Now
              </h2>
              <p className="text-brand-lightgrey/60 text-sm">
                Curated selection of the season's most wanted silhouettes.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scrollTrending("left")}
                className="w-10 h-10 border border-brand-grey flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-colors active:scale-95"
                title="Scroll Left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scrollTrending("right")}
                className="w-10 h-10 border border-brand-grey flex items-center justify-center hover:border-brand-accent hover:text-brand-accent transition-colors active:scale-95"
                title="Scroll Right"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Horizontal slider overflow */}
          <div
            ref={trendingSliderRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 scroll-smooth"
          >
            {PRODUCTS.filter((p) =>
              [
                "neon-shift-05",
                "gravity-core",
                "legacy-one",
                "velocity-r",
                "quantum-x1-pro",
              ].includes(p.id),
            ).map((product, index) => (
              <motion.div
                key={product.id}
                className="flex-none w-[300px] md:w-[360px]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onClick={() => navigateToPdp(product.id)}
                  isHovered={hoveredProductId === product.id}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. FEATURED ASYMMETRIC GRID COLLECTIONS */}
      <motion.section
        className="bg-brand-darkest py-20 md:py-32 border-y border-brand-grey/20"
        {...sectionFadeInUp}
      >
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column: Massive block */}
            <motion.div
              className="col-span-12 md:col-span-7 relative h-[450px] md:h-[600px] overflow-hidden group border border-brand-grey/10"
              whileHover={{ scale: 0.99 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApCCk1h5cLck386rXCRwO8_cY3oj0yoqft0bqQH1Y8sU-6jyElrJjKOSJMS8uzku6GBwNxo6BdBYNpalcv_Cn2Ey1mln_H8nNqo8gDAOHLfdCHwJAXQTuFYvDNFsgRncQ-bi6FbWaQ8ZlizFsLkkMUfthQSLfoXR-4nFPNnTV5QB-M_ng_Wg-Tvd90FKfVIwaCW14Us2U5JtW78HwsQAqo5YIW6tYVwbcjc9jBccrPee4pZK625lor4C6sCJRuTsTVN0f49WQ48yJn"
                alt="THE LAB RESERVE"
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-75 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12 text-left">
                <h4 className="text-3xl md:text-5xl font-syne font-extrabold text-white leading-none mb-4 tracking-tighter">
                  THE LAB <br /> RESERVE
                </h4>
                <button
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      category: "all",
                      sortBy: "MOST POPULAR",
                    }));
                    setActivePage("collections");
                  }}
                  className="w-fit border-b-2 border-brand-accent text-white text-[10px] font-mono font-bold tracking-widest pb-1 hover:text-brand-accent transition-colors cursor-pointer"
                >
                  SHOP THE CURATION
                </button>
              </div>
            </motion.div>

            {/* Right Column: Two stacked blocks */}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
              {/* Top Stack: Tech Wear Card */}
              <motion.div
                className="h-[215px] md:h-[288px] relative overflow-hidden group bg-brand-dark border border-brand-grey/10"
                whileHover={{ scale: 0.99 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgn0pyGv8CpKLjao3rMDvsyIq0TNAjI3fx4wuyah0PCuEw-uO6GRaUl3xVD0TKFxR9CObNc2pP8s-7M8QTA7C46AuI5LwKWxiQNCb88YgB83Pl50dKp0Ll0ICnAOF2KKfEfLki6nwKH3ARtLF0Nkpu0DJ10tRDhjCNxfUtBkja_rLup2XxB8Udf6wDbk5yXqD7W4jZH9LFk-GRwp6QW9LFfQLRbA_qrMmBERwUgbF_zC6zsmOrzkhj0e0ozop8s-WfGrgaJMjWZvIe"
                  alt="TECH WEAR"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/50 p-6 md:p-8 flex flex-col justify-end text-left">
                  <h4 className="text-2xl md:text-3xl font-syne font-bold text-white mb-2 leading-none">
                    TECH WEAR
                  </h4>
                  <button
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, category: "running" }));
                      setActivePage("collections");
                    }}
                    className="text-[9px] font-mono font-semibold tracking-widest text-brand-lightgrey hover:text-brand-accent cursor-pointer transition-colors text-left"
                  >
                    EXPLORE INNOVATION
                  </button>
                </div>
              </motion.div>

              {/* Bottom Stack: Street Edge Card */}
              <motion.div
                className="h-[215px] md:h-[288px] relative overflow-hidden group bg-brand-dark border border-brand-grey/10"
                whileHover={{ scale: 0.99 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaAGGT2LWARtOW1onLQUbtQ289fInNHBJIO1MgYOJQ7zCfvdBzysULI2UKXUDBfxIPBWIAGTVJUgO8gnQXfPGaWJ-l8FDI5ZgovDpWDp23v-x3eX7-JBPu9qyk9Qfys5Xih9gVgQZCJujbto5ILulqpDwrj2MNfMKJYmwL9apQRPWRtVQtN67O2lS1Htb8thvHZIYVU4cDHSn1lJPxOiMEXjIFnPf_caf2b64ZX8iOPsZb--Jkc7aW-pgR7VWnq2DMnqYcoP-zVBHb"
                  alt="STREET EDGE"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 font-sans"
                />
                <div className="absolute inset-0 bg-black/50 p-6 md:p-8 flex flex-col justify-end text-left">
                  <h4 className="text-2xl md:text-3xl font-syne font-bold text-white mb-2 leading-none">
                    STREET EDGE
                  </h4>
                  <button
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        category: "lifestyle",
                      }));
                      setActivePage("collections");
                    }}
                    className="text-[9px] font-mono font-semibold tracking-widest text-brand-lightgrey hover:text-brand-accent cursor-pointer transition-colors text-left"
                  >
                    URBAN ESSENTIALS
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. NEW GENDER DIVISION SECTIONS & ADDITIONAL PHOTOS GRID */}
      <motion.section
        className="py-20 md:py-32 bg-brand-black border-t border-brand-grey/20"
        {...sectionFadeInUp}
      >
        <div className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16">
            <span className="text-brand-accent text-xs font-mono font-bold tracking-widest uppercase mb-4 block">
              SHOP BY DIVISION
            </span>
            <h2 className="text-3xl md:text-5xl font-syne font-extrabold text-white mb-4 leading-none uppercase tracking-tighter">
              MEN, WOMEN & KIDS
            </h2>
            <p className="text-brand-lightgrey/60 text-sm max-w-xl">
              Discover specialized footwear engineering built with
              uncompromising focus on modern athletic posture, lightweight
              materials, and structural custom fittings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* MEN'S COLLECTION CARD */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setFilters({
                  category: "all",
                  gender: "men",
                  size: null,
                  colorway: null,
                  maxPrice: 850,
                  sortBy: "NEWEST FIRST",
                });
                setActivePage("collections");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="group relative h-[450px] overflow-hidden border border-brand-grey/15 cursor-pointer bg-brand-darkest hover:border-brand-accent/50 transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80"
                alt="Men's Premium Sneaker Edition"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent flex flex-col justify-end p-8 text-left font-sans">
                <span className="text-[10px] text-brand-accent font-mono font-black tracking-widest mb-1">
                  ELITE PERFORMANCE
                </span>
                <h3 className="text-2xl font-syne font-bold text-white mb-2 uppercase group-hover:text-brand-accent transition-colors">
                  MEN
                </h3>
                <p className="text-brand-lightgrey/70 text-xs mb-4 leading-relaxed max-w-xs">
                  High-rebound response frames and rigid carbon structures
                  customized for aggressive acceleration.
                </p>
                <button className="text-[9px] font-mono font-bold text-white tracking-widest border-b border-white py-1 w-fit group-hover:border-brand-accent transition-colors group-hover:text-brand-accent uppercase">
                  SHOP COLLECTION
                </button>
              </div>
            </motion.div>

            {/* WOMEN'S COLLECTION CARD */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setFilters({
                  category: "all",
                  gender: "women",
                  size: null,
                  colorway: null,
                  maxPrice: 850,
                  sortBy: "NEWEST FIRST",
                });
                setActivePage("collections");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="group relative h-[450px] overflow-hidden border border-brand-grey/15 cursor-pointer bg-brand-darkest hover:border-brand-accent/50 transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80"
                alt="Women's Premium Sneaker Edition"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent flex flex-col justify-end p-8 text-left font-sans">
                <span className="text-[10px] text-brand-accent font-mono font-black tracking-widest mb-1">
                  AESTHETIC SYMMETRY
                </span>
                <h3 className="text-2xl font-syne font-bold text-white mb-2 uppercase group-hover:text-brand-accent transition-colors">
                  WOMEN
                </h3>
                <p className="text-brand-lightgrey/70 text-xs mb-4 leading-relaxed max-w-xs">
                  Featherlight cushion plates paired with deconstructed overlays
                  and sleek, stylish pastel tones.
                </p>
                <button className="text-[9px] font-mono font-bold text-white tracking-widest border-b border-white py-1 w-fit group-hover:border-brand-accent transition-all group-hover:text-brand-accent uppercase">
                  SHOP COLLECTION
                </button>
              </div>
            </motion.div>

            {/* KIDS' COLLECTION CARD */}
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setFilters({
                  category: "all",
                  gender: "kids",
                  size: null,
                  colorway: null,
                  maxPrice: 850,
                  sortBy: "NEWEST FIRST",
                });
                setActivePage("collections");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="group relative h-[450px] overflow-hidden border border-brand-grey/15 cursor-pointer bg-brand-darkest hover:border-brand-accent/50 transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&auto=format&fit=crop&q=80"
                alt="Kids' Premium Mini Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent flex flex-col justify-end p-8 text-left font-sans">
                <span className="text-[10px] text-brand-accent font-mono font-black tracking-widest mb-1">
                  MINI TECH SERIES
                </span>
                <h3 className="text-2xl font-syne font-bold text-white mb-2 uppercase group-hover:text-brand-accent transition-colors">
                  KIDS
                </h3>
                <p className="text-brand-lightgrey/70 text-xs mb-4 leading-relaxed max-w-xs">
                  Robust impact-resistant safeguards and quick velcro strap
                  lockups for unlimited playtime ventures.
                </p>
                <button className="text-[9px] font-mono font-bold text-white tracking-widest border-b border-white py-1 w-fit group-hover:border-brand-accent transition-colors group-hover:text-brand-accent uppercase">
                  SHOP COLLECTION
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 5. BRAND STORY EDITORIAL */}
      <motion.section
        className="py-20 md:py-22 px-6 md:px-16 max-w-7xl mx-auto overflow-hidden"
        {...sectionFadeInUp}
      >
        <div className="grid grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left block information */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 text-left">
            <span className="text-brand-accent text-xs font-mono font-bold tracking-widest uppercase mb-4 block">
              OUR DNA
            </span>
            <h2 className="text-3xl md:text-5xl font-syne font-extrabold text-white mb-6 leading-tight tracking-tighter">
              CRAFTING THE FUTURE
            </h2>
            <p className="text-base text-brand-lightgrey/80 mb-6 leading-relaxed font-sans">
              Born at the intersection of high-fashion and technical
              performance, SNEAKER LAB is more than a boutique. We are a
              sanctuary for footwear enthusiasts who demand uncompromising
              quality and radical design.
            </p>
            <p className="text-sm text-brand-lightgrey/60 mb-8 leading-relaxed font-sans opacity-90">
              Every silhouette in our collection undergoes a rigorous selection
              process. We partner with visionaries who push the boundaries of
              materials, ergonomics, and aesthetic expression to deliver
              products that don't just walk the street—they define it.
            </p>

            <button
              onClick={() => {
                onTriggerNotification(
                  `Manifesto is bound inside our upcoming print publication. Stay signed inside drops.`,
                );
              }}
              className="inline-flex items-center gap-2 text-white hover:text-brand-accent transition-colors font-mono text-xs font-bold tracking-widest cursor-pointer group uppercase"
            >
              READ THE MANIFESTO
              <ArrowRight
                size={14}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>

          {/* Right block artwork drawing */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 relative">
            <div className="relative p-6 md:p-12">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6u_k7OohnLiRQb2_P0iG_aEmENFEzwahjDizE3MmkiB5eZPfg4n5mM7EuWjkWr6zMnNc5GFf_Z28bN8PdufW7Fy8-tseZrlEAOQon_O8RA_jcNc7-PcDuVpZZqh5dQ_cM5ohSnsaCe7st4AEBEKq_NbKNvzdUWq9t_27Ak98pFfCmoXR23BIRL4FD-vkpt2vf9U2DPjeMN-4F7bd92pKvv7Vf9tudHqoV_GymmdIeKFsDnDfxn9ja9yTIPemcufrPUpe_wKCZLiBB"
                alt="Artisanal drawing craft"
                className="w-full h-auto grayscale filter border border-brand-grey relative z-10 hover:grayscale-0 transition-all duration-700"
              />
              <motion.div
                className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-accent opacity-10 transform"
                initial={{ translateX: 0, translateY: 0 }}
                whileInView={{ translateX: 16, translateY: -16 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              ></motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. JOIN THE INNER CIRCLE NEWSLETTER */}
      <motion.section
        className="bg-brand-medium py-20 px-6 md:px-16 text-center border-t border-brand-grey/20"
        {...sectionFadeInUp}
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl md:text-3xl font-syne font-semibold uppercase text-white mb-2 tracking-tight">
            JOIN THE INNER CIRCLE
          </h3>
          <p className="text-sm text-brand-lightgrey/60 mb-8 max-w-sm mx-auto font-sans">
            Get early access to drops and exclusive brand events.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="max-w-md mx-auto flex flex-col md:flex-row gap-4"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="flex-grow bg-transparent border-0 border-b border-white/60 focus:border-brand-accent text-white font-mono text-xs uppercase p-3 outline-none"
              style={{ borderRadius: "0px" }}
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 text-xs font-mono font-bold tracking-widest hover:bg-brand-accent hover:text-white transition-all cursor-pointer"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </motion.section>
    </motion.div>
  );
};
