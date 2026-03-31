import React from 'react';

interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, value = [], onChange, placeholder = 'Select items...' }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>(value);

  const handleToggle = (val: string) => {
    const newSelected = selected.includes(val)
      ? selected.filter(v => v !== val)
      : [...selected, val];
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const selectedLabels = selected
    .map(v => options.find(o => o.value === v)?.label)
    .filter(Boolean);

  return (
    <div className="w-full">
      <div
        className="w-full px-3 py-2 border border-neutral-200 rounded-lg flex flex-wrap gap-2 items-center min-h-10 cursor-pointer hover:border-neutral-300 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {selectedLabels.map(label => (
          <span
            key={label}
            className="bg-neutral-900 text-white text-xs rounded px-2 py-1 flex items-center gap-1"
          >
            {label}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(options.find(o => o.label === label)?.value || '');
              }}
              className="hover:opacity-70"
            >
              ✕
            </button>
          </span>
        ))}
        {selectedLabels.length === 0 && (
          <span className="text-neutral-400 text-sm">{placeholder}</span>
        )}
      </div>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 bg-white border border-neutral-200 rounded-lg mt-1 shadow-lg w-full max-w-sm">
            {options.map(opt => (
              <label
                key={opt.value}
                className="flex items-center gap-3 px-4 py-2 hover:bg-neutral-50 cursor-pointer transition-colors disabled:opacity-50"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt.value)}
                  onChange={() => handleToggle(opt.value)}
                  disabled={opt.disabled}
                  className="cursor-pointer"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
