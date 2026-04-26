'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useIntersection } from '../../hooks/useIntersection';

export interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
  once?: boolean;
}

const formatNumber = (value: number, decimals: number, separator: string): string => {
  const fixed = value.toFixed(decimals);
  if (!separator) return fixed;

  const [integer, decimal] = fixed.split('.');
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return decimal !== undefined ? `${formatted}.${decimal}` : formatted;
};

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 1500,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
  once = true,
}) => {
  const { ref, isVisible } = useIntersection({ once });
  const [value, setValue] = useState(from);
  const animationRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isVisible || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now() + delay;

    const animate = (now: number) => {
      if (now < startTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(from + (to - from) * eased);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setValue(to);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, from, to, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(value, decimals, separator)}
      {suffix}
    </span>
  );
};

export default CountUp;
