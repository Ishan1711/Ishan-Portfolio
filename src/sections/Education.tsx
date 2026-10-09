"use client";

import { motion } from "framer-motion";

export function Education() {
  return (
    <section
      id="education"
      className="relative w-full bg-transparent text-white py-32 lg:py-48 selection:bg-white/20 border-t border-zinc-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Numbering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 flex justify-center lg:justify-start"
        >
          <span className="text-xs tracking-[0.4em] text-zinc-500 font-medium uppercase">
            05 / Education
          </span>
        </motion.div>

        {/* Main Composition */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-16 lg:gap-8">
          
          {/* Left: Oversized Headline */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[12vw] sm:text-[10vw] lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.9]"
            >
              Academic<br />
              <span className="text-zinc-700">Foundation</span>
            </motion.h2>
          </div>

          {/* Right: Focused Degree Details */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative p-8 sm:p-12 w-full max-w-xl border border-zinc-900 bg-[#080808]/50 backdrop-blur-sm group hover:border-zinc-700 transition-colors duration-700"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-[1px] bg-zinc-500" />
              <div className="absolute top-0 left-0 w-[1px] h-2 bg-zinc-500" />
              <div className="absolute bottom-0 right-0 w-2 h-[1px] bg-zinc-500" />
              <div className="absolute bottom-0 right-0 w-[1px] h-2 bg-zinc-500" />
              
              <div className="flex flex-col gap-8">
                {/* Degree Title */}
                <div>
                  <h3 className="text-sm sm:text-base tracking-[0.3em] uppercase text-zinc-500 mb-2">
                    Degree
                  </h3>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    B.Tech in Computer Science & Engineering
                  </div>
                </div>

                {/* University & CGPA */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 pt-8 border-t border-zinc-900 group-hover:border-zinc-800 transition-colors duration-700">
                  <div className="flex-1">
                    <h4 className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-600 mb-2">
                      Institution
                    </h4>
                    <p className="text-sm sm:text-base font-medium text-zinc-300">
                      Lovely Professional University
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-600 mb-2">
                      Performance
                    </h4>
                    <p className="text-xl sm:text-2xl font-bold text-white">
                      8.59 <span className="text-sm text-zinc-500 font-normal">CGPA</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
      
      {/* Background Watermark/Abstract Typography */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.02 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black tracking-tighter whitespace-nowrap pointer-events-none select-none"
      >
        LPU
      </motion.div>
    </section>
  );
}

