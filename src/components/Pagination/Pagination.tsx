import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(p =>
    p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
  );

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <div className="flex gap-1">
        {visible[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-2 border border-neutral-200 rounded hover:bg-neutral-50"
            >
              1
            </button>
            {visible[0] > 2 && <span className="px-2 py-2 text-neutral-400">...</span>}
          </>
        )}
        {visible.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 border rounded ${
              page === currentPage
                ? 'border-neutral-900 bg-neutral-900 text-white'
                : 'border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {page}
          </button>
        ))}
        {visible[visible.length - 1] < totalPages && (
          <>
            {visible[visible.length - 1] < totalPages - 1 && <span className="px-2 py-2 text-neutral-400">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-2 border border-neutral-200 rounded hover:bg-neutral-50"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-neutral-200 rounded hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
