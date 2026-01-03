'use client';

import React from 'react';
import Button from './Button';

export interface TableColumn<T = any> {
  key: string;
  label: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  width?: string | number; // e.g., '200px', '20%', 200
}

interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  // Pagination props
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showPageInfo?: boolean;
  };
  className?: string;
}

export default function Table<T = any>({
  columns,
  data,
  loading = false,
  emptyMessage = 'Không có dữ liệu',
  emptyIcon,
  pagination,
  className = '',
}: TableProps<T>) {
  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
        <div className="p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5183]"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
        <div className="p-12 text-center">
          {emptyIcon || <i className="fas fa-inbox text-4xl text-gray-400 mb-4"></i>}
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Calculate total width if columns have fixed widths
  const hasFixedWidths = columns.some(col => col.width);
  const calculateTableWidth = () => {
    if (!hasFixedWidths) return {};
    
    const totalWidth = columns.reduce((sum, col) => {
      if (col.width) {
        if (typeof col.width === 'number') {
          return sum + col.width;
        } else if (typeof col.width === 'string' && col.width.endsWith('px')) {
          return sum + parseInt(col.width);
        }
      } else {
        // Default width for columns without width specified
        return sum + 100;
      }
      return sum;
    }, 0);
    
    // If all columns have fixed widths, use the total
    const allHaveWidths = columns.every(col => col.width);
    if (allHaveWidths && totalWidth > 0) {
      return { minWidth: `${totalWidth}px` };
    }
    
    return {};
  };
  
  return (
    <div className={`relative w-full overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200 ${className}`}>
      <table 
        className={`w-full text-sm text-left divide-y divide-gray-200 ${hasFixedWidths ? ' table-fixed' : 'table-auto overflow-x-auto'}`}
        style={calculateTableWidth()}
      >
          <thead className="bg-gray-50">
            <tr className="relative">
              {columns.map((column) => {
                  const widthStyle = column.width
                    ? {
                        width:
                          typeof column.width === 'number'
                            ? `${column.width}px`
                            : column.width,
                        minWidth:
                          typeof column.width === 'number'
                            ? `${column.width}px`
                            : column.width,
                        maxWidth:
                          typeof column.width === 'number'
                            ? `${column.width}px`
                            : column.width,
                      }
                    : {};

                return (
                  <th
                    key={column.key}
                    style={widthStyle}
                    className={`px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${getAlignClass(
                      column.align
                    )} ${column.className || ''}`}
                  >
                    {column.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors relative" >
                {columns.map((column) => {
                  const value = (row as any)[column.key];
                  const content = column.render
                    ? column.render(value, row, rowIndex)
                    : value ?? '—';

                  // Check if column should allow text wrapping
                  const shouldWrap = column.className?.includes('whitespace-normal') || 
                                   column.className?.includes('break-words') ||
                                   column.className?.includes('max-w-');

                  const widthStyle = column.width
                    ? {
                        width:
                          typeof column.width === 'number'
                            ? `${column.width}px`
                            : column.width,
                        minWidth:
                          typeof column.width === 'number'
                            ? `${column.width}px`
                            : column.width,
                        maxWidth:
                          typeof column.width === 'number'
                            ? `${column.width}px`
                            : column.width,
                      }
                    : {};

                  return (
                    <td
                      key={column.key}
                      style={widthStyle}
                      className={`px-4 sm:px-6 py-4 ${
                        shouldWrap ? '' : 'whitespace-nowrap'
                      } ${getAlignClass(column.align)} ${
                        column.className || ''
                      }`}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {pagination.showPageInfo !== false && (
              <div className="text-sm text-gray-700">
                Trang {pagination.currentPage} / {pagination.totalPages}
              </div>
            )}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
                disabled={pagination.currentPage === 1}
              >
                <i className="fas fa-chevron-left mr-2"></i>
                Trước
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))
                }
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Sau
                <i className="fas fa-chevron-right ml-2"></i>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

