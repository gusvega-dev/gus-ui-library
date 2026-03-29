import React from 'react';

export interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ children, className = '' }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex items-center flex-wrap gap-1">
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <li aria-hidden="true" className="text-neutral-300 select-none text-sm">/</li>
          )}
          <li>{child}</li>
        </React.Fragment>
      ))}
    </ol>
  </nav>
);

export interface BreadcrumbItemProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  children,
  className = '',
}) => {
  const base = 'text-sm transition-colors';
  if (href) {
    return (
      <a
        href={href}
        className={[base, 'text-neutral-500 hover:text-neutral-900', className]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </a>
    );
  }
  return (
    <span
      className={[base, 'text-neutral-900 font-medium', className]
        .filter(Boolean)
        .join(' ')}
      aria-current="page"
    >
      {children}
    </span>
  );
};

export default Breadcrumb;
