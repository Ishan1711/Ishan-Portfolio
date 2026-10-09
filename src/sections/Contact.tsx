"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050505] text-white pt-32 lg:pt-48 pb-8 selection:bg-white/20 border-t border-zinc-900 flex flex-col min-h-screen"
    >
      <div className="flex-1 max-w-7xl mx-auto px-6 w-full flex flex-col justify-center">
        
        {/* Section Numbering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-24"
        >
          <span className="text-xs tracking-[0.4em] text-zinc-500 font-medium uppercase">
            06 / Contact
          </span>
        </motion.div>

        {/* Main Composition */}
        <div className="flex flex-col gap-12 lg:gap-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[12vw] sm:text-[10vw] lg:text-[8vw] font-extrabold tracking-tighter uppercase leading-[0.9]"
          >
            Have a good<br />
            <span className="text-zinc-600">project in mind?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-end gap-12 sm:gap-24"
          >
            {/* Email Link */}
            <a
              href="mailto:ishanchoudhary1711@gmail.com"
              className="group flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-8 focus-visible:ring-offset-[#050505] rounded-lg"
            >
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors duration-300">
                Email
              </span>
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors duration-300">
                  ishanchoudhary1711<br className="sm:hidden" />@gmail.com
                </span>
                <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 text-zinc-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="w-full h-[1px] bg-zinc-800 group-hover:bg-zinc-500 transition-colors duration-500 mt-2" />
            </a>

            {/* GitHub Link */}
            <a
              href="https://github.com/Ishan1711"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-8 focus-visible:ring-offset-[#050505] rounded-lg"
            >
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-zinc-500 font-semibold group-hover:text-zinc-400 transition-colors duration-300">
                GitHub
              </span>
              <div className="flex items-center gap-4">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors duration-300">
                  Ishan1711
                </span>
                <ArrowUpRight className="w-6 h-6 lg:w-8 lg:h-8 text-zinc-500 group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="w-full h-[1px] bg-zinc-800 group-hover:bg-zinc-500 transition-colors duration-500 mt-2" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Restrained Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="w-full mt-auto pt-32 px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-zinc-900 pt-8 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium">
          <span>&copy; {currentYear || "2026"} Ishan Choudhary</span>
          <span>All Rights Reserved</span>
        </div>
      </motion.div>

    </section>
  );
}

