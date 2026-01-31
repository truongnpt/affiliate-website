'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiProducts } from '@/api/products';
import Button from '@/components/ui/Button';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);
  if (!id) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-600 mb-4">Không tìm thấy sản phẩm</p>
        <Button onClick={() => router.back()}>
          <i className="fas fa-arrow-left"></i>
          <span>Quay lại</span>
        </Button>
      </div>
    );
  } 

  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => await apiProducts.getById(id),
  });

  const product = productData?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-600 mb-4">Không tìm thấy sản phẩm</p>
        <Button onClick={() => router.push('/dashboard/products')}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-900">Chi tiết Sản phẩm</h1>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/products/${id}/edit`)}
          >
            <i className="fas fa-edit mr-2"></i>
            Chỉnh sửa
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh sản phẩm</h2>
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin sản phẩm</h2>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Tên sản phẩm</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Mô tả</dt>
                <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {product.description || 'Chưa có mô tả'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Danh mục</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {product.product_categories?.name || 'N/A'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Link sản phẩm</dt>
                <dd className="mt-1">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {product.url}
                    <i className="fas fa-external-link-alt ml-2"></i>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin giá</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Giá gốc</dt>
                <dd className="mt-1 text-2xl font-bold text-gray-900">
                  {product.price.toLocaleString('vi-VN')}đ
                </dd>
              </div>
              {product.discount > 0 && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Giảm giá</dt>
                  <dd className="mt-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                      -{product.discount}%
                    </span>
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Đánh giá</dt>
                <dd className="mt-1 flex items-center">
                  <i className="fas fa-star text-yellow-400 mr-2"></i>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.rating || 0}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Đã bán</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">
                  {product.sales?.toLocaleString('vi-VN') || 0}
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
                onClick={() => window.open(product.url, '_blank')}
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Mở link sản phẩm
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/admin/products/${id}/edit`)}
              >
                <i className="fas fa-edit mr-2"></i>
                Chỉnh sửa sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

