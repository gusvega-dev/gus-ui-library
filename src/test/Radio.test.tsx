import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from '../components/Radio/Radio';

describe('Radio', () => {
  it('renders a radio input', () => {
    render(<Radio value="a" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('reflects checked state', () => {
    render(<Radio value="a" checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('reflects unchecked state', () => {
    render(<Radio value="a" checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('calls onChange with value when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Radio value="option-1" checked={false} onChange={onChange} />);
    await user.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledWith('option-1');
  });

  it('renders label when provided', () => {
    render(<Radio value="a" label="Option A" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Radio value="a" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('sets name attribute when provided', () => {
    render(<Radio value="a" name="group1" />);
    expect(screen.getByRole('radio')).toHaveAttribute('name', 'group1');
  });

  it('forwards ref to input element', () => {
    const ref = { current: null };
    render(<Radio value="a" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
