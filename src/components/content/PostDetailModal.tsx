import React from 'react';
import { SocialPost } from '../../types/analytics';
import { PlatformBadge } from '../common/PlatformBadge';
import { formatNumber } from '../../utils/formatters';
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  ExternalLink,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface PostDetailModalProps {
  post: SocialPost | null;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <PlatformBadge platform={post.platform} size="md" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {post.format} Breakdown
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Calendar size={12} />
                <span>Published {new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Post Media Thumbnail */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-video md:aspect-square w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={post.thumbnailUrl}
                  alt="Post preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white uppercase">
                    {post.format}
                  </span>
                </div>
              </div>

              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full rounded-lg border border-slate-800 bg-slate-950/60 p-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>View Original Post</span>
                </a>
              )}
            </div>

            {/* Post Caption & Details */}
            <div className="md:col-span-7 space-y-4">
              <div>
                {post.title && (
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {post.title}
                  </h3>
                )}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {post.caption}
                </div>
              </div>

              {/* Hashtag tags */}
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.hashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-brand-500/10 border border-brand-500/20 text-[11px] text-brand-300 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Benchmark comparison badge */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-emerald-400" size={16} />
                  <div>
                    <div className="text-xs font-bold text-white">Above Average Performance</div>
                    <div className="text-[10px] text-slate-400">Yielded 2.3x more saves than benchmark</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-emerald-400 font-mono">
                  {post.engagementRate}% ER
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Metric Cards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Performance Telemetry Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Eye size={13} className="text-cyan-400" />
                  <span>Unique Reach</span>
                </div>
                <div className="text-lg font-bold text-white">{formatNumber(post.reach)}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{formatNumber(post.impressions)} impressions</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Heart size={13} className="text-rose-400" />
                  <span>Total Likes</span>
                </div>
                <div className="text-lg font-bold text-white">{formatNumber(post.likes)}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">+18% vs avg</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <MessageCircle size={13} className="text-amber-400" />
                  <span>Comments</span>
                </div>
                <div className="text-lg font-bold text-white">{formatNumber(post.comments)}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">High discussion density</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Share2 size={13} className="text-emerald-400" />
                  <span>Shares / Saves</span>
                </div>
                <div className="text-lg font-bold text-white">
                  {formatNumber(post.shares + post.saves)}
                </div>
                <div className="text-[10px] text-brand-300 mt-0.5">{formatNumber(post.saves)} saves</div>
              </div>
            </div>
          </div>

          {/* AI Content Recommendation */}
          <div className="p-4 rounded-xl border border-brand-500/30 bg-brand-950/20 flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="text-xs font-bold text-white">AI Content Repurposing Suggestion</div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                Because of the high save count ({formatNumber(post.saves)}), turn this into a 5-step video tutorial for YouTube Shorts and adapt key takeaways into a downloadable PDF cheat sheet for LinkedIn.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
