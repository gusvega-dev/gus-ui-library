import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs/Tabs';

function TestTabs() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders default tab content', () => {
    render(<TestTabs />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches content on trigger click', async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('tabs have role="tab"', () => {
    render(<TestTabs />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('active tab has aria-selected="true"', () => {
    render(<TestTabs />);
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    expect(tab2).toHaveAttribute('aria-selected', 'false');
  });

  it('tabpanel has role="tabpanel"', () => {
    render(<TestTabs />);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('tablist has role="tablist"', () => {
    render(<TestTabs />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('disabled tab cannot be clicked', async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    await user.click(screen.getByRole('tab', { name: 'Tab 3' }));
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('tab and panel are linked via aria-controls/aria-labelledby', () => {
    render(<TestTabs />);
    const tab = screen.getByRole('tab', { name: 'Tab 1' });
    const panelId = tab.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    const panel = document.getElementById(panelId!);
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });
});
