'use client';

import React, { useId } from 'react';

export interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({ title, children, defaultOpen = false, className = '' }: CollapsibleProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className={['border border-border rounded-lg', className].filter(Boolean).join(' ')}>
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex justify-between items-center hover:bg-muted transition-colors text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
      >
        <span className="font-medium text-foreground">{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={['transition-transform duration-normal', open ? 'rotate-180' : ''].join(' ')}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="px-4 py-3 border-t border-border bg-muted text-muted-foreground"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Collapsible;
