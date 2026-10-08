import React, { useState } from 'react';
import { AnalysisResult, MisinformationVaccine } from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Check, 
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Flame,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VaccinePageProps {
  vaccineData: MisinformationVaccine;
  onExploreGame?: () => void;
}

export const VaccinePage: React.FC<VaccinePageProps> = ({ vaccineData, onExploreGame }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [immunityPoints, setImmunityPoints] = useState<number>(30);

  const quiz = vaccineData.microQuiz;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === quiz.correctIndex) {
      setImmunityPoints((prev) => prev + 10);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Inoculation Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-cyan-950/40 border border-indigo-500/30 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/70 text-cyan-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Core Innovation: Misinformation Vaccine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Build Your Misinformation Immunity
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Don't just learn whether this post is fake. <strong className="text-cyan-300">Learn the trick it used</strong> so you can never be manipulated by similar attacks again.
            </p>
          </div>

          {/* Immunity Score Badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl self-start md:self-auto shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Immunity Score
              </div>
              <div className="text-xl font-extrabold text-white flex items-center gap-1.5">
                <span>{immunityPoints} PTS</span>
                <span className="text-xs text-emerald-400 font-bold">+10 Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Vaccine Inoculation Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: You Encountered */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3 relative group hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
              Tactic Detected
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {vaccineData.tacticEncountered}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            This manipulation vector weaponizes psychological blindspots to bypass conscious discernment before facts can be checked.
          </p>
        </div>

        {/* Pillar 2: How The Trick Works */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3 relative group hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              The Psychological Trick
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              How The Trick Works
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {vaccineData.howTrickWorks}
          </p>
        </div>

        {/* Pillar 3: How to Protect Yourself */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3 relative group hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Your Cognitive Shield
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              How to Protect Yourself
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {vaccineData.howToProtect}
          </p>
        </div>
      </div>

      {/* Next Time You See This... Interactive Practice Box */}
      <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <Lightbulb className="w-4 h-4 text-cyan-400" />
          <span>Real-World Inoculation Example</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          "Next time you see this in the wild..."
        </h3>
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-cyan-100 font-mono leading-relaxed">
          {vaccineData.nextTimeExample}
        </div>
      </div>

      {/* Micro-Quiz Inoculation Reinforcement */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Inoculation Check: Test Your Immunity (+10 Pts)
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Immediate Reinforcement
          </span>
        </div>

        <p className="text-sm sm:text-base font-semibold text-slate-100">
          {quiz.question}
        </p>

        {/* Options list */}
        <div className="space-y-2.5">
          {quiz.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === quiz.correctIndex;

            let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700';

            if (hasAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold ring-1 ring-emerald-500/40';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 line-through';
              } else {
                btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all duration-200 border flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span>{option}</span>
                {hasAnswered && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quiz Answer Feedback */}
        {hasAnswered && (
          <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
            selectedOption === quiz.correctIndex
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
          }`}>
            <strong className="block mb-1 font-bold">
              {selectedOption === quiz.correctIndex ? '🎯 Spot on! Immunity Verified (+10 Pts)' : '💡 Almost there! Here is the trick:'}
            </strong>
            {quiz.explanation}
          </div>
        )}

        {/* CTA to full Spot the Fake game */}
        {onExploreGame && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onExploreGame}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              <span>Play More in "Spot the Fake" Game</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
