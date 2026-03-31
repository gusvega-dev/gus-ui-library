import React from 'react';

interface BadgeCounterProps {
  count: number;
  max?: number;
}

export function BadgeCounter({ count, max = 99 }: BadgeCounterProps) {
  const display = count > max ? `${max}+` : count;
  return (
    <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold text-white bg-red-500 rounded-full">
      {display}
    </span>
  );
}
