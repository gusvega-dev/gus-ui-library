import { Textarea } from '@gusvega/ui';

const wrap = { width: 320, display: 'flex', flexDirection: 'column', gap: 6 } as const;
const lbl = { fontSize: 13, fontWeight: 600, color: 'rgb(23 23 23)' } as const;

export const Default = () => (
  <div style={wrap}>
    <span style={lbl}>Message</span>
    <Textarea placeholder="Write your message…" />
  </div>
);

export const Filled = () => (
  <div style={wrap}>
    <span style={lbl}>Bio</span>
    <Textarea defaultValue={'Frontend engineer and design-system tinkerer.\nBuilding @gusvega/ui.'} />
  </div>
);

export const ErrorState = () => (
  <div style={wrap}>
    <span style={lbl}>Message</span>
    <Textarea defaultValue="Too short" error="Must be at least 20 characters" />
    <span style={{ fontSize: 12, color: 'rgb(239 68 68)' }}>Must be at least 20 characters</span>
  </div>
);
