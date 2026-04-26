'use client';

import React from 'react';
import { useIntersection } from '../../hooks/useIntersection';

export interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  /** Starting scale (0–1). Default: 0.85 */
  from?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  className = '',
  from = 0.85,
  delay = 0,
  duration = 400,
  once = true,
}) => {
  const { ref, isVisible } = useIntersection({ once });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : `scale(${from})`,
        transition: `opacity ${duration}ms var(--gus-ease-out, ease), transform ${duration}ms var(--gus-ease-spring, cubic-bezier(0.34,1.56,0.64,1))`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default ScaleIn;
