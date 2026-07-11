import { FormGroup, Input } from '@gusvega/ui';

export const Default = () => (
  <div style={{ width: 360 }}>
    <FormGroup legend="Billing address" description="Where should we send the invoice?">
      <Input placeholder="Street address" />
      <Input placeholder="City" />
      <Input placeholder="ZIP code" />
    </FormGroup>
  </div>
);
