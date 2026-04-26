import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from '../components/Toast/Toast';

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast message="Saved successfully" onClose={vi.fn()} />);
    expect(screen.getByText('Saved successfully')).toBeInTheDocument();
  });

  it('has aria-live="polite"', () => {
    render(<Toast message="Hello" onClose={vi.fn()} />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('has aria-atomic="true"', () => {
    render(<Toast message="Hello" onClose={vi.fn()} />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-atomic', 'true');
  });

  it('has a dismiss button with accessible label', () => {
    render(<Toast message="Hello" onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Dismiss notification' })).toBeInTheDocument();
  });

  it('calls onClose when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast message="Hello" onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose after duration expires', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Timed" onClose={onClose} duration={2000} />);
    expect(onClose).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(2000); });
    expect(onClose).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('applies info type classes by default', () => {
    render(<Toast message="Info" onClose={vi.fn()} />);
    expect(screen.getByRole('status')).toHaveClass('bg-info/10');
  });

  it('applies error type classes', () => {
    render(<Toast message="Error" onClose={vi.fn()} type="error" />);
    expect(screen.getByRole('status')).toHaveClass('bg-destructive/10');
  });

  it('applies success type classes', () => {
    render(<Toast message="Done" onClose={vi.fn()} type="success" />);
    expect(screen.getByRole('status')).toHaveClass('bg-success/10');
  });
});
