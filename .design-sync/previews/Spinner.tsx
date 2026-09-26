import { Spinner } from '@gusvega/ui';

const row = { display: 'flex', alignItems: 'center', gap: 24, padding: 8 } as const;

export const Sizes = () => (
  <div style={row}>
    <Spinner size="sm" />
    <Spinner size="md" />
    <Spinner size="lg" />
  </div>
);
