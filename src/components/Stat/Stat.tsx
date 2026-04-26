import React from 'react';

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string;
  trend?: StatTrend;
  className?: string;
}

const trendClasses: Record<StatTrend, string> = {
  up: 'text-success',
  down: 'text-destructive',
  neutral: 'text-muted-foreground',
};

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ label, value, change, trend = 'neutral', className = '', ...props }, ref) => (
    <div ref={ref} className={['flex flex-col gap-1', className].filter(Boolean).join(' ')} {...props}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
      {change && (
        <p className={['text-xs font-medium flex items-center gap-1', trendClasses[trend]].join(' ')}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''}
          <span>{change}</span>
        </p>
      )}
    </div>
  )
);

Stat.displayName = 'Stat';

export default Stat;
