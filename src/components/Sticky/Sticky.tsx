import React from 'react';

export interface StickyProps {
  children: React.ReactNode;
  top?: number | string;
  bottom?: number | string;
  zIndex?: number;
  className?: string;
}

export const Sticky: React.FC<StickyProps> = ({
  children,
  top,
  bottom,
  zIndex = 10,
  className = '',
}) => (
  <div
    className={['sticky', className].filter(Boolean).join(' ')}
    style={{
      top: top !== undefined ? top : bottom !== undefined ? undefined : 0,
      bottom: bottom !== undefined ? bottom : undefined,
      zIndex,
    }}
  >
    {children}
  </div>
);

export default Sticky;
