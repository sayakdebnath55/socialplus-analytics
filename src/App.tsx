import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { SocialPlatform, DateRange, ActiveProfile, SocialPost, PlatformMetricBreakdown } from './types/analytics';
import {
  mockProfiles,
  mockConnectedAccounts,
  mockPosts,
  mockRecommendations,
  generateTimeSeries,
  getKpisForPlatformAndRange
} from './data/mockData';
import { Navbar, NavTab } from './components/layout/Navbar';
import { ControlBar } from './components/layout/ControlBar';
import { DashboardView } from './components/dashboard/DashboardView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ContentView } from './components/content/ContentView';
import { AudienceView } from './components/audience/AudienceView';
import { CompetitorsView } from './components/competitors/CompetitorsView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { DataUploadModal } from './components/common/DataUploadModal';
import { ExportModal } from './components/common/ExportModal';
import { AiCopilotModal } from './components/ai/AiCopilotModal';
import { ParsedCsvResult } from './utils/csvParser';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('all');
  const [selectedRange, setSelectedRange] = useState<DateRange>('30d');
  const [activeProfile, setActiveProfile] = useState<ActiveProfile>(mockProfiles[0]);
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);
  const [customOverride, setCustomOverride] = useState<Partial<PlatformMetricBreakdown> | undefined>(undefined);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState('Synced 2m ago');
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState(false);

  // Dynamic calculation of the 11 KPI cards
  const kpis = useMemo(() => {
    return getKpisForPlatformAndRange(selectedPlatform, selectedRange, customOverride);
  }, [selectedPlatform, selectedRange, customOverride]);

  // Dynamic time series data for the selected range
  const timeSeriesData = useMemo(() => {
    const days = selectedRange === '7d' ? 7 : selectedRange === '90d' ? 90 : 30;
    return generateTimeSeries(days);
  }, [selectedRange]);

  // Handle data loaded from CSV, JSON, or Excel (.xlsx)
  const handleDataLoaded = (result: ParsedCsvResult) => {
    const formatLabel = result.fileFormat?.toUpperCase() || 'DATA';
    if (result.type === 'posts' && result.posts) {
      setPosts(prev => [...result.posts!, ...prev]);
      setSyncToast(`[${formatLabel}] Successfully imported ${result.rowCount} posts into your content library!`);
      navigate('/content');
    } else if (result.type === 'metrics' && result.aggregated) {
      setCustomOverride(result.aggregated);
      setSyncToast(`[${formatLabel}] Successfully loaded custom metrics dataset (${result.rowCount} records parsed)!`);
    }
    setTimeout(() => setSyncToast(null), 4000);
  };

  // Trigger manual sync
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncText('Just now');
      setSyncToast('Live telemetry sync complete across all 5 social networks.');
      setTimeout(() => setSyncToast(null), 3000);
    }, 1200);
  };

  // Derive current tab for Navbar
  const pathSegment = location.pathname.replace(/^\//, '').split('/')[0].toLowerCase();
  const currentTab: NavTab = (
    ['analytics', 'content', 'audience', 'competitors', 'reports', 'settings'].includes(pathSegment)
      ? pathSegment
      : 'dashboard'
  ) as NavTab;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Fixed / Sticky Navigation */}
      <Navbar
        activeTab={currentTab}
        onTabChange={(tab) => navigate(tab === 'dashboard' ? '/' : `/${tab}`)}
        profiles={mockProfiles}
        activeProfile={activeProfile}
        onProfileChange={(prof) => {
          setActiveProfile(prof);
          setSyncToast(`Switched workspace to "${prof.name}"`);
          setTimeout(() => setSyncToast(null), 3000);
        }}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
      />

      {/* Control Bar: Platform Selector + Date Range + Live Sync */}
      <ControlBar
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
        selectedRange={selectedRange}
        onSelectRange={setSelectedRange}
        isSyncing={isSyncing}
        onSync={handleSync}
        lastSyncText={lastSyncText}
      />

      {/* Sync Toast Notification */}
      {syncToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-slate-900/95 px-4 py-3 text-xs font-semibold text-emerald-300 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* Main Content Area Routed via React Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <DashboardView
                kpis={kpis}
                timeSeriesData={timeSeriesData}
                recommendations={mockRecommendations}
                topPosts={posts}
                selectedPlatform={selectedPlatform}
                onSelectPlatform={setSelectedPlatform}
                onNavigateToContent={() => navigate('/content')}
                onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardView
                kpis={kpis}
                timeSeriesData={timeSeriesData}
                recommendations={mockRecommendations}
                topPosts={posts}
                selectedPlatform={selectedPlatform}
                onSelectPlatform={setSelectedPlatform}
                onNavigateToContent={() => navigate('/content')}
                onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
              />
            }
          />
          <Route
            path="/analytics"
            element={
              <AnalyticsView
                kpis={kpis}
                timeSeriesData={timeSeriesData}
              />
            }
          />
          <Route
            path="/content"
            element={
              <ContentView
                posts={posts}
                activePlatform={selectedPlatform}
              />
            }
          />
          <Route
            path="/audience"
            element={<AudienceView />}
          />
          <Route
            path="/competitors"
            element={<CompetitorsView />}
          />
          <Route
            path="/reports"
            element={
              <ReportsView
                kpis={kpis}
                activePlatform={selectedPlatform}
                activeRange={selectedRange}
                onOpenExportModal={() => setIsExportOpen(true)}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsView
                accounts={mockConnectedAccounts}
                activeProfile={activeProfile}
                onOpenUpload={() => setIsUploadOpen(true)}
              />
            }
          />
          {/* Catch-all route redirects back to Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Modals */}
      <DataUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDataLoaded={handleDataLoaded}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        kpis={kpis}
        activePlatform={selectedPlatform}
        activeRange={selectedRange}
      />

      <AiCopilotModal
        isOpen={isAiCopilotOpen}
        onClose={() => setIsAiCopilotOpen(false)}
        kpis={kpis}
        activePlatform={selectedPlatform}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">SocialPulse Analytics</span>
            <span>• Enterprise Social Media Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All Systems Operational (99.99%)
            </span>
            <span>Instagram • YouTube • Facebook • X • LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
