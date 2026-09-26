import { BarChart } from '@gusvega/ui';

const data = [
  { month: 'Jan', revenue: 4200, profit: 1800 },
  { month: 'Feb', revenue: 5100, profit: 2100 },
  { month: 'Mar', revenue: 4800, profit: 1900 },
  { month: 'Apr', revenue: 6300, profit: 2700 },
  { month: 'May', revenue: 7200, profit: 3300 },
];

export const Revenue = () => (
  <div style={{ width: '100%' }}>
    <BarChart data={data} xKey="month" series={[{ key: 'revenue', label: 'Revenue' }]} height={220} />
  </div>
);

export const Grouped = () => (
  <div style={{ width: '100%' }}>
    <BarChart
      data={data}
      xKey="month"
      series={[{ key: 'revenue', label: 'Revenue' }, { key: 'profit', label: 'Profit' }]}
      height={220}
    />
  </div>
);
