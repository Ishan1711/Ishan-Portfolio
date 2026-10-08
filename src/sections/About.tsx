"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section 
      id="about" 
      className="relative w-full bg-[#050505] text-white py-24 sm:py-32 lg:py-48 overflow-hidden selection:bg-white/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
          
          {/* Section Marker */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs tracking-[0.4em] text-zinc-500 font-medium uppercase">
              01 / About
            </span>
          </motion.div>

          {/* Large Editorial Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h2 className="text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.9]">
              I don&apos;t just build<br/>
              <span className="text-zinc-600">functionality.</span><br/>
              I build experiences<br/>
              around it.
            </h2>
          </motion.div>

          {/* Grid for Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mt-4 sm:mt-8">
            
            {/* Supporting Paragraph & Identity */}
            <div className="lg:col-span-7 flex flex-col gap-12 sm:gap-16">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-lg md:text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl"
              >
                I am a Full-Stack Developer and Computer Science Engineering student dedicated to engineering modern, robust web applications. My focus is on writing clean, scalable code and continuously expanding my technical capabilities to deliver complete, well-crafted solutions.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-widest text-zinc-600 uppercase font-semibold">Focus</span>
                  <span className="text-sm md:text-base text-zinc-300 font-medium">Full-Stack<br/>Development</span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-widest text-zinc-600 uppercase font-semibold">Education</span>
                  <span className="text-sm md:text-base text-zinc-300 font-medium">B.Tech CSE<br/>Lovely Professional<br/>University</span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] tracking-widest text-zinc-600 uppercase font-semibold">CGPA</span>
                  <span className="text-sm md:text-base text-zinc-300 font-medium">8.59</span>
                </div>
              </motion.div>
            </div>

            {/* Approach / Principles */}
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
              <div className="flex flex-col gap-4 sm:gap-6 border-l border-zinc-900 pl-6 sm:pl-8">
                {[
                  "BUILD WITH INTENT", 
                  "MAKE IT FEEL RIGHT", 
                  "REFINE. SHIP. REPEAT."
                ].map((principle, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 + (index * 0.15) }}
                    className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-zinc-500"
                  >
                    {principle}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
