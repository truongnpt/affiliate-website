'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiProducts } from '@/api/products';
import { apiProductCategories } from '@/api/product-categories';
import Table, { TableColumn } from '@/components/ui/Table';
import ModalConfirm from '@/components/ui/ModalConfirm';
import { useToast } from '@/store/toast';
import Link from 'next/link';

export default function ProductsListPage() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const limit = 10;

  // Fetch products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['admin-products', page, search, categoryFilter],
    queryFn: async () => {
      return await apiProducts.getList({
        limit,
        offset: (page - 1) * limit,
        search: search || undefined,
        categoryId: categoryFilter || undefined,
        sortBy: 'newest',
      });
    },
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => await apiProductCategories.getList(),
  });

  // Delete mutation
  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: number) => apiProducts.deleteById(id),
    onMutate: (id) => setDeletingId(id),
    onSettled: () => {
      setDeletingId(null);
      setDeleteTarget(null);
    },
    onSuccess: (result) => {
      if ((result as { success?: boolean }).success) {
        queryClient.invalidateQueries({ queryKey: ['admin-products'] });
        showToast('Đã xóa sản phẩm thành công', { variant: 'success', title: 'Thành công' });
      } else {
        const err = result as { message?: string; error?: string };
        showToast(err?.message || err?.error || 'Không thể xóa sản phẩm', {
          variant: 'error',
          title: 'Lỗi',
        });
      }
    },
  });

  const products = productsData?.data || [];
  const totalItems = productsData?.count || 0;
  const totalPages = productsData?.totalPages || 1;
  const categories = categoriesData?.data || [];

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id);
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
          src={value}
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
      label: 'Tên sản phẩm',
      width: 200,
      render: (value) => (
        <div className="text-sm font-medium text-gray-900 max-w-xs">
          {value}
        </div>
      ),
      className: 'max-w-xs whitespace-normal',
    },
    {
      key: 'product_categories',
      label: 'Danh mục',
      render: (value) => (
        <span className="text-sm text-gray-600">{value?.name || 'N/A'}</span>
      ),
      width: 150
    },
    {
      key: 'price',
      label: 'Giá',
      width: 150,
      render: (value) => (
        <span className="text-sm font-medium text-gray-900">
          {value?.toLocaleString('vi-VN')}đ
        </span>
      ),
    },
    {
      key: 'discount',
      label: 'Giảm giá',
      width: 150,
      render: (value) => (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          -{value || 0}%
        </span>
      ),
    },
    {
      key: 'rating',
      label: 'Đánh giá',
      width: 150,
      render: (value) => (
        <div className="flex items-center">
          <i className="fas fa-star text-yellow-400 mr-1"></i>
          <span className="text-sm text-gray-600">{value || 0}</span>
        </div>
      ),
    },
    {
      key: 'sales',
      label: 'Đã bán',
      width: 100,
      render: (value) => (
        <span className="text-sm text-gray-600">
          {value?.toLocaleString('vi-VN') || 0}
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
            href={`/admin/products/${row.id}`}
            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Xem chi tiết"
          >
            <i className="fas fa-eye"></i>
          </Link>
          <Link
            href={`/admin/products/${row.id}/edit`}
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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
          <p className="text-gray-600 mt-1">Tổng cộng: {totalItems} sản phẩm</p>
        </div>
        <Link
          href="/admin/products/create"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Thêm sản phẩm mới</span>
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
                placeholder="Tên sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <select
              value={categoryFilter || ''}
              onChange={(e) => {
                setCategoryFilter(e.target.value ? Number(e.target.value) : null);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <ModalConfirm
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa sản phẩm"
        message={
          deleteTarget ? (
            <>
              Bạn có chắc chắn muốn xóa sản phẩm{' '}
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

      {/* Products Table */}
      <Table
        columns={columns}
        data={products}
        loading={isLoading}
        emptyMessage="Không có sản phẩm nào"
        emptyIcon={<i className="fas fa-box-open text-4xl text-gray-400 mb-4"></i>}
        pagination={{
          currentPage: page,
          totalPages,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}

