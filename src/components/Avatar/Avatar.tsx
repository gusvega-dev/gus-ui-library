import React from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarColor = 'dark' | 'medium' | 'light';

export interface AvatarProps {
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
  dark: 'bg-neutral-900 text-white',
  medium: 'bg-neutral-500 text-white',
  light: 'bg-neutral-200 text-neutral-700',
};

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  src,
  alt = '',
  size = 'md',
  color = 'dark',
  className = '',
}) => (
  <div
    className={[
      'relative inline-flex items-center justify-center rounded-full font-medium flex-shrink-0 select-none',
      sizeClasses[size],
      colorClasses[color],
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {src ? (
      <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" />
    ) : (
      <span>{initials}</span>
    )}
  </div>
);

export default Avatar;
