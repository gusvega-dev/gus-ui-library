import React from 'react';

interface FileUploadProps {
  onFileSelect?: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
}

export function FileUpload({ onFileSelect, accept, multiple = false }: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    onFileSelect?.(e.dataTransfer.files);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'
      }`}
    >
      <label className="cursor-pointer">
        <p className="text-sm font-medium text-neutral-900 mb-1">Drag files here or click to select</p>
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={(e) => onFileSelect?.(e.target.files!)}
          className="hidden"
        />
      </label>
    </div>
  );
}
