'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface TypeWriterProps {
  /** Single string or array of strings to cycle through */
  words: string | string[];
  /** Typing speed in ms per character. Default: 60 */
  speed?: number;
  /** Deleting speed in ms per character. Default: 40 */
  deleteSpeed?: number;
  /** Pause duration after fully typed (ms). Default: 2000 */
  pauseDuration?: number;
  /** Delay before starting (ms). Default: 0 */
  delay?: number;
  /** Show blinking cursor. Default: true */
  cursor?: boolean;
  /** Loop through words array. Default: true */
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  words,
  speed = 60,
  deleteSpeed = 40,
  pauseDuration = 2000,
  delay = 0,
  cursor = true,
  loop = true,
  className = '',
  cursorClassName = '',
}) => {
  const wordList = Array.isArray(words) ? words : [words];
  const isMultiWord = wordList.length > 1;

  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cursor blink
  useEffect(() => {
    if (!cursor) return;
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, [cursor]);

  // Typing logic
  useEffect(() => {
    const currentWord = wordList[wordIndex];

    const schedule = (fn: () => void, ms: number) => {
      timeoutRef.current = setTimeout(fn, ms);
    };

    if (phase === 'typing') {
      if (displayed.length < currentWord.length) {
        schedule(() => setDisplayed(currentWord.slice(0, displayed.length + 1)), speed);
      } else {
        if (isMultiWord || loop) {
          schedule(() => setPhase('pausing'), pauseDuration);
        }
      }
    } else if (phase === 'pausing') {
      if (isMultiWord) {
        schedule(() => setPhase('deleting'), 0);
      } else {
        schedule(() => setPhase('deleting'), 0);
      }
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        schedule(() => setDisplayed(d => d.slice(0, -1)), deleteSpeed);
      } else {
        const nextIndex = (wordIndex + 1) % wordList.length;
        if (!loop && nextIndex === 0) return;
        schedule(() => {
          setWordIndex(nextIndex);
          setPhase('typing');
        }, speed);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, phase, wordIndex, speed, deleteSpeed, pauseDuration, loop, isMultiWord, wordList]);

  // Initial delay
  const [started, setStarted] = useState(delay === 0);
  useEffect(() => {
    if (delay === 0) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!started) return null;

  return (
    <span className={className}>
      {displayed}
      {cursor && (
        <span
          className={['inline-block w-0.5 ml-0.5 align-middle bg-current', cursorClassName]
            .filter(Boolean)
            .join(' ')}
          style={{
            height: '1.1em',
            opacity: cursorVisible ? 1 : 0,
            transition: 'opacity 100ms',
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
};

export default TypeWriter;
