import React, { useState } from 'react';
import { Claim, EvidenceSource, ClaimVerdict } from '../types';
import { 
  ShieldCheck, 
  AlertCircle, 
  HelpCircle, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  FileText, 
  Calendar, 
  Check, 
  X,
  Filter,
  Info
} from 'lucide-react';

interface EvidenceExplorerProps {
  claims: Claim[];
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({ claims }) => {
  const [selectedVerdictFilter, setSelectedVerdictFilter] = useState<string>('ALL');
  const [selectedClaimId, setSelectedClaimId] = useState<string>(claims[0]?.id || '');

  const filteredClaims = claims.filter((c) => {
    if (selectedVerdictFilter === 'ALL') return true;
    return c.verdict === selectedVerdictFilter;
  });

  const activeClaim = claims.find((c) => c.id === selectedClaimId) || claims[0];

  const getVerdictStyle = (verdict: ClaimVerdict) => {
    switch (verdict) {
      case 'FALSE':
        return {
          bg: 'bg-rose-500/15',
          border: 'border-rose-500/40',
          text: 'text-rose-400',
          icon: X,
          badge: 'FALSE',
        };
      case 'MISLEADING':
        return {
          bg: 'bg-amber-500/15',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          icon: AlertCircle,
          badge: 'MISLEADING',
        };
      case 'TRUE':
        return {
          bg: 'bg-emerald-500/15',
          border: 'border-emerald-500/40',
          text: 'text-emerald-400',
          icon: CheckCircle2,
          badge: 'TRUE',
        };
      case 'UNVERIFIED':
      default:
        return {
          bg: 'bg-slate-500/15',
          border: 'border-slate-500/40',
          text: 'text-slate-400',
          icon: HelpCircle,
          badge: 'UNVERIFIED',
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Cross-Agency Verification Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Evidence Explorer & Claim Verification
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Deconstructing individual propositions with primary-source evidence and verification stance.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {['ALL', 'FALSE', 'MISLEADING', 'UNVERIFIED', 'TRUE'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedVerdictFilter(f)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                selectedVerdictFilter === f
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Claim Selector, Right Detailed Evidence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Claim Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
            <span>Extracted Claims ({filteredClaims.length})</span>
            <span className="text-[11px] text-slate-400">Select to inspect evidence</span>
          </div>

          {filteredClaims.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 rounded-2xl bg-slate-900/40 border border-slate-800">
              No claims match this filter.
            </div>
          ) : (
            filteredClaims.map((claim, idx) => {
              const style = getVerdictStyle(claim.verdict);
              const VerdictIcon = style.icon;
              const isSelected = claim.id === activeClaim?.id;

              return (
                <div
                  key={claim.id}
                  onClick={() => setSelectedClaimId(claim.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border relative ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      CLAIM #{idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border ${style.bg} ${style.border} ${style.text}`}>
                        <VerdictIcon className="w-3 h-3" />
                        {style.badge}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {claim.confidence}% Conf.
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-200 line-clamp-2 mb-2">
                    "{claim.text}"
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span>{claim.sources.length} Verified Sources</span>
                    <span className="text-cyan-400 hover:text-cyan-300 font-medium">Inspect Evidence →</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Detailed Claim & Evidence View */}
        <div className="lg:col-span-7">
          {activeClaim ? (
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
              {/* Claim Header & Verdict */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    DETAILED CLAIM VERIFICATION
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getVerdictStyle(activeClaim.verdict).bg} ${getVerdictStyle(activeClaim.verdict).border} ${getVerdictStyle(activeClaim.verdict).text}`}>
                      VERDICT: {activeClaim.verdict}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Model Confidence: {activeClaim.confidence}%
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm font-semibold text-white mb-4">
                  "{activeClaim.text}"
                </div>

                {/* WHY Section */}
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                    Why this verdict?
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeClaim.explanation}
                  </p>
                </div>
              </div>

              {/* Verified Sources Matrix */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Supporting & Contradicting Evidence ({activeClaim.sources.length})
                  </h4>
                  <span className="text-[10px] text-amber-400 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Prototype Demo Citations
                  </span>
                </div>

                <div className="space-y-3">
                  {activeClaim.sources.map((src) => (
                    <div
                      key={src.id}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2.5 transition-colors hover:border-slate-700"
                    >
                      {/* Source Metadata row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                            {src.type}
                          </span>
                          <span className="font-semibold text-slate-200">{src.publisher}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {src.date}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            src.stance === 'Contradicting' 
                              ? 'text-rose-400 bg-rose-500/10' 
                              : 'text-emerald-400 bg-emerald-500/10'
                          }`}>
                            Stance: {src.stance}
                          </span>
                        </div>
                      </div>

                      {/* Source title */}
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {src.title}
                      </div>

                      {/* Excerpt quote */}
                      <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs italic text-slate-300 leading-relaxed font-mono">
                        "{src.quote}"
                      </div>

                      {/* Outbound Link Bar */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400">
                          Reliability: <strong className="text-emerald-400">{src.reliability}</strong>
                        </span>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-cyan-300 hover:bg-slate-700 hover:text-cyan-200 border border-slate-700 transition-colors"
                        >
                          <span>View Source / Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400 rounded-2xl bg-slate-900/40 border border-slate-800">
              Select a claim on the left to inspect its evidence and provenance.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
