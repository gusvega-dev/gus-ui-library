import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../components/Switch/Switch';

describe('Switch', () => {
  it('renders a switch input', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('reflects checked state', () => {
    render(<Switch checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('reflects unchecked state', () => {
    render(<Switch checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('calls onChange with new value when toggled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders label when provided', () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch disabled onChange={onChange} checked={false} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('forwards ref to input element', () => {
    const ref = { current: null };
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
