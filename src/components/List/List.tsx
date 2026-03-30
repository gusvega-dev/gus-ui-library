import React from 'react';
import { FadeIn, FadeInStagger } from '../FadeIn';

export interface ListProps {
  className?: string;
  children: React.ReactNode;
}

export interface ListItemProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({ className = '', children }) => {
  return (
    <FadeInStagger>
      <ul role="list" className={`text-base text-neutral-600 ${className}`.trim()}>
        {children}
      </ul>
    </FadeInStagger>
  );
};

export const ListItem: React.FC<ListItemProps> = ({ title, children }) => {
  return (
    <li className="group mt-10 first:mt-0">
      <FadeIn>
        <div className="border-l-2 border-neutral-200 pt-10 pl-6 group-first:pt-0 group-first:border-l-0">
          {title && (
            <strong className="font-semibold text-neutral-950">
              {typeof title === 'string' ? `${title}. ` : title}
            </strong>
          )}
          {children}
        </div>
      </FadeIn>
    </li>
  );
};

List.displayName = 'List';
ListItem.displayName = 'ListItem';
