import { cn } from "@/lib/utils";

export function PhishScopePreview() {
  return (
    <div className="w-full h-full bg-[#030303] flex flex-col p-4 sm:p-6 font-mono text-[10px] sm:text-xs">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
        <div className="text-zinc-400">ANALYSIS REPORT</div>
        <div className="text-[8px] sm:text-[10px] text-zinc-600 uppercase tracking-widest text-right">
          Illustrative Preview &middot; Sample Data
        </div>
      </div>
      
      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="text-zinc-600 mb-2">HEADER DATA</div>
          {[
            { label: "Return-Path", val: "<bounces@example.test>" },
            { label: "Received", val: "from mail.example.test (192.0.2.1)" },
            { label: "Message-ID", val: "<sample-id@example.test>" },
            { label: "X-Mailer", val: "Sample Mailer v1.0" }
          ].map((row, i) => (
            <div key={i} className="flex border-b border-zinc-900 pb-1">
              <span className="w-24 text-zinc-500 shrink-0">{row.label}</span>
              <span className="text-zinc-300 truncate">{row.val}</span>
            </div>
          ))}
        </div>
        
        <div className="w-1/3 border-l border-zinc-900 pl-4 flex flex-col shrink-0">
          <div className="text-zinc-600 mb-4">RISK ANALYSIS PANEL</div>
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500">SPF</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500">DKIM</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500">DMARC</span>
          </div>
          <div className="flex flex-col gap-1 text-zinc-500">
            <span className="truncate">&gt; Indicator analysis</span>
            <span className="truncate">&gt; Volume tracking</span>
            <span className="truncate">&gt; Header evaluation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChemistryAIPreview() {
  return (
    <div className="w-full h-full bg-[#050505] flex text-xs font-sans overflow-hidden">
      <div className="w-1/4 border-r border-zinc-900 p-4 flex flex-col gap-4 hidden sm:flex shrink-0">
        <div className="text-zinc-500 text-[10px] uppercase tracking-widest">History</div>
        <div className="flex flex-col gap-2">
          {["Aldol Condensation", "sp3 Hybridization", "Buffer Solutions", "Hess's Law"].map((item, i) => (
            <div key={i} className="text-zinc-400 truncate opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-4 sm:p-6 min-w-0">
        <div className="flex justify-between items-center mb-4 shrink-0">
          <div className="text-[8px] sm:text-[10px] text-zinc-600 uppercase tracking-widest w-full text-right">
            Illustrative Preview &middot; Sample Conversation
          </div>
        </div>
        
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide shrink-0">
          {["General", "Organic", "Inorganic", "Reactions", "Comparison"].map((mode, i) => (
            <div key={i} className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap text-[10px] uppercase tracking-wider border",
              i === 1 ? "bg-zinc-800 border-zinc-700 text-white" : "bg-transparent border-zinc-800 text-zinc-500"
            )}>
              {mode}
            </div>
          ))}
        </div>
        
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="self-end max-w-[85%] bg-zinc-900 text-zinc-200 p-3 rounded-lg rounded-tr-none break-words whitespace-normal shrink-0">
            Explain the mechanism of an SN2 reaction.
          </div>
          <div className="self-start max-w-[95%] bg-transparent border border-zinc-800 text-zinc-300 p-4 rounded-lg rounded-tl-none overflow-hidden shrink-0">
            <div className="flex items-center gap-2 mb-2 text-zinc-500 text-[10px] uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-white/20 animate-pulse shrink-0" />
              Chem-AI
            </div>
            <p className="leading-relaxed text-zinc-400 break-words whitespace-normal text-[10px] sm:text-xs">
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
    <div className="w-full h-full bg-[#020202] p-4 sm:p-6 font-mono flex flex-col text-xs sm:text-sm overflow-hidden">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4 shrink-0">
        <div className="text-zinc-500 text-[10px] tracking-widest uppercase truncate pr-2">SecureSys Terminal Interface</div>
        <div className="text-[8px] sm:text-[10px] text-zinc-600 uppercase tracking-widest shrink-0 text-right">
          Illustrative Preview &middot; Static Mockup
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-2 overflow-hidden text-zinc-400">
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-zinc-600">ROLE_CONTEXT:</span>
          <span className="text-white bg-zinc-800 px-2">SYS_ADMIN</span>
        </div>
        <div className="flex items-center gap-4 mb-4 shrink-0 overflow-hidden">
          <span className="text-zinc-600 shrink-0">POLICY:</span>
          <span className="text-zinc-500 truncate">[rwx] core_bin, [r-x] user_data</span>
        </div>
        
        <div className="text-zinc-300 truncate shrink-0">
          <span className="text-zinc-600">user@securesys:~$</span> [Illustrative terminal command]
        </div>
        <div className="text-zinc-500 pl-4 border-l border-zinc-800 ml-2 shrink-0 truncate">
          [MOCKUP] Visualizing access-control concept...<br/>
          [MOCKUP] Example policy applied...
        </div>
        
        <div className="text-zinc-300 mt-2 truncate shrink-0">
          <span className="text-zinc-600">user@securesys:~$</span> [Simulated secondary action]
        </div>
        <div className="text-zinc-500 pl-4 border-l border-zinc-800 ml-2 shrink-0 truncate">
          [MOCKUP] Static RBAC visualization complete.
        </div>
        
        <div className="text-zinc-300 mt-2 flex items-center shrink-0">
          <span className="text-zinc-600">user@securesys:~$</span>
          <span className="w-2 h-4 bg-zinc-400 ml-2 animate-pulse shrink-0" />
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
