import React from 'react';

export type ScrollDirection = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps {
  children: React.ReactNode;
  height?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  maxWidth?: number | string;
  direction?: ScrollDirection;
  className?: string;
}

const overflowClasses: Record<ScrollDirection, string> = {
  vertical:   'overflow-x-hidden overflow-y-auto',
  horizontal: 'overflow-y-hidden overflow-x-auto',
  both:       'overflow-auto',
};

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  height,
  maxHeight,
  width,
  maxWidth,
  direction = 'vertical',
  className = '',
}) => {
  const style: React.CSSProperties = {
    ...(height !== undefined && { height }),
    ...(maxHeight !== undefined && { maxHeight }),
    ...(width !== undefined && { width }),
    ...(maxWidth !== undefined && { maxWidth }),
  };

  return (
    <div
      className={[
        overflowClasses[direction],
        // Custom scrollbar styling via Tailwind v3 scrollbar utilities + CSS
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        ...style,
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgb(var(--gus-color-border, 229 229 229)) transparent',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
