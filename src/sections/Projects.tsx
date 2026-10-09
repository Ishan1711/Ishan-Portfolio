"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "@/components/ProjectPreviews";

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#050505] text-white py-24 sm:py-32 lg:py-48 selection:bg-white/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column - Sticky Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 flex flex-col justify-between min-h-[30vh] sm:min-h-[40vh] lg:min-h-0 lg:h-[calc(100vh-16rem)]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-xs tracking-[0.4em] text-zinc-500 font-medium uppercase">
                    03 / Selected Work
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="mt-12 sm:mt-16 text-[12vw] sm:text-7xl md:text-8xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.9]"
                >
                  Things<br />
                  I&apos;ve<br />
                  <span className="text-zinc-600">Built</span>
                </motion.h2>
              </div>

              {/* Current Project Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-16 lg:mt-auto flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  {PROJECTS.map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "h-[2px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        hoveredIndex === i ? "w-12 bg-white" : "w-6 bg-zinc-800"
                      )}
                    />
                  ))}
                </div>
                <div className="text-xs tracking-widest text-zinc-500 uppercase font-medium">
                  {hoveredIndex !== null 
                    ? `0${hoveredIndex + 1} / ${PROJECTS[hoveredIndex].name}`
                    : "Explore Projects"}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Project List */}
          <div 
            className="lg:col-span-7 flex flex-col gap-24 lg:gap-40 mt-8 lg:mt-0 pt-4 lg:pt-32"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onTouchStart={() => setHoveredIndex(idx)}
                className={cn(
                  "flex flex-col gap-8 transition-opacity duration-700 ease-in-out",
                  hoveredIndex !== null && hoveredIndex !== idx ? "opacity-30" : "opacity-100"
                )}
              >
                
                {/* Visual Preview Area */}
                <motion.div 
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-video bg-[#0a0a0a] border border-zinc-900 overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 transition-colors duration-700 group-hover:bg-[#0c0c0c]/50">
                    <ProjectVisual id={project.id} />
                  </div>
                  {/* Subtle hover overlay effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-700 pointer-events-none" />
                </motion.div>

                {/* Project Header */}
                <div className="flex flex-col gap-4 cursor-pointer group">
                  <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-semibold">
                    {String(idx + 1).padStart(2, "0")} / {project.category}
                  </span>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter transition-colors duration-500 group-hover:text-zinc-300">
                    {project.name}
                  </h3>
                </div>

                {/* Info & Links */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-4">
                  <div className="md:col-span-8 flex flex-col gap-8">
                    <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {project.links.live && (
                        <a 
                          href={project.links.live} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group/link flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-white hover:text-zinc-300 transition-colors duration-300"
                        >
                          <span className="relative">
                            Live
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full" />
                          </span>
                          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </a>
                      )}
                      {project.links.github && (
                        <a 
                          href={project.links.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group/link flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-zinc-500 hover:text-white transition-colors duration-300"
                        >
                          <span className="relative">
                            Source
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full" />
                          </span>
                          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div className="md:col-span-4 flex flex-col gap-2 sm:gap-3">
                    {project.technologies.map(tech => (
                      <span key={tech} className="text-[10px] sm:text-xs text-zinc-600 uppercase tracking-[0.2em] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}



