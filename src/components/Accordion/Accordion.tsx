import React from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

function AccordionItem({ title, children }: AccordionItemProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border border-neutral-200 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors"
      >
        <span className="font-medium text-neutral-900">{title}</span>
        <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50 text-sm text-neutral-600">
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
}

export function Accordion({ children, allowMultiple = true }: AccordionProps) {
  return (
    <div className="space-y-2">
      {children}
    </div>
  );
}

export { AccordionItem };
