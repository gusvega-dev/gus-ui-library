'use client';

import React from 'react';

interface DataGridProps {
  columns: { key: string; label: string }[];
  rows: Record<string, any>[];
  sortable?: boolean;
}

export function DataGrid({ columns, rows, sortable = true }: DataGridProps) {
  const [sortKey, setSortKey] = React.useState<string>();
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = sortKey ? [...rows].sort((a, b) => {
    const aVal = a[sortKey]; const bVal = b[sortKey];
    return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  }) : rows;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-neutral-200">
            {columns.map(col => (
              <th key={col.key} className="px-4 py-2 text-left text-sm font-semibold text-neutral-900">
                {sortable ? <button onClick={() => handleSort(col.key)} className="hover:text-neutral-600">{col.label} {sortKey === col.key && (sortDir === 'asc' ? '↑' : '↓')}</button> : col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
              {columns.map(col => <td key={col.key} className="px-4 py-2 text-sm text-neutral-600">{row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
