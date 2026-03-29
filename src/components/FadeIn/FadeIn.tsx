import React, { useEffect, useRef, useState, Children } from 'react';

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds before the animation starts */
  delay?: number;
  /** Duration in milliseconds */
  duration?: number;
  /** Y offset to animate from (px) */
  offset?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 500,
  offset = 16,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${offset}px)`,
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
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
}

export const FadeInStagger: React.FC<FadeInStaggerProps> = ({
  children,
  className = '',
  stagger = 100,
  delay = 0,
  duration = 500,
  offset = 16,
}) => (
  <div className={className}>
    {Children.map(children, (child, i) => (
      <FadeIn key={i} delay={delay + i * stagger} duration={duration} offset={offset}>
        {child}
      </FadeIn>
    ))}
  </div>
);

export default FadeIn;
