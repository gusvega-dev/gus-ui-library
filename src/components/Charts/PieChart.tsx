import React from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_DEFAULTS, getChartColor } from './utils';

export interface PieChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartDataPoint[];
  height?: number;
  /** Render as donut chart */
  donut?: boolean;
  /** Inner radius ratio (0–1) when donut=true. Default: 0.55 */
  innerRadiusRatio?: number;
  tooltip?: boolean;
  legend?: boolean;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  height = CHART_DEFAULTS.height,
  donut = false,
  innerRadiusRatio = 0.55,
  tooltip = true,
  legend = true,
  className = '',
}) => {
  const outerRadius = Math.min(height / 2 - 16, 120);
  const innerRadius = donut ? outerRadius * innerRadiusRatio : 0;

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            paddingAngle={donut ? 2 : 0}
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={getChartColor(i, entry.color)} />
            ))}
          </Pie>
          {tooltip && <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} />}
          {legend && <Legend wrapperStyle={CHART_DEFAULTS.legendStyle} />}
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
