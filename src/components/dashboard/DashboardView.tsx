import React from 'react';
import { KpiMetric, TimeSeriesPoint, Recommendation, SocialPlatform, SocialPost } from '../../types/analytics';
import { KpiCard } from '../common/KpiCard';
import { PerformanceTrendChart } from './PerformanceTrendChart';
import { PlatformDistributionChart } from './PlatformDistributionChart';
import { BestTimeToPostHeatmap } from './BestTimeToPostHeatmap';
import { AiRecommendationsWidget } from './AiRecommendationsWidget';
import { PlatformBadge } from '../common/PlatformBadge';
import { formatNumber } from '../../utils/formatters';
import { ArrowUpRight, TrendingUp, Sparkles, Heart, Share2, MessageCircle, Eye } from 'lucide-react';

interface DashboardViewProps {
  kpis: KpiMetric[];
  timeSeriesData: TimeSeriesPoint[];
  recommendations: Recommendation[];
  topPosts: SocialPost[];
  selectedPlatform: SocialPlatform;
  onSelectPlatform: (platform: SocialPlatform) => void;
  onNavigateToContent: () => void;
  onOpenAiCopilot: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  kpis,
  timeSeriesData,
  recommendations,
  topPosts,
  selectedPlatform,
  onSelectPlatform,
  onNavigateToContent,
  onOpenAiCopilot
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Overview Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-gradient-to-r from-slate-900 via-brand-950/40 to-slate-900 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                Executive Social Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
              Cross-Platform Performance Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Monitoring verified metrics across Instagram, YouTube, Facebook, X, and LinkedIn.
              Overall organic engagement is up <span className="text-emerald-400 font-semibold">+15.6%</span> compared to the previous period.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAiCopilot}
              className="flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-600/30 transition-all hover:scale-105"
            >
              <Sparkles size={15} />
              <span>Ask AI Copilot</span>
            </button>
            <button
              onClick={onNavigateToContent}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-3.5 py-2.5 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>View Top Content</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Decorative backdrop glow */}
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* 11 KPI Cards Grid (Responsive 2 to 4 cols) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Core Performance Indicators (11 Key Metrics)
            </h2>
            <span className="text-xs text-slate-500 font-normal">
              • Normalized across {selectedPlatform === 'all' ? 'all 5 platforms' : selectedPlatform}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {kpis.map((metric) => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      {/* Row 2: Charts - Trend Line & Platform Share Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <PerformanceTrendChart data={timeSeriesData} />
        </div>
        <div className="lg:col-span-5">
          <PlatformDistributionChart onSelectPlatform={onSelectPlatform} />
        </div>
      </div>

      {/* Row 3: Optimal Posting Windows Heatmap & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <BestTimeToPostHeatmap />
        </div>
        <div className="lg:col-span-7">
          <AiRecommendationsWidget
            recommendations={recommendations}
            onActionClick={onOpenAiCopilot}
          />
        </div>
      </div>

      {/* Row 4: Top Performing Content Quick Showcase */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">Top Performing Content</h3>
              <span className="rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-medium">
                Highest Reach & Saves
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Posts driving the highest engagement rates across your published library.
            </p>
          </div>

          <button
            onClick={onNavigateToContent}
            className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            <span>Full Content Library</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {topPosts.slice(0, 3).map(post => (
            <div
              key={post.id}
              onClick={onNavigateToContent}
              className="group cursor-pointer rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-950/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <PlatformBadge platform={post.platform} size="sm" />
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    {post.engagementRate}% ER
                  </span>
                </div>

                <p className="text-xs text-slate-200 line-clamp-3 font-medium leading-relaxed mb-3">
                  {post.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Eye size={12} className="text-cyan-400" />
                  {formatNumber(post.reach)} reach
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={12} className="text-rose-400" />
                  {formatNumber(post.likes)}
                </span>
                <span className="flex items-center gap-1">
                  <Share2 size={12} className="text-emerald-400" />
                  {formatNumber(post.shares)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
