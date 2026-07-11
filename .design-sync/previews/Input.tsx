import { Input } from '@gusvega/ui';

const wrap = { width: 280, display: 'flex', flexDirection: 'column', gap: 6 } as const;
const lbl = { fontSize: 13, fontWeight: 600, color: 'rgb(23 23 23)' } as const;

export const Default = () => (
  <div style={wrap}>
    <span style={lbl}>Email</span>
    <Input placeholder="you@example.com" />
  </div>
);

export const Filled = () => (
  <div style={wrap}>
    <span style={lbl}>Full name</span>
    <Input defaultValue="Ada Lovelace" />
  </div>
);

export const ErrorState = () => (
  <div style={wrap}>
    <span style={lbl}>Email</span>
    <Input defaultValue="not-an-email" error="Enter a valid email" />
    <span style={{ fontSize: 12, color: 'rgb(239 68 68)' }}>Enter a valid email</span>
  </div>
);

export const Disabled = () => (
  <div style={wrap}>
    <span style={lbl}>Email</span>
    <Input placeholder="Disabled" disabled />
  </div>
);
