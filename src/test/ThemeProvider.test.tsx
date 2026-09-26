import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../components/ThemeProvider';

function Consumer() {
  const { colorMode, resolvedColorMode, toggleColorMode, setColorMode } = useTheme();
  return <><output>{colorMode}:{resolvedColorMode}</output><button onClick={toggleColorMode}>Toggle</button><button onClick={() => setColorMode('system')}>System</button></>;
}

let dark = false;
let listener: (() => void) | undefined;
const removeListener = vi.fn();
beforeEach(() => {
  localStorage.clear();
  dark = false;
  listener = undefined;
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    get matches() { return dark; },
    addEventListener: (_type: string, callback: () => void) => { listener = callback; },
    removeEventListener: removeListener,
  })));
});
afterEach(() => {
  document.documentElement.removeAttribute('data-theme');
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('ThemeProvider', () => {
  it('updates both the DOM and consumers when the system theme changes', () => {
    render(<ThemeProvider><Consumer /></ThemeProvider>);
    expect(screen.getByRole('status')).toHaveTextContent('system:light');
    act(() => { dark = true; listener?.(); });
    expect(screen.getByRole('status')).toHaveTextContent('system:dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('toggles from the current system theme and persists the explicit choice', async () => {
    const user = userEvent.setup();
    render(<ThemeProvider><Consumer /></ThemeProvider>);
    act(() => { dark = true; listener?.(); });
    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByRole('status')).toHaveTextContent('light:light');
    expect(localStorage.getItem('gus-ui-color-mode')).toBe('light');
    expect(document.documentElement).not.toHaveAttribute('data-theme');
  });

  it('ignores invalid stored values', () => {
    localStorage.setItem('gus-ui-color-mode', 'garbage');
    render(<ThemeProvider defaultColorMode="dark"><Consumer /></ThemeProvider>);
    expect(screen.getByRole('status')).toHaveTextContent('dark:dark');
  });

  it('works when storage throws', async () => {
    const user = userEvent.setup();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked'); });
    render(<ThemeProvider defaultColorMode="light"><Consumer /></ThemeProvider>);
    await user.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByRole('status')).toHaveTextContent('dark:dark');
  });

  it('renders deterministic initial markup even if the browser prefers dark', () => {
    dark = true;
    expect(renderToString(<ThemeProvider><Consumer /></ThemeProvider>)).toContain('system<!-- -->:<!-- -->light');
  });

  it('removes its media listener on unmount', () => {
    const { unmount } = render(<ThemeProvider><Consumer /></ThemeProvider>);
    const callback = listener;
    unmount();
    expect(removeListener).toHaveBeenCalledWith('change', callback);
  });
});
