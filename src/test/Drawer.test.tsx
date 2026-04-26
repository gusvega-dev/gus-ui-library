import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from '../components/Drawer/Drawer';

describe('Drawer', () => {
  it('does not render when closed', () => {
    render(<Drawer open={false} onClose={vi.fn()} title="Menu" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<Drawer open={true} onClose={vi.fn()} title="Menu" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<Drawer open={true} onClose={vi.fn()} title="Menu" />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('renders title', () => {
    render(<Drawer open={true} onClose={vi.fn()} title="Navigation" />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Drawer open={true} onClose={vi.fn()} title="Drawer">
        <p>Drawer content</p>
      </Drawer>
    );
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Drawer open={true} onClose={onClose} title="Drawer" />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('has close button with accessible label', () => {
    render(<Drawer open={true} onClose={vi.fn()} title="Drawer" />);
    expect(screen.getByRole('button', { name: 'Close drawer' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Drawer open={true} onClose={onClose} title="Drawer" />);
    await user.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Drawer open={true} onClose={onClose} title="Drawer" />);
    const backdrop = document.querySelector('.bg-black\\/50');
    if (backdrop) await user.click(backdrop as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });
});
