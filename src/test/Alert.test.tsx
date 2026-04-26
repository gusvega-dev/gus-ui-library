import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert } from '../components/Alert/Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Something went wrong.</Alert>);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });

  it('has role="alert"', () => {
    render(<Alert>Error</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Alert title="Warning">Details here.</Alert>);
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Details here.')).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(<Alert>No title</Alert>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('applies default variant class', () => {
    render(<Alert>Default</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-muted');
  });

  it('applies outline variant class', () => {
    render(<Alert variant="outline">Outline</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-background');
  });

  it('applies filled variant class', () => {
    render(<Alert variant="filled">Filled</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-primary');
  });

  it('merges custom className', () => {
    render(<Alert className="custom-class">Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Alert ref={ref}>Ref</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
