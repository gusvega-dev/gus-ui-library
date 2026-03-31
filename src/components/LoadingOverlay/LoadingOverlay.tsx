import React from 'react';

interface LoadingOverlayProps {
  visible?: boolean;
  message?: string;
}

export function LoadingOverlay({ visible = false, message = 'Loading...' }: LoadingOverlayProps) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/20 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 text-center space-y-3">
        <div className="w-10 h-10 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-neutral-900">{message}</p>
      </div>
    </div>
  );
}
