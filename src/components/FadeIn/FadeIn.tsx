'use client';

import React, { Children } from 'react';
import { useIntersection } from '../../hooks/useIntersection';

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds before the animation starts */
  delay?: number;
  /** Duration in milliseconds */
  duration?: number;
  /** Y offset to animate from (px) */
  offset?: number;
  /** Only animate once (default: true) */
  once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 500,
  offset = 16,
  once = true,
}) => {
  const { ref, isVisible } = useIntersection({ once });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${offset}px)`,
        transition: `opacity ${duration}ms var(--gus-ease-out, ease), transform ${duration}ms var(--gus-ease-out, ease)`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child in ms */
  stagger?: number;
  /** Base delay before first child in ms */
  delay?: number;
  duration?: number;
  offset?: number;
  once?: boolean;
}

export const FadeInStagger: React.FC<FadeInStaggerProps> = ({
  children,
  className = '',
  stagger = 100,
  delay = 0,
  duration = 500,
  offset = 16,
  once = true,
}) => (
  <div className={className}>
    {Children.map(children, (child, i) => (
      <FadeIn key={i} delay={delay + i * stagger} duration={duration} offset={offset} once={once}>
        {child}
      </FadeIn>
    ))}
  </div>
);

export default FadeIn;
