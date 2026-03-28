import React from 'react';

export interface ProgressProps {
  value: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => (
  <div className={['w-full bg-neutral-100 rounded-full h-2 overflow-hidden', className].filter(Boolean).join(' ')}>
    <div
      className="bg-neutral-900 h-2 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export default Progress;
