import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../components/Select/Select';

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('Select', () => {
  it('renders a select element', () => {
    render(<Select options={OPTIONS} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={OPTIONS} />);
    expect(screen.getByRole('option', { name: 'Option A' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option B' })).toBeInTheDocument();
  });

  it('renders placeholder as first disabled option', () => {
    render(<Select options={OPTIONS} placeholder="Choose one" />);
    const placeholder = screen.getByRole('option', { name: 'Choose one' });
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toBeDisabled();
  });

  it('calls onChange with the selected value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={OPTIONS} onChange={onChange} />);
    await user.selectOptions(screen.getByRole('combobox'), 'b');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('marks disabled option as disabled', () => {
    render(<Select options={OPTIONS} />);
    expect(screen.getByRole('option', { name: 'Option C' })).toBeDisabled();
  });

  it('sets aria-invalid on error', () => {
    render(<Select options={OPTIONS} error="Required" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select options={OPTIONS} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('forwards ref to select element', () => {
    const ref = { current: null };
    render(<Select options={OPTIONS} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
