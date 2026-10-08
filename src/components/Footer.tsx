import React from 'react';
import { ShieldCheck, Info, Heart, Lock, Globe2 } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                TruthShield<span className="text-cyan-400"> AI</span>
              </span>
            </div>
            <p className="text-slate-300 font-medium">
              "Detect. Understand. Learn. Don't Get Manipulated."
            </p>
            <p className="text-slate-400 text-[13px] max-w-md leading-relaxed">
              Most fact-checking tools only state WHAT is fake. TruthShield AI pioneers the 
              <span className="text-cyan-300 font-semibold"> VERDICT + WHY + VACCINE </span>
              framework, dissecting manipulation tactics, explaining cognitive biases in regional languages, 
              and inoculating users with lifelong critical literacy.
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-1 text-xs">
              <span className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> 4 Regional Languages
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> Privacy Preserving
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-cyan-400 transition-colors">
                  Analyze Content
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('evidence')} className="hover:text-cyan-400 transition-colors">
                  Evidence Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('vaccine')} className="hover:text-cyan-400 transition-colors">
                  Misinformation Vaccine
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('game')} className="hover:text-cyan-400 transition-colors">
                  Spot the Fake Mini-Game
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('learn')} className="hover:text-cyan-400 transition-colors">
                  Learning Center
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Verification */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Integrity & Standards</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-cyan-400 transition-colors">
                  How It Works & Methodology
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-cyan-400 transition-colors">
                  Community Trends Dashboard
                </button>
              </li>
              <li>
                <span className="text-slate-400">PIB Fact Check Integration Ready</span>
              </li>
              <li>
                <span className="text-slate-400">WHO Medical Guidelines Grounded</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-xs leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Info className="w-4 h-4 shrink-0" />
            <span>Safety & Verification Principles</span>
          </div>
          <p>
            TruthShield AI provides AI-assisted information analysis. Results may contain errors and should not replace verification from trusted primary sources. We strictly distinguish between <strong className="text-slate-300">FALSE</strong>, <strong className="text-slate-300">MISLEADING</strong>, and <strong className="text-slate-300">UNVERIFIED</strong> claims, and never present model confidence as factual certainty.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 TruthShield AI · National Hackathon Prototype Edition</p>
          <p className="flex items-center gap-1">
            Built with intelligence, empathy, and regional literacy
          </p>
        </div>
      </div>
    </footer>
  );
};
