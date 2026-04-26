'use client';

import React from 'react';
import { useIntersection } from '../../hooks/useIntersection';

export interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  /** Blur radius in px when hidden. Default: 8 */
  blur?: number;
  /** Y offset to animate from (px). Default: 8 */
  offset?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const BlurIn: React.FC<BlurInProps> = ({
  children,
  className = '',
  blur = 8,
  offset = 8,
  delay = 0,
  duration = 500,
  once = true,
}) => {
  const { ref, isVisible } = useIntersection({ once });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : `blur(${blur}px)`,
        transform: isVisible ? 'translateY(0)' : `translateY(${offset}px)`,
        transition: [
          `opacity ${duration}ms var(--gus-ease-out, ease)`,
          `filter ${duration}ms var(--gus-ease-out, ease)`,
          `transform ${duration}ms var(--gus-ease-out, ease)`,
        ].join(', '),
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, filter, transform',
      }}
    >
      {children}
    </div>
  );
};

export default BlurIn;
