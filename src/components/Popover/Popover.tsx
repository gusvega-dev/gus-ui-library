'use client';

import React, { useEffect } from 'react';

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Popover({ trigger, children, side = 'bottom' }: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const sideClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {trigger}
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="dialog"
            className={`absolute z-50 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg p-3 min-w-48 ${sideClasses[side]}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export default Popover;
