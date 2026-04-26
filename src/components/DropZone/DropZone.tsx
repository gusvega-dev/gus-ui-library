'use client';

import React, { useId, useRef, useState } from 'react';

export interface DropZoneProps {
  onDrop?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DropZone({
  onDrop,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  label = 'Drop files here',
  description,
  className = '',
}: DropZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropZoneId = useId();
  const labelId = `${dropZoneId}-label`;
  const errorId = `${dropZoneId}-error`;

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;
    const newFiles = Array.from(fileList);

    if (maxSize) {
      const oversized = newFiles.find((f) => f.size > maxSize);
      if (oversized) {
        setError(`"${oversized.name}" exceeds the ${formatBytes(maxSize)} size limit.`);
        return;
      }
    }

    setError(null);
    const result = multiple ? newFiles : newFiles.slice(0, 1);
    setFiles(result);
    onDrop?.(result);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={labelId}
        aria-describedby={error ? errorId : undefined}
        aria-disabled={disabled}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && inputRef.current?.click()}
        className={[
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          dragActive ? 'border-primary bg-primary/5' : 'border-border',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-muted',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <svg
          aria-hidden="true"
          className="mx-auto mb-3 w-8 h-8 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p id={labelId} className="text-sm font-medium text-foreground">
          {label}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {description ?? (
            <>
              or{' '}
              <span className="text-primary underline underline-offset-2">click to browse</span>
              {accept && ` — ${accept}`}
              {maxSize && ` — max ${formatBytes(maxSize)}`}
            </>
          )}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => processFiles(e.target.files)}
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive font-medium">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="space-y-1.5" aria-label="Selected files">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-muted text-sm text-foreground"
            >
              <span className="truncate min-w-0 flex-1">{file.name}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                {formatBytes(file.size)}
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropZone;
