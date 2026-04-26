import React from 'react';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  error,
  hint,
  htmlFor,
  children,
  className = '',
}) => (
  <div className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
    {label && (
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-0.5 text-muted-foreground" aria-hidden="true">*</span>}
      </label>
    )}
    {children}
    {error && (
      <p className="text-xs text-destructive font-medium" role="alert">{error}</p>
    )}
    {!error && hint && (
      <p className="text-xs text-muted-foreground">{hint}</p>
    )}
  </div>
);

export default FormField;
