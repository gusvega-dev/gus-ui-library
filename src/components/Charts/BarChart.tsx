import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_DEFAULTS, getChartColor, type ChartDataPoint, type ChartSeries } from './utils';

export interface BarChartProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  xKey: string;
  height?: number;
  stacked?: boolean;
  grid?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  rounded?: boolean;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  series,
  xKey,
  height = CHART_DEFAULTS.height,
  stacked = false,
  grid = true,
  tooltip = true,
  legend = true,
  rounded = true,
  className = '',
}) => (
  <div className={className}>
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart data={data} margin={CHART_DEFAULTS.margin} barCategoryGap="30%">
        {grid && (
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.gridStroke} vertical={false} />
        )}
        <XAxis dataKey={xKey} tick={CHART_DEFAULTS.tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={CHART_DEFAULTS.tickStyle} axisLine={false} tickLine={false} width={40} />
        {tooltip && <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} cursor={{ fill: 'rgb(var(--gus-color-muted, 245 245 245) / 0.5)' }} />}
        {legend && <Legend wrapperStyle={CHART_DEFAULTS.legendStyle} />}
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label ?? s.key}
            fill={getChartColor(i, s.color)}
            stackId={stacked ? 'stack' : undefined}
            radius={rounded ? (i === series.length - 1 || !stacked ? [4, 4, 0, 0] : [0, 0, 0, 0]) : undefined}
          />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChart;
