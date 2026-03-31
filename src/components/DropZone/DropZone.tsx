import React from 'react';

interface DropZoneProps {
  onDrop?: (files: FileList) => void;
  accept?: string;
}

export function DropZone({ onDrop, accept }: DropZoneProps) {
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  return (
    <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={(e) => { e.preventDefault(); setDragActive(false); onDrop?.(e.dataTransfer.files); }} className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${dragActive ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}`}>
      <p className="text-sm font-medium text-neutral-900">Drop files here</p>
      <label className="block mt-2 cursor-pointer">
        <span className="text-xs text-neutral-500">or click to browse</span>
        <input type="file" accept={accept} onChange={(e) => onDrop?.(e.target.files!)} className="hidden" />
      </label>
    </div>
  );
}
