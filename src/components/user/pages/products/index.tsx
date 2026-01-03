'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import Pagination from '../../../ui/Pagination';
import { apiProducts, SortOption } from '../../../../api/products';
import { apiProductCategories } from '../../../../api/product-categories';

const ITEMS_PER_PAGE = 12;

const Products = () => {
  const searchParams = useSearchParams();
  const categoryIdParam = searchParams?.get('category');
  const selectedCategoryId = categoryIdParam ? parseInt(categoryIdParam) : undefined;

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    selectedCategoryId
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, minPrice, maxPrice, sortBy]);

  // Calculate offset
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch products
  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: [
      'products',
      selectedCategory,
      debouncedSearchTerm,
      minPrice,
      maxPrice,
      sortBy,
      currentPage,
    ],
    queryFn: async () =>
      await apiProducts.getList({
        categoryId: selectedCategory,
        search: debouncedSearchTerm || undefined,
        minPrice: minPrice ? parseInt(minPrice) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
        sortBy: sortBy,
        limit: ITEMS_PER_PAGE,
        offset: offset,
      }),
  });

  // Fetch categories for filter
  const { data: categoriesData } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => await apiProductCategories.getList(),
  });

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];
  const totalItems = productsData?.count || 0;
  const totalPages = productsData?.totalPages || 1;

  // Loading state
  if (isLoadingProducts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff5183] border-t-transparent"></div>
      </div>
    );
  }

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    // Update URL without page reload
    const url = categoryId 
      ? `/products?category=${categoryId}`
      : '/products';
    window.history.pushState({}, '', url);
  };

  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="fa-brands fa-tiktok text-3xl text-[#ff5183]"></i>
            <h1 className="text-3xl font-bold text-gray-900">
              Sản phẩm TikTok Shop
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600 mb-4">
            Click vào link sản phẩm để tự động thêm vào giỏ hàng TikTok Shop
          </p>
          <div className="inline-flex items-center gap-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm">
            <i className="fa-solid fa-shield-halved text-green-600"></i>
            <span className="text-gray-700 font-medium">Link chính thức TikTok Shop - An toàn 100%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bộ lọc
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tên sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183]"
                  />
                  <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      id="cat-all"
                      checked={selectedCategory === undefined}
                      onChange={() => handleCategoryChange(undefined)}
                      className="h-4 w-4 text-[#ff5183] focus:ring-[#ff5183] border-gray-300"
                    />
                    <label
                      htmlFor="cat-all"
                      className="ml-2 text-sm text-gray-600 hover:text-[#ff5183] cursor-pointer"
                    >
                      Tất cả
                    </label>
                  </div>
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        id={`cat-${cat.id}`}
                        checked={selectedCategory === cat.id}
                        onChange={() => handleCategoryChange(cat.id)}
                        className="h-4 w-4 text-[#ff5183] focus:ring-[#ff5183] border-gray-300"
                      />
                      <label
                        htmlFor={`cat-${cat.id}`}
                        className="ml-2 text-sm text-gray-600 hover:text-[#ff5183] cursor-pointer"
                      >
                        {cat.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng giá (VNĐ)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183]"
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183]"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              {(searchTerm || minPrice || maxPrice || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setMinPrice('');
                    setMaxPrice('');
                    setSelectedCategory(undefined);
                    window.history.pushState({}, '', '/products');
                  }}
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Xóa bộ lọc
                </button>
              )}

            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center">
              <span className="text-gray-600 mb-2 sm:mb-0">
                Tìm thấy{' '}
                <span className="font-semibold text-gray-900">{totalItems}</span>{' '}
                sản phẩm
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183] cursor-pointer bg-white"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến nhất</option>
                  <option value="price_asc">Giá: Thấp đến cao</option>
                  <option value="price_desc">Giá: Cao đến thấp</option>
                  <option value="commission_desc">Hoa hồng cao nhất</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <i className="fa-solid fa-box-open text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-600 text-lg font-medium">
                  Không tìm thấy sản phẩm nào
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Vui lòng thử lại với bộ lọc khác
                </p>
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={totalItems}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
