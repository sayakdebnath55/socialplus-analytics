import React from 'react';
import { SocialPlatform, DateRange } from '../../types/analytics';
import { Layers, Calendar, RefreshCw } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from '../common/SocialIcons';

interface ControlBarProps {
  selectedPlatform: SocialPlatform;
  onSelectPlatform: (platform: SocialPlatform) => void;
  selectedRange: DateRange;
  onSelectRange: (range: DateRange) => void;
  isSyncing: boolean;
  onSync: () => void;
  lastSyncText: string;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  selectedPlatform,
  onSelectPlatform,
  selectedRange,
  onSelectRange,
  isSyncing,
  onSync,
  lastSyncText
}) => {
  const platforms: { id: SocialPlatform; label: string; icon: React.ElementType; color: string }[] = [
    { id: 'all', label: 'All Platforms', icon: Layers, color: '#8B5CF6' },
    { id: 'instagram', label: 'Instagram', icon: InstagramIcon, color: '#E1306C' },
    { id: 'youtube', label: 'YouTube', icon: YoutubeIcon, color: '#FF0000' },
    { id: 'facebook', label: 'Facebook', icon: FacebookIcon, color: '#1877F2' },
    { id: 'twitter', label: 'X / Twitter', icon: TwitterIcon, color: '#38BDF8' },
    { id: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, color: '#0A66C2' }
  ];

  const ranges: { id: DateRange; label: string }[] = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last 90 Days' },
    { id: 'year', label: 'This Year' }
  ];

  return (
    <div className="border-b border-slate-800 bg-slate-950/40 py-3 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Platform Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {platforms.map(p => {
            const Icon = p.icon;
            const isSelected = selectedPlatform === p.id;

            return (
              <button
                key={p.id}
                onClick={() => onSelectPlatform(p.id)}
                className={`shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700 ring-1 ring-slate-600/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon
                  size={14}
                  style={{ color: isSelected ? p.color : undefined }}
                  className={!isSelected ? 'text-slate-500' : ''}
                />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Date Range Selector + Sync Status */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
          {/* Date Range Selector */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <Calendar size={13} className="text-slate-400 ml-1.5" />
            <div className="flex items-center">
              {ranges.map(r => (
                <button
                  key={r.id}
                  onClick={() => onSelectRange(r.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedRange === r.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sync Trigger */}
          <button
            onClick={onSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-colors"
            title="Refresh and sync latest telemetry"
          >
            <RefreshCw size={13} className={`text-brand-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">
              {isSyncing ? 'Syncing...' : lastSyncText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
