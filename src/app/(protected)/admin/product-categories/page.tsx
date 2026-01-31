'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiProductCategories } from '@/api/product-categories';
import Table, { TableColumn } from '@/components/ui/Table';
import ModalConfirm from '@/components/ui/ModalConfirm';
import { useToast } from '@/store/toast';
import Link from 'next/link';

export default function ProductCategoriesListPage() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const limit = 10;

  // Fetch categories
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['admin-product-categories', page, search],
    queryFn: async () => {
      return await apiProductCategories.getList({
        limit,
        offset: (page - 1) * limit,
        search: search || undefined,
      });
    },
  });

  // Delete mutation
  const { mutate: deleteCategory } = useMutation({
    mutationFn: (id: number) => apiProductCategories.deleteById(id),
    onMutate: (id) => setDeletingId(id),
    onSettled: () => {
      setDeletingId(null);
      setDeleteTarget(null);
    },
    onSuccess: (result) => {
      if ((result as { success?: boolean }).success) {
        queryClient.invalidateQueries({ queryKey: ['admin-product-categories'] });
        queryClient.invalidateQueries({ queryKey: ['product_categories'] });
        showToast('Đã xóa danh mục thành công', { variant: 'success', title: 'Thành công' });
      } else {
        const err = result as { message?: string; error?: string };
        showToast(err?.message || err?.error || 'Không thể xóa danh mục', {
          variant: 'error',
          title: 'Lỗi',
        });
      }
    },
  });

  const categories = categoriesData?.data || [];
  const totalItems = categoriesData?.count || 0;
  const totalPages = categoriesData?.totalPages || 1;

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteCategory(deleteTarget.id);
    }
  };

  // Define table columns
  const columns: TableColumn[] = [
    {
      key: 'image',
      label: 'Hình ảnh',
      width: 120,
      render: (value) => (
        <img
          src={value || 'https://via.placeholder.com/64'}
          alt=""
          className="h-16 w-16 object-cover rounded-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
          }}
        />
      ),
    },
    {
      key: 'name',
      label: 'Tên danh mục',
      width: 200,
      render: (value) => (
        <div className="text-sm font-medium text-gray-900 max-w-xs">
          {value}
        </div>
      ),
      className: 'max-w-xs whitespace-normal',
    },
    {
      key: 'slug',
      label: 'Slug',
      width: 200,
      render: (value) => (
        <span className="text-sm text-gray-600">{value || 'N/A'}</span>
      ),
    },
    {
      key: 'products',
      label: 'Số sản phẩm',
      width: 150,
      render: (value) => (
        <span className="text-sm font-medium text-gray-900">
          {Array.isArray(value) ? value.length : 0}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Thao tác',
      align: 'right',
      className: 'sticky right-0 top-0 bg-white z-10',
      width: 150,
      render: (_, row: any) => (
        <div className="flex justify-end space-x-2">
          <Link
            href={`/admin/product-categories/${row.id}`}
            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Xem chi tiết"
          >
            <i className="fas fa-eye"></i>
          </Link>
          <Link
            href={`/admin/product-categories/${row.id}/edit`}
            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
            title="Chỉnh sửa"
          >
            <i className="fas fa-edit"></i>
          </Link>
          <button
            type="button"
            onClick={() => handleDeleteClick(row.id, row.name)}
            disabled={deletingId === row.id}
            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Xóa"
          >
            {deletingId === row.id ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-trash"></i>
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Danh mục Sản phẩm</h1>
          <p className="text-gray-600 mt-1">Tổng cộng: {totalItems} danh mục</p>
        </div>
        <Link
          href="/admin/product-categories/create"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Thêm danh mục mới</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Tên danh mục..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <ModalConfirm
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa danh mục"
        message={
          deleteTarget ? (
            <>
              Bạn có chắc chắn muốn xóa danh mục{' '}
              <span className="font-semibold text-gray-900">&quot;{deleteTarget.name}&quot;</span>?
              Hành động này không thể hoàn tác.
            </>
          ) : (
            ''
          )
        }
        confirmText="Xóa"
        cancelText="Hủy"
        loading={!!deletingId}
        variant="danger"
      />

      {/* Categories Table */}
      <Table
        columns={columns}
        data={categories}
        loading={isLoading}
        emptyMessage="Không có danh mục nào"
        emptyIcon={<i className="fas fa-folder-open text-4xl text-gray-400 mb-4"></i>}
        pagination={{
          currentPage: page,
          totalPages,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}

