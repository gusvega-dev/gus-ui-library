import React from 'react';

export type StackDirection = 'row' | 'col';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps {
  direction?: StackDirection;
  gap?: number | string;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  children: React.ReactNode;
  className?: string;
}

const alignClasses: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapMap: Record<number, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4',
  5: 'gap-5', 6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12',
};

export const Stack: React.FC<StackProps> = ({
  direction = 'col',
  gap = 4,
  align = 'start',
  justify = 'start',
  wrap = false,
  children,
  className = '',
}) => {
  const gapClass = typeof gap === 'number' && gapMap[gap] ? gapMap[gap] : `gap-[${gap}]`;

  return (
    <div
      className={[
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        alignClasses[align],
        justifyClasses[justify],
        gapClass,
        wrap ? 'flex-wrap' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
};

export default Stack;
