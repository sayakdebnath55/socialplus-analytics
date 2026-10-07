import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { mockPlatformBreakdown } from '../../data/mockData';
import { SocialPlatform } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';
import { Layers } from 'lucide-react';

interface PlatformDistributionChartProps {
  onSelectPlatform?: (platform: SocialPlatform) => void;
}

export const PlatformDistributionChart: React.FC<PlatformDistributionChartProps> = ({ onSelectPlatform }) => {
  const [selectedMetric, setSelectedMetric] = useState<'followers' | 'reach' | 'engagement' | 'videoViews'>('reach');

  const platforms = Object.values(mockPlatformBreakdown);

  const chartData = platforms.map(p => ({
    name: p.name,
    platform: p.platform,
    value: p[selectedMetric],
    color: p.color,
    rate: p.engagementRate
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">Platform Share & Comparison</h3>
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-400">
                Total: {formatNumber(total)}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Cross-network allocation across Instagram, YouTube, Facebook, X, and LinkedIn.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            {(['reach', 'engagement', 'followers', 'videoViews'] as const).map(m => (
              <button
                key={m}
                onClick={() => setSelectedMetric(m)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedMetric === m
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'videoViews' ? 'Views' : m}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatNumber(v)}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const pct = total > 0 ? ((data.value / total) * 100).toFixed(1) : '0';
                    return (
                      <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-2 font-semibold text-white text-xs border-b border-slate-800 pb-1 mb-2">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                          {data.name}
                        </div>
                        <div className="text-xs text-slate-300 space-y-1">
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-400 capitalize">{selectedMetric}:</span>
                            <span className="font-semibold text-white">{formatNumber(data.value)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-400">Share of Total:</span>
                            <span className="font-semibold text-brand-300">{pct}%</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-400">Avg Engagement Rate:</span>
                            <span className="font-semibold text-emerald-400">{data.rate}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} cursor="pointer">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    onClick={() => onSelectPlatform && onSelectPlatform(entry.platform as SocialPlatform)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Share Progress Pill Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4 border-t border-slate-800/80">
        {chartData.map(c => {
          const pct = total > 0 ? ((c.value / total) * 100).toFixed(1) : '0';
          return (
            <div
              key={c.platform}
              onClick={() => onSelectPlatform && onSelectPlatform(c.platform as SocialPlatform)}
              className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60 hover:border-slate-700 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-300 font-medium truncate">{c.name}</span>
                <span className="text-slate-400 font-mono">{pct}%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: c.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
