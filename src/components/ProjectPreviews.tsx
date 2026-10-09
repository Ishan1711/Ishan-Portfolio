import { cn } from "@/lib/utils";

export function PhishScopePreview() {
  return (
    <div className="w-full h-full bg-[#030303] flex flex-col p-4 sm:p-6 font-mono text-[10px] sm:text-xs">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
        <div className="text-zinc-400">ANALYSIS REPORT</div>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-zinc-300">SPF: PASS</span>
          <span className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-zinc-300">DKIM: PASS</span>
          <span className="px-2 py-1 bg-[#1a0f0f] border border-[#3a1a1a] text-red-400">DMARC: FAIL</span>
        </div>
      </div>
      
      <div className="flex-1 flex gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-zinc-600 mb-2">HEADER DATA</div>
          {[
            { label: "Return-Path", val: "<bounces@suspicious-domain.net>" },
            { label: "Received", val: "from mail.suspicious-domain.net (192.168.1.105)" },
            { label: "Message-ID", val: "<20261009.abc@suspicious-domain.net>" },
            { label: "X-Mailer", val: "Custom Bulk Mailer v1.2" }
          ].map((row, i) => (
            <div key={i} className="flex border-b border-zinc-900 pb-1">
              <span className="w-24 text-zinc-500">{row.label}</span>
              <span className="text-zinc-300 truncate">{row.val}</span>
            </div>
          ))}
        </div>
        
        <div className="w-1/3 border-l border-zinc-900 pl-4 flex flex-col">
          <div className="text-zinc-600 mb-4">RISK ASSESSMENT</div>
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-light text-white leading-none">87</span>
            <span className="text-zinc-500 mb-1">/100</span>
          </div>
          <div className="h-1 w-full bg-zinc-900 mb-4">
            <div className="h-full bg-red-900/50 w-[87%] border-r border-red-500" />
          </div>
          <div className="flex flex-col gap-1 text-zinc-400">
            <span>&gt; Domain mismatch</span>
            <span>&gt; High volume IP</span>
            <span>&gt; Suspicious X-Mailer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChemistryAIPreview() {
  return (
    <div className="w-full h-full bg-[#050505] flex text-xs font-sans">
      <div className="w-1/4 border-r border-zinc-900 p-4 flex flex-col gap-4 hidden sm:flex">
        <div className="text-zinc-500 text-[10px] uppercase tracking-widest">History</div>
        <div className="flex flex-col gap-2">
          {["Aldol Condensation", "sp3 Hybridization", "Buffer Solutions", "Hess's Law"].map((item, i) => (
            <div key={i} className="text-zinc-400 truncate opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-4 sm:p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {["General", "Organic", "Inorganic", "Reactions", "Comparison"].map((mode, i) => (
            <div key={i} className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap text-[10px] uppercase tracking-wider border",
              i === 1 ? "bg-zinc-800 border-zinc-700 text-white" : "bg-transparent border-zinc-800 text-zinc-500"
            )}>
              {mode}
            </div>
          ))}
        </div>
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="self-end max-w-[80%] bg-zinc-900 text-zinc-200 p-3 rounded-lg rounded-tr-none">
            Explain the mechanism of an SN2 reaction.
          </div>
          <div className="self-start max-w-[90%] bg-transparent border border-zinc-800 text-zinc-300 p-4 rounded-lg rounded-tl-none">
            <div className="flex items-center gap-2 mb-2 text-zinc-500 text-[10px] uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
              Chem-AI
            </div>
            <p className="leading-relaxed text-zinc-400">
              An S<sub className="text-[8px]">N</sub>2 reaction is a bimolecular nucleophilic substitution where bond breaking and forming occur simultaneously (concerted mechanism). The nucleophile attacks from the backside of the leaving group, resulting in an inversion of stereochemistry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SecureSysPreview() {
  return (
    <div className="w-full h-full bg-[#020202] p-4 sm:p-6 font-mono flex flex-col text-xs sm:text-sm">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4">
        <div className="text-zinc-500 text-[10px] tracking-widest uppercase">SecureSys Terminal / v2.1.4</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-zinc-400 rounded-full" />
          <span className="text-zinc-400 text-[10px] uppercase">Active</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-2 overflow-hidden text-zinc-400">
        <div className="flex items-center gap-4">
          <span className="text-zinc-600">ROLE:</span>
          <span className="text-white bg-zinc-800 px-2">SYS_ADMIN</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-zinc-600">ACCESS:</span>
          <span className="text-zinc-500">[rwx] core_bin, [r-x] user_data</span>
        </div>
        
        <div className="text-zinc-300">
          <span className="text-zinc-600">admin@securesys:~$</span> ./init_sandbox --level=strict
        </div>
        <div className="text-zinc-500 pl-4 border-l border-zinc-800 ml-2">
          [OK] Verifying RBAC policies...<br/>
          [OK] Allocating isolated memory space...<br/>
          [OK] Sandbox initialized (ID: 0x4F9A)
        </div>
        
        <div className="text-zinc-300 mt-2">
          <span className="text-zinc-600">admin@securesys:~$</span> cat /var/log/auth.log
        </div>
        <div className="text-red-400/80 pl-4 border-l border-red-900/50 ml-2">
          [DENIED] Policy violation: Action requires AUDITOR role.
        </div>
        
        <div className="text-zinc-300 mt-2 flex items-center">
          <span className="text-zinc-600">admin@securesys:~$</span>
          <span className="w-2 h-4 bg-zinc-400 ml-2 animate-pulse" />
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
            Visual Preview / Phase 9 Target
          </span>
        </div>
      );
  }
}

