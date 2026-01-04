'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiProductCategories } from '@/api/product-categories';
import Button from '@/components/ui/Button';
import { generateSlug } from '@/helpers/slug';

export default function EditProductCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
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

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    description: '',
  });
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch category
  const { data: categoryData, isLoading: isLoadingCategory } = useQuery({
    queryKey: ['product-category', id],
    queryFn: async () => await apiProductCategories.getById(id),
  });

  // Update form data when category is loaded
  useEffect(() => {
    if (categoryData?.data) {
      const category = categoryData.data;
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        image: category.image || '',
        description: category.description || '',
      });
      // Reset manual edit flag when category is loaded
      setIsSlugManuallyEdited(!!category.slug);
    }
  }, [categoryData]);

  // Update mutation
  const { mutate: updateCategory, isPending } = useMutation({
    mutationFn: (category: any) => apiProductCategories.update(id, category),
    onSuccess: (data) => {
      if (data.error) {
        setErrors({ submit: data.error });
      } else {
        queryClient.invalidateQueries({ queryKey: ['product-category', id] });
        queryClient.invalidateQueries({ queryKey: ['admin-product-categories'] });
        queryClient.invalidateQueries({ queryKey: ['product_categories'] });
        router.push(`/admin/product-categories/${id}`);
      }
    },
    onError: (error: any) => {
      setErrors({ submit: error.message || 'Có lỗi xảy ra' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Tên danh mục là bắt buộc';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateCategory({
      name: formData.name.trim(),
      slug: formData.slug.trim() || generateSlug(formData.name.trim()),
      image: formData.image.trim() || undefined,
      description: formData.description.trim() || undefined,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug from name if name is changed and slug hasn't been manually edited
      if (field === 'name' && !isSlugManuallyEdited) {
        updated.slug = generateSlug(value);
      }
      
      // Track if slug is manually edited
      if (field === 'slug') {
        setIsSlugManuallyEdited(true);
      }
      
      return updated;
    });
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleGenerateSlug = () => {
    if (formData.name.trim()) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.name) }));
      setIsSlugManuallyEdited(true);
    }
  };

  if (isLoadingCategory) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5183]"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!categoryData?.data) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-600 mb-4">Không tìm thấy danh mục</p>
        <Button onClick={() => router.back()}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-2 flex items-center space-x-2"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Quay lại</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa Danh mục</h1>
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
                    Tên danh mục <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập tên danh mục"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleChange('slug', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                      placeholder="slug-tu-dong-tao"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateSlug}
                      disabled={!formData.name.trim()}
                      className="px-4 py-2 bg-[#ff5183] text-white rounded-lg hover:bg-[#ff006e] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 transition-colors"
                      title="Tạo slug từ tên danh mục"
                    >
                      <i className="fas fa-magic"></i>
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Đường dẫn URL (tự động tạo từ tên danh mục)</p>
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
                    placeholder="Nhập mô tả danh mục"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hình ảnh</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL hình ảnh
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                  placeholder="https://..."
                />
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
                  Lưu thay đổi
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.back()}
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

