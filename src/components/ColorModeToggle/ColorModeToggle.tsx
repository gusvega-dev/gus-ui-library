'use client';

import React from 'react';
import { useTheme } from '../ThemeProvider/ThemeProvider';

export interface ColorModeToggleProps {
  className?: string;
}

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const ColorModeToggle: React.FC<ColorModeToggleProps> = ({ className = '' }) => {
  const { resolvedColorMode, toggleColorMode } = useTheme();
  const isDark = resolvedColorMode === 'dark';

  return (
    <button
      type="button"
      onClick={toggleColorMode}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={[
        'inline-flex items-center justify-center',
        'w-9 h-9 rounded-md border border-border',
        'bg-background text-foreground',
        'hover:bg-muted transition-colors duration-normal',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ColorModeToggle;
