import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ text, children, side = 'top' }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);

  const sideClasses = {
    top: 'bottom-full mb-2 -translate-x-1/2 left-1/2',
    bottom: 'top-full mt-2 -translate-x-1/2 left-1/2',
    left: 'right-full mr-2 -translate-y-1/2 top-1/2',
    right: 'left-full ml-2 -translate-y-1/2 top-1/2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute z-50 bg-neutral-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none ${sideClasses[side]}`}
        >
          {text}
          <div className="absolute w-2 h-2 bg-neutral-900" style={{
            ...(side === 'top' && { bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' }),
            ...(side === 'bottom' && { top: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' }),
            ...(side === 'left' && { right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' }),
            ...(side === 'right' && { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' }),
          }} />
        </div>
      )}
    </div>
  );
}
