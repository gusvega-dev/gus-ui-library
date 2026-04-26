import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../components/Badge/Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText('Default')).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('applies secondary variant classes', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-secondary');
  });

  it('applies outline variant classes', () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText('Outline')).toHaveClass('border');
  });

  it('applies invert classes when invert is true', () => {
    render(<Badge invert>Inverted</Badge>);
    expect(screen.getByText('Inverted')).toHaveClass('bg-primary-foreground', 'text-primary');
  });

  it('merges custom className', () => {
    render(<Badge className="custom-class">Tag</Badge>);
    expect(screen.getByText('Tag')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = { current: null };
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('spreads HTML span attributes', () => {
    render(<Badge data-testid="my-badge">Badge</Badge>);
    expect(screen.getByTestId('my-badge')).toBeInTheDocument();
  });
});
