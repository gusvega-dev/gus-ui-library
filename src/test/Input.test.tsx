import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../components/Input/Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('accepts and displays a value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards ref to input element', () => {
    const ref = { current: null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets aria-invalid when error prop is provided', () => {
    render(<Input error="Required field" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid without error', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
  });

  it('applies border-destructive class on error', () => {
    render(<Input error="bad" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-destructive');
  });

  it('merges custom className', () => {
    render(<Input className="my-custom" />);
    expect(screen.getByRole('textbox')).toHaveClass('my-custom');
  });

  it('passes through HTML input attributes', () => {
    render(<Input type="email" placeholder="Enter email" data-testid="email-input" />);
    const input = screen.getByTestId('email-input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
  });
});
