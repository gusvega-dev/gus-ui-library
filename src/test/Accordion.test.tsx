import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem } from '../components/Accordion/Accordion';

function TestAccordion() {
  return (
    <Accordion>
      <AccordionItem title="Section 1">Content 1</AccordionItem>
      <AccordionItem title="Section 2">Content 2</AccordionItem>
    </Accordion>
  );
}

describe('AccordionItem', () => {
  it('renders the title', () => {
    render(<TestAccordion />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
  });

  it('hides content by default', () => {
    render(<TestAccordion />);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('shows content when title is clicked', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByRole('button', { name: /Section 1/i }));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('hides content again when clicked twice', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByRole('button', { name: /Section 1/i }));
    await user.click(screen.getByRole('button', { name: /Section 1/i }));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('trigger has aria-expanded="false" when closed', () => {
    render(<TestAccordion />);
    expect(screen.getByRole('button', { name: /Section 1/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('trigger has aria-expanded="true" when open', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByRole('button', { name: /Section 1/i }));
    expect(screen.getByRole('button', { name: /Section 1/i })).toHaveAttribute('aria-expanded', 'true');
  });

  it('panel has role="region"', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByRole('button', { name: /Section 1/i }));
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('opens with defaultOpen=true', () => {
    render(
      <Accordion>
        <AccordionItem title="Open by default" defaultOpen>Pre-opened content</AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Pre-opened content')).toBeInTheDocument();
  });

  it('multiple items can be open independently', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByRole('button', { name: /Section 1/i }));
    await user.click(screen.getByRole('button', { name: /Section 2/i }));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
