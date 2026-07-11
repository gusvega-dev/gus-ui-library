import { AccordionItem } from '@gusvega/ui';

const wrap = { width: 340, display: 'flex', flexDirection: 'column', gap: 10 } as const;

export const Open = () => (
  <div style={wrap}>
    <AccordionItem title="Shipping & returns" defaultOpen>
      Free shipping on orders over $50. Returns accepted within 30 days of delivery.
    </AccordionItem>
  </div>
);

export const Closed = () => (
  <div style={wrap}>
    <AccordionItem title="Payment methods">
      We accept all major cards, Apple Pay, and PayPal.
    </AccordionItem>
  </div>
);
