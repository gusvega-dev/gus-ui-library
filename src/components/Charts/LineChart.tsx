import React from 'react';
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_DEFAULTS, getChartColor, type ChartDataPoint, type ChartSeries } from './utils';

export interface LineChartProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  xKey: string;
  height?: number;
  grid?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  curved?: boolean;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  series,
  xKey,
  height = CHART_DEFAULTS.height,
  grid = true,
  tooltip = true,
  legend = true,
  curved = true,
  className = '',
}) => (
  <div className={className}>
    <ResponsiveContainer width="100%" height={height}>
      <ReLineChart data={data} margin={CHART_DEFAULTS.margin}>
        {grid && (
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.gridStroke} vertical={false} />
        )}
        <XAxis dataKey={xKey} tick={CHART_DEFAULTS.tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={CHART_DEFAULTS.tickStyle} axisLine={false} tickLine={false} width={40} />
        {tooltip && <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} />}
        {legend && <Legend wrapperStyle={CHART_DEFAULTS.legendStyle} />}
        {series.map((s, i) => (
          <Line
            key={s.key}
            type={curved ? 'monotone' : 'linear'}
            dataKey={s.key}
            name={s.label ?? s.key}
            stroke={getChartColor(i, s.color)}
            strokeWidth={CHART_DEFAULTS.strokeWidth}
            dot={{ r: CHART_DEFAULTS.dotRadius, fill: getChartColor(i, s.color) }}
            activeDot={{ r: CHART_DEFAULTS.activeDotRadius }}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  </div>
);

export default LineChart;
