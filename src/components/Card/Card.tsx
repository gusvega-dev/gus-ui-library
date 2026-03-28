import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={['bg-white border border-neutral-200 rounded-xl', className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={['px-6 py-4 border-b border-neutral-100', className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={['px-6 py-5', className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={['px-6 py-4 border-t border-neutral-100', className].filter(Boolean).join(' ')}>
    {children}
  </div>
);

export default Card;
