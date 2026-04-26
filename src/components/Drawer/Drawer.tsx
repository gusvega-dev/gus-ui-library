'use client';

import React, { useEffect, useId, useRef } from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  side?: 'left' | 'right';
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function Drawer({ open, onClose, title, children, side = 'left' }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !drawerRef.current) return;
    const el = drawerRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusable[0]?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === focusable[0]) {
          e.preventDefault();
          focusable[focusable.length - 1].focus();
        }
      } else {
        if (document.activeElement === focusable[focusable.length - 1]) {
          e.preventDefault();
          focusable[0].focus();
        }
      }
    };
    el.addEventListener('keydown', trap);
    return () => el.removeEventListener('keydown', trap);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={[
          'fixed top-0 h-screen w-80 bg-card text-card-foreground z-50 shadow-xl',
          side === 'left' ? 'left-0' : 'right-0',
        ].join(' ')}
      >
        {title && (
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 id={titleId} className="text-lg font-semibold text-foreground">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}
        <div className="overflow-y-auto h-full p-6">{children}</div>
      </div>
    </>
  );
}

export default Drawer;
