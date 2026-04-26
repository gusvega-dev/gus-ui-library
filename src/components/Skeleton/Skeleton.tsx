import React from 'react';

export type SkeletonVariant = 'rectangular' | 'circular' | 'text';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'rectangular', width, height, className = '', style, ...props }, ref) => {
    const shapeClasses =
      variant === 'circular'
        ? 'rounded-full'
        : variant === 'text'
        ? 'rounded h-4 w-full'
        : 'rounded-md';

    return (
      <div
        ref={ref}
        className={['animate-pulse bg-muted', shapeClasses, className].filter(Boolean).join(' ')}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
