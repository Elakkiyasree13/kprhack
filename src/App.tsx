/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AnalyzePage } from './components/AnalyzePage';
import { ResultsDashboard } from './components/ResultsDashboard';
import { EvidenceExplorer } from './components/EvidenceExplorer';
import { VaccinePage } from './components/VaccinePage';
import { SpotTheFakeGame } from './components/SpotTheFakeGame';
import { LearningCenter } from './components/LearningCenter';
import { TrendsDashboard } from './components/TrendsDashboard';
import { AboutPage } from './components/AboutPage';
import { DEMO_CASES } from './data/demoCases';
import { AnalysisResult } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentResult, setCurrentResult] = useState<AnalysisResult>(DEMO_CASES[0]);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentResult(result);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDemo = (demo: AnalysisResult) => {
    setCurrentResult(demo);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col bg-grid-pattern selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectDemo={handleSelectDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'home' && (
          <LandingPage
            onStartAnalyze={() => {
              setActiveTab('analyze');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartGame={() => {
              setActiveTab('game');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSampleCase={handleSelectDemo}
          />
        )}

        {activeTab === 'analyze' && (
          <AnalyzePage
            onAnalysisComplete={handleAnalysisComplete}
            initialText=""
          />
        )}

        {activeTab === 'results' && (
          <ResultsDashboard
            result={currentResult}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-6">
            <EvidenceExplorer claims={currentResult.claims} />
          </div>
        )}

        {activeTab === 'vaccine' && (
          <VaccinePage
            vaccineData={currentResult.vaccine}
            onExploreGame={() => {
              setActiveTab('game');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'game' && <SpotTheFakeGame />}

        {activeTab === 'learn' && <LearningCenter />}

        {activeTab === 'dashboard' && <TrendsDashboard />}

        {activeTab === 'about' && (
          <AboutPage
            setActiveTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
