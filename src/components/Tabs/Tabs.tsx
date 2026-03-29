import React, { createContext, useContext, useState } from 'react';

interface TabsContextValue {
  active: string;
  setActive: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue>({ active: '', setActive: () => {} });

export interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = '' }) => {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => (
  <div
    className={[
      'inline-flex items-center border-b border-neutral-200 w-full',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </div>
);

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
  const { active, setActive } = useContext(TabsContext);
  const isActive = active === value;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setActive(value)}
      className={[
        'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
        'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        isActive
          ? 'border-neutral-900 text-neutral-900'
          : 'border-transparent text-neutral-500 hover:text-neutral-700',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  );
};

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const { active } = useContext(TabsContext);
  if (active !== value) return null;
  return (
    <div className={['py-4', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
};

export default Tabs;
