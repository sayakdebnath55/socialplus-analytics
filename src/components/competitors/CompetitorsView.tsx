import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { mockCompetitors } from '../../data/mockData';
import { formatNumber } from '../../utils/formatters';
import {
  Target,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export const CompetitorsView: React.FC = () => {
  const competitors = mockCompetitors;

  const sovData = competitors.map(c => ({
    name: c.name,
    value: c.shareOfVoice,
    isSelf: c.isSelf
  }));

  const sovColors = ['#8B5CF6', '#38BDF8', '#F59E0B', '#10B981'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Target className="text-brand-400" size={24} />
            Competitive Intelligence & Market Share
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Benchmark your reach velocity, share of voice, engagement rates, and content cadence against primary rivals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs font-semibold">
            Market Rank: #1 in Share of Voice (34.2%)
          </span>
        </div>
      </div>

      {/* Benchmarking Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-semibold text-white">Direct Competitor Comparison Matrix</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live automated indexing of public competitor social activity across platforms.
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40">
                <th className="py-3 px-4">Brand / Competitor</th>
                <th className="py-3 px-3">Followers</th>
                <th className="py-3 px-3">30d Growth</th>
                <th className="py-3 px-3">Avg. Engagement Rate</th>
                <th className="py-3 px-3">Avg Likes / Post</th>
                <th className="py-3 px-3">Share of Voice</th>
                <th className="py-3 px-3">Weekly Cadence</th>
                <th className="py-3 px-3">Top Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {competitors.map(c => (
                <tr
                  key={c.id}
                  className={`transition-colors ${
                    c.isSelf
                      ? 'bg-brand-950/30 font-medium border-l-2 border-l-brand-400'
                      : 'hover:bg-slate-800/30'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="h-8 w-8 rounded-lg object-cover border border-slate-800"
                      />
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          {c.name}
                          {c.isSelf && (
                            <span className="rounded bg-brand-500/20 text-brand-300 text-[10px] px-1.5 py-0.2 font-semibold">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{c.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-white">
                    {formatNumber(c.followers)}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-emerald-400 font-bold">
                    +{c.followerGrowth}%
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      {c.engagementRate}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-300">
                    {formatNumber(c.averageLikes)}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-brand-300">
                    {c.shareOfVoice}%
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">
                    {c.postFrequencyWeekly} / week
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">
                    {c.topFormat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts: Share of Voice & Engagement Rate Benchmark */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Share of Voice Donut */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-semibold text-white">Share of Voice (SOV) Breakdown</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculated by impression density and engagement share in your niche.
              </p>
            </div>

            <div className="h-52 w-full pt-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sovData}
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sovData.map((entry, index) => (
                      <Cell key={`sov-${index}`} fill={sovColors[index % sovColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-2.5 text-xs shadow-xl">
                            <span className="font-semibold text-white">{d.name}:</span> {d.value}% SOV
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

          <div className="space-y-2 pt-3 border-t border-slate-800/80">
            {sovData.map((d, idx) => (
              <div key={d.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: sovColors[idx] }} />
                  <span className={`font-medium ${d.isSelf ? 'text-brand-300 font-bold' : 'text-slate-300'}`}>
                    {d.name}
                  </span>
                </div>
                <span className="font-bold text-white font-mono">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Rate Benchmark Bar Chart */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-semibold text-white">Engagement Rate Benchmark</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparison of actual audience response rate per impressions delivered.
              </p>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitors} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-3 text-xs shadow-xl">
                          <p className="font-bold text-white mb-1 border-b border-slate-800 pb-1">{d.name}</p>
                          <div className="text-slate-300 space-y-1">
                            <div>Engagement Rate: <strong className="text-emerald-400">{d.engagementRate}%</strong></div>
                            <div>30d Growth: <strong className="text-brand-300">+{d.followerGrowth}%</strong></div>
                            <div>Followers: <strong className="text-white">{formatNumber(d.followers)}</strong></div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="engagementRate" radius={[6, 6, 0, 0]}>
                  {competitors.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isSelf ? '#8B5CF6' : '#334155'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span>Your Engagement Rate: <strong className="text-brand-300 font-bold">6.32%</strong></span>
            <span>Industry Benchmark: <strong className="text-slate-300 font-bold">4.73%</strong></span>
            <span className="text-emerald-400 font-bold">+33.6% Outperformance</span>
          </div>
        </div>
      </div>

      {/* Row 3: Strategic Gap Analysis & Tactical Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 size={16} /> Content Lead
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Superior Carousel Retention</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your carousel bookmark rate is 2.8x higher than NovaTech Media. Continuing this visual cadence solidifies market dominance.
            </p>
          </div>
          <div className="mt-3 text-[11px] text-emerald-400 font-medium">Advantage: Strong</div>
        </div>

        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertTriangle size={16} /> Velocity Gap
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Cadence Vulnerability</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              NovaTech Media posts 18.0 times/week vs your 14.2 times/week, capturing short-video algorithmic slots on TikTok and Reels.
            </p>
          </div>
          <div className="mt-3 text-[11px] text-amber-400 font-medium">Action: Increase short-form video output by 3/week</div>
        </div>

        <div className="p-4 rounded-xl border border-brand-500/30 bg-brand-950/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap size={16} /> Untapped Channel
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Nexus Cloud B2B Niche</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nexus Cloud has built momentum on LinkedIn with technical case studies. Expanding your engineering deep dives will capture their audience.
            </p>
          </div>
          <div className="mt-3 text-[11px] text-brand-300 font-medium">Opportunity: 240K reachable audience</div>
        </div>
      </div>
    </div>
  );
};
