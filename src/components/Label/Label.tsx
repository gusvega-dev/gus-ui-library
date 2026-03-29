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
      invert ? 'text-white/80' : 'text-neutral-700',
      className,
    ].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
    {required && <span className="ml-0.5 text-neutral-400">*</span>}
  </label>
);

export default Label;
