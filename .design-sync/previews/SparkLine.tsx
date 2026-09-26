import { SparkLine } from '@gusvega/ui';

const data = [4, 8, 6, 10, 7, 12, 9, 14, 11, 16, 13, 18];
const wrap = { width: 220, display: 'flex', flexDirection: 'column', gap: 4 } as const;
const lbl = { fontSize: 12, color: 'rgb(115 115 115)' } as const;

export const Line = () => (
  <div style={wrap}>
    <span style={lbl}>Sessions — line</span>
    <SparkLine data={data} type="line" height={56} />
  </div>
);

export const Area = () => (
  <div style={wrap}>
    <span style={lbl}>Sessions — area</span>
    <SparkLine data={data} type="area" height={56} />
  </div>
);

export const Bars = () => (
  <div style={wrap}>
    <span style={lbl}>Sessions — bar</span>
    <SparkLine data={data} type="bar" height={56} />
  </div>
);
