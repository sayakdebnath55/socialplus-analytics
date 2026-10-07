import React, { useState } from 'react';
import { ConnectedAccount, ActiveProfile } from '../../types/analytics';
import { PlatformBadge } from '../common/PlatformBadge';
import { formatNumber } from '../../utils/formatters';
import {
  Settings,
  Link2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Download,
  Users,
  Bell,
  Shield,
  Save,
  Trash2
} from 'lucide-react';
import { SAMPLE_METRICS_CSV, SAMPLE_POSTS_CSV, downloadSampleCsv } from '../../data/csvTemplates';

interface SettingsViewProps {
  accounts: ConnectedAccount[];
  activeProfile: ActiveProfile;
  onOpenUpload: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  accounts: initialAccounts,
  activeProfile,
  onOpenUpload
}) => {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(initialAccounts);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Simulated Account Sync
  const handleSyncAccount = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setAccounts(prev =>
        prev.map(acc => (acc.id === id ? { ...acc, lastSynced: 'Just now', status: 'connected' } : acc))
      );
      setSyncingId(null);
    }, 1000);
  };

  const handleToggleConnect = (id: string) => {
    setAccounts(prev =>
      prev.map(acc => {
        if (acc.id === id) {
          const nextStatus = acc.status === 'connected' ? 'disconnected' : 'connected';
          return { ...acc, status: nextStatus };
        }
        return acc;
      })
    );
  };

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const teamMembers = [
    { name: 'Sarah Lin', role: 'Head of Growth', email: 'sarah.lin@techpulse.global', access: 'Admin' },
    { name: 'Marcus Brody', role: 'Social Media Strategist', email: 'marcus.b@techpulse.global', access: 'Editor' },
    { name: 'Elena Rostova', role: 'Lead Video Producer', email: 'elena.r@techpulse.global', access: 'Editor' },
    { name: 'David Kim', role: 'Data Analyst', email: 'david.k@techpulse.global', access: 'Viewer' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Settings className="text-brand-400" size={24} />
            Platform Connectors & Workspace Settings
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage live social media API integrations, data ingestion, team permissions, and alert triggers.
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white shadow-lg shadow-brand-600/30 transition-all"
        >
          {savedSuccess ? <CheckCircle2 size={14} className="text-emerald-300" /> : <Save size={14} />}
          <span>{savedSuccess ? 'Settings Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Section 1: Connected Social Media Channels */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Link2 size={18} className="text-brand-400" />
              <h3 className="text-base font-semibold text-white">Live Channel Connectors (OAuth / Graph API)</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure webhook connections to pull real-time social metrics, impressions, and post engagement.
            </p>
          </div>

          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            5 / 5 Channels Active
          </span>
        </div>

        <div className="divide-y divide-slate-800/60 mt-2">
          {accounts.map(acc => {
            const isSyncing = syncingId === acc.id;
            const isConnected = acc.status === 'connected';

            return (
              <div key={acc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={acc.avatar}
                    alt={acc.accountName}
                    className="h-10 w-10 rounded-xl object-cover border border-slate-800"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{acc.accountName}</span>
                      <PlatformBadge platform={acc.platform} size="sm" />
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {acc.handle} • {formatNumber(acc.followerCount)} followers
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="text-right hidden sm:block">
                    <div className={`text-[11px] font-semibold ${isConnected ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {isConnected ? '● Connected & Polling' : '○ Disconnected'}
                    </div>
                    <div className="text-[10px] text-slate-500">Last synced: {acc.lastSynced}</div>
                  </div>

                  <button
                    onClick={() => handleSyncAccount(acc.id)}
                    disabled={!isConnected || isSyncing}
                    className="p-2 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
                    title="Force immediate telemetry sync"
                  >
                    <RefreshCw size={14} className={isSyncing ? 'animate-spin text-brand-400' : ''} />
                  </button>

                  <button
                    onClick={() => handleToggleConnect(acc.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isConnected
                        ? 'bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-300 border border-slate-700'
                        : 'bg-brand-600 hover:bg-brand-500 text-white shadow-sm'
                    }`}
                  >
                    {isConnected ? 'Disconnect' : 'Connect Channel'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: CSV / Data Ingestion Hub */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <UploadCloud size={18} className="text-cyan-400" />
              <h3 className="text-base font-semibold text-white">Data Ingestion & CSV Import Tool</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload exported CSV/JSON files from your social networks to dynamically re-calculate all dashboard KPIs.
            </p>
          </div>

          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-semibold text-white shadow-lg shadow-brand-600/30 transition-all shrink-0"
          >
            <UploadCloud size={14} />
            <span>Upload New Dataset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Daily Metrics CSV Template</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Reach, Impressions, Likes, Comments, Shares, Saves</div>
            </div>
            <button
              onClick={() => downloadSampleCsv('socialpulse_metrics.csv', SAMPLE_METRICS_CSV)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
              title="Download template"
            >
              <Download size={14} />
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Content Library CSV Template</div>
              <div className="text-[11px] text-slate-400 mt-0.5">PostId, Platform, Caption, Format, Reach, Likes, Shares</div>
            </div>
            <button
              onClick={() => downloadSampleCsv('socialpulse_posts.csv', SAMPLE_POSTS_CSV)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
              title="Download template"
            >
              <Download size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Team Members & Alert Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-violet-400" />
              <h3 className="text-base font-semibold text-white">Team Members & Access</h3>
            </div>
            <button className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold">
              + Invite Member
            </button>
          </div>

          <div className="divide-y divide-slate-800/60 mt-2">
            {teamMembers.map(m => (
              <div key={m.email} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">{m.name}</div>
                  <div className="text-[11px] text-slate-400">{m.email} • {m.role}</div>
                </div>
                <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-300">
                  {m.access}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Threshold Alerts */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <Bell size={18} className="text-amber-400" />
            <h3 className="text-base font-semibold text-white">Alert Thresholds</h3>
          </div>

          <div className="space-y-4 mt-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <div>
                <div className="font-semibold text-white">Viral Velocity Alert</div>
                <div className="text-[11px] text-slate-400">Trigger alert if a post reaches &gt; 100K impressions</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-brand-500 h-4 w-4 rounded" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <div>
                <div className="font-semibold text-white">Engagement Drop Warning</div>
                <div className="text-[11px] text-slate-400">Notify if engagement rate declines by &gt; 15%</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-brand-500 h-4 w-4 rounded" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <div>
                <div className="font-semibold text-white">Competitor Move Digest</div>
                <div className="text-[11px] text-slate-400">Weekly breakdown of competitor SOV shifts</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-brand-500 h-4 w-4 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
