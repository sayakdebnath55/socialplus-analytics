export type SocialPlatform = 'all' | 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'linkedin';

export type DateRange = '7d' | '30d' | '90d' | 'year' | 'custom';

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  change: number; // percentage change, e.g. 14.2
  previousValue: number;
  formattedPreviousValue: string;
  trend: 'up' | 'down' | 'neutral';
  history: number[]; // Sparkline data points (e.g. 7-14 points)
  unit?: string;
  description: string;
}

export interface PlatformMetricBreakdown {
  platform: SocialPlatform;
  name: string;
  icon: string;
  color: string;
  followers: number;
  reach: number;
  impressions: number;
  engagement: number;
  engagementRate: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  videoViews: number;
  followerGrowth: number;
  postsCount: number;
}

export interface TimeSeriesPoint {
  date: string;
  reach: number;
  impressions: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  videoViews: number;
  followers: number;
  netFollowers: number;
}

export type ContentFormat = 'reel' | 'video' | 'carousel' | 'image' | 'text' | 'article' | 'short';

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'linkedin';
  title?: string;
  caption: string;
  publishedAt: string;
  format: ContentFormat;
  thumbnailUrl?: string;
  reach: number;
  impressions: number;
  engagement: number;
  engagementRate: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  videoViews?: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  hashtags: string[];
  url?: string;
}

export interface Recommendation {
  id: string;
  type: 'growth' | 'timing' | 'format' | 'audience' | 'alert';
  title: string;
  description: string;
  impact: 'High Impact' | 'Medium Impact' | 'Low Impact';
  confidenceScore: number;
  actionLabel: string;
  platform?: SocialPlatform;
  metricBenefited: string;
}

export interface DemographicsData {
  ageGroups: { range: string; male: number; female: number; other: number; total: number }[];
  gender: { gender: string; percentage: number }[];
  topCountries: { country: string; code: string; percentage: number; followers: number }[];
  topCities: { city: string; country: string; percentage: number }[];
  interests: { name: string; percentage: number; affinityScore: number }[];
}

export interface CompetitorData {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isSelf?: boolean;
  followers: number;
  followerGrowth: number;
  engagementRate: number;
  averageLikes: number;
  averageComments: number;
  shareOfVoice: number;
  postFrequencyWeekly: number;
  topFormat: string;
}

export interface ConnectedAccount {
  id: string;
  platform: 'instagram' | 'youtube' | 'facebook' | 'twitter' | 'linkedin';
  accountName: string;
  handle: string;
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSynced: string;
  avatar: string;
  followerCount: number;
}

export interface ActiveProfile {
  id: string;
  name: string;
  company: string;
  tier: 'Enterprise' | 'Pro' | 'Starter';
  avatar: string;
  industry: string;
}
