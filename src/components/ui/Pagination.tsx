'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Items info */}
      {totalItems !== undefined && itemsPerPage && (
        <div className="text-sm text-gray-600">
          Hiển thị{' '}
          <span className="font-semibold text-gray-900">
            {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
          </span>
          {' - '}
          <span className="font-semibold text-gray-900">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>
          {' / '}
          <span className="font-semibold text-gray-900">{totalItems}</span>{' '}
          sản phẩm
        </div>
      )}

      {/* Pagination buttons */}
      <nav className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Trang trước"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? 'bg-[#ff5183] text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-label={`Trang ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Trang sau"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;

