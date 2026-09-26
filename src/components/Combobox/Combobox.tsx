'use client';

import React from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'type'> {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  emptyMessage?: string;
  error?: string;
}

/** Searchable single select. Values must be unique within the options array. */
export const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  ({ options, value, defaultValue = '', placeholder = 'Search...', onChange,
    emptyMessage = 'No options found', error, disabled, readOnly, name, id,
    className = '', onFocus, onBlur, onClick, onKeyDown, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const listId = `${inputId}-listbox`;
    const rootRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [activeValue, setActiveValue] = React.useState<string | null>(null);
    const selected = value ?? internalValue;
    const selectedLabel = options.find(option => option.value === selected)?.label ?? '';
    const isOpen = open && !disabled && !readOnly;
    const filtered = options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()));
    const enabled = filtered.filter(option => !option.disabled);
    const activeIndex = filtered.findIndex(option => option.value === activeValue && !option.disabled);
    const optionId = (index: number) => `${listId}-${index}`;

    const close = () => {
      setOpen(false);
      setQuery('');
      setActiveValue(null);
    };

    const show = () => {
      if (disabled || readOnly) return;
      setOpen(true);
      setActiveValue(options.find(option => option.value === selected && !option.disabled)?.value ?? null);
    };

    const select = (option: ComboboxOption) => {
      if (option.disabled) return;
      if (value === undefined) setInternalValue(option.value);
      onChange?.(option.value);
      close();
    };

    React.useEffect(() => {
      if (!isOpen) return;
      const dismiss = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
          setQuery('');
          setActiveValue(null);
        }
      };
      document.addEventListener('pointerdown', dismiss);
      return () => document.removeEventListener('pointerdown', dismiss);
    }, [isOpen]);

    React.useEffect(() => {
      if (isOpen && activeIndex >= 0) {
        listRef.current?.children[activeIndex]?.scrollIntoView?.({ block: 'nearest' });
      }
    }, [isOpen, activeIndex]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || event.nativeEvent.isComposing || disabled || readOnly) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        const index = isOpen ? enabled.findIndex(option => option.value === activeValue) : -1;
        const next = index < 0 ? (direction > 0 ? 0 : enabled.length - 1) : (index + direction + enabled.length) % enabled.length;
        setOpen(true);
        setActiveValue(enabled[next]?.value ?? null);
      } else if (isOpen && (event.key === 'Home' || event.key === 'End')) {
        event.preventDefault();
        setActiveValue((event.key === 'Home' ? enabled[0] : enabled[enabled.length - 1])?.value ?? null);
      } else if (isOpen && event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault();
        select(filtered[activeIndex]);
      } else if (isOpen && event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        close();
      } else if (event.key === 'Tab') {
        close();
      }
    };

    return (
      <div ref={rootRef} className="relative w-full">
        {name && <input type="hidden" name={name} value={selected} disabled={disabled} />}
        <input
          {...props}
          ref={ref}
          id={inputId}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
          aria-invalid={error ? true : props['aria-invalid']}
          autoComplete="off"
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          value={isOpen ? query : selectedLabel}
          onChange={event => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveValue(null);
          }}
          onFocus={event => { onFocus?.(event); if (!event.defaultPrevented) show(); }}
          onClick={event => { onClick?.(event); if (!event.defaultPrevented && !isOpen) show(); }}
          onBlur={event => { onBlur?.(event); close(); }}
          onKeyDown={handleKeyDown}
          className={[
            'w-full px-3 py-2 text-sm rounded-md border bg-background text-foreground',
            'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-normal',
            error ? 'border-destructive' : 'border-input', className,
          ].filter(Boolean).join(' ')}
        />
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-border bg-popover text-popover-foreground shadow-lg">
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label={props['aria-label']}
              aria-labelledby={props['aria-labelledby'] ?? (props['aria-label'] ? undefined : inputId)}
              className="max-h-60 overflow-y-auto p-1"
            >
              {filtered.map((option, index) => (
                <li
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={selected === option.value}
                  aria-disabled={option.disabled || undefined}
                  onMouseDown={event => event.preventDefault()}
                  onMouseMove={() => { if (!option.disabled) setActiveValue(option.value); }}
                  onClick={() => select(option)}
                  className={[
                    'flex items-center justify-between rounded-sm px-3 py-2 text-sm',
                    option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                    index === activeIndex ? 'bg-accent text-accent-foreground' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {option.label}
                  {selected === option.value && <span aria-hidden="true">✓</span>}
                </li>
              ))}
            </ul>
            {filtered.length === 0 && <p role="status" className="px-3 py-2 text-sm text-muted-foreground">{emptyMessage}</p>}
          </div>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
