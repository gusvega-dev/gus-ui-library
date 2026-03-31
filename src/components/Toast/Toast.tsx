import React from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
}

export function Toast({ message, onClose, type = 'info', duration = 4000 }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeClasses = {
    info: 'bg-blue-50 text-blue-900 border-blue-200',
    success: 'bg-green-50 text-green-900 border-green-200',
    error: 'bg-red-50 text-red-900 border-red-200',
    warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
  };

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 sm:right-auto sm:w-80 rounded-lg border p-4 ${typeClasses[type]} animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm">{message}</p>
        <button
          onClick={onClose}
          className="text-lg opacity-70 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
