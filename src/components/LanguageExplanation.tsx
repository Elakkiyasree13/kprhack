import React, { useState } from 'react';
import { AnalysisResult, LanguageContent } from '../types';
import { 
  Globe2, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Lightbulb, 
  Volume2, 
  Share2,
  Copy,
  Check
} from 'lucide-react';

interface LanguageExplanationProps {
  result: AnalysisResult;
}

type LangKey = 'en' | 'ta' | 'hi' | 'ml';

const LANGUAGES: { key: LangKey; label: string; nativeName: string; flag: string }[] = [
  { key: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { key: 'ta', label: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { key: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { key: 'ml', label: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
];

export const LanguageExplanation: React.FC<LanguageExplanationProps> = ({ result }) => {
  const [selectedLang, setSelectedLang] = useState<LangKey>('en');
  const [eli15Mode, setEli15Mode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const activeContent: LanguageContent = 
    result.translations[selectedLang] || result.translations.en;

  const handleCopy = () => {
    const textToCopy = `${activeContent.verdictLabel}\n\n${eli15Mode ? activeContent.eli15 : activeContent.summary}\n\nAction Tip: ${activeContent.actionTip}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 border border-slate-800 shadow-xl backdrop-blur-md space-y-5">
      {/* Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Globe2 className="w-4 h-4 text-cyan-400" />
            <span>Multilingual Understanding Engine</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Human-Friendly Regional Breakdown
          </h3>
          <p className="text-xs text-slate-400">
            Misinformation preys on language barriers. We explain the truth in native tongues.
          </p>
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* ELI15 Toggle Button */}
          <button
            onClick={() => setEli15Mode(!eli15Mode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
              eli15Mode
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300 shadow-md shadow-amber-950/40 ring-1 ring-amber-400/50'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${eli15Mode ? 'text-amber-400 animate-spin' : 'text-slate-400'}`} />
            <span>Explain Like I'm 15</span>
            {eli15Mode && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title="Copy explanation"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Language Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 mr-1">Select Language:</span>
        {LANGUAGES.map((lang) => {
          const isSelected = selectedLang === lang.key;
          return (
            <button
              key={lang.key}
              onClick={() => setSelectedLang(lang.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-sm ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="font-semibold">{lang.nativeName}</span>
              <span className="text-[10px] text-slate-400">({lang.label})</span>
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      <div className={`p-5 rounded-2xl border transition-all duration-300 relative ${
        eli15Mode 
          ? 'bg-amber-950/15 border-amber-500/30 shadow-lg shadow-amber-950/20' 
          : 'bg-slate-950/70 border-slate-800/80 shadow-md'
      }`}>
        {/* Banner indicator */}
        <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
              result.overallRisk === 'HIGH RISK' 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {activeContent.verdictLabel}
            </span>
            {eli15Mode && (
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Simple Analogies Active
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400">
            {LANGUAGES.find(l => l.key === selectedLang)?.nativeName}
          </span>
        </div>

        {/* Content text */}
        <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-normal selection:bg-cyan-500/20 selection:text-cyan-200">
          {eli15Mode ? activeContent.eli15 : activeContent.summary}
        </p>

        {/* Action Tip Banner */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-start gap-2.5 text-xs">
          <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed">
            <strong className="text-emerald-400 font-semibold mr-1">Recommended Action:</strong>
            {activeContent.actionTip}
          </div>
        </div>
      </div>
    </div>
  );
};
