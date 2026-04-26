import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  Tooltip,
} from 'recharts';
import { getChartColor, CHART_DEFAULTS } from './utils';

export type SparkLineType = 'line' | 'area' | 'bar';

export interface SparkLineProps {
  /** Array of numeric values */
  data: number[];
  height?: number;
  type?: SparkLineType;
  color?: string;
  /** Show a minimal hover tooltip */
  tooltip?: boolean;
  className?: string;
}

export const SparkLine: React.FC<SparkLineProps> = ({
  data,
  height = 48,
  type = 'line',
  color,
  tooltip = false,
  className = '',
}) => {
  const chartData = data.map((value, index) => ({ index, value }));
  const strokeColor = color ?? getChartColor(0);
  const fillColor = strokeColor;

  const tooltipProps = tooltip
    ? { content: <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} /> }
    : { content: <></> };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Bar dataKey="value" fill={fillColor} radius={[2, 2, 0, 0]} />
            {tooltip && <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} cursor={false} />}
          </BarChart>
        ) : type === 'area' ? (
          <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <defs>
              <linearGradient id="spark-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fillColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={strokeColor}
              strokeWidth={CHART_DEFAULTS.strokeWidth}
              fill="url(#spark-gradient)"
            />
            {tooltip && <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} />}
          </AreaChart>
        ) : (
          <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={strokeColor}
              strokeWidth={CHART_DEFAULTS.strokeWidth}
              dot={false}
              activeDot={{ r: 3 }}
            />
            {tooltip && <Tooltip contentStyle={CHART_DEFAULTS.tooltipStyle} />}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default SparkLine;
