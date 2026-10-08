import React, { useState } from 'react';
import { LEARNING_LESSONS } from '../data/learningContent';
import { LearningLesson, TacticCategory } from '../types';
import { 
  BookOpen, 
  Search, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const LearningCenter: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LearningLesson | null>(LEARNING_LESSONS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Lessons' },
    { id: 'urgency', label: 'Urgency & Verification' },
    { id: 'authority', label: 'Experts & Authority' },
    { id: 'statistics', label: 'Data & Statistics' },
    { id: 'emotion', label: 'Emotion & Outrage' },
    { id: 'clickbait', label: 'Clickbait & Scams' },
    { id: 'social', label: 'Forwards & Groups' },
    { id: 'conspiracy', label: 'AI & Media' },
  ];

  const filteredLessons = LEARNING_LESSONS.filter((lesson) => {
    const matchesCat = activeCategory === 'all' || lesson.category === activeCategory;
    const matchesQuery = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.tactic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Misinformation Vaccine Academy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Master the Tactics of Cognitive Defense
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Curated masterclasses breaking down viral manipulation techniques, cognitive fallacies, and verification tradecraft.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tactics or red flags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Lesson Cards, Right Selected Full Curriculum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lesson Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Lessons ({filteredLessons.length})</span>
            <span className="text-[11px] text-slate-400">Click to read curriculum</span>
          </div>

          <div className="space-y-3">
            {filteredLessons.map((lesson) => {
              const isSelected = selectedLesson?.id === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border relative ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                    <span className="font-semibold text-cyan-400">{lesson.tactic}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.readingTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 leading-snug">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {lesson.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Lesson Content */}
        <div className="lg:col-span-7">
          {selectedLesson ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <span>{selectedLesson.tactic}</span>
                  <span>·</span>
                  <span className="text-slate-400">{selectedLesson.readingTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {selectedLesson.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedLesson.summary}
                </p>
              </div>

              {/* 1. What is it? */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  What Is It?
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedLesson.whatIsIt}
                </p>
              </div>

              {/* 2. Real-world example */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Real-World Example in the Wild
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-amber-200">
                  {selectedLesson.realWorldExample}
                </div>
              </div>

              {/* 3. Red flags */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Critical Red Flags
                </div>
                <ul className="space-y-1.5">
                  {selectedLesson.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-2" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4. What should you do? Actionable checklist */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  What Should You Do? (Action Checklist)
                </div>
                <ul className="space-y-2">
                  {selectedLesson.whatShouldYouDo.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 rounded-2xl bg-slate-900/40 border border-slate-800">
              Select a lesson from the left column to view the complete curriculum.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
