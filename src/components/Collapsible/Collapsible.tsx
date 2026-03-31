import React from 'react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="border border-neutral-200 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex justify-between items-center hover:bg-neutral-50"
      >
        <span className="font-medium text-neutral-900">{title}</span>
        <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50">{children}</div>}
    </div>
  );
}
