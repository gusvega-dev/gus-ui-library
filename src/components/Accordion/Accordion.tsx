'use client';

import React, { useId } from 'react';

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className="border border-border rounded-lg">
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
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
          className="px-4 py-3 border-t border-border bg-muted text-sm text-muted-foreground"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ children, allowMultiple = true, className = '' }: AccordionProps) {
  return (
    <div className={['space-y-2', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export default Accordion;
