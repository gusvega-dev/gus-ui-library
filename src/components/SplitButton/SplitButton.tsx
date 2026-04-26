'use client';

import React from 'react';

interface SplitButtonProps {
  label: string;
  onClick?: () => void;
  options: { label: string; onClick?: () => void }[];
}

export function SplitButton({ label, onClick, options }: SplitButtonProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex rounded-lg border border-neutral-200 overflow-hidden">
      <button onClick={onClick} className="flex-1 px-4 py-2 text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800">
        {label}
      </button>
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="px-3 py-2 bg-neutral-900 text-white hover:bg-neutral-800">
          ▼
        </button>
        {open && (
          <div className="absolute right-0 mt-0 bg-white border border-neutral-200 rounded shadow-lg">
            {options.map((opt, i) => (
              <button key={i} onClick={() => { opt.onClick?.(); setOpen(false); }} className="block w-full text-left px-3 py-2 text-sm hover:bg-neutral-50">
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
