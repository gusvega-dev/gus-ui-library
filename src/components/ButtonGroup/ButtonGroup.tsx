import React from 'react';

interface ButtonGroupProps {
  buttons: { label: string; onClick?: () => void; active?: boolean }[];
}

export function ButtonGroup({ buttons }: ButtonGroupProps) {
  return (
    <div className="flex rounded-lg border border-neutral-200 divide-x divide-neutral-200">
      {buttons.map((btn, i) => (
        <button
          key={i}
          onClick={btn.onClick}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            btn.active ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-50'
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
