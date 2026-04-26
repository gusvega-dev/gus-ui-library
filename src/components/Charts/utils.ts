export const CHART_COLORS = [
  'rgb(99, 102, 241)',  // chart-1: indigo
  'rgb(34, 197, 94)',   // chart-2: green
  'rgb(234, 179, 8)',   // chart-3: yellow
  'rgb(239, 68, 68)',   // chart-4: red
  'rgb(59, 130, 246)',  // chart-5: blue
  'rgb(168, 85, 247)',  // chart-6: purple
];

export const getChartColor = (index: number, override?: string): string =>
  override ?? CHART_COLORS[index % CHART_COLORS.length];

export const CHART_DEFAULTS = {
  height: 300,
  margin: { top: 8, right: 8, bottom: 8, left: 8 },
  strokeWidth: 2,
  dotRadius: 4,
  activeDotRadius: 6,
  gridStroke: 'rgb(var(--gus-color-border, 229 229 229))',
  tickStyle: {
    fontSize: 12,
    fill: 'rgb(var(--gus-color-muted-foreground, 115 115 115))',
  },
  tooltipStyle: {
    backgroundColor: 'rgb(var(--gus-color-popover, 255 255 255))',
    border: '1px solid rgb(var(--gus-color-border, 229 229 229))',
    borderRadius: 'var(--gus-radius-md, 0.375rem)',
    color: 'rgb(var(--gus-color-popover-foreground, 23 23 23))',
    fontSize: 12,
    boxShadow: 'var(--gus-shadow-md)',
  },
  legendStyle: {
    fontSize: 12,
    color: 'rgb(var(--gus-color-muted-foreground, 115 115 115))',
  },
} as const;

export interface ChartSeries {
  key: string;
  label?: string;
  color?: string;
}

export interface ChartDataPoint {
  [key: string]: string | number;
}
