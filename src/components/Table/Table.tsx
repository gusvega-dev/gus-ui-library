import React from 'react';

export interface TableProps { children: React.ReactNode; className?: string; }

export const Table: React.FC<TableProps> = ({ children, className = '' }) => (
  <div className={['w-full overflow-auto rounded-xl border border-neutral-200', className].filter(Boolean).join(' ')}>
    <table className="w-full text-sm">{children}</table>
  </div>
);

export const TableHeader: React.FC<TableProps> = ({ children, className = '' }) => (
  <thead className={['bg-neutral-50 border-b border-neutral-200', className].filter(Boolean).join(' ')}>
    {children}
  </thead>
);

export const TableBody: React.FC<TableProps> = ({ children, className = '' }) => (
  <tbody className={['divide-y divide-neutral-100', className].filter(Boolean).join(' ')}>
    {children}
  </tbody>
);

export const TableRow: React.FC<TableProps> = ({ children, className = '' }) => (
  <tr className={['hover:bg-neutral-50 transition-colors', className].filter(Boolean).join(' ')}>
    {children}
  </tr>
);

export const TableHead: React.FC<TableProps> = ({ children, className = '' }) => (
  <th
    className={[
      'px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </th>
);

export const TableCell: React.FC<TableProps> = ({ children, className = '' }) => (
  <td
    className={[
      'px-4 py-3 text-sm text-neutral-700',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </td>
);

export default Table;
