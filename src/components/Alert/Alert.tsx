import React from 'react';

export type AlertVariant = 'default' | 'outline' | 'filled';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<AlertVariant, string> = {
  default: 'bg-neutral-50 border border-neutral-200 text-neutral-700',
  outline: 'bg-white border border-neutral-900 text-neutral-900',
  filled: 'bg-neutral-900 border border-neutral-900 text-white',
};

const titleClasses: Record<AlertVariant, string> = {
  default: 'text-neutral-900',
  outline: 'text-neutral-900',
  filled: 'text-white',
};

const bodyClasses: Record<AlertVariant, string> = {
  default: 'text-neutral-600',
  outline: 'text-neutral-700',
  filled: 'text-neutral-300',
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  title,
  children,
  className = '',
}) => (
  <div
    className={[
      'rounded-lg px-4 py-3',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    role="alert"
  >
    {title && (
      <p className={['text-sm font-semibold mb-1', titleClasses[variant]].join(' ')}>
        {title}
      </p>
    )}
    <p className={['text-sm leading-relaxed', bodyClasses[variant]].join(' ')}>
      {children}
    </p>
  </div>
);

export default Alert;
