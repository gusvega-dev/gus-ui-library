import { Stat } from '@gusvega/ui';

const row = { display: 'flex', gap: 36, flexWrap: 'wrap' } as const;

export const Metrics = () => (
  <div style={row}>
    <Stat label="Revenue" value="$48.2k" change="+12.5%" trend="up" />
    <Stat label="Churn" value="1.8%" change="-0.4%" trend="down" />
    <Stat label="Active users" value="2,340" change="+128" trend="up" />
  </div>
);
