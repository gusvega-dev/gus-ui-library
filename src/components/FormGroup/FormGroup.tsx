import React from 'react';

interface FormGroupProps {
  legend: string;
  children: React.ReactNode;
  description?: string;
}

export function FormGroup({ legend, children, description }: FormGroupProps) {
  return (
    <fieldset className="border border-neutral-200 rounded-lg p-4">
      <legend className="font-semibold text-neutral-900 mb-2">{legend}</legend>
      {description && <p className="text-xs text-neutral-500 mb-3">{description}</p>}
      <div className="space-y-3">{children}</div>
    </fieldset>
  );
}
