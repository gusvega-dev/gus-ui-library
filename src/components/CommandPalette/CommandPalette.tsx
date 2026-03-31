import React from 'react';

interface CommandPaletteProps {
  commands: { label: string; action?: () => void }[];
  open?: boolean;
  onClose?: () => void;
}

export function CommandPalette({ commands, open = false, onClose }: CommandPaletteProps) {
  const [search, setSearch] = React.useState('');
  const filtered = commands.filter(cmd => cmd.label.toLowerCase().includes(search.toLowerCase()));

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full px-4 py-3 border border-neutral-200 rounded-t-lg outline-none" />
        <div className="bg-white border border-neutral-200 border-t-0 rounded-b-lg max-h-64 overflow-y-auto">
          {filtered.map((cmd, i) => (
            <button key={i} onClick={() => { cmd.action?.(); onClose?.(); }} className="w-full text-left px-4 py-2 hover:bg-neutral-50 text-sm">
              {cmd.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
