import React from 'react';

interface SparklineProps {
  data: number[];
  color?: string;
  isPositive?: boolean;
  height?: number;
  width?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color,
  isPositive = true,
  height = 36,
  width = 96
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const h = height - padding * 2;
  const w = width;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * w;
    const y = height - padding - ((val - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${w},${height} L 0,${height} Z`;

  const strokeColor = color || (isPositive ? '#10B981' : '#F43F5E');
  const gradientId = `spark-grad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg width={width} height={height} className="overflow-visible select-none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.28" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${gradientId})`} />
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      {data.length > 0 && (
        <circle
          cx={w}
          cy={height - padding - ((data[data.length - 1] - min) / range) * h}
          r="2.5"
          fill={strokeColor}
        />
      )}
    </svg>
  );
};
