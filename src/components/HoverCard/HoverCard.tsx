import React from 'react';

interface HoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function HoverCard({ trigger, children }: HoverCardProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {trigger}
      {visible && (
        <div className="absolute z-50 bottom-full mb-2 left-0 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 w-64">
          {children}
        </div>
      )}
    </div>
  );
}
