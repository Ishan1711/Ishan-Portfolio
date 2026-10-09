"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STATEMENTS = [
  "I build what comes next.",
  "Ideas, engineered into experiences.",
  "Building beyond the expected.",
];

export function Hero() {
  const [statementIndex, setStatementIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setStatementIndex((prev) => (prev + 1) % STATEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent selection:bg-white/20"
    >
      {/* Background Noise Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 20%, transparent 100%)',
        }}
      />

      {/* Subtle pointer ambient effect */}
      {isClient && (
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-50 transition-opacity duration-700 ease-in-out"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.025), transparent 40%)`
          }}
        />
      )}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 max-w-7xl mx-auto mt-[-8vh] sm:mt-[-5vh]">
        
        {/* Name Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
            ISHAN CHOUDHARY
          </h1>
        </motion.div>

        {/* Role Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="mt-6 sm:mt-8"
        >
          <h2 className="text-xs sm:text-sm md:text-base tracking-[0.4em] sm:tracking-[0.6em] text-zinc-300 font-semibold ml-[0.4em] sm:ml-[0.6em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            FULL-STACK DEVELOPER
          </h2>
        </motion.div>

        {/* Dynamic Statements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 sm:mt-16 h-8 sm:h-12 relative flex items-center justify-center w-full"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={statementIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute text-base sm:text-xl md:text-2xl text-zinc-200 font-light text-center w-full drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]"
            >
              {STATEMENTS[statementIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <a 
            href="#projects" 
            onClick={(e) => handleSmoothScroll(e, "projects")}
            className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white text-black text-xs sm:text-sm tracking-widest font-semibold overflow-hidden transition-all duration-500 hover:bg-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer"
          >
            <span className="relative z-10">EXPLORE MY WORK</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleSmoothScroll(e, "contact")}
            className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-white text-xs sm:text-sm tracking-widest font-medium overflow-hidden transition-all duration-500 bg-black/40 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer"
          >
            <span className="absolute inset-0 border border-zinc-800 transition-colors duration-500 group-hover:border-zinc-500" />
            <span className="relative z-10 text-zinc-300 transition-colors duration-500 group-hover:text-white">LET&apos;S CONNECT</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] sm:text-xs tracking-[0.3em] text-zinc-600 font-medium ml-[0.3em]">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
