import React from 'react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  side?: 'left' | 'right';
}

export function Drawer({ open, onClose, title, children, side = 'left' }: DrawerProps) {
  if (!open) return null;

  const sideClasses = side === 'left' ? 'left-0' : 'right-0';

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />
      <div
        className={`fixed top-0 ${sideClasses} h-screen w-80 bg-white z-50 shadow-lg transform transition-transform`}
      >
        {title && (
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              ✕
            </button>
          </div>
        )}
        <div className="overflow-y-auto h-full p-6">{children}</div>
      </div>
    </>
  );
}
