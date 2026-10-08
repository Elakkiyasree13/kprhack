import React, { useState } from 'react';
import { GAME_QUESTIONS } from '../data/gameQuestions';
import { GameQuestion, TacticCategory } from '../types';
import { 
  Gamepad2, 
  Award, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  Target,
  Brain
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SpotTheFakeGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [missedCategories, setMissedCategories] = useState<Record<string, number>>({
    authority: 1, // seed realistic initial baseline
  });

  const question = GAME_QUESTIONS[currentIdx] || GAME_QUESTIONS[0];

  // Derive level from score
  const getLevelInfo = (currentScore: number) => {
    if (currentScore >= 60) return { title: 'Truth Guardian', rank: 4, badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500' };
    if (currentScore >= 40) return { title: 'Misinformation Detective', rank: 3, badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500' };
    if (currentScore >= 20) return { title: 'Fact Checker', rank: 2, badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500' };
    return { title: 'Beginner Investigator', rank: 1, badgeColor: 'text-slate-400 bg-slate-900 border-slate-700' };
  };

  const level = getLevelInfo(score);

  // Determine weakest category
  const weakestCategoryEntry = Object.entries(missedCategories).sort((a, b) => b[1] - a[1])[0];
  const weakestCategory = weakestCategoryEntry ? weakestCategoryEntry[0] : 'authority';

  const categoryNameMap: Record<string, string> = {
    authority: 'Fake Authority & Expert Claims',
    urgency: 'False Urgency & Panic Countdowns',
    statistics: 'Misleading Statistics & Base Rates',
    emotion: 'Outrage Bait & Emotional Appeal',
    conspiracy: 'Conspiracy Framing',
    clickbait: 'Clickbait & Financial Greed',
  };

  const handleSelect = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === question.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 10 + (streak > 2 ? 5 : 0));
      setStreak((prev) => prev + 1);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }
    } else {
      setStreak(0);
      setMissedCategories((prev) => ({
        ...prev,
        [question.tacticCategory]: (prev[question.tacticCategory] || 0) + 1,
      }));
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    if (currentIdx < GAME_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Loop with adaptive ordering
      setCurrentIdx(0);
    }
  };

  const handlePracticeWeakest = () => {
    // Jump to a question matching user's weakest category
    const foundIndex = GAME_QUESTIONS.findIndex(
      (q) => q.tacticCategory === weakestCategory && q.id !== question.id
    );
    if (foundIndex !== -1) {
      setSelectedOption(null);
      setHasAnswered(false);
      setCurrentIdx(foundIndex);
    } else {
      handleNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Game Header & Scoreboard Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              <Gamepad2 className="w-4 h-4 text-cyan-400" />
              <span>Interactive Awareness Arena</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Can You Spot the Manipulation?
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Test your cognitive radar against realistic viral misinformation messages.
            </p>
          </div>

          {/* Level & Streak Indicator */}
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${level.badgeColor}`}>
              <Award className="w-4 h-4" />
              <span>{level.title}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>Streak: {streak}</span>
            </div>
          </div>
        </div>

        {/* Score metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Points</div>
            <div className="text-xl font-black text-white">{score} PTS</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Challenge</div>
            <div className="text-xl font-black text-cyan-400">
              #{currentIdx + 1} / {GAME_QUESTIONS.length}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Difficulty</div>
            <div className="text-xl font-black text-amber-400">{question.difficulty}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Adaptive Engine</div>
            <div className="text-xl font-black text-emerald-400">Active</div>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        {/* Social Media Context Tag */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            Context: {question.sourceContext}
          </span>
          <span className="text-[11px] font-mono text-cyan-400">Target Tactic Focus</span>
        </div>

        {/* Social-Media Style Post Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
              ?
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Viral Forwarded Post</div>
              <div className="text-[10px] text-slate-400">Forwarded many times · 10.4K shares</div>
            </div>
          </div>
          <div className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed p-2 rounded-xl bg-slate-900/40 border border-slate-800/60">
            "{question.scenario}"
          </div>
        </div>

        {/* The Question */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            {question.question}
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === question.correctIndex;

            let btnClasses = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700';

            if (hasAnswered) {
              if (isCorrect) {
                btnClasses = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/50';
              } else if (isSelected && !isCorrect) {
                btnClasses = 'bg-rose-950/50 border-rose-500 text-rose-200 line-through';
              } else {
                btnClasses = 'bg-slate-950/40 border-slate-800 text-slate-600 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelect(idx)}
                className={`p-4 rounded-xl text-xs sm:text-sm text-left transition-all duration-200 border flex items-center justify-between gap-3 ${btnClasses}`}
              >
                <span>{opt}</span>
                {hasAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation & WHY Breakdown */}
        {hasAnswered && (
          <div className={`p-5 rounded-2xl border space-y-2 text-xs sm:text-sm leading-relaxed ${
            selectedOption === question.correctIndex
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
              : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
          }`}>
            <div className="font-bold flex items-center gap-2 text-sm">
              {selectedOption === question.correctIndex ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Correct! +10 Points Awarded</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-amber-400" />
                  <span>Not quite. Here is WHY:</span>
                </>
              )}
            </div>
            <p className="opacity-95">{question.explanation}</p>
          </div>
        )}

        {/* Action Controls */}
        {hasAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              <span>Next Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Adaptive Learning Widget */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border border-indigo-500/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Personalized Adaptive Learning
            </h3>
          </div>
          <span className="text-[11px] text-cyan-300 font-mono">Cognitive Profiler</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Identified Vulnerability Area:</div>
            <div className="text-base font-bold text-rose-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-400" />
              <span>{categoryNameMap[weakestCategory] || 'False Authority'}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-lg">
              Our AI detects you may occasionally overlook authority cues. We've queued targeted practice drills.
            </p>
          </div>

          <button
            onClick={handlePracticeWeakest}
            className="px-4 py-2 rounded-xl bg-indigo-600/30 border border-indigo-500/50 hover:bg-indigo-600/50 text-indigo-200 text-xs font-semibold transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Practice Targeted Drill (3 Drills)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
