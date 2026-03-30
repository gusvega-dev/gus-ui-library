import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The HTML element or component to render as */
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = 'div', className = '', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`mx-auto max-w-7xl px-6 lg:px-8 ${className}`.trim()}
        {...props}
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
      </Component>
    );
  }
);

Container.displayName = 'Container';
