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
        className="block text-sm font-medium text-neutral-700"
      >
        {label}
        {required && <span className="ml-0.5 text-neutral-400">*</span>}
      </label>
    )}
    {children}
    {error && (
      <p className="text-xs text-neutral-900 font-medium">{error}</p>
    )}
    {!error && hint && (
      <p className="text-xs text-neutral-400">{hint}</p>
    )}
  </div>
);

export default FormField;
