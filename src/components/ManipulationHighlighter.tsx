import React, { useState } from 'react';
import { ManipulationTactic, TacticCategory } from '../types';
import { 
  AlertTriangle, 
  Clock, 
  Award, 
  Flame, 
  HelpCircle, 
  Lightbulb, 
  Share2, 
  BarChart, 
  Eye, 
  CheckCircle,
  X,
  Sparkles
} from 'lucide-react';

interface ManipulationHighlighterProps {
  text: string;
  tactics: ManipulationTactic[];
}

interface LegendItem {
  category: TacticCategory;
  label: string;
  color: string;
  bgLight: string;
  border: string;
  icon: any;
}

const LEGEND_ITEMS: LegendItem[] = [
  { category: 'urgency', label: 'False Urgency', color: '#f43f5e', bgLight: 'bg-rose-500/15', border: 'border-rose-500/40 text-rose-300', icon: Clock },
  { category: 'authority', label: 'Fake Authority', color: '#3b82f6', bgLight: 'bg-blue-500/15', border: 'border-blue-500/40 text-blue-300', icon: Award },
  { category: 'clickbait', label: 'Clickbait & Greed', color: '#f59e0b', bgLight: 'bg-amber-500/15', border: 'border-amber-500/40 text-amber-300', icon: Flame },
  { category: 'fear', label: 'Fear & Panic', color: '#ef4444', bgLight: 'bg-red-500/15', border: 'border-red-500/40 text-red-300', icon: AlertTriangle },
  { category: 'social', label: 'Social Pressure', color: '#a855f7', bgLight: 'bg-purple-500/15', border: 'border-purple-500/40 text-purple-300', icon: Share2 },
  { category: 'statistics', label: 'Misleading Stats', color: '#06b6d4', bgLight: 'bg-cyan-500/15', border: 'border-cyan-500/40 text-cyan-300', icon: BarChart },
  { category: 'conspiracy', label: 'Conspiracy Framing', color: '#8b5cf6', bgLight: 'bg-indigo-500/15', border: 'border-indigo-500/40 text-indigo-300', icon: Eye },
  { category: 'emotion', label: 'Outrage / Emotion', color: '#e11d48', bgLight: 'bg-rose-600/15', border: 'border-rose-600/40 text-rose-300', icon: Flame },
];

export const ManipulationHighlighter: React.FC<ManipulationHighlighterProps> = ({ text, tactics }) => {
  const [selectedTactic, setSelectedTactic] = useState<ManipulationTactic | null>(
    tactics.length > 0 ? tactics[0] : null
  );
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  // Parse text into highlighted fragments
  const renderHighlightedText = () => {
    if (!tactics || tactics.length === 0) {
      return <p className="text-slate-200 leading-relaxed font-mono text-sm">{text}</p>;
    }

    // Build span ranges
    interface Range {
      start: number;
      end: number;
      tactic: ManipulationTactic;
    }

    const ranges: Range[] = [];
    tactics.forEach((t) => {
      if (activeCategoryFilter && t.category !== activeCategoryFilter) {
        return;
      }

      if (t.matchedText) {
        let index = text.indexOf(t.matchedText);
        while (index !== -1) {
          ranges.push({
            start: index,
            end: index + t.matchedText.length,
            tactic: t,
          });
          index = text.indexOf(t.matchedText, index + 1);
        }
      }
    });

    // Sort ranges by start
    ranges.sort((a, b) => a.start - b.start);

    // Merge/filter overlaps
    const nonOverlapping: Range[] = [];
    let lastEnd = 0;
    for (const r of ranges) {
      if (r.start >= lastEnd) {
        nonOverlapping.push(r);
        lastEnd = r.end;
      }
    }

    // Construct fragments
    const fragments: React.ReactNode[] = [];
    let currentIndex = 0;

    nonOverlapping.forEach((r, i) => {
      // Preceding plain text
      if (r.start > currentIndex) {
        fragments.push(
          <span key={`plain-${currentIndex}`} className="text-slate-200">
            {text.slice(currentIndex, r.start)}
          </span>
        );
      }

      const isSelected = selectedTactic?.id === r.tactic.id;
      const legend = LEGEND_ITEMS.find((l) => l.category === r.tactic.category) || LEGEND_ITEMS[0];

      fragments.push(
        <button
          key={`highlight-${r.tactic.id}-${i}`}
          onClick={() => setSelectedTactic(r.tactic)}
          className={`inline-block px-1.5 py-0.5 mx-0.5 rounded cursor-pointer transition-all duration-200 border text-left font-semibold ${
            isSelected
              ? 'ring-2 ring-cyan-400 scale-[1.03] shadow-lg shadow-cyan-900/40 ' + legend.bgLight + ' ' + legend.border
              : legend.bgLight + ' ' + legend.border + ' hover:opacity-90'
          }`}
          title={`Click to view manipulation tactic: ${r.tactic.name}`}
        >
          {text.slice(r.start, r.end)}
          <span className="ml-1 text-[10px] uppercase font-bold opacity-75">
            [{r.tactic.name}]
          </span>
        </button>
      );

      currentIndex = r.end;
    });

    // Remainder
    if (currentIndex < text.length) {
      fragments.push(
        <span key={`plain-end`} className="text-slate-200">
          {text.slice(currentIndex)}
        </span>
      );
    }

    return fragments;
  };

  return (
    <div className="space-y-4">
      {/* Legend & Interactive Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
        <span className="text-xs font-semibold text-slate-300 mr-1 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          Filter Tactics:
        </span>
        <button
          onClick={() => setActiveCategoryFilter(null)}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
            activeCategoryFilter === null
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          All ({tactics.length})
        </button>
        {LEGEND_ITEMS.map((item) => {
          const count = tactics.filter((t) => t.category === item.category).length;
          if (count === 0) return null;
          const isFilterActive = activeCategoryFilter === item.category;

          return (
            <button
              key={item.category}
              onClick={() => setActiveCategoryFilter(isFilterActive ? null : item.category)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${
                isFilterActive
                  ? `${item.bgLight} ${item.border} ring-1 ring-cyan-400`
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
              <span className="text-[10px] text-slate-400 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Highlighting Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Text Box with Highlighted spans */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-sm relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Interactive Manipulation Heatmap
            </span>
            <span>Click any highlighted phrase to inspect</span>
          </div>

          <div className="text-sm leading-relaxed tracking-wide font-normal select-text p-2 rounded-xl bg-slate-950/70 border border-slate-900 min-h-[140px]">
            {renderHighlightedText()}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Highlighted words trigger unconscious emotional or psychological reactions.
          </p>
        </div>

        {/* Right: Selected Tactic Inspection Card */}
        <div className="lg:col-span-5">
          {selectedTactic ? (
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden transition-all duration-300">
              {/* Top Accent Strip */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: selectedTactic.color || '#06b6d4' }}
              />

              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-0.5">
                    Detected Manipulation Mechanism
                  </div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    {selectedTactic.name}
                  </h4>
                </div>
                <div 
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold shrink-0 border"
                  style={{ 
                    color: selectedTactic.color || '#06b6d4',
                    borderColor: `${selectedTactic.color}40` || '#06b6d440',
                    backgroundColor: `${selectedTactic.color}15` || '#06b6d415'
                  }}
                >
                  {selectedTactic.category.toUpperCase()}
                </div>
              </div>

              {/* Matched phrase quote */}
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-cyan-200 mb-4 flex items-center gap-2">
                <span className="text-slate-500 font-sans text-xs">Flagged:</span>
                <span className="font-bold underline decoration-cyan-500/50">"{selectedTactic.matchedText}"</span>
              </div>

              {/* WHY section */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800/80">
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5 mb-1 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Why is this manipulative?
                  </div>
                  <p className="text-slate-300">
                    {selectedTactic.explanation}
                  </p>
                </div>

                {/* USER TIP section */}
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                  <div className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1 text-xs">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
                    How to recognize it next time
                  </div>
                  <p className="text-emerald-100/90">
                    {selectedTactic.userTip}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 text-center text-xs text-slate-400 flex flex-col items-center justify-center min-h-[220px]">
              <HelpCircle className="w-8 h-8 text-slate-600 mb-2" />
              <p className="font-semibold text-slate-300">Select a highlighted phrase</p>
              <p className="text-slate-500 text-[11px] max-w-xs mt-1">
                Click any colored section in the text above to see why it was flagged and how to protect yourself.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
