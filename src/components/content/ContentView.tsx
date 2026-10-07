import React, { useState, useMemo } from 'react';
import { SocialPost, SocialPlatform, ContentFormat } from '../../types/analytics';
import { PlatformBadge } from '../common/PlatformBadge';
import { PostDetailModal } from './PostDetailModal';
import { mockHashtagPerformance } from '../../data/mockData';
import { formatNumber } from '../../utils/formatters';
import {
  FileText,
  Search,
  Filter,
  ArrowUpDown,
  Grid,
  List,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Calendar,
  Hash,
  Sparkles,
  TrendingUp,
  MessageCircle
} from 'lucide-react';

interface ContentViewProps {
  posts: SocialPost[];
  activePlatform: SocialPlatform;
}

export const ContentView: React.FC<ContentViewProps> = ({ posts, activePlatform }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'engagementRate' | 'reach' | 'likes' | 'shares' | 'date'>('engagementRate');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  const filteredPosts = useMemo(() => {
    return posts
      .filter(p => {
        if (activePlatform !== 'all' && p.platform !== activePlatform) return false;
        if (selectedFormat !== 'all' && p.format !== selectedFormat) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchCaption = p.caption.toLowerCase().includes(q);
          const matchTitle = p.title?.toLowerCase().includes(q);
          const matchTag = p.hashtags.some(t => t.toLowerCase().includes(q));
          return matchCaption || matchTitle || matchTag;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'engagementRate') return b.engagementRate - a.engagementRate;
        if (sortBy === 'reach') return b.reach - a.reach;
        if (sortBy === 'likes') return b.likes - a.likes;
        if (sortBy === 'shares') return b.shares - a.shares;
        if (sortBy === 'date') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        return 0;
      });
  }, [posts, activePlatform, selectedFormat, searchQuery, sortBy]);

  const formats: { id: string; label: string }[] = [
    { id: 'all', label: 'All Formats' },
    { id: 'carousel', label: 'Carousels' },
    { id: 'reel', label: 'Reels / Shorts' },
    { id: 'video', label: 'Long Videos' },
    { id: 'article', label: 'Articles' },
    { id: 'text', label: 'Text / Threads' },
    { id: 'image', label: 'Single Images' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="text-brand-400" size={24} />
            Content Intelligence & Asset Performance
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track engagement velocity, viral coefficients, and resonance metrics per individual published post.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1 text-slate-300 font-mono">
            {filteredPosts.length} posts indexed
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-md space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts by caption keyword, title, or #hashtag..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Sort By & View Toggles */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
              <ArrowUpDown size={13} className="text-slate-400" />
              <span className="text-slate-500 text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
              >
                <option value="engagementRate">Engagement Rate</option>
                <option value="reach">Unique Reach</option>
                <option value="likes">Total Likes</option>
                <option value="shares">Total Shares</option>
                <option value="date">Publish Date</option>
              </select>
            </div>

            {/* View Switcher */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid view"
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'table' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Table view"
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Format Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {formats.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFormat(f.id)}
              className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedFormat === f.id
                  ? 'bg-slate-800 text-brand-300 border border-brand-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Display: Grid or Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-black/50 transition-all flex flex-col justify-between"
            >
              {/* Card Top: Image + Platform Badge */}
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.thumbnailUrl}
                    alt="Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <PlatformBadge platform={post.platform} size="sm" />
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                    {post.engagementRate}% ER
                  </div>
                </div>

                <div className="p-4">
                  {post.title && (
                    <h4 className="text-sm font-bold text-white mb-1.5 line-clamp-1 group-hover:text-brand-300 transition-colors">
                      {post.title}
                    </h4>
                  )}
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>

                  {/* Hashtags */}
                  {post.hashtags && post.hashtags.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {post.hashtags.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] text-brand-400 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer: Metrics */}
              <div className="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Eye size={13} className="text-cyan-400" />
                  {formatNumber(post.reach)}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Heart size={13} className="text-rose-400" />
                  {formatNumber(post.likes)}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Share2 size={13} className="text-emerald-400" />
                  {formatNumber(post.shares)}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Bookmark size={13} className="text-amber-400" />
                  {formatNumber(post.saves)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40">
                  <th className="py-3 px-4">Post & Caption</th>
                  <th className="py-3 px-3">Platform</th>
                  <th className="py-3 px-3">Format</th>
                  <th className="py-3 px-3">Reach</th>
                  <th className="py-3 px-3">Likes</th>
                  <th className="py-3 px-3">Shares</th>
                  <th className="py-3 px-3">Saves</th>
                  <th className="py-3 px-3">Engagement Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredPosts.map(post => (
                  <tr
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.thumbnailUrl}
                          alt="thumb"
                          className="h-10 w-14 rounded-lg object-cover shrink-0 border border-slate-800"
                        />
                        <div className="truncate">
                          {post.title && <div className="font-bold text-white truncate">{post.title}</div>}
                          <div className="text-slate-400 truncate text-[11px]">{post.caption}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <PlatformBadge platform={post.platform} size="sm" />
                    </td>
                    <td className="py-3 px-3 uppercase text-[10px] font-mono text-slate-400">
                      {post.format}
                    </td>
                    <td className="py-3 px-3 font-mono text-white">{formatNumber(post.reach)}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{formatNumber(post.likes)}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{formatNumber(post.shares)}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">{formatNumber(post.saves)}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        {post.engagementRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hashtag Performance Matrix */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Hash size={18} className="text-brand-400" />
              <h3 className="text-base font-semibold text-white">Hashtag & Topic Resonance Index</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparative reach and algorithmic lift attributed to targeted hashtags.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          {mockHashtagPerformance.map(tag => (
            <div
              key={tag.tag}
              className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-brand-300 font-mono text-xs">{tag.tag}</span>
                <span className="text-[10px] font-bold text-emerald-400">{tag.growth}</span>
              </div>
              <div className="text-slate-400 text-[11px] space-y-0.5">
                <div>Reach: <strong className="text-white">{formatNumber(tag.reach)}</strong></div>
                <div>Avg ER: <strong className="text-emerald-400">{tag.engagementRate}%</strong></div>
                <div>Volume: <strong className="text-slate-300">{tag.posts} posts</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Modal */}
      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
};
