'use client';

import React, { createContext, useContext, useId, useState } from 'react';

interface TabsContextValue {
  active: string;
  setActive: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue>({ active: '', setActive: () => {}, baseId: '' });

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, value, onValueChange, children, className = '' }) => {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;
  const setActive = (v: string) => { setInternal(v); onValueChange?.(v); };
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ active, setActive, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '', ...props }) => (
  <div
    role="tablist"
    className={[
      'inline-flex items-center border-b border-border w-full',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </div>
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  disabled = false,
  className = '',
}) => {
  const { active, setActive, baseId } = useContext(TabsContext);
  const isActive = active === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActive(value)}
      className={[
        'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
        'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        isActive
          ? 'border-primary text-foreground'
          : 'border-transparent text-muted-foreground hover:text-foreground',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
};
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const { active, baseId } = useContext(TabsContext);
  if (active !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={['py-4 focus:outline-none', className].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
};
TabsContent.displayName = 'TabsContent';

export default Tabs;
