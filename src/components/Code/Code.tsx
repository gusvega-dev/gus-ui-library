import React from 'react';

export interface CodeProps {
  block?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Code: React.FC<CodeProps> = ({ block = false, children, className = '' }) => {
  if (block) {
    return (
      <pre
        className={[
          'w-full rounded-lg bg-neutral-950 text-neutral-200 px-4 py-4 text-xs font-mono overflow-x-auto',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <code>{children}</code>
      </pre>
    );
  }

  return (
    <code
      className={[
        'inline-flex items-center rounded bg-neutral-100 text-neutral-800 px-1.5 py-0.5 text-xs font-mono',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </code>
  );
};

export interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export const Kbd: React.FC<KbdProps> = ({ children, className = '' }) => (
  <kbd
    className={[
      'inline-flex items-center justify-center rounded border border-neutral-200 bg-neutral-50',
      'px-1.5 py-0.5 text-xs font-mono text-neutral-600 shadow-sm',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </kbd>
);

export default Code;
