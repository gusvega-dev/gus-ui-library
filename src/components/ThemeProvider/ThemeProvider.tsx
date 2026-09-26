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
const isColorMode = (value: unknown): value is ColorMode =>
  value === 'light' || value === 'dark' || value === 'system';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultColorMode?: ColorMode;
  storageKey?: string;
  attribute?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children, defaultColorMode = 'system', storageKey = 'gus-ui-color-mode', attribute = 'data-theme',
}) => {
  // Initial render is identical on the server and client, including context consumers.
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);
  const [systemMode, setSystemMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey);
      if (isColorMode(stored)) setColorModeState(stored);
    } catch {
      // Storage may be unavailable in private or embedded browsing contexts.
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemMode(media.matches ? 'dark' : 'light');
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const resolvedColorMode = colorMode === 'system' ? systemMode : colorMode;

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (resolvedColorMode === 'dark') root.setAttribute(attribute, 'dark');
    else root.removeAttribute(attribute);
  }, [resolvedColorMode, attribute, mounted]);

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    try {
      localStorage.setItem(storageKey, mode);
    } catch {
      // Theme changes still work without persistence.
    }
  }, [storageKey]);

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
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
