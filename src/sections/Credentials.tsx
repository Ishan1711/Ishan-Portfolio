"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CREDENTIALS } from "@/data/credentials";

export function Credentials() {
  return (
    <section
      id="credentials"
      className="relative w-full bg-[#050505] text-white py-24 sm:py-32 lg:py-48 selection:bg-white/20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column - Section Header */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-xs tracking-[0.4em] text-zinc-500 font-medium uppercase">
                  04 / Credentials
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="mt-12 sm:mt-16 text-[12vw] sm:text-7xl md:text-8xl lg:text-8xl font-extrabold tracking-tighter uppercase leading-[0.9]"
              >
                Proof<br />
                Of<br />
                <span className="text-zinc-600">Learning</span>
              </motion.h2>
            </div>
          </div>

          {/* Right Column - Credential List */}
          <div className="lg:col-span-7 flex flex-col gap-0 mt-8 lg:mt-0 pt-4 lg:pt-32 border-t border-zinc-900 lg:border-none">
            {CREDENTIALS.map((cred, idx) => (
              <motion.a
                key={cred.id}
                href={cred.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 + idx * 0.1 }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-12 border-b border-zinc-900 hover:border-zinc-700 transition-colors duration-500"
              >
                <div className="flex flex-col gap-4 sm:gap-6 sm:w-2/3 pr-8">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] sm:text-xs text-zinc-600 font-mono">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors duration-300 leading-tight">
                      {cred.title}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-zinc-500 pl-8 sm:pl-10">
                    <span className="uppercase tracking-widest text-[10px] sm:text-xs font-semibold text-zinc-400">
                      {cred.issuer}
                    </span>
                    <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-800" />
                    <span className="text-xs">
                      {cred.date}
                    </span>
                  </div>
                </div>

                <div className="mt-8 sm:mt-0 flex items-center gap-2 sm:pl-10 sm:w-1/3 sm:justify-end text-zinc-500 group-hover:text-white transition-colors duration-300">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold">
                    View Certificate
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
