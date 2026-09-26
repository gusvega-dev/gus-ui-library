'use client';

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

type FieldControlProps = {
  id?: string;
  required?: boolean;
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
  'aria-describedby'?: string;
};

export const FormField: React.FC<FormFieldProps> = ({
  label, required, error, hint, htmlFor, children, className = '',
}) => {
  const generatedId = React.useId();
  const control = React.isValidElement<FieldControlProps>(children) && children.type !== React.Fragment
    ? children : null;
  const controlId = htmlFor ?? control?.props.id ?? generatedId;
  const messageId = `${controlId}-${error ? 'error' : 'hint'}`;
  const describedBy = [control?.props['aria-describedby'], (error || hint) ? messageId : undefined]
    .filter(Boolean).join(' ') || undefined;

  return (
    <div className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={controlId} className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-0.5 text-muted-foreground" aria-hidden="true">*</span>}
        </label>
      )}
      {control ? React.cloneElement(control, {
        id: controlId,
        required: required ?? control.props.required,
        ...(error ? { 'aria-invalid': true as const } : {}),
        'aria-describedby': describedBy,
      }) : children}
      {error && (
        <p id={messageId} className="text-xs text-destructive font-medium" role="alert">{error}</p>
      )}
      {!error && hint && (
        <p id={messageId} className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
};

export default FormField;
