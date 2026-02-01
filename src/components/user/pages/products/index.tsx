'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import AddToCartModal, { type AddToCartModalProduct } from './AddToCartModal';
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
  const [selectedProductForModal, setSelectedProductForModal] =
    useState<AddToCartModalProduct | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, minPrice, maxPrice, sortBy]);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

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

  const { data: categoriesData } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => await apiProductCategories.getList(),
  });

  const products = productsData?.data || [];
  const categories = categoriesData?.data || [];
  const totalItems = productsData?.count || 0;
  const totalPages = productsData?.totalPages || 1;

  const handleCategoryChange = (categoryId: number | undefined) => {
    setSelectedCategory(categoryId);
    window.history.pushState(
      {},
      '',
      categoryId ? `/products?category=${categoryId}` : '/products'
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategory(undefined);
    window.history.pushState({}, '', '/products');
  };

  if (isLoadingProducts) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
              <i className="fa-solid fa-seedling text-3xl text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-primary/5 animate-ping" />
          </div>
          <p className="text-gray-500 font-medium">Đang tải sản phẩm...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">

      {/* Page Header - Liquid glass */}
      <div className="relative overflow-hidden pt-14">
        <div className="absolute inset-0 " />
        <div className="relative max-w-7xl mx-auto py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <i className="fa-solid fa-seedling text-primary" />
              <span className="text-sm font-semibold text-primary">Thực phẩm khô</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Sản phẩm thực phẩm khô
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
              Thêm vào giỏ hàng và mua ngay – Chất lượng & Uy tín
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80">
              <i className="fa-solid fa-shield-halved text-primary" />
              <span className="text-gray-700 font-medium text-sm">
                Thực phẩm khô chất lượng – Thêm giỏ & mua
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Liquid glass */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="card-glass card-glass-hover rounded-2xl p-6 transition-all duration-300 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <i className="fa-solid fa-sliders text-primary" />
                <h3 className="text-lg font-bold text-gray-900">Bộ lọc</h3>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <div className="relative group">
                  <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Tên sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Danh mục
                </label>
                <div className="space-y-1.5">
                  <label
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${selectedCategory === undefined
                      ? 'bg-primary/15 text-primary font-medium'
                      : 'hover:bg-white/80 text-gray-600'
                      }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === undefined}
                      onChange={() => handleCategoryChange(undefined)}
                      className="sr-only"
                    />
                    <i className="fa-solid fa-layer-group text-sm opacity-70" />
                    Tất cả
                  </label>
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${selectedCategory === cat.id
                        ? 'bg-primary/15 text-primary font-medium'
                        : 'hover:bg-white/80 text-gray-600'
                        }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => handleCategoryChange(cat.id)}
                        className="sr-only"
                      />
                      <i className="fa-solid fa-tag text-sm opacity-70" />
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Khoảng giá (VNĐ)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Từ"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                  />
                  <input
                    type="number"
                    placeholder="Đến"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              {(searchTerm || minPrice || maxPrice || selectedCategory !== undefined) && (
                <button
                  onClick={handleClearFilters}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-rotate-left" />
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Sort Bar - Liquid glass */}
            <div className="card-glass rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-gray-600">
                Tìm thấy{' '}
                <span className="font-bold text-gray-900">{totalItems}</span> sản phẩm
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2.5 rounded-xl bg-white/70 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium text-gray-900 cursor-pointer transition-all"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến nhất</option>
                  <option value="price_asc">Giá: Thấp → Cao</option>
                  <option value="price_desc">Giá: Cao → Thấp</option>
                  <option value="commission_desc">Hoa hồng cao nhất</option>
                </select>
              </div>
            </div>

            {/* Grid with staggered animation */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {products.map((product: any, index: number) => (
                  <div
                    key={product.id}
                    className="animate-product-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={(p) => setSelectedProductForModal(p)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-glass rounded-2xl p-16 text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gray-100/80 flex items-center justify-center">
                  <i className="fa-solid fa-box-open text-4xl text-gray-400" />
                </div>
                <p className="text-gray-700 text-xl font-semibold mb-2">
                  Không tìm thấy sản phẩm nào
                </p>
                <p className="text-gray-500 mb-6">
                  Vui lòng thử lại với bộ lọc khác
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-all"
                >
                  <i className="fa-solid fa-rotate-left" />
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={totalItems}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Single AddToCart modal outside the product loop */}
      {selectedProductForModal && (
        <AddToCartModal
          product={selectedProductForModal}
          isOpen={!!selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
        />
      )}
    </main>
  );
};

export default Products;
