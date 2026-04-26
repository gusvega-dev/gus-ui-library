import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  className?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, className = '', ...props }, ref) => {
    const clamped = Math.min(100, Math.max(0, value));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={['w-full bg-muted rounded-full h-2 overflow-hidden', className].filter(Boolean).join(' ')}
        {...props}
      >
        <div
          className="bg-primary h-2 rounded-full transition-all duration-slow ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
