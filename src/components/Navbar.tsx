import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Flame, 
  BookOpen, 
  Gamepad2, 
  BarChart3, 
  Info, 
  Search, 
  Sparkles,
  ChevronDown,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { DEMO_CASES } from '../data/demoCases';
import { AnalysisResult } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectDemo: (demo: AnalysisResult) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onSelectDemo }) => {
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'analyze', label: 'Analyze' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'vaccine', label: 'Vaccine' },
    { id: 'game', label: 'Spot the Fake' },
    { id: 'learn', label: 'Learn' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'about', label: 'How It Works' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <ShieldAlert className="w-5 h-5" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                TruthShield<span className="text-cyan-400"> AI</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-cyan-400/90 bg-cyan-950/70 border border-cyan-800/60 px-1.5 py-0.5 rounded">
                Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              GenAI Misinformation Defense & Immunity
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 relative ${
                  isActive
                    ? 'text-cyan-300 bg-slate-800/90 shadow-sm border border-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Demo dropdown */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Try Demo Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDemoMenuOpen(!demoMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700/80 hover:text-white transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Try Demo</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {demoMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDemoMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-50 p-2 divide-y divide-slate-800/80">
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-slate-200">Preloaded Demo Scenarios</p>
                    <p className="text-[11px] text-slate-400">Instantly inspect realistic misinformation attacks</p>
                  </div>
                  <div className="py-1.5 space-y-1">
                    {DEMO_CASES.map((demo, idx) => (
                      <button
                        key={demo.id}
                        onClick={() => {
                          onSelectDemo(demo);
                          setDemoMenuOpen(false);
                          setActiveTab('results');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-cyan-400 shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-medium text-slate-200">{demo.title}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">{demo.rawText}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 px-3 pb-1">
                    <button
                      onClick={() => {
                        onSelectDemo(DEMO_CASES[0]);
                        setDemoMenuOpen(false);
                        setActiveTab('results');
                      }}
                      className="w-full text-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1"
                    >
                      Load Sample Case: Scholarship Scam →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Analyze Now Button */}
          <button
            onClick={() => setActiveTab('analyze')}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Analyze Now</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setActiveTab('analyze')}
            className="px-3 py-1 text-xs font-semibold rounded-lg bg-cyan-600 text-white"
          >
            Analyze
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === item.id ? 'bg-slate-800 text-cyan-400' : 'text-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                onSelectDemo(DEMO_CASES[0]);
                setMobileMenuOpen(false);
                setActiveTab('results');
              }}
              className="w-full py-2 text-xs font-semibold bg-slate-800 text-cyan-300 rounded-lg text-center"
            >
              Try Sample Case (Scholarship)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
