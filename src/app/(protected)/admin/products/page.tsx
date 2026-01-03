'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiProducts } from '@/api/products';
import { apiProductCategories } from '@/api/product-categories';
import Button from '@/components/ui/Button';
import Table, { TableColumn } from '@/components/ui/Table';

export default function ProductsListPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
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
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => apiProducts.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  const products = productsData?.data || [];
  const totalItems = productsData?.count || 0;
  const totalPages = productsData?.totalPages || 1;
  const categories = categoriesData?.data || [];

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) {
      deleteProduct(id);
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
          <button
            onClick={() => router.push(`/dashboard/products/${row.id}`)}
            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Xem chi tiết"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button
            onClick={() => router.push(`/dashboard/products/${row.id}/edit`)}
            className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
            title="Chỉnh sửa"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            onClick={() => handleDelete(row.id, row.name)}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Xóa"
          >
            <i className="fas fa-trash"></i>
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
        <Button
          onClick={() => router.push('/dashboard/products/create')}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Thêm sản phẩm mới</span>
        </Button>
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
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

