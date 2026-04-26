import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  invert?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  className = '',
  required,
  invert = false,
  children,
  ...props
}) => (
  <label
    className={[
      'block text-sm font-medium',
      invert ? 'text-primary-foreground/80' : 'text-foreground',
      className,
    ].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
    {required && <span className="ml-0.5 text-muted-foreground">*</span>}
  </label>
);

export default Label;
