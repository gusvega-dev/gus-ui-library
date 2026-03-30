import React from 'react';
import { Container } from '../Container';
import { FadeIn } from '../FadeIn';

export interface SectionIntroProps {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  smaller?: boolean;
  invert?: boolean;
  className?: string;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({
  eyebrow,
  title,
  children,
  smaller = false,
  invert = false,
  className = '',
}) => {
  return (
    <Container className={className}>
      <FadeIn className="max-w-2xl lg:w-full lg:max-w-full">
        <h2>
          {eyebrow && (
            <>
              <span
                className={`mb-6 block font-display text-base font-semibold ${
                  invert ? 'text-white' : 'text-neutral-950'
                }`}
              >
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={`block font-display tracking-tight [text-wrap:balance] ${
              smaller
                ? 'text-2xl font-semibold'
                : 'text-4xl font-medium sm:text-5xl'
            } ${invert ? 'text-white' : 'text-neutral-950'}`}
          >
            {title}
          </span>
        </h2>
        {children && <div className="mt-6">{children}</div>}
      </FadeIn>
    </Container>
  );
};

SectionIntro.displayName = 'SectionIntro';
