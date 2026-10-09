"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_CATEGORIES } from "@/data/skills";

type HoveredSkill = {
  name: string;
  category: string;
  type: string;
} | null;

export function Capabilities() {
  const [hoveredSkill, setHoveredSkill] = useState<HoveredSkill>(null);

  return (
    <section
      id="capabilities"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 lg:py-48 selection:bg-white/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column - Sticky Heading & Interactive Preview */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 flex flex-col justify-between min-h-[40vh] sm:min-h-[50vh] lg:min-h-[calc(100vh-16rem)] gap-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-xs tracking-[0.4em] text-zinc-400 font-medium uppercase">
                    02 / Capabilities
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="mt-12 sm:mt-16 text-[12vw] sm:text-7xl md:text-8xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.9]"
                >
                  What<br />
                  I Work<br />
                  <span className="text-zinc-400">With</span>
                </motion.h2>
              </div>

              {/* Interactive Capability Preview Panel (Desktop) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-16 lg:mt-auto h-24 sm:h-32 flex flex-col justify-end"
              >
                <AnimatePresence mode="wait">
                  {!hoveredSkill ? (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-xs sm:text-sm tracking-[0.3em] text-zinc-400 uppercase font-semibold">
                        SELECT A TECHNOLOGY
                      </span>
                      <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase">
                        TO EXPLORE
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={hoveredSkill.name}
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-2 sm:gap-3"
                    >
                      <span className="text-[10px] sm:text-xs tracking-[0.3em] text-zinc-400 uppercase font-semibold">
                        {hoveredSkill.category}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight">
                          {hoveredSkill.name}
                        </span>
                        <span className="text-[10px] sm:text-xs tracking-[0.2em] text-cyan-300 uppercase mt-1 sm:mt-2 font-mono">
                          {hoveredSkill.type}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Skill Categories */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-16 sm:gap-24 mt-8 lg:mt-0 pt-4 lg:pt-32">
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 + idx * 0.1 }}
                className="flex flex-col gap-8 border-t border-zinc-900 pt-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs tracking-[0.3em] text-zinc-400 uppercase font-semibold">
                    {category.title}
                  </h3>
                  <span className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase font-mono hidden sm:inline">
                    {category.type}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-6">
                  {category.skills.map((skill, i) => (
                    <li
                      key={i}
                      tabIndex={0}
                      role="button"
                      aria-label={`${skill}, ${category.type}`}
                      onMouseEnter={() =>
                        setHoveredSkill({
                          name: skill,
                          category: category.title,
                          type: category.type,
                        })
                      }
                      onMouseLeave={() => setHoveredSkill(null)}
                      onTouchStart={() =>
                        setHoveredSkill({
                          name: skill,
                          category: category.title,
                          type: category.type,
                        })
                      }
                      onFocus={() =>
                        setHoveredSkill({
                          name: skill,
                          category: category.title,
                          type: category.type,
                        })
                      }
                      onBlur={() => setHoveredSkill(null)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setHoveredSkill({
                            name: skill,
                            category: category.title,
                            type: category.type,
                          });
                        }
                      }}
                      className="text-xl sm:text-2xl md:text-3xl text-zinc-400 font-light transition-colors duration-500 hover:text-white focus-visible:text-white focus-visible:outline-none cursor-pointer group relative inline-block"
                    >
                      {skill}
                      <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-focus-visible:w-full opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Floating Interactive Feedback Banner for Mobile & Tablet */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed bottom-6 inset-x-4 sm:inset-x-6 z-40 max-w-md mx-auto p-4 rounded-xl bg-[#090b0e]/95 border border-zinc-700/80 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.85)] flex items-center justify-between gap-4 pointer-events-auto"
          >
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-semibold truncate">
                {hoveredSkill.category}
              </span>
              <span className="text-base sm:text-lg font-medium text-white tracking-tight truncate mt-0.5">
                {hoveredSkill.name}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-mono px-2 py-1 rounded bg-zinc-800/80 text-cyan-300 border border-cyan-800/50">
                {hoveredSkill.type}
              </span>
              <button
                type="button"
                onClick={() => setHoveredSkill(null)}
                aria-label="Close preview"
                className="w-6 h-6 flex items-center justify-center rounded-full text-zinc-400 hover:text-white bg-zinc-800/60 text-xs"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

