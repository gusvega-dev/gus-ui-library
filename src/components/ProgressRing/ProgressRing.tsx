import React from 'react';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({ value, size = 100, strokeWidth = 4 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-neutral-200"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-neutral-900 transition-all duration-300"
      />
      <text
        x={size / 2}
        y={size / 2}
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-sm font-semibold"
      >
        {value}%
      </text>
    </svg>
  );
}
