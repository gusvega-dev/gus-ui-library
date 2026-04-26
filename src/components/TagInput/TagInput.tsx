'use client';

import React, { useRef, useState } from 'react';

export interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  error?: string;
  /** Keys that confirm a tag. Default: ['Enter', ','] */
  triggerKeys?: string[];
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  value: tags,
  onChange,
  placeholder = 'Add tag...',
  maxTags,
  disabled = false,
  error,
  triggerKeys = ['Enter', ','],
  className = '',
}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isAtMax = maxTags !== undefined && tags.length >= maxTags;

  const addTag = (raw: string) => {
    const tag = raw.trim().replace(/,$/, '');
    if (!tag || tags.includes(tag) || isAtMax) return;
    onChange([...tags, tag]);
    setInput('');
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (triggerKeys.includes(e.key)) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className={[
          'flex flex-wrap gap-1.5 min-h-[42px] w-full px-2.5 py-1.5 rounded-md border',
          'bg-background cursor-text',
          error ? 'border-destructive' : 'border-input',
          'focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent',
          'transition-colors duration-normal',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ].filter(Boolean).join(' ')}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-muted text-foreground"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={e => { e.stopPropagation(); removeTag(i); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            )}
          </span>
        ))}
        {!isAtMax && (
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => input && addTag(input)}
            disabled={disabled}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-0.5"
          />
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {maxTags && (
        <p className="text-xs text-muted-foreground">{tags.length} / {maxTags}</p>
      )}
    </div>
  );
};

export default TagInput;
