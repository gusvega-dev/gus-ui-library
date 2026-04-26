'use client';

import React, { useEffect, useId, useRef } from 'react';

export interface AlertDialogProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  open?: boolean;
}

export function AlertDialog({
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  open = false,
}: AlertDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  useEffect(() => {
    if (!open || !dialogRef.current) return;
    // Focus cancel button first (safer default for destructive actions)
    const cancelBtn = dialogRef.current.querySelector<HTMLButtonElement>('[data-cancel]');
    cancelBtn?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" aria-hidden="true">
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className="bg-card text-card-foreground rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-semibold text-foreground">{title}</h2>
        {description && <p id={descId} className="text-sm text-muted-foreground">{description}</p>}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            data-cancel
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDialog;
