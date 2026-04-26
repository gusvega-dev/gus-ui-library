import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../components/Tooltip/Tooltip';

describe('Tooltip', () => {
  it('renders the trigger child', () => {
    render(
      <Tooltip text="Helpful tip">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('tooltip is not visible by default', () => {
    render(
      <Tooltip text="Tip text">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip text="Tip text">
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tip text');
  });

  it('hides tooltip when unhovered', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip text="Tip text">
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await user.unhover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip text="Focus tip">
        <button>Trigger</button>
      </Tooltip>
    );
    await user.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('hides tooltip on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip text="Focus tip">
        <button>Trigger</button>
      </Tooltip>
    );
    await user.tab();
    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
