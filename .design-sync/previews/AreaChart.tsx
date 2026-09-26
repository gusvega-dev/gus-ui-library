import { AreaChart } from '@gusvega/ui';

const data = [
  { month: 'Jan', revenue: 4200, users: 2400 },
  { month: 'Feb', revenue: 5100, users: 2800 },
  { month: 'Mar', revenue: 4800, users: 3100 },
  { month: 'Apr', revenue: 6300, users: 3600 },
  { month: 'May', revenue: 7200, users: 4200 },
  { month: 'Jun', revenue: 8100, users: 4800 },
];

export const Revenue = () => (
  <div style={{ width: '100%' }}>
    <AreaChart data={data} xKey="month" series={[{ key: 'revenue', label: 'Revenue' }]} height={220} />
  </div>
);

export const Stacked = () => (
  <div style={{ width: '100%' }}>
    <AreaChart
      data={data}
      xKey="month"
      series={[{ key: 'revenue', label: 'Revenue' }, { key: 'users', label: 'Users' }]}
      stacked
      height={220}
    />
  </div>
);
