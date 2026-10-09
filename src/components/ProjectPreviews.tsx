"use client";

import { cn } from "@/lib/utils";

export function PhishScopePreview() {
  return (
    <div className="w-full h-full bg-[#06080a] flex flex-col p-4 sm:p-6 font-mono text-[10px] sm:text-xs select-none">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3 mb-4 shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-zinc-300 font-semibold tracking-wider text-[11px] sm:text-xs">PHISHSCOPE ENGINE</span>
          <span className="hidden sm:inline text-zinc-600 text-[10px]">· 1.3s ANALYSIS</span>
        </div>
        <div className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest text-right shrink-0">
          Illustrative Preview · Sample Data
        </div>
      </div>
      
      {/* Content Split */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 sm:gap-6 min-h-0 overflow-hidden">
        {/* Left Column: Email Header Inspection */}
        <div className="flex-1 flex flex-col gap-2 min-w-0 justify-between">
          <div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-semibold">
              HEADER INTROSPECTION
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { label: "Return-Path", val: "<auth-relay@gateway.internal>" },
                { label: "Origin-IP", val: "198.51.100.42 (TLS 1.3 Verified)" },
                { label: "Message-ID", val: "<sec-audit-9021@gateway.internal>" },
                { label: "MIME-Check", val: "text/plain (Zero Suspicious Relays)" }
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between border-b border-zinc-900/90 pb-1 gap-2">
                  <span className="text-zinc-500 shrink-0">{row.label}</span>
                  <span className="text-zinc-300 truncate text-right font-light">{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Authentication Badge Strip */}
          <div className="pt-2 border-t border-zinc-900/80 flex flex-wrap gap-2 items-center">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest shrink-0">AUTH PROTOCOLS:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-[9px] font-medium">SPF: PASS</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-[9px] font-medium">DKIM: PASS</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-[9px] font-medium">DMARC: PASS</span>
          </div>
        </div>
        
        {/* Right Column: Threat Assessment Matrix */}
        <div className="w-full md:w-5/12 border-t md:border-t-0 md:border-l border-zinc-900/90 pt-3 md:pt-0 md:pl-5 flex flex-col justify-between shrink-0">
          <div>
            <div className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest mb-3 font-semibold">
              RISK EVALUATION
            </div>
            
            {/* Risk Gauge */}
            <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800/60 mb-3">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-zinc-400 text-[10px]">RISK SCORE</span>
                <span className="text-emerald-400 font-bold text-xs">08 / 100 (LOW)</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                <div className="w-[8%] h-full bg-emerald-400 rounded-full" />
              </div>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-1 text-[9px] sm:text-[10px] text-zinc-400">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Domain alignment verified
              </span>
              <span className="text-zinc-300 flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Cryptographic signatures valid
              </span>
              <span className="text-zinc-300 flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Sender reputation normal
              </span>
            </div>
          </div>

          <div className="text-[8px] text-zinc-600 mt-2 truncate">
            Automated Threat Assessment Report
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChemistryAIPreview() {
  return (
    <div className="w-full h-full bg-[#070709] flex text-xs font-sans overflow-hidden select-none">
      {/* Sidebar: Conversation Sessions (Desktop only) */}
      <div className="w-1/4 border-r border-zinc-900/90 p-4 flex flex-col gap-4 hidden sm:flex shrink-0 bg-[#050507]">
        <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold">Sessions</div>
        <div className="flex flex-col gap-2 font-mono text-[11px]">
          {[
            { title: "SN2 vs SN1 Mechanism", active: true },
            { title: "Aldol Condensation", active: false },
            { title: "sp³ Hybridization", active: false },
            { title: "Buffer Equilibrium", active: false }
          ].map((item, i) => (
            <div 
              key={i} 
              className={cn(
                "px-2 py-1 rounded truncate transition-colors",
                item.active 
                  ? "bg-zinc-800/80 text-white font-medium border border-zinc-700/60" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 min-w-0 justify-between">
        {/* Header & Modes */}
        <div>
          <div className="flex justify-between items-center mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="text-zinc-300 font-semibold text-xs tracking-wider font-mono">CHEM-AI ASSISTANT</span>
            </div>
            <div className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest text-right">
              Illustrative Preview · Sample Query
            </div>
          </div>
          
          {/* Mode Pill Bar */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 shrink-0">
            {["General", "Organic", "Inorganic", "Reactions", "Comparison"].map((mode, i) => (
              <div 
                key={i} 
                className={cn(
                  "px-2.5 py-1 rounded-full whitespace-nowrap text-[9px] sm:text-[10px] uppercase tracking-wider border font-mono transition-colors",
                  i === 1 
                    ? "bg-zinc-800 text-cyan-300 border-cyan-800/50 font-medium" 
                    : "bg-transparent border-zinc-800/80 text-zinc-500"
                )}
              >
                {mode}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col gap-3 justify-center min-h-0 overflow-hidden">
          {/* User Prompt */}
          <div className="self-end max-w-[85%] bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 p-2.5 sm:p-3 rounded-xl rounded-tr-sm text-[11px] sm:text-xs">
            Explain the mechanism and stereochemical outcome of an S<sub>N</sub>2 reaction.
          </div>

          {/* AI Response */}
          <div className="self-start max-w-[95%] bg-zinc-950/80 border border-zinc-800/70 text-zinc-300 p-3 sm:p-4 rounded-xl rounded-tl-sm overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-1.5 text-zinc-500 text-[9px] uppercase tracking-wider font-mono">
              <span className="text-cyan-400 font-semibold">Chem-AI Synthesis · Organic Mode</span>
              <span className="text-zinc-600">Rate = k[Substrate][Nu⁻]</span>
            </div>
            <p className="leading-relaxed text-zinc-300 text-[10px] sm:text-[11px] font-light">
              An S<sub>N</sub>2 reaction is a bimolecular concerted nucleophilic substitution. The nucleophile attacks 180° opposite the leaving group (backside attack), yielding a complete <span className="text-white font-medium">Walden inversion of stereochemistry</span>.
            </p>
          </div>
        </div>

        {/* Mock Input Bar */}
        <div className="mt-3 pt-2 border-t border-zinc-900/80 flex items-center justify-between text-[10px] text-zinc-600 font-mono">
          <span>Ask a chemistry query...</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[9px]">ENTER ↵</span>
        </div>
      </div>
    </div>
  );
}

export function SecureSysPreview() {
  return (
    <div className="w-full h-full bg-[#050607] p-4 sm:p-6 font-mono flex flex-col text-[10px] sm:text-xs select-none overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2.5 mb-3 shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700/40" />
          </div>
          <span className="text-zinc-400 text-[11px] font-semibold tracking-wider ml-1">securesys-v2.1 [sandboxed-cli]</span>
        </div>
        <div className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-widest shrink-0 text-right">
          Illustrative Preview · RBAC Engine
        </div>
      </div>
      
      {/* RBAC Status Strip */}
      <div className="flex flex-wrap items-center justify-between bg-zinc-950/80 border border-zinc-800/60 rounded px-2.5 py-1.5 mb-3 shrink-0 gap-2 text-[9px] sm:text-[10px]">
        <div className="flex items-center gap-3">
          <span className="text-zinc-500">ACTIVE_ROLE:</span>
          <span className="text-emerald-300 font-semibold bg-emerald-950/40 border border-emerald-800/50 px-1.5 py-0.5 rounded">SYS_ADMIN</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-500">
          <span>SANDBOX:</span>
          <span className="text-zinc-300 font-mono">ENFORCED (rwx: restricted)</span>
        </div>
      </div>
      
      {/* Terminal Log Stream */}
      <div className="flex-1 flex flex-col gap-1.5 justify-center text-zinc-400 overflow-hidden leading-relaxed">
        <div className="text-zinc-300">
          <span className="text-emerald-400">admin@securesys:~$</span> sysctl --verify-sandbox-policy
        </div>
        
        <div className="text-zinc-500 pl-3 border-l border-zinc-800 ml-1 flex flex-col gap-0.5 text-[9px] sm:text-[10px]">
          <span>[00.012s] Initializing capability-based sandboxing kernel...</span>
          <span>[00.034s] Auditing DAC/MAC syscall filters: [read, write, ioctl_restricted]</span>
          <span className="text-emerald-400/90">[00.051s] Unauthorized syscall blocked: execve(/bin/root_sh) -&gt; TRAPPED (EPERM)</span>
          <span className="text-zinc-300">[00.068s] Security state verified: Zero privilege leak detected.</span>
        </div>
        
        <div className="text-zinc-300 mt-1 flex items-center">
          <span className="text-emerald-400">admin@securesys:~$</span>
          <span className="ml-1 text-zinc-400 font-light">monitor --active-channels</span>
          <span className="w-1.5 h-3.5 bg-zinc-300 ml-1.5 animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  );
}

export function ProjectVisual({ id }: { id: string }) {
  switch (id) {
    case "phishscope":
      return <PhishScopePreview />;
    case "chemistry-ai":
      return <ChemistryAIPreview />;
    case "securesys":
      return <SecureSysPreview />;
    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-[#080808]">
          <span className="text-zinc-800 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
            Visual Preview
          </span>
        </div>
      );
  }
}
