import React, { useState } from 'react';
import { Clock, Flame, Info } from 'lucide-react';

interface HeatmapCell {
  day: string;
  hour: number;
  hourLabel: string;
  score: number; // 1 to 10
  engagementRate: number; // e.g. 8.4%
  isPeak?: boolean;
}

export const BestTimeToPostHeatmap: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [
    { hour: 6, label: '6 AM' },
    { hour: 9, label: '9 AM' },
    { hour: 12, label: '12 PM' },
    { hour: 15, label: '3 PM' },
    { hour: 18, label: '6 PM' },
    { hour: 21, label: '9 PM' }
  ];

  // Deterministic realistic density map
  const getCellData = (day: string, hour: number, hourLabel: string): HeatmapCell => {
    let score = 3;
    if (day === 'Thu' && hour === 18) score = 10;
    else if (day === 'Tue' && hour === 12) score = 8.5;
    else if (day === 'Wed' && hour === 15) score = 8.8;
    else if (day === 'Sat' && hour === 18) score = 9.2;
    else if (day === 'Fri' && hour === 15) score = 8.0;
    else if (day === 'Sun' && hour === 21) score = 7.5;
    else if (hour === 6) score = 2.5;
    else if (hour === 18) score = 7.8;
    else if (hour === 12) score = 6.9;
    else score = Math.max(2, Math.min(8, (day.charCodeAt(0) + hour) % 7 + 2.5));

    const engagementRate = Number((2.8 + (score * 0.58)).toFixed(2));
    const isPeak = score >= 9.0;

    return { day, hour, hourLabel, score, engagementRate, isPeak };
  };

  const getColorClass = (score: number) => {
    if (score >= 9.0) return 'bg-purple-500 text-white shadow-glow-brand ring-1 ring-purple-300';
    if (score >= 7.5) return 'bg-purple-600/90 text-white';
    if (score >= 6.0) return 'bg-purple-700/70 text-purple-200';
    if (score >= 4.5) return 'bg-purple-900/50 text-purple-300';
    if (score >= 3.0) return 'bg-slate-800 text-slate-400';
    return 'bg-slate-900 text-slate-500';
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white">Optimal Posting Windows</h3>
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300 border border-amber-500/20">
                <Flame size={12} /> High Engagement
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Heatmap of audience activity and engagement density across the past 30 days.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Low</span>
            <div className="flex gap-1">
              <span className="h-2.5 w-3 rounded-sm bg-slate-900" />
              <span className="h-2.5 w-3 rounded-sm bg-purple-900/50" />
              <span className="h-2.5 w-3 rounded-sm bg-purple-700/70" />
              <span className="h-2.5 w-3 rounded-sm bg-purple-600" />
              <span className="h-2.5 w-3 rounded-sm bg-purple-500" />
            </div>
            <span>Peak</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="mt-5 overflow-x-auto">
          <div className="min-w-[420px]">
            {/* Hour headers */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center">
              <div className="text-[11px] text-slate-500 font-medium">Day</div>
              {hours.map(h => (
                <div key={h.hour} className="text-[11px] text-slate-400 font-medium">
                  {h.label}
                </div>
              ))}
            </div>

            {/* Day rows */}
            <div className="space-y-1.5">
              {days.map(day => (
                <div key={day} className="grid grid-cols-7 gap-2 items-center">
                  <div className="text-xs font-semibold text-slate-400 text-left pl-1">
                    {day}
                  </div>
                  {hours.map(h => {
                    const cell = getCellData(day, h.hour, h.label);
                    return (
                      <div
                        key={`${day}-${h.hour}`}
                        onMouseEnter={() => setHoveredCell(cell)}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`relative h-8 rounded-lg cursor-pointer transition-all duration-150 flex items-center justify-center text-[11px] font-medium hover:scale-105 ${getColorClass(cell.score)}`}
                      >
                        {cell.isPeak && <span className="text-[9px] font-bold">★</span>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Inspector Bar */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        {hoveredCell ? (
          <div className="flex items-center gap-2 text-slate-300">
            <Clock size={14} className="text-brand-400" />
            <span>
              <strong className="text-white">{hoveredCell.day} at {hoveredCell.hourLabel}</strong>:
              Expected Engagement Rate is{' '}
              <span className="text-emerald-400 font-bold">{hoveredCell.engagementRate}%</span>
              {hoveredCell.isPeak && ' (🔥 Global Peak Slot)'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-500">
            <Info size={14} />
            <span>Hover over any grid cell to view time-specific audience reaction rates.</span>
          </div>
        )}

        <div className="hidden sm:block text-[11px] text-brand-300/90 font-medium">
          Best Slot: Thursday 6:00 PM EST (8.6%)
        </div>
      </div>
    </div>
  );
};
