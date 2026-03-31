import React from 'react';

interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ComboboxProps {
  options: ComboboxOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function Combobox({ options, placeholder = 'Search...', onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string>('');

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setOpen(false);
    setSearch('');
  };

  const selectedLabel = options.find(opt => opt.value === selected)?.label;

  return (
    <div className="relative w-full">
      <div
        className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus-within:ring-2 focus-within:ring-neutral-900 focus-within:border-neutral-900 transition-all"
        onClick={() => setOpen(!open)}
      >
        <input
          type="text"
          placeholder={selectedLabel || placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 z-50 bg-white border border-neutral-200 rounded-lg mt-1 shadow-lg">
            {filtered.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                disabled={opt.disabled}
                className="w-full text-left px-3 py-2 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {opt.label}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-xs text-neutral-400">No options found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
