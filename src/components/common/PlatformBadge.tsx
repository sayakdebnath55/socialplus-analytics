import React from 'react';
import { SocialPlatform } from '../../types/analytics';
import { Layers } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from './SocialIcons';

interface PlatformBadgeProps {
  platform: SocialPlatform | string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platform,
  showLabel = true,
  size = 'md',
  className = ''
}) => {
  const norm = platform.toLowerCase();

  const getDetails = () => {
    switch (norm) {
      case 'instagram':
        return {
          label: 'Instagram',
          icon: InstagramIcon,
          bg: 'bg-pink-500/10 text-pink-400 border-pink-500/20 hover:border-pink-500/40',
        };
      case 'youtube':
        return {
          label: 'YouTube',
          icon: YoutubeIcon,
          bg: 'bg-red-500/10 text-red-400 border-red-500/20 hover:border-red-500/40',
        };
      case 'facebook':
        return {
          label: 'Facebook',
          icon: FacebookIcon,
          bg: 'bg-blue-600/10 text-blue-400 border-blue-500/20 hover:border-blue-500/40',
        };
      case 'twitter':
      case 'x':
        return {
          label: 'X / Twitter',
          icon: TwitterIcon,
          bg: 'bg-sky-500/10 text-sky-400 border-sky-500/20 hover:border-sky-500/40',
        };
      case 'linkedin':
        return {
          label: 'LinkedIn',
          icon: LinkedinIcon,
          bg: 'bg-blue-500/10 text-blue-400 border-blue-400/20 hover:border-blue-400/40',
        };
      case 'all':
      default:
        return {
          label: 'All Platforms',
          icon: Layers,
          bg: 'bg-brand-500/10 text-brand-400 border-brand-500/20 hover:border-brand-500/40',
        };
    }
  };

  const { label, icon: Icon, bg } = getDetails();
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
  const paddingClass = size === 'sm' ? 'px-1.5 py-0.5 text-xs' : size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors ${bg} ${paddingClass} ${className}`}>
      <Icon size={iconSize} className="shrink-0" />
      {showLabel && <span>{label}</span>}
    </span>
  );
};
