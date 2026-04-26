'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type ColorMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  colorMode: ColorMode;
  resolvedColorMode: 'light' | 'dark';
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultColorMode?: ColorMode;
  storageKey?: string;
  attribute?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultColorMode = 'system',
  storageKey = 'gus-ui-color-mode',
  attribute = 'data-theme',
}) => {
  // Always start with defaultColorMode so server and client render the same HTML.
  // localStorage is read in an effect after mount to avoid hydration mismatches.
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as ColorMode | null;
    if (stored) setColorModeState(stored);
  }, [storageKey]);

  const getSystemMode = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const resolvedColorMode: 'light' | 'dark' =
    colorMode === 'system' ? getSystemMode() : colorMode;

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (resolvedColorMode === 'dark') {
      root.setAttribute(attribute, 'dark');
    } else {
      root.removeAttribute(attribute);
    }
  }, [resolvedColorMode, attribute, mounted]);

  useEffect(() => {
    if (!mounted || colorMode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const root = document.documentElement;
      if (mq.matches) {
        root.setAttribute(attribute, 'dark');
      } else {
        root.removeAttribute(attribute);
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [colorMode, attribute, mounted]);

  const setColorMode = useCallback(
    (mode: ColorMode) => {
      setColorModeState(mode);
      localStorage.setItem(storageKey, mode);
    },
    [storageKey]
  );

  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedColorMode === 'dark' ? 'light' : 'dark');
  }, [resolvedColorMode, setColorMode]);

  return (
    <ThemeContext.Provider value={{ colorMode, resolvedColorMode, setColorMode, toggleColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
