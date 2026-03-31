import React from 'react';

interface NavItem { label: string; href?: string; submenu?: NavItem[] }
interface NavigationMenuProps { items: NavItem[] }

export function NavigationMenu({ items }: NavigationMenuProps) {
  return (
    <nav className="flex gap-1">
      {items.map((item) => (
        <div key={item.label} className="relative group">
          <button className="px-3 py-2 text-sm font-medium hover:bg-neutral-100 rounded">
            {item.label}
          </button>
          {item.submenu && (
            <div className="absolute left-0 mt-0 hidden group-hover:block bg-white border border-neutral-200 rounded shadow-lg">
              {item.submenu.map((sub) => (
                <a key={sub.label} href={sub.href || '#'} className="block px-3 py-2 text-sm hover:bg-neutral-50">
                  {sub.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
