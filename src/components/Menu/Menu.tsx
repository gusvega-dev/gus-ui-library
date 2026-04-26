'use client';

import React, { useEffect, useId, useRef } from 'react';

export interface MenuOption {
  label: string;
  value: string;
  onClick?: () => void;
  divider?: boolean;
  disabled?: boolean;
}

export interface MenuProps {
  trigger: React.ReactNode;
  options: MenuOption[];
  align?: 'left' | 'right';
  className?: string;
}

export function Menu({ trigger, options, align = 'left', className = '' }: MenuProps) {
  const [open, setOpen] = React.useState(false);
  const triggerId = useId();
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div ref={containerRef} className={['relative inline-block', className].filter(Boolean).join(' ')}>
      <div
        id={triggerId}
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}
      >
        {trigger}
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            id={menuId}
            role="menu"
            aria-labelledby={triggerId}
            className={[
              'absolute top-full z-50 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg mt-1 min-w-48 py-1',
              align === 'right' ? 'right-0' : 'left-0',
            ].join(' ')}
          >
            {options.map((opt, idx) => (
              <React.Fragment key={idx}>
                {opt.divider ? (
                  <div role="separator" className="border-t border-border my-1" />
                ) : (
                  <button
                    type="button"
                    role="menuitem"
                    disabled={opt.disabled}
                    onClick={() => {
                      opt.onClick?.();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:bg-muted"
                  >
                    {opt.label}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Menu;
