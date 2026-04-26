import React from 'react';

type ColCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns, or responsive object */
  cols?: ColCount | { base?: ColCount; sm?: ColCount; md?: ColCount; lg?: ColCount; xl?: ColCount };
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  rowGap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  colGap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
}

const colsMap: Record<ColCount, string> = {
  1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4',
  5: 'grid-cols-5', 6: 'grid-cols-6', 7: 'grid-cols-7', 8: 'grid-cols-8',
  9: 'grid-cols-9', 10: 'grid-cols-10', 11: 'grid-cols-11', 12: 'grid-cols-12',
};

const smColsMap: Record<ColCount, string> = {
  1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6', 7: 'sm:grid-cols-7', 8: 'sm:grid-cols-8',
  9: 'sm:grid-cols-9', 10: 'sm:grid-cols-10', 11: 'sm:grid-cols-11', 12: 'sm:grid-cols-12',
};

const mdColsMap: Record<ColCount, string> = {
  1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4',
  5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 7: 'md:grid-cols-7', 8: 'md:grid-cols-8',
  9: 'md:grid-cols-9', 10: 'md:grid-cols-10', 11: 'md:grid-cols-11', 12: 'md:grid-cols-12',
};

const lgColsMap: Record<ColCount, string> = {
  1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 7: 'lg:grid-cols-7', 8: 'lg:grid-cols-8',
  9: 'lg:grid-cols-9', 10: 'lg:grid-cols-10', 11: 'lg:grid-cols-11', 12: 'lg:grid-cols-12',
};

const xlColsMap: Record<ColCount, string> = {
  1: 'xl:grid-cols-1', 2: 'xl:grid-cols-2', 3: 'xl:grid-cols-3', 4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5', 6: 'xl:grid-cols-6', 7: 'xl:grid-cols-7', 8: 'xl:grid-cols-8',
  9: 'xl:grid-cols-9', 10: 'xl:grid-cols-10', 11: 'xl:grid-cols-11', 12: 'xl:grid-cols-12',
};

const gapMap: Record<number, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4',
  5: 'gap-5', 6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12', 16: 'gap-16',
};

const rowGapMap: Record<number, string> = {
  0: 'row-gap-0', 1: 'gap-y-1', 2: 'gap-y-2', 3: 'gap-y-3', 4: 'gap-y-4',
  5: 'gap-y-5', 6: 'gap-y-6', 8: 'gap-y-8', 10: 'gap-y-10', 12: 'gap-y-12', 16: 'gap-y-16',
};

const colGapMap: Record<number, string> = {
  0: 'gap-x-0', 1: 'gap-x-1', 2: 'gap-x-2', 3: 'gap-x-3', 4: 'gap-x-4',
  5: 'gap-x-5', 6: 'gap-x-6', 8: 'gap-x-8', 10: 'gap-x-10', 12: 'gap-x-12', 16: 'gap-x-16',
};

const resolveColsClasses = (
  cols: GridProps['cols']
): string => {
  if (!cols) return 'grid-cols-1';
  if (typeof cols === 'number') return colsMap[cols] ?? 'grid-cols-1';
  return [
    cols.base ? colsMap[cols.base] : 'grid-cols-1',
    cols.sm ? smColsMap[cols.sm] : '',
    cols.md ? mdColsMap[cols.md] : '',
    cols.lg ? lgColsMap[cols.lg] : '',
    cols.xl ? xlColsMap[cols.xl] : '',
  ].filter(Boolean).join(' ');
};

export const Grid: React.FC<GridProps> = ({
  cols = 1,
  gap,
  rowGap,
  colGap,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    'grid',
    resolveColsClasses(cols),
    gap !== undefined ? gapMap[gap] : '',
    rowGap !== undefined ? rowGapMap[rowGap] : '',
    colGap !== undefined ? colGapMap[colGap] : '',
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes} {...props}>{children}</div>;
};

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6;
}

const spanMap: Record<string | number, string> = {
  1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
  5: 'col-span-5', 6: 'col-span-6', 7: 'col-span-7', 8: 'col-span-8',
  9: 'col-span-9', 10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12',
  full: 'col-span-full',
};

const rowSpanMap: Record<number, string> = {
  1: 'row-span-1', 2: 'row-span-2', 3: 'row-span-3',
  4: 'row-span-4', 5: 'row-span-5', 6: 'row-span-6',
};

export const GridItem: React.FC<GridItemProps> = ({
  colSpan,
  rowSpan,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    colSpan ? spanMap[colSpan] : '',
    rowSpan ? rowSpanMap[rowSpan] : '',
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes} {...props}>{children}</div>;
};

export default Grid;
