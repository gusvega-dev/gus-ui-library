import React from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={['flex flex-col items-center justify-center py-12 text-center', className].filter(Boolean).join(' ')}
      {...props}
    >
      {icon && <div className="text-4xl mb-4 text-muted-foreground" aria-hidden="true">{icon}</div>}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
);

EmptyState.displayName = 'EmptyState';

export default EmptyState;
