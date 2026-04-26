'use client';

import React, { useState } from 'react';

export interface SidebarNavChild {
  label: string;
  href: string;
}

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  children?: SidebarNavChild[];
  badge?: string | number;
}

export interface SidebarProps {
  title?: string;
  titleIcon?: React.ComponentType<any>;
  navItems: SidebarNavItem[];
  defaultExpandedSections?: string[];
  width?: string;
  className?: string;
  currentPath?: string;
  chevronIcon?: React.ComponentType<any>;
  linkComponent?: React.ComponentType<any>;
  onNavigate?: (href: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  title,
  titleIcon: TitleIcon,
  navItems,
  defaultExpandedSections = [],
  width = 'w-64',
  className = '',
  currentPath = '/',
  chevronIcon: ChevronIcon,
  linkComponent: LinkComponent,
  onNavigate,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    defaultExpandedSections.reduce(
      (acc, section) => {
        acc[section] = true;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleNavClick = (href: string, hasChildren: boolean) => {
    if (!hasChildren) {
      if (onNavigate) {
        onNavigate(href);
      } else {
        window.location.href = href;
      }
    }
  };

  const renderNavItemButton = (item: SidebarNavItem) => {
    const isExpanded = expandedSections[item.label];
    const hasChildren = item.children && item.children.length > 0;
    const isActive = currentPath === item.href;

    return (
      <button
        onClick={() => {
          if (hasChildren) {
            toggleSection(item.label);
          } else {
            handleNavClick(item.href, !!hasChildren);
          }
        }}
        className={`w-full flex items-center justify-between px-5 py-3 rounded-xl transition-all duration-200 group relative text-left ${
          isActive && !hasChildren
            ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-lg shadow-slate-700/20'
            : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="text-sm font-semibold">{item.label}</span>
        <div className="flex items-center gap-2">
          {item.badge && (
            <span className="text-xs font-bold bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full px-2.5 py-1 shadow-lg shadow-red-600/30">
              {item.badge}
            </span>
          )}
          {hasChildren && ChevronIcon && (
            <ChevronIcon
              className={`w-4 h-4 transition-transform duration-300 text-slate-400 group-hover:text-slate-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      </button>
    );
  };

  const renderNavChild = (child: SidebarNavChild) => {
    const childIsActive = currentPath === child.href;
    const childClasses = `flex items-center px-5 py-2.5 rounded-lg transition-all duration-200 text-xs font-medium ${
      childIsActive
        ? 'bg-slate-700/30 text-slate-100 border-l-2 border-slate-400'
        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-l-2 border-transparent hover:border-slate-400/50'
    }`;

    if (LinkComponent) {
      return (
        <LinkComponent key={child.href} href={child.href} className={childClasses}>
          {child.label}
        </LinkComponent>
      );
    }

    return (
      <a
        key={child.href}
        href={child.href}
        className={childClasses}
        onClick={(e) => {
          if (onNavigate) {
            e.preventDefault();
            onNavigate(child.href);
          }
        }}
      >
        {child.label}
      </a>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 ${width} bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 border-r border-white/10 z-30 overflow-y-auto backdrop-blur-xl ${className}`}
    >
      {/* Sidebar Header */}
      {title && (
        <div className="h-16 px-6 border-b border-white/5 bg-gradient-to-r from-slate-900 via-slate-800 to-transparent flex items-center gap-3 flex-shrink-0 sticky top-0 backdrop-blur-sm">
          {TitleIcon && <TitleIcon className="w-6 h-6 text-slate-300" />}
          <span className="font-bold text-lg text-slate-100">{title}</span>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="p-5 space-y-3">
        {navItems.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedSections[item.label];

          return (
            <div key={item.label}>
              {renderNavItemButton(item)}

              {/* Collapsible Children */}
              {hasChildren && isExpanded && (
                <div className="mt-3 ml-4 space-y-2 pl-4 border-l border-slate-700/50">
                  {item.children?.map((child) => renderNavChild(child))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
