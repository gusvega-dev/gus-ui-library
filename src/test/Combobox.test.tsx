import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox } from '../components/Combobox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', disabled: true },
  { value: 'svelte', label: 'Svelte' },
];

describe('Combobox', () => {
  it('stays open after the initial click and filters while typing', async () => {
    const user = userEvent.setup();
    render(<Combobox options={options} aria-label="Framework" />);
    const input = screen.getByRole('combobox', { name: 'Framework' });
    await user.click(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('option')).toHaveLength(3);
    await user.type(input, 'REA');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: 'React' })).toBeVisible();
  });

  it('selects with the pointer, keeps focus, and submits the option value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<form data-testid="form"><Combobox options={options} name="framework" onChange={onChange} /></form>);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.click(screen.getByRole('option', { name: 'React' }));
    expect(onChange).toHaveBeenCalledWith('react');
    expect(input).toHaveValue('React');
    expect(input).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('framework')).toBe('react');
  });

  it('skips disabled options with arrow keys and selects with Enter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onSubmit = vi.fn(event => event.preventDefault());
    render(<form onSubmit={onSubmit}><Combobox options={options} onChange={onChange} /></form>);
    await user.tab();
    const input = screen.getByRole('combobox');
    await user.keyboard('{ArrowDown}{ArrowDown}');
    expect(input).toHaveAttribute('aria-activedescendant', screen.getByRole('option', { name: 'Svelte' }).id);
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('svelte');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(input).toHaveValue('Svelte');
  });

  it('supports Home, End, Escape, and normal Tab navigation', async () => {
    const user = userEvent.setup();
    render(<><Combobox options={options} defaultValue="react" /><button>Next</button></>);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.keyboard('{End}');
    expect(input).toHaveAttribute('aria-activedescendant', screen.getByRole('option', { name: 'Svelte' }).id);
    await user.keyboard('{Home}');
    expect(input).toHaveAttribute('aria-activedescendant', screen.getByRole('option', { name: 'React' }).id);
    await user.type(input, 'no match');
    await user.keyboard('{Escape}');
    expect(input).toHaveValue('React');
    expect(input).toHaveFocus();
    await user.click(input);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('reports no results and handles navigation in an empty list', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} emptyMessage="Nothing matches" />);
    await user.type(screen.getByRole('combobox'), 'zzzz');
    expect(screen.getByRole('status')).toHaveTextContent('Nothing matches');
    await user.keyboard('{ArrowDown}{ArrowUp}{Enter}');
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-activedescendant');
  });

  it('does not select a disabled option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Vue' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects controlled value updates', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Combobox options={options} value="react" onChange={onChange} />);
    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.click(screen.getByRole('option', { name: 'Svelte' }));
    expect(onChange).toHaveBeenCalledWith('svelte');
    expect(input).toHaveValue('React');
    rerender(<Combobox options={options} value="svelte" onChange={onChange} />);
    expect(input).toHaveValue('Svelte');
  });

  it('dismisses on an outside click without blocking that click', async () => {
    const user = userEvent.setup();
    const outside = vi.fn();
    render(<><Combobox options={options} /><button onClick={outside}>Outside</button></>);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    expect(outside).toHaveBeenCalledOnce();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('forwards the ref, native attributes, and accessible description', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Combobox ref={ref} options={options} id="framework" aria-label="Framework" aria-describedby="help" error="Required" />);
    const input = screen.getByRole('combobox', { name: 'Framework' });
    expect(ref.current).toBe(input);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'help');
  });

  it.each(['disabled', 'readOnly'] as const)('does not open when %s', async state => {
    const user = userEvent.setup();
    render(<Combobox options={options} {...{ [state]: true }} />);
    await user.click(screen.getByRole('combobox'));
    await user.keyboard('{ArrowDown}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('keeps list IDs distinct across instances', async () => {
    const user = userEvent.setup();
    render(<><Combobox options={options} aria-label="First" /><Combobox options={options} aria-label="Second" /></>);
    const first = screen.getByRole('combobox', { name: 'First' });
    const second = screen.getByRole('combobox', { name: 'Second' });
    await user.click(first);
    const firstId = first.getAttribute('aria-controls');
    await user.click(second);
    expect(second.getAttribute('aria-controls')).not.toBe(firstId);
  });
});
