import React from 'react';
import { COMMUNITY_TRENDS } from '../data/trendData';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  PieChart, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Info,
  Layers,
  Activity
} from 'lucide-react';

export const TrendsDashboard: React.FC = () => {
  const { 
    totalAnalyzed, 
    falseClaims, 
    misleadingClaims, 
    unverifiedClaims, 
    trueClaims,
    categories, 
    tactics, 
    recentDebunks 
  } = COMMUNITY_TRENDS;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Prototype Disclaimer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Intelligence Network</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Community Misinformation Trends
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Live aggregate distribution of examined viral claims, manipulated categories, and flagged tactics.
            </p>
          </div>

          {/* Prototype Badge */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2 self-start md:self-auto">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold">Prototype Demo Data</div>
              <div className="text-[10px] text-slate-400">Simulated metrics for hackathon evaluation</div>
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Checks
            </div>
            <div className="text-2xl font-black text-white mt-1">
              {totalAnalyzed.toLocaleString()}+
            </div>
            <div className="text-[10px] text-cyan-400 font-medium mt-1">Aggregated submissions</div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40">
            <div className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider">
              False Claims
            </div>
            <div className="text-2xl font-black text-rose-400 mt-1">
              {falseClaims.toLocaleString()}
            </div>
            <div className="text-[10px] text-rose-300/80 font-medium mt-1">41.1% of verified inputs</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40">
            <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
              Misleading Claims
            </div>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {misleadingClaims.toLocaleString()}
            </div>
            <div className="text-[10px] text-amber-300/80 font-medium mt-1">32.6% stripped of context</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Unverified Claims
            </div>
            <div className="text-2xl font-black text-slate-300 mt-1">
              {unverifiedClaims.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 font-medium mt-1">20.1% insufficient evidence</div>
          </div>
        </div>
      </div>

      {/* Charts Grid: Categories and Tactics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Most Checked Categories */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Distribution</div>
              <h3 className="text-lg font-bold text-white">Most Checked Categories</h3>
            </div>
            <Layers className="w-5 h-5 text-slate-500" />
          </div>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{cat.category}</span>
                  <span className="text-slate-400 font-mono">
                    {cat.count.toLocaleString()} ({cat.percentage}%)
                  </span>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            Health & Wellness claims form the largest vector of unverified viral rumors.
          </div>
        </div>

        {/* Chart 2: Most Common Manipulation Tactics */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Behavioral Vector</div>
              <h3 className="text-lg font-bold text-white">Most Common Manipulation Tactics</h3>
            </div>
            <TrendingUp className="w-5 h-5 text-slate-500" />
          </div>

          <div className="space-y-4">
            {tactics.slice(0, 5).map((tac) => (
              <div key={tac.tactic} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{tac.tactic}</span>
                  <span className="text-slate-400 font-mono">
                    {tac.count.toLocaleString()} ({tac.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${tac.percentage}%`,
                      backgroundColor: tac.color,
                    }}
                  />
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  e.g., "{tac.example}"
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            False Urgency is weaponized in 36% of all forwarded messages to bypass critical review.
          </div>
        </div>
      </div>

      {/* Live Debunk Ticker Feed */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h3 className="text-base font-bold text-white">Recently Debunked Viral Claims</h3>
          </div>
          <span className="text-xs text-slate-400">Updated continuously</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {recentDebunks.map((debunk) => (
            <div key={debunk.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-semibold text-slate-200">
                  "{debunk.claim}"
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-cyan-400 font-medium">{debunk.category}</span>
                  <span>·</span>
                  <span>Flagged for: <strong className="text-slate-300">{debunk.primaryTactic}</strong></span>
                  <span>·</span>
                  <span>Verified by: <strong className="text-emerald-400">{debunk.verifiedBy}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  debunk.verdict === 'FALSE'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : debunk.verdict === 'MISLEADING'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-500/20 text-slate-300 border border-slate-500/40'
                }`}>
                  {debunk.verdict}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{debunk.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
