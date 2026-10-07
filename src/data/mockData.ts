import {
  PlatformMetricBreakdown,
  TimeSeriesPoint,
  SocialPost,
  Recommendation,
  DemographicsData,
  CompetitorData,
  ConnectedAccount,
  ActiveProfile,
  SocialPlatform,
  DateRange,
  KpiMetric
} from '../types/analytics';
import { formatNumber, formatPercent } from '../utils/formatters';

export const mockProfiles: ActiveProfile[] = [
  {
    id: 'prof-enterprise',
    name: 'TechPulse Global Corp',
    company: 'Enterprise SaaS & Cloud',
    tier: 'Enterprise',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    industry: 'Technology / B2B SaaS'
  },
  {
    id: 'prof-creator',
    name: 'Maya Chen Creative',
    company: 'Digital Creator Studio',
    tier: 'Pro',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    industry: 'Media & Design'
  },
  {
    id: 'prof-ecommerce',
    name: 'Aura Lifestyle Co.',
    company: 'DTC Retail & Fashion',
    tier: 'Starter',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    industry: 'E-commerce & Fashion'
  }
];

export const mockConnectedAccounts: ConnectedAccount[] = [
  {
    id: 'acc-ig',
    platform: 'instagram',
    accountName: 'TechPulse Official',
    handle: '@techpulse.global',
    status: 'connected',
    lastSynced: '2 mins ago',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    followerCount: 524300
  },
  {
    id: 'acc-yt',
    platform: 'youtube',
    accountName: 'TechPulse Tech Reviews',
    handle: '@TechPulseMedia',
    status: 'connected',
    lastSynced: '10 mins ago',
    avatar: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=100&auto=format&fit=crop&q=80',
    followerCount: 382000
  },
  {
    id: 'acc-fb',
    platform: 'facebook',
    accountName: 'TechPulse Global Hub',
    handle: '@TechPulseHub',
    status: 'connected',
    lastSynced: '25 mins ago',
    avatar: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?w=100&auto=format&fit=crop&q=80',
    followerCount: 215400
  },
  {
    id: 'acc-tw',
    platform: 'twitter',
    accountName: 'TechPulse Updates',
    handle: '@TechPulseHQ',
    status: 'connected',
    lastSynced: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    followerCount: 168900
  },
  {
    id: 'acc-li',
    platform: 'linkedin',
    accountName: 'TechPulse Technologies',
    handle: 'techpulse-technologies',
    status: 'connected',
    lastSynced: '1 hour ago',
    avatar: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    followerCount: 142800
  }
];

export const mockPlatformBreakdown: Record<Exclude<SocialPlatform, 'all'>, PlatformMetricBreakdown> = {
  instagram: {
    platform: 'instagram',
    name: 'Instagram',
    icon: 'Instagram',
    color: '#E1306C',
    followers: 524300,
    reach: 1245000,
    impressions: 2180000,
    engagement: 142500,
    engagementRate: 6.54,
    likes: 98400,
    comments: 14200,
    shares: 18400,
    saves: 11500,
    videoViews: 840000,
    followerGrowth: 18200,
    postsCount: 42
  },
  youtube: {
    platform: 'youtube',
    name: 'YouTube',
    icon: 'Youtube',
    color: '#FF0000',
    followers: 382000,
    reach: 980000,
    impressions: 1650000,
    engagement: 118400,
    engagementRate: 7.18,
    likes: 82000,
    comments: 21500,
    shares: 11200,
    saves: 3700,
    videoViews: 1420000,
    followerGrowth: 14300,
    postsCount: 18
  },
  facebook: {
    platform: 'facebook',
    name: 'Facebook',
    icon: 'Facebook',
    color: '#1877F2',
    followers: 215400,
    reach: 620000,
    impressions: 940000,
    engagement: 42100,
    engagementRate: 4.48,
    likes: 29500,
    comments: 5300,
    shares: 6100,
    saves: 1200,
    videoViews: 290000,
    followerGrowth: 4100,
    postsCount: 29
  },
  twitter: {
    platform: 'twitter',
    name: 'X (Twitter)',
    icon: 'Twitter',
    color: '#38BDF8',
    followers: 168900,
    reach: 790000,
    impressions: 1320000,
    engagement: 58900,
    engagementRate: 4.46,
    likes: 38200,
    comments: 8900,
    shares: 10400,
    saves: 1400,
    videoViews: 310000,
    followerGrowth: 7800,
    postsCount: 88
  },
  linkedin: {
    platform: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
    color: '#0A66C2',
    followers: 142800,
    reach: 415000,
    impressions: 690000,
    engagement: 48300,
    engagementRate: 7.0,
    likes: 31900,
    comments: 6400,
    shares: 7200,
    saves: 2800,
    videoViews: 180000,
    followerGrowth: 9400,
    postsCount: 31
  }
};

// Generate 30 daily data points for interactive charts
export function generateTimeSeries(days = 30): TimeSeriesPoint[] {
  const points: TimeSeriesPoint[] = [];
  const now = new Date(2026, 9, 7); // Oct 7, 2026

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // deterministic pseudo-variance
    const sin1 = Math.sin(i * 0.45);
    const cos1 = Math.cos(i * 0.3);
    const weekendMultiplier = (d.getDay() === 0 || d.getDay() === 6) ? 1.25 : 1.0;

    const baseReach = Math.round((125000 + sin1 * 32000 + (30 - i) * 1100) * weekendMultiplier);
    const baseImpressions = Math.round(baseReach * (1.65 + cos1 * 0.15));
    const baseEngagement = Math.round(baseImpressions * 0.062 + sin1 * 1400);
    const baseLikes = Math.round(baseEngagement * 0.68);
    const baseComments = Math.round(baseEngagement * 0.14);
    const baseShares = Math.round(baseEngagement * 0.12);
    const baseSaves = Math.round(baseEngagement * 0.06);
    const baseVideoViews = Math.round(baseReach * 0.72 + sin1 * 15000);
    const baseFollowers = 1410000 + (30 - i) * 1750 + Math.round(sin1 * 400);
    const netFollowers = Math.round(1500 + sin1 * 600 + (i % 5 === 0 ? 900 : 0));

    points.push({
      date: dateStr,
      reach: baseReach,
      impressions: baseImpressions,
      engagement: baseEngagement,
      likes: baseLikes,
      comments: baseComments,
      shares: baseShares,
      saves: baseSaves,
      videoViews: baseVideoViews,
      followers: baseFollowers,
      netFollowers: netFollowers
    });
  }

  return points;
}

export const mockTimeSeriesData = generateTimeSeries(30);

// Comprehensive list of social posts
export const mockPosts: SocialPost[] = [
  {
    id: 'post-1',
    platform: 'instagram',
    caption: '🚀 5 AI Automations that saved our design team 120+ hours this month. Swipe through for the step-by-step breakdown & workflow prompts! #AItools #Productivity #TechPulse #DesignWorkflow',
    publishedAt: '2026-10-06T14:30:00Z',
    format: 'carousel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    reach: 184500,
    impressions: 312000,
    engagement: 22400,
    engagementRate: 7.18,
    likes: 15400,
    comments: 1820,
    shares: 3840,
    saves: 1340,
    sentiment: 'positive',
    hashtags: ['#AItools', '#Productivity', '#TechPulse', '#DesignWorkflow'],
    url: 'https://instagram.com/p/mock1'
  },
  {
    id: 'post-2',
    platform: 'youtube',
    title: 'The Future of Autonomous Agents in 2027: Deep Dive Architecture',
    caption: 'In this complete documentary-style breakdown, we examine how multimodal autonomous agents will replace traditional orchestrators. Timestamp breakdown in pinned comment!',
    publishedAt: '2026-10-05T17:00:00Z',
    format: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    reach: 412000,
    impressions: 785000,
    engagement: 49200,
    engagementRate: 6.27,
    likes: 36200,
    comments: 6400,
    shares: 5100,
    saves: 1500,
    videoViews: 412000,
    sentiment: 'positive',
    hashtags: ['#AutonomousAI', '#SoftwareEngineering', '#FutureTech'],
    url: 'https://youtube.com/watch?v=mock2'
  },
  {
    id: 'post-3',
    platform: 'linkedin',
    title: 'Why we killed 3 internal dashboard tools in favor of unified analytics',
    caption: 'Most teams suffer from metric fragmentation. Here is how consolidating our multi-channel social telemetry reduced reporting latency by 90% and boosted team velocity. Full case study attached.',
    publishedAt: '2026-10-04T09:15:00Z',
    format: 'article',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    reach: 98000,
    impressions: 165000,
    engagement: 11400,
    engagementRate: 6.91,
    likes: 7800,
    comments: 1450,
    shares: 1620,
    saves: 530,
    sentiment: 'positive',
    hashtags: ['#Leadership', '#DataEngineering', '#B2BGrowth', '#SaaS'],
    url: 'https://linkedin.com/feed/update/mock3'
  },
  {
    id: 'post-4',
    platform: 'twitter',
    caption: 'Hot take: If your social analytics platform takes more than 3 clicks to show you your top converting format, you are flying blind.\n\nHere is how we structure our real-time feedback loops 🧵 👇',
    publishedAt: '2026-10-05T19:45:00Z',
    format: 'text',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    reach: 145000,
    impressions: 289000,
    engagement: 14800,
    engagementRate: 5.12,
    likes: 9200,
    comments: 2400,
    shares: 2800,
    saves: 400,
    sentiment: 'neutral',
    hashtags: ['#GrowthHacking', '#SocialMedia', '#MarketingTips'],
    url: 'https://x.com/techpulse/status/mock4'
  },
  {
    id: 'post-5',
    platform: 'instagram',
    caption: '✨ Behind the scenes at TechPulse DevConf 2026! Watch our engineering leads deploy zero-latency model pipelines live on stage. Sound ON 🎧 #DevConf #TechCulture #Engineering',
    publishedAt: '2026-10-03T18:00:00Z',
    format: 'reel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80',
    reach: 245000,
    impressions: 430000,
    engagement: 34500,
    engagementRate: 8.02,
    likes: 24200,
    comments: 3100,
    shares: 5400,
    saves: 1800,
    videoViews: 245000,
    sentiment: 'positive',
    hashtags: ['#DevConf', '#TechCulture', '#Engineering', '#ReelsViral'],
    url: 'https://instagram.com/reel/mock5'
  },
  {
    id: 'post-6',
    platform: 'facebook',
    caption: '🎉 Announcing our community grants program for student open-source maintainers. We are awarding $250,000 in infrastructure credits this quarter. Apply by Oct 31!',
    publishedAt: '2026-10-02T13:00:00Z',
    format: 'image',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80',
    reach: 84000,
    impressions: 129000,
    engagement: 6800,
    engagementRate: 5.27,
    likes: 4900,
    comments: 820,
    shares: 980,
    saves: 100,
    sentiment: 'positive',
    hashtags: ['#OpenSource', '#StudentsInTech', '#Grants'],
    url: 'https://facebook.com/posts/mock6'
  },
  {
    id: 'post-7',
    platform: 'youtube',
    title: 'Vite 8 vs Turbopack 2: Definitive 2026 Benchmark & Memory Test',
    caption: 'We ran 10,000 module builds across Linux, macOS, and Windows. The results surprised our entire infrastructure team. Full repo in description.',
    publishedAt: '2026-09-30T16:00:00Z',
    format: 'video',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    reach: 320000,
    impressions: 590000,
    engagement: 38900,
    engagementRate: 6.59,
    likes: 28400,
    comments: 5900,
    shares: 3800,
    saves: 800,
    videoViews: 320000,
    sentiment: 'positive',
    hashtags: ['#WebDev', '#Vite', '#JavaScript', '#Benchmarking'],
    url: 'https://youtube.com/watch?v=mock7'
  },
  {
    id: 'post-8',
    platform: 'linkedin',
    title: 'The Uncomfortable Truth about AI Coding Assistants in Enterprise',
    caption: 'After reviewing 450,000 lines of agent-assisted code, here are the 3 architectural guardrails every VP of Engineering must implement before scaling.',
    publishedAt: '2026-09-28T11:00:00Z',
    format: 'carousel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80',
    reach: 142000,
    impressions: 245000,
    engagement: 18900,
    engagementRate: 7.71,
    likes: 12800,
    comments: 2900,
    shares: 2400,
    saves: 800,
    sentiment: 'positive',
    hashtags: ['#ArtificialIntelligence', '#EngineeringManagement', '#SoftwareArchitecture'],
    url: 'https://linkedin.com/feed/mock8'
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    type: 'timing',
    title: 'Shift YouTube uploads to Thursdays 5:00 PM EST',
    description: 'Videos published Thursday evenings saw 3.4x higher initial 24h retention and 42% higher subscriber conversion compared to Tuesday releases.',
    impact: 'High Impact',
    confidenceScore: 94,
    actionLabel: 'Schedule Next Release',
    platform: 'youtube',
    metricBenefited: 'Video Views & Watch Time'
  },
  {
    id: 'rec-2',
    type: 'format',
    title: 'Double down on Multi-Slide Carousels on Instagram',
    description: 'Carousels are delivering 7.18% engagement rate vs 4.8% for single image posts. Users save carousel slides 2.8x more often.',
    impact: 'High Impact',
    confidenceScore: 91,
    actionLabel: 'Create Carousel Draft',
    platform: 'instagram',
    metricBenefited: 'Saves & Engagement Rate'
  },
  {
    id: 'rec-3',
    type: 'growth',
    title: 'Cross-promote LinkedIn Technical Articles to X Threads',
    description: 'Technical breakdowns that were repurposed into 5-part X threads generated an additional 84K reach with zero added creative production overhead.',
    impact: 'Medium Impact',
    confidenceScore: 88,
    actionLabel: 'Generate Thread Outline',
    platform: 'twitter',
    metricBenefited: 'Organic Reach & Traffic'
  },
  {
    id: 'rec-4',
    type: 'alert',
    title: 'Hashtag saturation detected on Facebook posts',
    description: 'Posts with > 5 hashtags on Facebook experienced a 14% drop in algorithmic distribution. We recommend cutting down to 1-2 focused brand tags.',
    impact: 'Medium Impact',
    confidenceScore: 85,
    actionLabel: 'Update Facebook Tag Presets',
    platform: 'facebook',
    metricBenefited: 'Feed Reach & Share Velocity'
  }
];

export const mockDemographics: DemographicsData = {
  ageGroups: [
    { range: '18-24', male: 14, female: 12, other: 2, total: 28 },
    { range: '25-34', male: 26, female: 20, other: 3, total: 49 },
    { range: '35-44', male: 12, female: 10, other: 1, total: 23 },
    { range: '45-54', male: 6, female: 5, other: 0.5, total: 11.5 },
    { range: '55+', male: 2.5, female: 2, other: 0.5, total: 5 }
  ],
  gender: [
    { gender: 'Male', percentage: 56.4 },
    { gender: 'Female', percentage: 40.2 },
    { gender: 'Non-Binary / Other', percentage: 3.4 }
  ],
  topCountries: [
    { country: 'United States', code: 'US', percentage: 38.5, followers: 552000 },
    { country: 'United Kingdom', code: 'GB', percentage: 14.2, followers: 203500 },
    { country: 'Germany', code: 'DE', percentage: 11.0, followers: 157600 },
    { country: 'India', code: 'IN', percentage: 9.8, followers: 140400 },
    { country: 'Canada', code: 'CA', percentage: 7.5, followers: 107500 },
    { country: 'Australia', code: 'AU', percentage: 5.4, followers: 77400 }
  ],
  topCities: [
    { city: 'San Francisco', country: 'United States', percentage: 11.2 },
    { city: 'New York City', country: 'United States', percentage: 9.8 },
    { city: 'London', country: 'United Kingdom', percentage: 8.4 },
    { city: 'Berlin', country: 'Germany', percentage: 6.2 },
    { city: 'Bengaluru', country: 'India', percentage: 5.7 },
    { city: 'Toronto', country: 'Canada', percentage: 4.9 }
  ],
  interests: [
    { name: 'AI & Machine Learning', percentage: 78.4, affinityScore: 9.8 },
    { name: 'Software Development & Cloud', percentage: 69.2, affinityScore: 9.4 },
    { name: 'SaaS Startups & VC', percentage: 54.1, affinityScore: 8.6 },
    { name: 'Product Design & UX', percentage: 42.8, affinityScore: 7.9 },
    { name: 'Productivity & Automation', percentage: 38.6, affinityScore: 8.1 }
  ]
};

export const mockCompetitors: CompetitorData[] = [
  {
    id: 'comp-self',
    name: 'SocialPulse (You)',
    handle: '@techpulse.global',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    isSelf: true,
    followers: 1433400,
    followerGrowth: 14.8,
    engagementRate: 6.32,
    averageLikes: 24500,
    averageComments: 3100,
    shareOfVoice: 34.2,
    postFrequencyWeekly: 14.2,
    topFormat: 'Carousel / Reels'
  },
  {
    id: 'comp-1',
    name: 'NovaTech Media',
    handle: '@novatech_hq',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    followers: 1120000,
    followerGrowth: 9.4,
    engagementRate: 4.85,
    averageLikes: 16800,
    averageComments: 1950,
    shareOfVoice: 26.5,
    postFrequencyWeekly: 18.0,
    topFormat: 'Short Video'
  },
  {
    id: 'comp-2',
    name: 'Apex Digital Systems',
    handle: '@apexdigital',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    followers: 945000,
    followerGrowth: 6.2,
    engagementRate: 3.92,
    averageLikes: 11200,
    averageComments: 1200,
    shareOfVoice: 21.8,
    postFrequencyWeekly: 11.5,
    topFormat: 'Single Image'
  },
  {
    id: 'comp-3',
    name: 'Nexus Cloud Lab',
    handle: '@nexuscloud',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80',
    followers: 780000,
    followerGrowth: 11.1,
    engagementRate: 5.15,
    averageLikes: 14100,
    averageComments: 1600,
    shareOfVoice: 17.5,
    postFrequencyWeekly: 8.0,
    topFormat: 'Technical Articles'
  }
];

export const mockHashtagPerformance = [
  { tag: '#AItools', posts: 18, reach: 412000, engagementRate: 7.8, growth: '+24%' },
  { tag: '#TechPulse', posts: 42, reach: 890000, engagementRate: 6.9, growth: '+18%' },
  { tag: '#Productivity', posts: 24, reach: 350000, engagementRate: 6.4, growth: '+12%' },
  { tag: '#SoftwareEngineering', posts: 19, reach: 480000, engagementRate: 7.2, growth: '+15%' },
  { tag: '#WebDev', posts: 15, reach: 290000, engagementRate: 5.8, growth: '+8%' },
  { tag: '#SaaS', posts: 28, reach: 380000, engagementRate: 6.1, growth: '+11%' }
];

export const mockFormatPerformance = [
  { format: 'Carousels', count: 32, avgReach: 142000, avgEngagement: 14200, engagementRate: 7.6, icon: 'GalleryHorizontal' },
  { format: 'Shorts & Reels', count: 48, avgReach: 210000, avgEngagement: 18900, engagementRate: 8.2, icon: 'Video' },
  { format: 'Long-form Video', count: 18, avgReach: 340000, avgEngagement: 31200, engagementRate: 6.8, icon: 'Youtube' },
  { format: 'Articles & Blogs', count: 14, avgReach: 88000, avgEngagement: 7400, engagementRate: 5.9, icon: 'FileText' },
  { format: 'Single Images', count: 26, avgReach: 74000, avgEngagement: 4100, engagementRate: 4.4, icon: 'Image' },
  { format: 'Text & Polls', count: 52, avgReach: 95000, avgEngagement: 5800, engagementRate: 4.9, icon: 'MessageSquare' }
];

// Helper to compute the 11 KPIs dynamically based on platform and date range
export function getKpisForPlatformAndRange(
  platform: SocialPlatform,
  dateRange: DateRange,
  customDataOverride?: Partial<PlatformMetricBreakdown>
): KpiMetric[] {
  // Base numbers across all platforms
  let totalFollowers = 1433400;
  let totalReach = 4050000;
  let totalImpressions = 7180000;
  let totalEngagement = 450200;
  let totalLikes = 280000;
  let totalComments = 56300;
  let totalShares = 43300;
  let totalSaves = 20600;
  let totalVideoViews = 3040000;
  let totalFollowerGrowth = 53800;

  if (platform !== 'all' && mockPlatformBreakdown[platform as Exclude<SocialPlatform, 'all'>]) {
    const p = mockPlatformBreakdown[platform as Exclude<SocialPlatform, 'all'>];
    totalFollowers = p.followers;
    totalReach = p.reach;
    totalImpressions = p.impressions;
    totalEngagement = p.engagement;
    totalLikes = p.likes;
    totalComments = p.comments;
    totalShares = p.shares;
    totalSaves = p.saves;
    totalVideoViews = p.videoViews;
    totalFollowerGrowth = p.followerGrowth;
  }

  if (customDataOverride) {
    if (customDataOverride.followers !== undefined) totalFollowers = customDataOverride.followers;
    if (customDataOverride.reach !== undefined) totalReach = customDataOverride.reach;
    if (customDataOverride.impressions !== undefined) totalImpressions = customDataOverride.impressions;
    if (customDataOverride.engagement !== undefined) totalEngagement = customDataOverride.engagement;
    if (customDataOverride.likes !== undefined) totalLikes = customDataOverride.likes;
    if (customDataOverride.comments !== undefined) totalComments = customDataOverride.comments;
    if (customDataOverride.shares !== undefined) totalShares = customDataOverride.shares;
    if (customDataOverride.saves !== undefined) totalSaves = customDataOverride.saves;
    if (customDataOverride.videoViews !== undefined) totalVideoViews = customDataOverride.videoViews;
    if (customDataOverride.followerGrowth !== undefined) totalFollowerGrowth = customDataOverride.followerGrowth;
  }

  // Adjust for date range multiplier
  let rangeMultiplier = 1.0;
  if (dateRange === '7d') rangeMultiplier = 0.28;
  else if (dateRange === '90d') rangeMultiplier = 2.65;
  else if (dateRange === 'year') rangeMultiplier = 9.8;

  const adjReach = Math.round(totalReach * rangeMultiplier);
  const adjImpressions = Math.round(totalImpressions * rangeMultiplier);
  const adjEngagement = Math.round(totalEngagement * rangeMultiplier);
  const adjLikes = Math.round(totalLikes * rangeMultiplier);
  const adjComments = Math.round(totalComments * rangeMultiplier);
  const adjShares = Math.round(totalShares * rangeMultiplier);
  const adjSaves = Math.round(totalSaves * rangeMultiplier);
  const adjVideoViews = Math.round(totalVideoViews * rangeMultiplier);
  const adjFollowerGrowth = Math.round(totalFollowerGrowth * rangeMultiplier);

  // Engagement rate
  const engagementRate = adjReach > 0 ? Number(((adjEngagement / adjReach) * 100).toFixed(2)) : 0;

  // Generate realistic sparklines
  const makeHistory = (base: number, volatility = 0.12) => {
    const points: number[] = [];
    for (let i = 0; i < 10; i++) {
      const v = base * (1 + (Math.sin(i * 0.9) * volatility) + (i * 0.015));
      points.push(Math.round(v));
    }
    return points;
  };

  return [
    {
      id: 'followers',
      label: 'Total Followers',
      value: totalFollowers,
      formattedValue: formatNumber(totalFollowers),
      change: 12.8,
      previousValue: Math.round(totalFollowers / 1.128),
      formattedPreviousValue: formatNumber(Math.round(totalFollowers / 1.128)),
      trend: 'up',
      history: makeHistory(totalFollowers * 0.9, 0.04),
      description: 'Active cross-platform audience count'
    },
    {
      id: 'reach',
      label: 'Total Reach',
      value: adjReach,
      formattedValue: formatNumber(adjReach),
      change: 18.4,
      previousValue: Math.round(adjReach / 1.184),
      formattedPreviousValue: formatNumber(Math.round(adjReach / 1.184)),
      trend: 'up',
      history: makeHistory(adjReach, 0.15),
      description: 'Unique individuals exposed to your content'
    },
    {
      id: 'impressions',
      label: 'Total Impressions',
      value: adjImpressions,
      formattedValue: formatNumber(adjImpressions),
      change: 22.1,
      previousValue: Math.round(adjImpressions / 1.221),
      formattedPreviousValue: formatNumber(Math.round(adjImpressions / 1.221)),
      trend: 'up',
      history: makeHistory(adjImpressions, 0.18),
      description: 'Total number of times posts were displayed'
    },
    {
      id: 'engagement',
      label: 'Total Engagement',
      value: adjEngagement,
      formattedValue: formatNumber(adjEngagement),
      change: 15.6,
      previousValue: Math.round(adjEngagement / 1.156),
      formattedPreviousValue: formatNumber(Math.round(adjEngagement / 1.156)),
      trend: 'up',
      history: makeHistory(adjEngagement, 0.14),
      description: 'Sum of likes, comments, shares & saves'
    },
    {
      id: 'engagement-rate',
      label: 'Engagement Rate',
      value: engagementRate,
      formattedValue: `${engagementRate}%`,
      change: 2.4,
      previousValue: Number((engagementRate - 0.15).toFixed(2)),
      formattedPreviousValue: `${(engagementRate - 0.15).toFixed(2)}%`,
      trend: 'up',
      history: [5.8, 6.0, 5.9, 6.2, 6.1, 6.4, 6.3, 6.6, 6.5, engagementRate],
      unit: '%',
      description: 'Engagements divided by total unique reach'
    },
    {
      id: 'likes',
      label: 'Total Likes',
      value: adjLikes,
      formattedValue: formatNumber(adjLikes),
      change: 14.1,
      previousValue: Math.round(adjLikes / 1.141),
      formattedPreviousValue: formatNumber(Math.round(adjLikes / 1.141)),
      trend: 'up',
      history: makeHistory(adjLikes, 0.16),
      description: 'Total positive reactions & likes received'
    },
    {
      id: 'comments',
      label: 'Total Comments',
      value: adjComments,
      formattedValue: formatNumber(adjComments),
      change: 19.8,
      previousValue: Math.round(adjComments / 1.198),
      formattedPreviousValue: formatNumber(Math.round(adjComments / 1.198)),
      trend: 'up',
      history: makeHistory(adjComments, 0.22),
      description: 'Direct discussions and feedback received'
    },
    {
      id: 'shares',
      label: 'Total Shares',
      value: adjShares,
      formattedValue: formatNumber(adjShares),
      change: 28.5,
      previousValue: Math.round(adjShares / 1.285),
      formattedPreviousValue: formatNumber(Math.round(adjShares / 1.285)),
      trend: 'up',
      history: makeHistory(adjShares, 0.25),
      description: 'Content reposts, retweets, and forwards'
    },
    {
      id: 'saves',
      label: 'Total Saves',
      value: adjSaves,
      formattedValue: formatNumber(adjSaves),
      change: 34.2,
      previousValue: Math.round(adjSaves / 1.342),
      formattedPreviousValue: formatNumber(Math.round(adjSaves / 1.342)),
      trend: 'up',
      history: makeHistory(adjSaves, 0.2),
      description: 'Bookmarks and content saved for later reference'
    },
    {
      id: 'video-views',
      label: 'Video Views',
      value: adjVideoViews,
      formattedValue: formatNumber(adjVideoViews),
      change: 31.7,
      previousValue: Math.round(adjVideoViews / 1.317),
      formattedPreviousValue: formatNumber(Math.round(adjVideoViews / 1.317)),
      trend: 'up',
      history: makeHistory(adjVideoViews, 0.19),
      description: 'Reels, YouTube & short video watch sessions'
    },
    {
      id: 'follower-growth',
      label: 'Follower Growth',
      value: adjFollowerGrowth,
      formattedValue: `+${formatNumber(adjFollowerGrowth)}`,
      change: 8.9,
      previousValue: Math.round(adjFollowerGrowth / 1.089),
      formattedPreviousValue: `+${formatNumber(Math.round(adjFollowerGrowth / 1.089))}`,
      trend: 'up',
      history: makeHistory(adjFollowerGrowth, 0.12),
      description: 'Net new audience members acquired this period'
    }
  ];
}
