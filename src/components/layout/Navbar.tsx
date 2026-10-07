import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  FileText,
  Users,
  Target,
  FileSpreadsheet,
  Settings,
  Sparkles,
  UploadCloud,
  Download,
  Bell,
  ChevronDown,
  Menu,
  X,
  Check,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { ActiveProfile } from '../../types/analytics';

export type NavTab = 'dashboard' | 'analytics' | 'content' | 'audience' | 'competitors' | 'reports' | 'settings';

interface NavbarProps {
  activeTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
  profiles: ActiveProfile[];
  activeProfile: ActiveProfile;
  onProfileChange: (prof: ActiveProfile) => void;
  onOpenUpload: () => void;
  onOpenExport: () => void;
  onOpenAiCopilot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab: propActiveTab,
  onTabChange,
  profiles,
  activeProfile,
  onProfileChange,
  onOpenUpload,
  onOpenExport,
  onOpenAiCopilot
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive current tab from URL path
  const pathSegment = location.pathname.replace(/^\//, '').split('/')[0].toLowerCase();
  const derivedTab: NavTab = (
    ['analytics', 'content', 'audience', 'competitors', 'reports', 'settings'].includes(pathSegment)
      ? pathSegment
      : 'dashboard'
  ) as NavTab;

  const currentTab = propActiveTab || derivedTab;

  const handleNavigate = (tab: NavTab) => {
    navigate(`/${tab === 'dashboard' ? '' : tab}`);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const navItems: { id: NavTab; label: string; icon: React.ElementType; path: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, path: '/analytics' },
    { id: 'content', label: 'Content', icon: FileText, path: '/content' },
    { id: 'audience', label: 'Audience', icon: Users, path: '/audience' },
    { id: 'competitors', label: 'Competitors', icon: Target, path: '/competitors' },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet, path: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
  ];

  const notifications = [
    { id: 1, title: 'Engagement Spike', desc: 'Instagram carousel "5 AI Automations" reached 184K viewers.', time: '10m ago', unread: true },
    { id: 2, title: 'YouTube Algorithm Shift', desc: 'Thursday release scored 3.4x higher initial retention.', time: '2h ago', unread: true },
    { id: 3, title: 'Competitor Alert', desc: 'NovaTech Media launched a new video campaign.', time: '5h ago', unread: false }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Product Name */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => handleNavigate('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-violet-400 text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <TrendingUp size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-white group-hover:text-brand-300 transition-colors">
                  SocialPulse
                </span>
                <span className="rounded-md bg-brand-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-brand-300 border border-brand-500/30">
                  Analytics
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-400 font-mono hidden sm:inline">
                ENTERPRISE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-brand-400' : 'text-slate-500'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right side tools: AI Copilot, Upload, Export, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Copilot Button */}
          <button
            onClick={onOpenAiCopilot}
            className="relative hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-600/30 to-violet-600/30 hover:from-brand-600/50 hover:to-violet-600/50 border border-brand-500/40 px-3 py-1.5 text-xs font-semibold text-brand-200 shadow-sm transition-all hover:scale-105"
          >
            <Sparkles size={14} className="text-brand-300 animate-pulse" />
            <span>AI Copilot</span>
          </button>

          {/* Data Upload */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-colors"
            title="Upload CSV, Excel (.xlsx), or JSON data"
          >
            <UploadCloud size={14} className="text-brand-400" />
            <span className="hidden md:inline">Connect Data</span>
          </button>

          {/* Export Report */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800 transition-colors"
            title="Export Report"
          >
            <Download size={14} className="text-cyan-400" />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileDropdownOpen(false);
              }}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Bell size={15} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-white shadow-sm">
                2
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-800 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-semibold text-white">
                  <span>Notifications</span>
                  <span className="text-[10px] text-brand-400">Mark all read</span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 px-1 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-500">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile / Account Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-1 pl-1.5 pr-2 hover:border-slate-700 hover:bg-slate-800/80 transition-colors"
            >
              <img
                src={activeProfile.avatar}
                alt={activeProfile.name}
                className="h-6 w-6 rounded-lg object-cover ring-1 ring-slate-700"
              />
              <span className="text-xs font-medium text-slate-200 hidden md:inline max-w-[100px] truncate">
                {activeProfile.name}
              </span>
              <ChevronDown size={13} className="text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl z-50">
                <div className="p-2 border-b border-slate-800">
                  <div className="text-xs font-bold text-white">{activeProfile.name}</div>
                  <div className="text-[11px] text-slate-400">{activeProfile.company}</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-brand-400">
                    <ShieldCheck size={12} />
                    <span>{activeProfile.tier} Plan Active</span>
                  </div>
                </div>

                <div className="py-2">
                  <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Switch Workspace
                  </div>
                  {profiles.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onProfileChange(p);
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg text-xs text-left hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <img src={p.avatar} alt={p.name} className="h-5 w-5 rounded-md object-cover" />
                        <div>
                          <div className="text-slate-200 font-medium">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.industry}</div>
                        </div>
                      </div>
                      {activeProfile.id === p.id && <Check size={14} className="text-brand-400" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      handleNavigate('settings');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    Account Settings & Connectors
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium ${
                  isActive
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-brand-400' : 'text-slate-500'} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => {
                onOpenAiCopilot();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-brand-600/30 border border-brand-500/40 p-2 text-xs font-semibold text-brand-200"
            >
              <Sparkles size={14} /> AI Copilot
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
