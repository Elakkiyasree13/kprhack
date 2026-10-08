import React, { useEffect, useState } from 'react';
import { 
  FileSearch, 
  SplitSquareVertical, 
  ShieldCheck, 
  Zap, 
  Languages, 
  Sparkles,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface LoadingPipelineProps {
  onComplete?: () => void;
  speedMs?: number;
}

const PIPELINE_STEPS = [
  { label: 'Reading content & parsing metadata...', icon: FileSearch, detail: 'Normalizing text, identifying platform signatures' },
  { label: 'Extracting individual factual claims...', icon: SplitSquareVertical, detail: 'Deconstructing assertions into discrete testable propositions' },
  { label: 'Checking cross-agency evidence matrix...', icon: ShieldCheck, detail: 'Querying indexed gazette, WHO, and fact-checking repositories' },
  { label: 'Detecting 12 psychological manipulation tactics...', icon: Zap, detail: 'Scanning for False Urgency, Fake Authority, Outrage Bait & Clickbait' },
  { label: 'Generating multilingual explanations...', icon: Languages, detail: 'Synthesizing plain English, Tamil, Hindi & Malayalam breakdowns' },
  { label: 'Preparing Misinformation Vaccine & awareness tips...', icon: Sparkles, detail: 'Formulating cognitive defense heuristics & interactive micro-quiz' },
];

export const LoadingPipeline: React.FC<LoadingPipelineProps> = ({ onComplete, speedMs = 600 }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < PIPELINE_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 400);
          }
          return prev;
        }
      });
    }, speedMs);

    return () => clearInterval(timer);
  }, [speedMs, onComplete]);

  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / PIPELINE_STEPS.length) * 100));

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top subtle glow bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 animate-pulse" />

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>TruthShield AI Multi-Stage Pipeline</span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Deconstructing Content Rigorously
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Examining claims, verification evidence, and psychological triggers
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
          <span>Analysis Progress</span>
          <span className="text-cyan-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {PIPELINE_STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div 
              key={idx}
              className={`flex items-start gap-3.5 p-2.5 rounded-xl transition-all duration-300 ${
                isCurrent 
                  ? 'bg-slate-800/90 border border-cyan-500/40 shadow-md shadow-cyan-950/40 scale-[1.01]' 
                  : isDone
                  ? 'bg-slate-900/40 border border-slate-800/60 text-slate-400 opacity-90'
                  : 'opacity-40'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                ) : (
                  <StepIcon className="w-5 h-5 text-slate-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-semibold ${isCurrent ? 'text-white' : isDone ? 'text-slate-300' : 'text-slate-500'}`}>
                  {step.label}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {step.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
