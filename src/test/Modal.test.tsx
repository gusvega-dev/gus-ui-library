import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../components/Modal/Modal';

describe('Modal', () => {
  it('does not render when closed', () => {
    render(<Modal open={false} onClose={vi.fn()} title="Test" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<Modal open={true} onClose={vi.fn()} title="My Modal" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal attribute', () => {
    render(<Modal open={true} onClose={vi.fn()} title="Modal" />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-labelledby pointing to title', () => {
    render(<Modal open={true} onClose={vi.fn()} title="Dialog Title" />);
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const title = document.getElementById(labelId!);
    expect(title?.textContent).toBe('Dialog Title');
  });

  it('calls onClose when backdrop clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} title="Modal">
        <button>Inner</button>
      </Modal>
    );
    // Click the backdrop (first fixed div)
    const backdrop = document.querySelector('.bg-black\\/50');
    if (backdrop) await user.click(backdrop as HTMLElement);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open={true} onClose={onClose} title="Modal" />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('renders title and description', () => {
    render(<Modal open={true} onClose={vi.fn()} title="Hello" description="World" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Modal">
        <p>Content inside</p>
      </Modal>
    );
    expect(screen.getByText('Content inside')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Modal" footer={<button>Save</button>} />
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('has close button with accessible label', () => {
    render(<Modal open={true} onClose={vi.fn()} title="Modal" />);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });
});
