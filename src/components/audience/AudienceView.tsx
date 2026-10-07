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
import { mockDemographics } from '../../data/mockData';
import { formatNumber } from '../../utils/formatters';
import { Users, Globe, MapPin, Compass, Sparkles, PieChart as PieIcon } from 'lucide-react';

export const AudienceView: React.FC = () => {
  const { ageGroups, gender, topCountries, topCities, interests } = mockDemographics;

  const genderColors = ['#06B6D4', '#EC4899', '#8B5CF6'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="text-brand-400" size={24} />
            Audience Demographics & Cohort Insights
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Understanding follower age brackets, geographic density, peak active hours, and content affinities.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-lg bg-brand-500/10 text-brand-300 border border-brand-500/20 px-3 py-1 font-semibold">
            1.43M Total Global Audience
          </span>
        </div>
      </div>

      {/* Row 1: Age Brackets & Gender Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Age Groups Bar Chart */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-semibold text-white">Age Bracket Distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Breakdown of active followers by age cohorts.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              Core: 25-34 (49%)
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageGroups} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="range" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-3 text-xs shadow-xl">
                          <p className="font-bold text-white mb-1.5 border-b border-slate-800 pb-1">
                            Age: {label}
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between gap-4">
                              <span className="text-cyan-400">Male:</span>
                              <span className="font-semibold text-white">{payload[0].payload.male}%</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-pink-400">Female:</span>
                              <span className="font-semibold text-white">{payload[0].payload.female}%</span>
                            </div>
                            <div className="flex justify-between gap-4 border-t border-slate-800 pt-1">
                              <span className="text-slate-400 font-bold">Total:</span>
                              <span className="font-bold text-brand-300">{payload[0].payload.total}%</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="male" name="Male" fill="#06B6D4" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="female" name="Female" fill="#EC4899" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-3 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-cyan-500" />
              <span className="text-slate-300">Male</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-pink-500" />
              <span className="text-slate-300">Female</span>
            </div>
          </div>
        </div>

        {/* Gender Split Pie */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-base font-semibold text-white">Gender Identity Representation</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Aggregated profile demographics across connected channels.
              </p>
            </div>

            <div className="h-48 w-full pt-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gender}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="percentage"
                  >
                    {gender.map((entry, index) => (
                      <Cell key={`gender-${index}`} fill={genderColors[index % genderColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-2.5 text-xs shadow-xl">
                            <span className="font-semibold text-white">{d.gender}:</span> {d.percentage}%
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
            {gender.map((g, idx) => (
              <div key={g.gender} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: genderColors[idx] }} />
                  <span className="text-slate-300 font-medium">{g.gender}</span>
                </div>
                <span className="font-bold text-white font-mono">{g.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Top Geographies & Audience Interests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Countries & Cities */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-cyan-400" />
                <h3 className="text-base font-semibold text-white">Geographic Distribution</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Top audience territories by volume and engagement concentration.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {/* Countries */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Globe size={13} /> Top Countries
              </div>
              <div className="space-y-2.5">
                {topCountries.map(c => (
                  <div key={c.country} className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-white">{c.country}</span>
                      <span className="font-mono text-cyan-400 font-bold">{c.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${c.percentage * 2}%` }} />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">{formatNumber(c.followers)} followers</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <MapPin size={13} /> Top Metro Cities
              </div>
              <div className="space-y-2.5">
                {topCities.map(city => (
                  <div key={city.city} className="p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div>
                        <span className="font-semibold text-white">{city.city}</span>
                        <span className="text-[10px] text-slate-500 ml-1.5">{city.country}</span>
                      </div>
                      <span className="font-mono text-brand-300 font-bold">{city.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${city.percentage * 7}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Audience Interests & Affinity */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-brand-400" />
                <h3 className="text-base font-semibold text-white">Topic Affinity Index</h3>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-2 mb-4">
              Categorized interest categories derived from content consumption behavior and engagement patterns.
            </p>

            <div className="space-y-3">
              {interests.map(item => (
                <div key={item.name} className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-white">{item.name}</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono">
                      {item.affinityScore} / 10 Affinity
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-600 to-indigo-400 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {item.percentage}% of audience shows active engagement with this domain
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4 text-[11px] text-slate-400">
            💡 <strong className="text-white">Strategy insight:</strong> Highest affinity is with AI & Cloud Engineers. Educational frameworks will achieve 2.4x higher organic bookmark rates.
          </div>
        </div>
      </div>
    </div>
  );
};
