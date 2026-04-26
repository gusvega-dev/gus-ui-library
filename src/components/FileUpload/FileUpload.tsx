'use client';

import React, { useId, useRef, useState } from 'react';

export interface UploadedFile {
  file: File;
  preview?: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  onFileSelect,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  label = 'Drag files here or click to select',
  className = '',
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const zoneId = useId();
  const labelId = `${zoneId}-label`;
  const errorId = `${zoneId}-error`;

  const processFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;
    const incoming = Array.from(fileList);

    if (maxFiles && incoming.length + files.length > maxFiles) {
      setGlobalError(`You can upload at most ${maxFiles} file${maxFiles === 1 ? '' : 's'}.`);
      return;
    }

    if (maxSize) {
      const oversized = incoming.find((f) => f.size > maxSize);
      if (oversized) {
        setGlobalError(`"${oversized.name}" exceeds the ${formatBytes(maxSize)} limit.`);
        return;
      }
    }

    setGlobalError(null);
    const newEntries: UploadedFile[] = incoming.map((file) => ({ file, status: 'pending' }));
    const next = multiple ? [...files, ...newEntries] : newEntries.slice(0, 1);
    setFiles(next);
    onFileSelect?.(next.map((e) => e.file));
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
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== index);
      onFileSelect?.(next.map((e) => e.file));
      return next;
    });
  };

  return (
    <div className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-labelledby={labelId}
        aria-describedby={globalError ? errorId : undefined}
        aria-disabled={disabled}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && inputRef.current?.click()}
        className={[
          'border-2 border-dashed rounded-lg px-6 py-10 text-center transition-colors cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          dragActive ? 'border-primary bg-primary/5' : 'border-border',
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-muted',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <svg
          aria-hidden="true"
          className="mx-auto mb-3 w-10 h-10 text-muted-foreground"
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
          {accept && `${accept} `}
          {maxSize && `up to ${formatBytes(maxSize)} `}
          {maxFiles && `· max ${maxFiles} file${maxFiles === 1 ? '' : 's'}`}
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

      {globalError && (
        <p id={errorId} role="alert" className="text-xs text-destructive font-medium">
          {globalError}
        </p>
      )}

      {files.length > 0 && (
        <ul className="space-y-2" aria-label="Uploaded files">
          {files.map(({ file, status, progress, error: fileError }, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 flex-shrink-0 text-muted-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
                {status === 'uploading' && progress !== undefined && (
                  <div
                    className="mt-1 h-1 rounded-full bg-border overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Upload progress for ${file.name}`}
                  >
                    <div
                      className="h-full bg-primary transition-all duration-normal"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                {fileError && (
                  <p className="text-xs text-destructive mt-0.5">{fileError}</p>
                )}
              </div>
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

export default FileUpload;
