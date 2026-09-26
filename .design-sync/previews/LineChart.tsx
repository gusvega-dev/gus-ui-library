import { LineChart } from '@gusvega/ui';

const data = [
  { day: 'Mon', sessions: 120, signups: 24 },
  { day: 'Tue', sessions: 180, signups: 38 },
  { day: 'Wed', sessions: 150, signups: 31 },
  { day: 'Thu', sessions: 220, signups: 52 },
  { day: 'Fri', sessions: 280, signups: 61 },
  { day: 'Sat', sessions: 190, signups: 40 },
  { day: 'Sun', sessions: 140, signups: 29 },
];

export const Traffic = () => (
  <div style={{ width: '100%' }}>
    <LineChart data={data} xKey="day" series={[{ key: 'sessions', label: 'Sessions' }]} height={220} />
  </div>
);

export const MultiSeries = () => (
  <div style={{ width: '100%' }}>
    <LineChart
      data={data}
      xKey="day"
      series={[{ key: 'sessions', label: 'Sessions' }, { key: 'signups', label: 'Signups' }]}
      height={220}
    />
  </div>
);
