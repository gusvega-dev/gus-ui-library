import { Progress } from '@gusvega/ui';

const wrap = { width: 280, display: 'flex', flexDirection: 'column', gap: 16 } as const;
const row = { display: 'flex', flexDirection: 'column', gap: 6 } as const;
const lbl = { fontSize: 12, color: 'rgb(115 115 115)' } as const;

export const Steps = () => (
  <div style={wrap}>
    <div style={row}><span style={lbl}>Uploading — 25%</span><Progress value={25} /></div>
    <div style={row}><span style={lbl}>Processing — 50%</span><Progress value={50} /></div>
    <div style={row}><span style={lbl}>Almost done — 75%</span><Progress value={75} /></div>
    <div style={row}><span style={lbl}>Complete — 100%</span><Progress value={100} /></div>
  </div>
);
