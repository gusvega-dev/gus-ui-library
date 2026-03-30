import React from 'react';
import { Container } from '../Container';
import { FadeIn } from '../FadeIn';

export interface PageIntroProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  centered?: boolean;
}

export const PageIntro: React.FC<PageIntroProps> = ({
  eyebrow,
  title,
  children,
  centered = false,
}) => {
  return (
    <Container className={`mt-24 sm:mt-32 lg:mt-40 ${centered ? 'text-center' : ''}`.trim()}>
      <FadeIn>
        <h1>
          <span className="block font-display text-base font-semibold text-neutral-950">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={`mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl ${centered ? 'mx-auto' : ''}`.trim()}
          >
            {title}
          </span>
        </h1>
        <div
          className={`mt-6 max-w-3xl text-xl text-neutral-600 ${centered ? 'mx-auto' : ''}`.trim()}
        >
          {children}
        </div>
      </FadeIn>
    </Container>
  );
};

PageIntro.displayName = 'PageIntro';
