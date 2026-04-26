'use client';

import React from 'react';

export interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom';
}

export function HoverCard({ trigger, children, side = 'top' }: HoverCardProps) {
  const [visible, setVisible] = React.useState(false);

  const sideClass = side === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2';

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {trigger}
      {visible && (
        <div
          role="region"
          className={`absolute z-50 ${sideClass} left-0 bg-card text-card-foreground border border-border rounded-lg shadow-lg p-4 w-64`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default HoverCard;
