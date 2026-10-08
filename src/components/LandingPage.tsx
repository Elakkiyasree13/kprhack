import React from 'react';
import { DEMO_CASES } from '../data/demoCases';
import { AnalysisResult } from '../types';
import { 
  ShieldCheck, 
  Search, 
  Gamepad2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  HelpCircle, 
  Award, 
  Eye, 
  AlertTriangle,
  Globe2,
  FileCheck2,
  Share2,
  CheckCircle2,
  Zap,
  Info
} from 'lucide-react';

interface LandingPageProps {
  onStartAnalyze: () => void;
  onStartGame: () => void;
  onSelectSampleCase: (demo: AnalysisResult) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onStartAnalyze, 
  onStartGame, 
  onSelectSampleCase 
}) => {
  const sampleCase = DEMO_CASES[0]; // Scholarship forward

  return (
    <div className="space-y-20">
      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-16 overflow-hidden">
        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10 px-4">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-semibold shadow-lg shadow-cyan-950/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>National Hackathon Prototype · TruthShield AI</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Don't Just Know It's Fake. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Know WHY It's Fake.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            TruthShield AI detects misinformation, explains manipulation tactics, verifies claims with evidence, and teaches you how to spot misinformation yourself.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onStartAnalyze}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Analyze Content</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onStartGame}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-cyan-400" />
              <span>Test Your Skills</span>
            </button>
          </div>

          {/* Demo shortcut pill */}
          <div className="pt-2">
            <button
              onClick={() => onSelectSampleCase(sampleCase)}
              className="text-xs text-slate-400 hover:text-cyan-300 font-semibold underline underline-offset-4 transition-colors"
            >
              ⚡ Click here to 1-click test the viral ₹50,000 scholarship forward
            </button>
          </div>
        </div>
      </section>

      {/* 2. Visual Pipeline Flow Illustration */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
              Architecture
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              The TruthShield Inoculation Flow
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              From raw suspicious message to lifelong misinformation immunity
            </p>
          </div>

          {/* Connected Flow Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative">
            {[
              { title: 'Social Media Post', desc: 'WhatsApp, X, Insta forwards', icon: Share2, color: 'text-slate-300' },
              { title: 'AI Claim Analysis', desc: 'Isolates discrete assertions', icon: Layers, color: 'text-blue-400' },
              { title: 'Manipulation Detection', desc: 'Pins 12 psychological tactics', icon: Zap, color: 'text-rose-400' },
              { title: 'Evidence Verification', desc: 'Govt & research matrices', icon: FileCheck2, color: 'text-cyan-400' },
              { title: 'Human Explanation', desc: 'Tamil, Hindi, Malayalam + ELI15', icon: Globe2, color: 'text-amber-400' },
              { title: 'Misinformation Vaccine', desc: 'Lifelong cognitive immunity', icon: ShieldCheck, color: 'text-emerald-400' },
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <div 
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center space-y-1.5 relative group hover:border-slate-700 transition-all"
                >
                  <div className={`w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-800 ${node.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-white leading-tight mt-1">
                    {node.title}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-snug">
                    {node.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Three Core Feature Cards: VERIFY, EXPLAIN, VACCINATE */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: VERIFY */}
          <div className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-black text-xl">
              1
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                Discrete Grounding
              </span>
              <h3 className="text-xl font-bold text-white mt-1">VERIFY</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              "Break content into individual claims and verify them against official gazettes and scientific registries."
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>No more vague binary verdicts</span>
            </div>
          </div>

          {/* Card 2: EXPLAIN */}
          <div className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xl">
              2
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Psychological Clarity
              </span>
              <h3 className="text-xl font-bold text-white mt-1">EXPLAIN</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              "Understand exactly why a claim may be misleading, with color-coded manipulation tactic highlighting."
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Detects 12 cognitive persuasion tricks</span>
            </div>
          </div>

          {/* Card 3: VACCINATE */}
          <div className="p-7 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xl">
              3
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Cognitive Inoculation
              </span>
              <h3 className="text-xl font-bold text-white mt-1">VACCINATE</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              "Learn the manipulation tricks so you can detect them next time, with adaptive games and native languages."
            </p>
            <div className="pt-2 text-xs text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Long-term misinformation immunity</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Statistics Section (Explicitly Badged as Prototype Demo Metrics) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Prototype Evaluation Metrics
            </h3>
            <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
              <Info className="w-3 h-3" /> Prototype Demo Statistics
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">10,000+</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Claims Analyzed</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Automated benchmark</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">4</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Languages Supported</div>
              <div className="text-[10px] text-slate-500 mt-0.5">EN · தமிழ் · हिन्दी · ML</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-rose-400">12</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Manipulation Tactics</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Pattern classification</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">92%</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Explanation Clarity</div>
              <div className="text-[10px] text-slate-500 mt-0.5">ELI15 comprehension test</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sample Case Showcase (₹50,000 Scholarship Scam) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-cyan-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
                Featured Sample Case
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Viral WhatsApp Student Scholarship Forward
              </h2>
            </div>
            <button
              onClick={() => onSelectSampleCase(sampleCase)}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              <span>Test This Case in 1 Click</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sample Raw Input Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm font-mono text-cyan-200 leading-relaxed">
            "{sampleCase.rawText}"
          </div>

          {/* Preview of Analysis Verdict */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
              <div className="text-rose-400 font-bold uppercase">Overall Assessment</div>
              <div className="text-white font-semibold mt-0.5">HIGH MISINFORMATION RISK (94%)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-cyan-400 font-bold uppercase">Tactics Isolated</div>
              <div className="text-slate-200 mt-0.5">False Urgency · Chain Forwarding · Greed</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-emerald-400 font-bold uppercase">Inoculation Vaccine</div>
              <div className="text-slate-200 mt-0.5">The 2-Minute Pause Rule & Gazette Check</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
