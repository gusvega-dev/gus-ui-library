'use client';

import React from 'react';
import { useIntersection } from '../../hooks/useIntersection';

export type SlideInDirection = 'top' | 'bottom' | 'left' | 'right';

export interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  from?: SlideInDirection;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const getHiddenTransform = (from: SlideInDirection, distance: number): string => {
  switch (from) {
    case 'top':    return `translateY(-${distance}px)`;
    case 'bottom': return `translateY(${distance}px)`;
    case 'left':   return `translateX(-${distance}px)`;
    case 'right':  return `translateX(${distance}px)`;
  }
};

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  className = '',
  from = 'bottom',
  distance = 24,
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
        transform: isVisible ? 'translate(0)' : getHiddenTransform(from, distance),
        transition: `opacity ${duration}ms var(--gus-ease-out, ease), transform ${duration}ms var(--gus-ease-out, ease)`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default SlideIn;
