import React from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
}

const defaultSizeByLevel: Record<HeadingLevel, HeadingSize> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'base',
};

const defaultWeightByLevel: Record<HeadingLevel, HeadingWeight> = {
  1: 'bold',
  2: 'bold',
  3: 'semibold',
  4: 'semibold',
  5: 'medium',
  6: 'medium',
};

const sizeClasses: Record<HeadingSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
};

const weightClasses: Record<HeadingWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  size,
  weight,
  className = '',
  children,
  ...props
}) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const resolvedSize = size ?? defaultSizeByLevel[level];
  const resolvedWeight = weight ?? defaultWeightByLevel[level];

  const classes = [
    'text-foreground tracking-tight',
    sizeClasses[resolvedSize],
    weightClasses[resolvedWeight],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
