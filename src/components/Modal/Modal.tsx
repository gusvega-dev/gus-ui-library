'use client';

import React, { useEffect, useId, useRef } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Focus trap + initial focus
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const el = dialogRef.current;
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

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const sizeClasses = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descId : undefined}
          className={['bg-card text-card-foreground rounded-xl shadow-xl pointer-events-auto w-full mx-4', sizeClasses[size]].join(' ')}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || description) && (
            <div className="px-6 py-4 border-b border-border flex items-start justify-between gap-4">
              <div>
                {title && <h2 id={titleId} className="text-lg font-semibold text-foreground">{title}</h2>}
                {description && <p id={descId} className="text-sm text-muted-foreground mt-1">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-ring rounded"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          )}
          {children && <div className="px-6 py-4">{children}</div>}
          {footer && (
            <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
