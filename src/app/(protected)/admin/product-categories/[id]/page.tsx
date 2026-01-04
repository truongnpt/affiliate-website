'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiProductCategories } from '@/api/product-categories';
import Button from '@/components/ui/Button';

export default function ProductCategoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);
  if (!id) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-600 mb-4">Không tìm thấy danh mục</p>
        <Button onClick={() => router.back()}>
          <i className="fas fa-arrow-left"></i>
          <span>Quay lại</span>
        </Button>
      </div>
    );
  } 

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ['product-category', id],
    queryFn: async () => await apiProductCategories.getById(id),
  });

  const category = categoryData?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5183]"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-600 mb-4">Không tìm thấy danh mục</p>
        <Button onClick={() => router.push('/admin/product-categories')}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const products = Array.isArray(category.products) ? category.products : [];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-2 flex items-center space-x-2"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Quay lại</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Chi tiết Danh mục</h1>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/product-categories/${id}/edit`)}
          >
            <i className="fas fa-edit mr-2"></i>
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Image */}
          {category.image && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh danh mục</h2>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Category Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin danh mục</h2>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Tên danh mục</dt>
                <dd className="mt-1 text-sm text-gray-900">{category.name}</dd>
              </div>
              {category.slug && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Slug</dt>
                  <dd className="mt-1 text-sm text-gray-900">{category.slug}</dd>
                </div>
              )}
              {category.description && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                    {category.description}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Số sản phẩm</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {products.length}
                </dd>
              </div>
            </dl>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác</h2>
            <div className="space-y-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => router.push(`/admin/product-categories/${id}/edit`)}
              >
                <i className="fas fa-edit mr-2"></i>
                Chỉnh sửa danh mục
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/admin/product-categories')}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Quay lại danh sách
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      {products.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sản phẩm trong danh mục</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product: any) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {product.price?.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {products.length > 6 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Và {products.length - 6} sản phẩm khác...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

