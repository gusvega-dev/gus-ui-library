import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from '../components/FormField/FormField';
import { Input } from '../components/Input/Input';

describe('FormField', () => {
  it('renders children', () => {
    render(
      <FormField>
        <Input data-testid="input" />
      </FormField>
    );
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(
      <FormField label="Email" htmlFor="email">
        <Input id="email" />
      </FormField>
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('label is associated with input via htmlFor', () => {
    render(
      <FormField label="Name" htmlFor="name-input">
        <Input id="name-input" />
      </FormField>
    );
    const label = screen.getByText('Name').closest('label');
    expect(label).toHaveAttribute('for', 'name-input');
  });

  it('renders required asterisk when required is true', () => {
    render(
      <FormField label="Name" required>
        <Input />
      </FormField>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders error message with role="alert"', () => {
    render(
      <FormField label="Name" error="This field is required">
        <Input />
      </FormField>
    );
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('This field is required');
    expect(error).toHaveClass('text-destructive');
  });

  it('renders hint text when no error', () => {
    render(
      <FormField label="Username" hint="Must be at least 3 characters">
        <Input />
      </FormField>
    );
    expect(screen.getByText('Must be at least 3 characters')).toBeInTheDocument();
  });

  it('does not render hint when error is present', () => {
    render(
      <FormField label="Username" error="Invalid" hint="Hint text">
        <Input />
      </FormField>
    );
    expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(
      <FormField className="my-field">
        <Input />
      </FormField>
    );
    expect(container.firstChild).toHaveClass('my-field');
  });
});
