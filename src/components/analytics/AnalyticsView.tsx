import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { KpiMetric, TimeSeriesPoint } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';
import { mockFormatPerformance } from '../../data/mockData';
import {
  Activity,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Play,
  Smile,
  Meh,
  Frown,
  TrendingUp,
  Flame,
  Award
} from 'lucide-react';

interface AnalyticsViewProps {
  kpis: KpiMetric[];
  timeSeriesData: TimeSeriesPoint[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ kpis, timeSeriesData }) => {
  const [funnelMetric, setFunnelMetric] = useState<'standard' | 'shares'>('standard');

  const reachKpi = kpis.find(k => k.id === 'reach')?.value || 4050000;
  const impressionsKpi = kpis.find(k => k.id === 'impressions')?.value || 7180000;
  const engagementKpi = kpis.find(k => k.id === 'engagement')?.value || 450200;
  const likesKpi = kpis.find(k => k.id === 'likes')?.value || 280000;
  const commentsKpi = kpis.find(k => k.id === 'comments')?.value || 56300;
  const sharesKpi = kpis.find(k => k.id === 'shares')?.value || 43300;
  const savesKpi = kpis.find(k => k.id === 'saves')?.value || 20600;

  // Engagement Breakdown Donut
  const engagementBreakdown = [
    { name: 'Likes', value: likesKpi, color: '#F43F5E' },
    { name: 'Comments', value: commentsKpi, color: '#F59E0B' },
    { name: 'Shares', value: sharesKpi, color: '#10B981' },
    { name: 'Saves', value: savesKpi, color: '#06B6D4' }
  ];

  // Sentiment Breakdown
  const sentimentData = [
    { name: 'Positive', value: 72.4, color: '#10B981', count: '18,400 mentions' },
    { name: 'Neutral', value: 21.2, color: '#64748B', count: '5,380 mentions' },
    { name: 'Negative', value: 6.4, color: '#F43F5E', count: '1,620 mentions' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Activity className="text-brand-400" size={24} />
            Deep-Dive Analytics & Engagement Economics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Granular analysis of conversion funnels, reaction distribution, sentiment, and format ROI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs font-semibold">
            Health Score: 94/100 (Optimal)
          </span>
        </div>
      </div>

      {/* Row 1: Conversion Funnel & Engagement Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Exposure to Action Funnel */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-semibold text-white">Exposure to Action Funnel</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Drop-off telemetry from raw impressions down to saved bookmarks.
              </p>
            </div>
            <span className="text-xs font-mono text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded-md">
              Conversion: 6.27%
            </span>
          </div>

          <div className="mt-5 space-y-3.5">
            {[
              { label: 'Impressions', count: impressionsKpi, pct: 100, color: 'bg-indigo-600', sub: 'Total feed displays' },
              { label: 'Unique Reach', count: reachKpi, pct: Math.round((reachKpi / impressionsKpi) * 100), color: 'bg-cyan-500', sub: 'Unique individuals reached' },
              { label: 'Engagements', count: engagementKpi, pct: Math.round((engagementKpi / impressionsKpi) * 100 * 5), color: 'bg-violet-500', sub: 'Total interactions (Likes + Comments + Shares)' },
              { label: 'Virality (Shares)', count: sharesKpi, pct: Math.round((sharesKpi / impressionsKpi) * 100 * 15), color: 'bg-emerald-500', sub: 'Audience forwards and retweets' },
              { label: 'Bookmarks (Saves)', count: savesKpi, pct: Math.round((savesKpi / impressionsKpi) * 100 * 25), color: 'bg-amber-500', sub: 'Saved for later high-intent reference' }
            ].map(step => (
              <div key={step.label} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div>
                    <span className="font-semibold text-white">{step.label}</span>
                    <span className="text-slate-500 ml-2 text-[11px] hidden sm:inline">({step.sub})</span>
                  </div>
                  <span className="font-bold text-white font-mono">{formatNumber(step.count)}</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${step.color} rounded-full transition-all duration-700`}
                    style={{ width: `${Math.min(100, Math.max(5, step.pct))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Reaction Split */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-semibold text-white">Engagement Composition</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Breakdown across likes, discussions, shares, and bookmarks.
              </p>
            </div>

            <div className="h-48 w-full pt-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={engagementBreakdown}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {engagementBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-2.5 text-xs shadow-xl">
                            <span className="font-semibold text-white" style={{ color: d.color }}>
                              {d.name}:
                            </span>{' '}
                            {formatNumber(d.value)}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
            {engagementBreakdown.map(e => (
              <div key={e.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                  <span className="text-slate-300 font-medium">{e.name}</span>
                </div>
                <span className="font-bold text-white">{formatNumber(e.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Format Performance Matrix & Sentiment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Format Performance Matrix */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">Content Format Yield & Efficiency</h3>
                <span className="rounded-md bg-brand-500/10 text-brand-300 border border-brand-500/20 px-2 py-0.5 text-[11px] font-medium">
                  Reels & Carousels Leading
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparison of reach multiplier and engagement yield by content type.
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-2.5 px-3">Format</th>
                  <th className="py-2.5 px-3">Published</th>
                  <th className="py-2.5 px-3">Avg. Reach</th>
                  <th className="py-2.5 px-3">Avg. Engagement</th>
                  <th className="py-2.5 px-3">Engagement Rate</th>
                  <th className="py-2.5 px-3 text-right">Yield Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {mockFormatPerformance.map(f => (
                  <tr key={f.format} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-slate-800 flex items-center justify-center text-brand-400">
                        <Flame size={13} />
                      </div>
                      {f.format}
                    </td>
                    <td className="py-3 px-3 text-slate-400">{f.count} posts</td>
                    <td className="py-3 px-3 font-mono">{formatNumber(f.avgReach)}</td>
                    <td className="py-3 px-3 font-mono">{formatNumber(f.avgEngagement)}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {f.engagementRate}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="font-semibold text-brand-300">
                        {f.engagementRate >= 7.5 ? '⭐⭐⭐ Top Tier' : f.engagementRate >= 6.0 ? '⭐⭐ Strong' : '⭐ Standard'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audience Sentiment Analysis */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-semibold text-white">Sentiment Telemetry</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                NLP tone analysis evaluated across 25,400+ comments & mentions.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2.5">
                  <Smile className="text-emerald-400" size={20} />
                  <div>
                    <div className="text-xs font-semibold text-white">Positive Sentiment</div>
                    <div className="text-[11px] text-slate-400">72.4% (18,400 mentions)</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-400">+4.2%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Meh className="text-slate-400" size={20} />
                  <div>
                    <div className="text-xs font-semibold text-white">Neutral Discussions</div>
                    <div className="text-[11px] text-slate-400">21.2% (5,380 mentions)</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-slate-400">-1.8%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <div className="flex items-center gap-2.5">
                  <Frown className="text-rose-400" size={20} />
                  <div>
                    <div className="text-xs font-semibold text-white">Critical / Inquiries</div>
                    <div className="text-[11px] text-slate-400">6.4% (1,620 mentions)</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-rose-400">-2.4%</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4 text-[11px] text-slate-400">
            Net Sentiment Score: <strong className="text-emerald-400 font-bold">+66.0 NPS</strong> (Industry benchmark: +42.0)
          </div>
        </div>
      </div>
    </div>
  );
};
