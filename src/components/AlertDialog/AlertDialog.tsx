import React from 'react';

interface AlertDialogProps {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  open?: boolean;
}

export function AlertDialog({ title, description, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, open = false }: AlertDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-sm space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
        {description && <p className="text-sm text-neutral-600">{description}</p>}
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium hover:bg-neutral-100 rounded">{cancelText}</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 rounded">{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
