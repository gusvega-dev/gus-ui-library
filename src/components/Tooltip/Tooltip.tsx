'use client';

import React, { useId } from 'react';

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ text, children, side = 'top' }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const tooltipId = useId();

  const sideClasses = {
    top: 'bottom-full mb-2 -translate-x-1/2 left-1/2',
    bottom: 'top-full mt-2 -translate-x-1/2 left-1/2',
    left: 'right-full mr-2 -translate-y-1/2 top-1/2',
    right: 'left-full ml-2 -translate-y-1/2 top-1/2',
  };

  const arrowStyle: Record<string, React.CSSProperties> = {
    top: { bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    bottom: { top: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
    left: { right: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
    right: { left: '-4px', top: '50%', transform: 'translateY(-50%) rotate(45deg)' },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            'aria-describedby': visible ? tooltipId : undefined,
          })
        : children}
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`absolute z-50 max-w-64 rounded-md bg-foreground px-3 py-2 text-xs leading-5 text-background whitespace-pre-line shadow-lg pointer-events-none ${sideClasses[side]}`}
        >
          {text}
          <div
            className="absolute w-2 h-2 bg-foreground"
            aria-hidden="true"
            style={arrowStyle[side]}
          />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
