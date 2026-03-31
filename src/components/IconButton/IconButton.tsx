import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function IconButton({ icon, size = 'md', variant = 'primary', ...props }: IconButtonProps) {
  const sizeClass = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' }[size];
  const variantClass = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
    ghost: 'hover:bg-neutral-100'
  }[variant];
  return (
    <button className={`flex items-center justify-center rounded-lg ${sizeClass} ${variantClass}`} {...props}>
      {icon}
    </button>
  );
}
