'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiProducts } from '@/api/products';
import { apiProductCategories } from '@/api/product-categories';
import Button from '@/components/ui/Button';

export default function CreateProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '0',
    category_id: '',
    image: '',
    url: '',
    rating: '0',
    sales: '0',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => await apiProductCategories.getList(),
  });

  // Create mutation
  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: (product: any) => apiProducts.create(product),
    onSuccess: (data) => {
      if (data.error) {
        setErrors({ submit: data.error });
      } else {
        router.push('/dashboard/products');
      }
    },
    onError: (error: any) => {
      setErrors({ submit: error.message || 'Có lỗi xảy ra' });
    },
  });

  const categories = categoriesData?.data || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Giá phải lớn hơn 0';
    }
    if (!formData.category_id) newErrors.category_id = 'Danh mục là bắt buộc';
    if (!formData.image.trim()) newErrors.image = 'Hình ảnh là bắt buộc';
    if (!formData.url.trim()) newErrors.url = 'Link TikTok Shop là bắt buộc';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createProduct({
      name: formData.name.trim(),
      price: Number(formData.price),
      discount: Number(formData.discount) || 0,
      category_id: Number(formData.category_id),
      image: formData.image.trim(),
      url: formData.url.trim(),
      rating: Number(formData.rating) || 0,
      sales: Number(formData.sales) || 0,
      description: formData.description.trim() || undefined,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push('/dashboard/products')}
          className="text-gray-600 hover:text-gray-900 mb-2 flex items-center space-x-2"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Quay lại</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Thêm sản phẩm mới</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ bản</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập tên sản phẩm"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                    placeholder="Nhập mô tả sản phẩm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link TikTok Shop <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => handleChange('url', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent ${
                      errors.url ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://..."
                  />
                  {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL hình ảnh <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://..."
                />
                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Giá và Danh mục</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá (VNĐ) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    min="0"
                    step="1000"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                  />
                  {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giảm giá (%)
                  </label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => handleChange('discount', e.target.value)}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => handleChange('category_id', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent ${
                      errors.category_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đánh giá (sao)
                  </label>
                  <input
                    type="number"
                    value={formData.rating}
                    onChange={(e) => handleChange('rating', e.target.value)}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng đã bán
                  </label>
                  <input
                    type="number"
                    value={formData.sales}
                    onChange={(e) => handleChange('sales', e.target.value)}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-3">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {errors.submit}
                  </div>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={isPending}
                >
                  <i className="fas fa-save mr-2"></i>
                  Tạo sản phẩm
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push('/dashboard/products')}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

