import React from 'react';
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_DEFAULTS, getChartColor, type ChartDataPoint, type ChartSeries } from './utils';

export interface AreaChartProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  xKey: string;
  height?: number;
  stacked?: boolean;
  grid?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  /** Fill opacity for the area. Default: 0.15 */
  fillOpacity?: number;
  curved?: boolean;
  className?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  series,
  xKey,
  height = CHART_DEFAULTS.height,
  stacked = false,
  grid = true,
  tooltip = true,
  legend = true,
  fillOpacity = 0.15,
  curved = true,
  className = '',
}) => (
  <div className={className}>
    <ResponsiveContainer width="100%" height={height}>
      <ReAreaChart data={data} margin={CHART_DEFAULTS.margin}>
        <defs>
          {series.map((s, i) => {
            const color = getChartColor(i, s.color);
            return (
              <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={fillOpacity * 4} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>
        {grid && (
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_DEFAULTS.gridStroke} vertical={false} />
        )}
        <XAxis dataKey={xKey} tick={CHART_DEFAULTS.tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={CHART_DEFAULTS.tickStyle} axisLine={false} tickLine={false} width={40} />
        {tooltip && <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} />}
        {legend && <Legend wrapperStyle={CHART_DEFAULTS.legendStyle} />}
        {series.map((s, i) => {
          const color = getChartColor(i, s.color);
          return (
            <Area
              key={s.key}
              type={curved ? 'monotone' : 'linear'}
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={color}
              strokeWidth={CHART_DEFAULTS.strokeWidth}
              fill={`url(#gradient-${s.key})`}
              stackId={stacked ? 'stack' : undefined}
            />
          );
        })}
      </ReAreaChart>
    </ResponsiveContainer>
  </div>
);

export default AreaChart;
