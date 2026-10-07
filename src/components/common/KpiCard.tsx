import React from 'react';
import { KpiMetric } from '../../types/analytics';
import { Sparkline } from './Sparkline';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Layers,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  UserPlus,
  Percent,
  HelpCircle
} from 'lucide-react';

interface KpiCardProps {
  metric: KpiMetric;
  iconName?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric, onClick }) => {
  const isPositive = metric.change >= 0;

  const getIcon = () => {
    switch (metric.id) {
      case 'followers':
        return <Users className="text-violet-400" size={18} />;
      case 'reach':
        return <Eye className="text-cyan-400" size={18} />;
      case 'impressions':
        return <Layers className="text-blue-400" size={18} />;
      case 'engagement':
        return <TrendingUp className="text-indigo-400" size={18} />;
      case 'engagement-rate':
        return <Percent className="text-purple-400" size={18} />;
      case 'likes':
        return <Heart className="text-rose-400" size={18} />;
      case 'comments':
        return <MessageCircle className="text-amber-400" size={18} />;
      case 'shares':
        return <Share2 className="text-emerald-400" size={18} />;
      case 'saves':
        return <Bookmark className="text-teal-400" size={18} />;
      case 'video-views':
        return <Play className="text-red-400" size={18} />;
      case 'follower-growth':
        return <UserPlus className="text-green-400" size={18} />;
      default:
        return <TrendingUp className="text-slate-400" size={18} />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-lg hover:shadow-black/40 flex flex-col justify-between"
    >
      {/* Top row: Label + Icon */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400 group-hover:text-slate-300">
            {metric.label}
          </span>
          <div className="relative group/info">
            <HelpCircle size={13} className="text-slate-500 hover:text-slate-300 cursor-help transition-colors" />
            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden w-48 rounded-lg bg-slate-800 px-2.5 py-1.5 text-[11px] leading-tight text-slate-200 shadow-xl border border-slate-700 z-30 group-hover/info:block">
              {metric.description}
            </div>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700/60 shadow-inner group-hover:scale-105 transition-transform">
          {getIcon()}
        </div>
      </div>

      {/* Middle row: Big Metric Value + Sparkline */}
      <div className="flex items-baseline justify-between gap-3 my-1">
        <div>
          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-brand-300 transition-colors">
            {metric.formattedValue}
          </span>
        </div>
        {metric.history && metric.history.length > 0 && (
          <div className="shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
            <Sparkline
              data={metric.history}
              isPositive={isPositive}
              width={80}
              height={30}
            />
          </div>
        )}
      </div>

      {/* Bottom row: Delta Badge + Previous Period text */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
        <div
          className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium ${
            isPositive
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>
            {isPositive ? '+' : ''}
            {metric.change}%
          </span>
        </div>

        <span className="text-[11px] text-slate-400 truncate" title={`Prev: ${metric.formattedPreviousValue}`}>
          vs. {metric.formattedPreviousValue} prev
        </span>
      </div>
    </div>
  );
};
