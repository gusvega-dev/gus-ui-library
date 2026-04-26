'use client';

import React from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function CopyButton({ text, label = 'Copy', variant = 'secondary', size = 'md' }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const variantClasses = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    ghost: 'text-neutral-900 hover:bg-neutral-100',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <button
      onClick={handleCopy}
      className={`rounded transition-all ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {copied ? '✓ Copied!' : label}
    </button>
  );
}
