import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ currentPage, totalPages, onPageChange, className = '' }, ref) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visible = pages.filter(p =>
      p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
    );

    const btnBase = 'px-3 py-2 border rounded text-sm transition-colors duration-normal focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1';

    return (
      <nav ref={ref} aria-label="Pagination" className={['flex items-center justify-center gap-1', className].filter(Boolean).join(' ')}>
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className={[btnBase, 'border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed'].join(' ')}
        >
          Previous
        </button>
        <div className="flex gap-1">
          {visible[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                aria-label="Go to page 1"
                className={[btnBase, 'border-border hover:bg-muted'].join(' ')}
              >
                1
              </button>
              {visible[0] > 2 && <span className="px-2 py-2 text-muted-foreground" aria-hidden="true">…</span>}
            </>
          )}
          {visible.map(page => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={[
                btnBase,
                page === currentPage
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:bg-muted',
              ].join(' ')}
            >
              {page}
            </button>
          ))}
          {visible[visible.length - 1] < totalPages && (
            <>
              {visible[visible.length - 1] < totalPages - 1 && (
                <span className="px-2 py-2 text-muted-foreground" aria-hidden="true">…</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                aria-label={`Go to page ${totalPages}`}
                className={[btnBase, 'border-border hover:bg-muted'].join(' ')}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className={[btnBase, 'border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed'].join(' ')}
        >
          Next
        </button>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
