import { SocialPlatform } from '../types/analytics';

export function formatNumber(num: number): string {
  if (num === undefined || num === null || isNaN(num)) return '0';
  const abs = Math.abs(num);
  if (abs >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (abs >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (abs >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

export function formatPreciseNumber(num: number): string {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return num.toLocaleString();
}

export function formatPercent(value: number, includeSign = false): string {
  if (value === undefined || value === null || isNaN(value)) return '0.0%';
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

export function getPlatformColor(platform: SocialPlatform | string): string {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return '#E1306C';
    case 'youtube':
      return '#FF0000';
    case 'facebook':
      return '#1877F2';
    case 'twitter':
    case 'x':
      return '#38BDF8';
    case 'linkedin':
      return '#0A66C2';
    case 'all':
    default:
      return '#8B5CF6';
  }
}

export function getPlatformBadgeBg(platform: SocialPlatform | string): string {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
    case 'youtube':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'facebook':
      return 'bg-blue-600/10 text-blue-400 border-blue-500/20';
    case 'twitter':
    case 'x':
      return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
    case 'linkedin':
      return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    case 'all':
    default:
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  }
}
