import React from 'react';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  invert?: boolean;
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  invert = false,
  className = '',
}) => (
  <div
    className={[
      invert ? 'bg-white/10' : 'bg-neutral-200',
      'flex-shrink-0',
      orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  />
);

export default Separator;
