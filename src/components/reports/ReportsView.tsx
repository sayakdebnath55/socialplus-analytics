import React, { useState } from 'react';
import { KpiMetric, SocialPlatform, DateRange } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';
import {
  FileSpreadsheet,
  Printer,
  Download,
  Calendar,
  CheckCircle2,
  Share2,
  Mail,
  Clock,
  Sparkles
} from 'lucide-react';

interface ReportsViewProps {
  kpis: KpiMetric[];
  activePlatform: SocialPlatform;
  activeRange: DateRange;
  onOpenExportModal: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  kpis,
  activePlatform,
  activeRange,
  onOpenExportModal
}) => {
  const [scheduled, setScheduled] = useState(false);
  const [includeKpis, setIncludeKpis] = useState(true);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [executiveNotes, setExecutiveNotes] = useState(
    'Strong cross-channel momentum across Q3-Q4. Multi-slide educational carousels and YouTube technical documentaries generated record engagement. Recommend allocating +25% creative resources toward short-form video hooks.'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileSpreadsheet className="text-brand-400" size={24} />
            Automated Executive Reports & Briefings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate board-ready executive summaries, export multi-channel raw CSV telemetry, and configure delivery cadences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            <Printer size={14} className="text-cyan-400" />
            <span>Print / PDF Document</span>
          </button>
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white shadow-lg shadow-brand-600/30 transition-all"
          >
            <Download size={14} />
            <span>Export Raw Data</span>
          </button>
        </div>
      </div>

      {/* Main Report Document Sheet Preview */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-md space-y-6 print:border-none print:bg-white print:text-black">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-brand-400 font-semibold mb-1">
              SocialPulse Analytics — Executive Briefing
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Multi-Platform Performance Audit
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <span>Channel: <strong className="text-white capitalize">{activePlatform}</strong></span>
              <span>•</span>
              <span>Cadence: <strong className="text-white uppercase">{activeRange}</strong></span>
              <span>•</span>
              <span>Generated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span className="inline-block rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400">
              Status: Verified Telemetry
            </span>
          </div>
        </div>

        {/* Executive Summary Memo */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Executive Summary & Strategic Context
          </h3>
          <textarea
            value={executiveNotes}
            onChange={(e) => setExecutiveNotes(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Core KPIs Snapshot Table */}
        {includeKpis && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Core Metric Telemetry (11 KPIs)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {kpis.map(k => (
                <div key={k.id} className="p-3 rounded-xl border border-slate-800 bg-slate-950/40">
                  <div className="text-[11px] text-slate-400 truncate">{k.label}</div>
                  <div className="text-xl font-bold text-white mt-0.5">{k.formattedValue}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                    +{k.change}% vs {k.formattedPreviousValue} prev
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actionable Next Steps */}
        {includeRecommendations && (
          <div className="p-4 rounded-xl border border-brand-500/30 bg-brand-950/20">
            <div className="flex items-center gap-2 text-brand-300 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles size={14} /> Recommended Strategic Priorities
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Increase carousel release frequency on Instagram to 4x/week to capitalize on 7.18% average engagement rate.</li>
              <li>Rebalance YouTube release schedule to Thursday 5:00 PM EST to capture optimal watch sessions.</li>
              <li>Consolidate B2B engineering think-pieces onto LinkedIn to leverage +7.0% engagement among enterprise technical leads.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Report Schedule & Automated Dispatch Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-brand-400 shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Automated Weekly Stakeholder Dispatch</h3>
              <p className="text-xs text-slate-400">
                Email this executive summary automatically to your marketing team and leadership every Monday at 8:00 AM.
              </p>
            </div>
          </div>

          <button
            onClick={() => setScheduled(!scheduled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              scheduled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
            }`}
          >
            {scheduled ? <CheckCircle2 size={14} /> : <Clock size={14} />}
            <span>{scheduled ? 'Scheduled (Every Mon 8 AM)' : 'Enable Weekly Email'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
