import React from 'react';

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: StatTrend;
  className?: string;
}

const trendClasses: Record<StatTrend, string> = {
  up: 'text-neutral-900',
  down: 'text-neutral-500',
  neutral: 'text-neutral-500',
};

export const Stat: React.FC<StatProps> = ({
  label,
  value,
  change,
  trend = 'neutral',
  className = '',
}) => (
  <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
    <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">{label}</p>
    <p className="text-3xl font-bold text-neutral-900 tracking-tight">{value}</p>
    {change && (
      <p className={['text-xs font-medium', trendClasses[trend]].join(' ')}>
        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {change}
      </p>
    )}
  </div>
);

export default Stat;
