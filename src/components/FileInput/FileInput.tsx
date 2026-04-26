'use client';

import React, { useRef } from 'react';

export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onChange?: (files: FileList | null) => void;
  label?: string;
  error?: string;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, label = 'Choose file', disabled, error, className = '', ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    return (
      <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => resolvedRef.current?.click()}
          className={[
            'inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border',
            'bg-background text-foreground',
            error ? 'border-destructive' : 'border-input',
            'hover:bg-muted transition-colors duration-normal',
            'focus:outline-none focus:ring-2 focus:ring-ring',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          ].filter(Boolean).join(' ')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {label}
        </button>
        <input
          ref={resolvedRef}
          type="file"
          disabled={disabled}
          onChange={e => onChange?.(e.target.files)}
          className="sr-only"
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export default FileInput;
