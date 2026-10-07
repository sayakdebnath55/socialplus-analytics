import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { TimeSeriesPoint } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';
import { Sparkles } from 'lucide-react';

interface PerformanceTrendChartProps {
  data: TimeSeriesPoint[];
}

export const PerformanceTrendChart: React.FC<PerformanceTrendChartProps> = ({ data }) => {
  const [primaryMetric, setPrimaryMetric] = useState<'reach' | 'impressions' | 'engagement' | 'videoViews'>('reach');
  const [showSecondary, setShowSecondary] = useState(true);

  const getMetricLabel = (key: string) => {
    switch (key) {
      case 'reach': return 'Reach';
      case 'impressions': return 'Impressions';
      case 'engagement': return 'Engagement';
      case 'videoViews': return 'Video Views';
      default: return key;
    }
  };

  const getMetricColor = (key: string) => {
    switch (key) {
      case 'reach': return '#06B6D4'; // cyan
      case 'impressions': return '#8B5CF6'; // purple/brand
      case 'engagement': return '#10B981'; // emerald
      case 'videoViews': return '#F43F5E'; // rose
      default: return '#8B5CF6';
    }
  };

  const secondaryMetric = primaryMetric === 'engagement' ? 'impressions' : 'engagement';
  const primaryColor = getMetricColor(primaryMetric);
  const secondaryColor = getMetricColor(secondaryMetric);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white">Cross-Platform Growth & Velocity Trend</h3>
            <span className="flex items-center gap-1 rounded-full bg-brand-500/10 px-2 py-0.5 text-[11px] font-medium text-brand-300 border border-brand-500/20">
              <Sparkles size={11} /> Real-Time Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare multi-channel audience exposure, engagement surges, and algorithmic amplification.
          </p>
        </div>

        {/* Metric Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {(['reach', 'impressions', 'engagement', 'videoViews'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setPrimaryMetric(m)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                primaryMetric === m
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {getMetricLabel(m)}
            </button>
          ))}

          <button
            onClick={() => setShowSecondary(!showSecondary)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium border transition-colors ${
              showSecondary
                ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                : 'border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
          >
            + {getMetricLabel(secondaryMetric)}
          </button>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="secondaryGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={secondaryColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatNumber(v)}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md">
                      <p className="text-xs font-semibold text-slate-300 border-b border-slate-800 pb-1 mb-2">
                        {label}
                      </p>
                      {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-4 text-xs py-0.5">
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            {getMetricLabel(entry.dataKey)}:
                          </span>
                          <span className="font-semibold text-white">
                            {formatNumber(entry.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={primaryMetric}
              stroke={primaryColor}
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#primaryGrad)"
            />
            {showSecondary && (
              <Area
                type="monotone"
                dataKey={secondaryMetric}
                stroke={secondaryColor}
                strokeWidth={2}
                strokeDasharray="4 2"
                fillOpacity={1}
                fill="url(#secondaryGrad)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & quick summary */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span className="text-slate-300 font-medium">{getMetricLabel(primaryMetric)}</span>
          </div>
          {showSecondary && (
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: secondaryColor }} />
              <span className="text-slate-300 font-medium">{getMetricLabel(secondaryMetric)}</span>
            </div>
          )}
        </div>
        <div className="text-[11px] text-slate-500">
          Showing daily performance normalized across all linked network profiles
        </div>
      </div>
    </div>
  );
};
