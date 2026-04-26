import React from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarColor = 'dark' | 'medium' | 'light';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

const colorClasses: Record<AvatarColor, string> = {
  dark: 'bg-primary text-primary-foreground',
  medium: 'bg-muted-foreground text-background',
  light: 'bg-muted text-muted-foreground',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ initials, src, alt = '', size = 'md', color = 'dark', className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={[
        'relative inline-flex items-center justify-center rounded-full font-medium flex-shrink-0 select-none overflow-hidden',
        sizeClasses[size],
        colorClasses[color],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : (alt || initials)}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  )
);

Avatar.displayName = 'Avatar';

export default Avatar;
