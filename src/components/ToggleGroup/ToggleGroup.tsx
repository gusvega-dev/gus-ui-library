import React from 'react';

interface ToggleGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ToggleGroupProps {
  options: ToggleGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  multiple?: boolean;
}

export function ToggleGroup({ options, value, onChange, multiple = false }: ToggleGroupProps) {
  const [selected, setSelected] = React.useState<string | string[]>(value || (multiple ? [] : ''));

  const handleToggle = (val: string) => {
    if (multiple) {
      const arr = Array.isArray(selected) ? selected : [];
      const newSelected = arr.includes(val)
        ? arr.filter(v => v !== val)
        : [...arr, val];
      setSelected(newSelected);
      onChange?.(newSelected.join(','));
    } else {
      const newSelected = selected === val ? '' : val;
      setSelected(newSelected);
      onChange?.(newSelected);
    }
  };

  return (
    <div className="inline-flex rounded-lg border border-neutral-200 p-1 bg-neutral-50">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => handleToggle(opt.value)}
          disabled={opt.disabled}
          className={`px-4 py-2 rounded transition-all text-sm font-medium ${
            Array.isArray(selected)
              ? selected.includes(opt.value)
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
              : selected === opt.value
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          } ${opt.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
