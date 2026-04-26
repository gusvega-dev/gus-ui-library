import React from 'react';

export type TextAs = 'p' | 'span' | 'div' | 'strong' | 'em' | 'small';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type TextVariant = 'default' | 'muted' | 'destructive' | 'success' | 'warning' | 'info';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextAs;
  size?: TextSize;
  variant?: TextVariant;
  weight?: TextWeight;
  truncate?: boolean;
}

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const variantClasses: Record<TextVariant, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  destructive: 'text-destructive',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-info',
};

const weightClasses: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Text: React.FC<TextProps> = ({
  as: Tag = 'p',
  size = 'base',
  variant = 'default',
  weight = 'normal',
  truncate = false,
  className = '',
  children,
  ...props
}) => {
  const classes = [
    sizeClasses[size],
    variantClasses[variant],
    weightClasses[weight],
    truncate ? 'truncate' : '',
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

export default Text;
