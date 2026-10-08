import React from 'react';
import { AnalysisResult } from '../types';
import { ManipulationHighlighter } from './ManipulationHighlighter';
import { LanguageExplanation } from './LanguageExplanation';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Layers, 
  Share2, 
  ExternalLink,
  Flame,
  Info
} from 'lucide-react';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onNavigateTab: (tab: string) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onNavigateTab }) => {
  const { 
    overallRisk, 
    riskScore, 
    confidenceScore, 
    summary, 
    metrics, 
    claims, 
    tactics, 
    rawText, 
    imageAnalysis,
    sourceType
  } = result;

  const falseCount = claims.filter(c => c.verdict === 'FALSE').length;
  const misleadingCount = claims.filter(c => c.verdict === 'MISLEADING').length;
  const unverifiedCount = claims.filter(c => c.verdict === 'UNVERIFIED').length;
  const trueCount = claims.filter(c => c.verdict === 'TRUE').length;

  const getRiskBadge = () => {
    switch (overallRisk) {
      case 'HIGH RISK':
        return {
          label: '⚠ HIGH RISK OF MISINFORMATION',
          bg: 'bg-rose-950/60 border-rose-500/50 text-rose-300',
          gradient: 'from-rose-500 to-red-600',
          barColor: 'bg-rose-500',
        };
      case 'MODERATE RISK':
        return {
          label: '⚠ MODERATE MISINFORMATION RISK',
          bg: 'bg-amber-950/60 border-amber-500/50 text-amber-300',
          gradient: 'from-amber-500 to-orange-600',
          barColor: 'bg-amber-500',
        };
      case 'LOW RISK':
      default:
        return {
          label: '✓ LOW MISINFORMATION RISK',
          bg: 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300',
          gradient: 'from-emerald-500 to-teal-600',
          barColor: 'bg-emerald-500',
        };
    }
  };

  const badge = getRiskBadge();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* 1. Overall Assessment Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-md space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black border tracking-wide uppercase ${badge.bg}`}>
                {badge.label}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Model Confidence: <strong className="text-cyan-400">{confidenceScore}%</strong>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              {summary}
            </h1>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('evidence')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Evidence Matrix ({claims.length})</span>
            </button>
            <button
              onClick={() => onNavigateTab('vaccine')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-semibold text-white shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Build Vaccine Immunity</span>
            </button>
          </div>
        </div>

        {/* Breakdown Stats Count Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Claims Detected</div>
            <div className="text-xl font-bold text-white mt-0.5">{claims.length} Claims</div>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40">
            <div className="text-[11px] font-semibold text-rose-300 uppercase">False Claims</div>
            <div className="text-xl font-bold text-rose-400 mt-0.5">{falseCount}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40">
            <div className="text-[11px] font-semibold text-amber-300 uppercase">Misleading Claims</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5">{misleadingCount}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Unverified Claims</div>
            <div className="text-xl font-bold text-slate-300 mt-0.5">{unverifiedCount}</div>
          </div>
        </div>

        {/* Risk Meter Visual Progress Bars */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span>Cognitive Risk Telemetry</span>
            <span className="text-[10px] text-slate-400 font-normal">
              Confidence represents model assessment probability
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Truthfulness */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Truthfulness</span>
                <span className="font-mono text-cyan-300 font-bold">{metrics.truthfulness}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.truthfulness}%` }}
                />
              </div>
            </div>

            {/* 2. Evidence Strength */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Evidence Strength</span>
                <span className="font-mono text-blue-300 font-bold">{metrics.evidenceStrength}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.evidenceStrength}%` }}
                />
              </div>
            </div>

            {/* 3. Manipulation Risk */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Manipulation Risk</span>
                <span className="font-mono text-rose-300 font-bold">{metrics.manipulationRisk}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.manipulationRisk}%` }}
                />
              </div>
            </div>

            {/* 4. Source Reliability */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Source Reliability</span>
                <span className="font-mono text-amber-300 font-bold">{metrics.sourceReliability}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.sourceReliability}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Manipulation Heatmap (Core Unique Feature) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            Manipulation Tactics Dissection
          </h2>
          <span className="text-xs text-slate-400">
            {tactics.length} Psychological Tactics Isolated
          </span>
        </div>
        <ManipulationHighlighter text={rawText} tactics={tactics} />
      </div>

      {/* 3. Multilingual Understanding & ELI15 Panel */}
      <div>
        <LanguageExplanation result={result} />
      </div>

      {/* 4. Synthetic AI Image Detection (if applicable or screenshot) */}
      {imageAnalysis && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" />
              <h3 className="text-base font-bold text-white">
                Synthetic Media & Image Forensics
              </h3>
            </div>
            <div className="px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-bold">
              {imageAnalysis.isAiGeneratedEstimate} ({imageAnalysis.confidence}% Est.)
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">Observed Optical Signals:</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {imageAnalysis.signals.map((sig, idx) => (
                <li key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                  <span>{sig}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <p className="text-[11px] text-slate-400 italic">
              "{imageAnalysis.disclaimer}"
            </p>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(imageAnalysis.reverseSearchQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-purple-300 hover:bg-slate-700 text-xs font-semibold transition-colors shrink-0"
            >
              <span>Reverse Image Search</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* 5. Claim Quick Summary Bar linking to Evidence Explorer */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">
            Need to inspect the verified proof sources?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            View contradictory quotes from official government, scientific, and fact-checking registries.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('evidence')}
          className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Open Evidence Explorer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
