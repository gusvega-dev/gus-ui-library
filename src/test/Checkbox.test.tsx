import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../components/Checkbox/Checkbox';

describe('Checkbox', () => {
  it('renders label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders hidden checkbox input', () => {
    render(<Checkbox label="Test" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('reflects checked state', () => {
    render(<Checkbox checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} label="Click me" />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled label="Disabled" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('forwards ref to input', () => {
    const ref = { current: null };
    render(<Checkbox ref={ref} label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
