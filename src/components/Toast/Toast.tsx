'use client';

import React from 'react';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface ToastProps {
  message: string;
  onClose: () => void;
  type?: ToastType;
  duration?: number;
}

const typeClasses: Record<ToastType, string> = {
  info: 'bg-info/10 text-info border-info/20',
  success: 'bg-success/10 text-success border-success/20',
  error: 'bg-destructive/10 text-destructive border-destructive/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
};

export function Toast({ message, onClose, type = 'info', duration = 4000 }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={[
        'fixed bottom-4 left-4 right-4 sm:right-auto sm:w-80 rounded-lg border p-4 shadow-lg',
        typeClasses[type],
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm">{message}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:opacity-100"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;
