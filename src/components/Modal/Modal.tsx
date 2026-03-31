import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          className={`bg-white rounded-lg shadow-lg pointer-events-auto ${sizeClasses[size]} w-full mx-4`}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || description) && (
            <div className="px-6 py-4 border-b border-neutral-200">
              {title && <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>}
              {description && <p className="text-sm text-neutral-500 mt-1">{description}</p>}
            </div>
          )}
          {children && <div className="px-6 py-4">{children}</div>}
          {footer && (
            <div className="px-6 py-4 border-t border-neutral-200 flex justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
