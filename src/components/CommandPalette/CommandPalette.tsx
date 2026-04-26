'use client';

import React, { useEffect, useId, useRef, useState } from 'react';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  icon?: React.ReactNode;
  action?: () => void;
  group?: string;
}

export interface CommandPaletteProps {
  commands: CommandItem[];
  open?: boolean;
  onClose?: () => void;
  placeholder?: string;
  emptyMessage?: string;
}

export function CommandPalette({
  commands,
  open = false,
  onClose,
  placeholder = 'Search commands…',
  emptyMessage = 'No results found.',
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const dialogId = useId();
  const inputId = `${dialogId}-input`;
  const listId = `${dialogId}-list`;

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(search.toLowerCase()) ||
      cmd.group?.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    const group = cmd.group ?? '';
    if (!acc[group]) acc[group] = [];
    acc[group].push(cmd);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = flatFiltered[activeIndex];
      if (cmd) {
        cmd.action?.();
        onClose?.();
      }
    }
  };

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!open) return null;

  let flatIndex = 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 bg-black/50"
      onClick={onClose}
      aria-hidden="false"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={inputId}
        className="w-full max-w-lg bg-popover text-popover-foreground rounded-xl border border-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <svg
            aria-hidden="true"
            className="w-4 h-4 flex-shrink-0 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            aria-expanded={filtered.length > 0}
            aria-controls={listId}
            aria-activedescendant={
              flatFiltered[activeIndex] ? `${listId}-item-${activeIndex}` : undefined
            }
            aria-autocomplete="list"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="flex-1 py-4 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-muted-foreground border border-border rounded">
            esc
          </kbd>
        </div>

        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label="Commands"
          className="max-h-72 overflow-y-auto py-1.5"
        >
          {filtered.length === 0 ? (
            <li role="option" aria-selected="false" className="px-4 py-8 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </li>
          ) : (
            Object.entries(grouped).map(([group, items]) => (
              <React.Fragment key={group}>
                {group && (
                  <li
                    role="presentation"
                    className="px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    {group}
                  </li>
                )}
                {items.map((cmd) => {
                  const idx = flatIndex++;
                  const isActive = idx === activeIndex;
                  return (
                    <li
                      key={cmd.id}
                      id={`${listId}-item-${idx}`}
                      role="option"
                      aria-selected={isActive}
                      data-index={idx}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={() => {
                        cmd.action?.();
                        onClose?.();
                      }}
                      className={[
                        'flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors',
                        isActive ? 'bg-muted text-foreground' : 'text-foreground',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {cmd.icon && (
                        <span className="flex-shrink-0 w-4 h-4 text-muted-foreground" aria-hidden="true">
                          {cmd.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="block truncate">{cmd.label}</span>
                        {cmd.description && (
                          <span className="block text-xs text-muted-foreground truncate">
                            {cmd.description}
                          </span>
                        )}
                      </div>
                      {cmd.shortcut && (
                        <div className="flex gap-1 flex-shrink-0">
                          {cmd.shortcut.split('+').map((key) => (
                            <kbd
                              key={key}
                              className="inline-flex items-center px-1.5 py-0.5 text-xs text-muted-foreground border border-border rounded"
                            >
                              {key}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </React.Fragment>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default CommandPalette;
