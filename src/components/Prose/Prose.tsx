import React from 'react';

export type ProseSize = 'sm' | 'base' | 'lg';

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ProseSize;
}

const sizeClasses: Record<ProseSize, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
};

export const Prose: React.FC<ProseProps> = ({ size = 'base', className = '', children, ...props }) => {
  const classes = [
    // Base text
    'text-foreground',
    sizeClasses[size],
    // Headings
    '[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-foreground [&_h1]:mt-8 [&_h1]:mb-4',
    '[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-4',
    '[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-3',
    '[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-foreground [&_h4]:mt-6 [&_h4]:mb-2',
    '[&_h5]:text-lg [&_h5]:font-medium [&_h5]:text-foreground [&_h5]:mt-4 [&_h5]:mb-2',
    '[&_h6]:text-base [&_h6]:font-medium [&_h6]:text-muted-foreground [&_h6]:mt-4 [&_h6]:mb-2',
    // Paragraphs
    '[&_p]:text-foreground [&_p]:leading-relaxed [&_p]:mb-4',
    // Links
    '[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-muted-foreground [&_a]:transition-colors',
    // Lists
    '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1',
    '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1',
    '[&_li]:text-foreground',
    // Blockquote
    '[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-4',
    // Inline code
    '[&_code]:bg-muted [&_code]:text-foreground [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono',
    // Code blocks
    '[&_pre]:bg-neutral-950 [&_pre]:text-neutral-200 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4',
    '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit',
    // HR
    '[&_hr]:border-border [&_hr]:my-8',
    // Strong / em
    '[&_strong]:font-semibold [&_strong]:text-foreground',
    '[&_em]:italic',
    // Tables
    '[&_table]:w-full [&_table]:border-collapse [&_table]:my-4',
    '[&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-foreground [&_th]:border-b [&_th]:border-border [&_th]:pb-2',
    '[&_td]:text-sm [&_td]:text-foreground [&_td]:border-b [&_td]:border-border [&_td]:py-2',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Prose;
