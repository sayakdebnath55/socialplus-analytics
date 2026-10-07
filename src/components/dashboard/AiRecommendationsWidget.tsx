import React, { useState } from 'react';
import { Recommendation } from '../../types/analytics';
import { PlatformBadge } from '../common/PlatformBadge';
import { Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface AiRecommendationsWidgetProps {
  recommendations: Recommendation[];
  onActionClick?: (rec: Recommendation) => void;
}

export const AiRecommendationsWidget: React.FC<AiRecommendationsWidgetProps> = ({
  recommendations,
  onActionClick
}) => {
  const [appliedIds, setAppliedIds] = useState<Record<string, boolean>>({});

  const handleApply = (rec: Recommendation) => {
    setAppliedIds(prev => ({ ...prev, [rec.id]: true }));
    if (onActionClick) {
      onActionClick(rec);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
              <Zap size={14} />
            </div>
            <h3 className="text-base font-semibold text-white">AI Growth Engine & Recommendations</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithmic insights calculated from post retention, format yields, and competitor movements.
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-brand-300 bg-brand-500/10 border border-brand-500/20 px-2.5 py-1 rounded-full font-medium">
          <Sparkles size={12} />
          {recommendations.length} Actionable Opportunities Found
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {recommendations.map(rec => {
          const isApplied = !!appliedIds[rec.id];

          return (
            <div
              key={rec.id}
              className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-950/70 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {rec.platform && (
                      <PlatformBadge platform={rec.platform} size="sm" />
                    )}
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        rec.impact === 'High Impact'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {rec.impact}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    {rec.confidenceScore}% confidence
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-white mb-1.5 leading-snug">
                  {rec.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {rec.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 mt-2">
                <span className="text-[11px] text-slate-400">
                  Benefits: <strong className="text-slate-300 font-medium">{rec.metricBenefited}</strong>
                </span>

                <button
                  onClick={() => handleApply(rec)}
                  disabled={isApplied}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isApplied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-brand-600/80 text-white hover:bg-brand-500 shadow-sm'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 size={13} /> Applied
                    </>
                  ) : (
                    <>
                      {rec.actionLabel}
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
