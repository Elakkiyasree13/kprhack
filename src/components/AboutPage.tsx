import React from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  Sparkles, 
  Lock, 
  Globe2, 
  AlertTriangle, 
  Layers, 
  Compass, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  const steps = [
    { step: 1, title: 'Open TruthShield AI', desc: 'Modern cybersecurity fact-checking command center.' },
    { step: 2, title: 'Click "Try Demo"', desc: 'Zero API keys required for instant judge evaluation.' },
    { step: 3, title: 'Select Scholarship Scam', desc: 'Preloaded ₹50,000 viral student grant forward.' },
    { step: 4, title: 'Click Analyze', desc: 'Triggers the multi-stage heuristic & GenAI pipeline.' },
    { step: 5, title: 'Watch Loading Pipeline', desc: 'Live progress through 6 discreet deconstruction steps.' },
    { step: 6, title: 'Review Risk Assessment', desc: 'Inspect the HIGH RISK meter and model confidence score.' },
    { step: 7, title: 'Inspect Extracted Claims', desc: 'Discrete propositions broken out individually.' },
    { step: 8, title: 'Interactive Highlighter', desc: 'Color-coded manipulation heatmap of the submitted text.' },
    { step: 9, title: 'Click "False Urgency"', desc: 'Deep dive into why adrenaline triggers viral sharing.' },
    { step: 10, title: 'Switch to தமிழ் (Tamil)', desc: 'Instant simple regional translation with ELI15 analogy.' },
    { step: 11, title: 'Open Evidence Explorer', desc: 'Inspect supporting & contradicting official sources.' },
    { step: 12, title: 'Inspect Source Provenance', desc: 'Citations grounded with clear Demo Evidence labels.' },
    { step: 13, title: 'Build Misinformation Vaccine', desc: 'Learn the underlying cognitive trick and pause rule.' },
    { step: 14, title: 'Spot the Fake Mini-Game', desc: 'Interactive quiz with points, streak, and confetti.' },
    { step: 15, title: 'Adaptive Learning Profiler', desc: 'Uncovers user vulnerability and delivers custom practice!' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero Mission */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Compass className="w-4 h-4" />
            <span>Platform Philosophy & Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            "Don't Just Know It's Fake. <br className="hidden sm:block" />
            <span className="text-cyan-400">Know WHY It's Fake."</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Existing fact-checking tools often only stamp binary "Fake" or "Real" labels in English, leaving citizens powerless when the next slightly altered rumor appears on WhatsApp or Instagram. 
            TruthShield AI introduces the <strong className="text-white">VERDICT + WHY + VACCINE</strong> paradigm to build lifelong cognitive immunity.
          </p>
        </div>
      </div>

      {/* The 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="text-base font-bold text-white">VERDICT</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Deconstructs complex viral content into isolated factual assertions and classifies each strictly as TRUE, FALSE, MISLEADING, or UNVERIFIED with model confidence.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="text-base font-bold text-white">WHY</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Identifies up to 12 manipulation tactics (False Urgency, Fake Authority, Outrage Bait) and renders an interactive heatmap directly inside the original message.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="text-base font-bold text-white">VACCINE</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Inoculates users against future variants with plain-language regional breakdowns (Tamil, Hindi, Malayalam), ELI15 analogies, and adaptive mini-game drills.
          </p>
        </div>
      </div>

      {/* Trust & Safety Principles */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">
            Ethical Guardrails & Truth Principles
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <strong className="text-white block font-semibold">1. Never Invent Evidence</strong>
            <p className="text-slate-400">
              When verifiable sources are unavailable, claims are designated as <span className="text-slate-300 font-bold">UNVERIFIED</span> rather than fabricating citations or guessing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <strong className="text-white block font-semibold">2. Never Fabricate URLs</strong>
            <p className="text-slate-400">
              In prototype demonstration mode, all simulated data is explicitly badged as "Demo Evidence" so users are never misled.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <strong className="text-white block font-semibold">3. Model Confidence ≠ Absolute Truth</strong>
            <p className="text-slate-400">
              Confidence scores express the algorithmic extraction certainty of the model, not definitive factual infallibility.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <strong className="text-white block font-semibold">4. Nuanced Classification</strong>
            <p className="text-slate-400">
              We strictly distinguish between outright Falsehoods and Misleading claims that take genuine numbers out of context.
            </p>
          </div>
        </div>
      </div>

      {/* Official Hackathon Demo Flow Checklist */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Evaluation Guide</span>
          <h2 className="text-xl font-bold text-white mt-1">
            Official Hackathon Judge Evaluation Sequence
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Follow this 15-step sequence during judging presentations:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {steps.map((s) => (
            <div key={s.step} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-[10px] font-bold">
                  {s.step}
                </span>
                <span className="text-xs font-bold text-slate-200">{s.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug pl-7">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setActiveTab('analyze')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <span>Launch Analysis Interface</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
