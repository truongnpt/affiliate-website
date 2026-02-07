'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import AddToCartModal, { type AddToCartModalProduct } from './AddToCartModal';
import Pagination from '../../../ui/Pagination';
import { apiProducts, SortOption } from '../../../../api/products';
import { apiProductCategories } from '../../../../api/product-categories';

const ITEMS_PER_PAGE = 12;
const MOBILE_BREAKPOINT = 1024;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

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
  const [debouncedMinPrice, setDebouncedMinPrice] = useState<string>('');
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProductForModal, setSelectedProductForModal] =
    useState<AddToCartModalProduct | null>(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMinPrice(minPrice);
      setDebouncedMaxPrice(maxPrice);
    }, 2000);
    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, debouncedMinPrice, debouncedMaxPrice, sortBy]);

  // Lock body scroll when filter drawer is open (mobile)
  useEffect(() => {
    if (isFilterDrawerOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isFilterDrawerOpen]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFilterDrawerOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const filterParams = {
    categoryId: selectedCategory,
    search: debouncedSearchTerm || undefined,
    minPrice: debouncedMinPrice ? parseInt(debouncedMinPrice) : undefined,
    maxPrice: debouncedMaxPrice ? parseInt(debouncedMaxPrice) : undefined,
    sortBy,
    limit: ITEMS_PER_PAGE,
  };

  // Desktop: paginated query
  const { data: productsData, isLoading: isLoadingPaginated } = useQuery({
    queryKey: ['products', 'paginated', selectedCategory, debouncedSearchTerm, debouncedMinPrice, debouncedMaxPrice, sortBy, currentPage],
    queryFn: async () =>
      await apiProducts.getList({
        ...filterParams,
        offset,
      }),
    enabled: !isMobile,
  });

  // Mobile: infinite scroll query
  const {
    data: infiniteData,
    isLoading: isLoadingInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', 'infinite', selectedCategory, debouncedSearchTerm, debouncedMinPrice, debouncedMaxPrice, sortBy],
    queryFn: async ({ pageParam }) => {
      const res = await apiProducts.getList({
        ...filterParams,
        offset: (pageParam - 1) * ITEMS_PER_PAGE,
      });
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.totalPages || 1;
      if (allPages.length >= totalPages) return undefined;
      return allPages.length + 1;
    },
    enabled: isMobile,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => await apiProductCategories.getList(),
  });

  const products = isMobile
    ? (infiniteData?.pages?.flatMap((p) => p.data || []) ?? [])
    : (productsData?.data || []);
  const categories = categoriesData?.data || [];
  const totalItems = isMobile
    ? (infiniteData?.pages?.[0]?.count ?? 0)
    : (productsData?.count || 0);
  const totalPages = isMobile
    ? (infiniteData?.pages?.[0]?.totalPages ?? 1)
    : (productsData?.totalPages || 1);
  const isLoadingProducts = isMobile ? isLoadingInfinite : isLoadingPaginated;

  // Infinite scroll: load more when sentinel is visible (mobile only)
  useEffect(() => {
    if (!isMobile || !hasNextPage || isFetchingNextPage) return;
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },
      { rootMargin: '100px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    setDebouncedMinPrice('');
    setDebouncedMaxPrice('');
    setSelectedCategory(undefined);
    window.history.pushState({}, '', '/products');
    setIsFilterDrawerOpen(false);
  };

  const applyFiltersAndClose = () => {
    setIsFilterDrawerOpen(false);
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
          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
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
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                {/* Mobile: Filter button */}
                <button
                  onClick={() => setIsFilterDrawerOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/15 text-primary font-semibold text-sm hover:bg-primary/25 active:scale-[0.98] transition-all border border-primary/20"
                  aria-label="Mở bộ lọc"
                >
                  <i className="fa-solid fa-sliders" />
                  Bộ lọc
                  {(searchTerm || minPrice || maxPrice || selectedCategory !== undefined) && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </button>
                <span className="text-gray-600 text-sm sm:text-base">
                  Tìm thấy{' '}
                  <span className="font-bold text-gray-900">{totalItems}</span> sản phẩm
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
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
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5 sm:gap-6">
                  {products.map((product: any, index: number) => (
                    <div
                      key={product.id}
                      className="animate-product-in"
                      style={{ animationDelay: `${Math.min(index, 20) * 0.05}s` }}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={(p) => setSelectedProductForModal(p)}
                      />
                    </div>
                  ))}
                </div>
                {/* Infinite scroll sentinel - mobile only */}
                {isMobile && (
                  <div ref={loadMoreRef} className="flex justify-center py-6 min-h-[60px]">
                    {isFetchingNextPage && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">Đang tải thêm...</span>
                      </div>
                    )}
                  </div>
                )}
              </>
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

            {/* Pagination - Desktop only */}
            {products.length > 0 && (
              <div className="mt-8 hidden lg:block">
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

      {/* Filter Drawer - Mobile */}
      <>
        {/* Backdrop */}
        <div
          className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isFilterDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsFilterDrawerOpen(false)}
          aria-hidden="true"
        />
        {/* Drawer panel */}
        <div
          className={`lg:hidden fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            isFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Bộ lọc sản phẩm"
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-sliders text-primary" />
              <h3 className="text-lg font-bold text-gray-900">Bộ lọc</h3>
            </div>
            <button
              onClick={() => setIsFilterDrawerOpen(false)}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
              aria-label="Đóng bộ lọc"
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          </div>

          {/* Drawer content - scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tìm kiếm</label>
              <div className="relative">
                <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tên sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Danh mục</label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                <label
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                    selectedCategory === undefined ? 'bg-primary/15 text-primary font-medium' : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="category-drawer"
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
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                      selectedCategory === cat.id ? 'bg-primary/15 text-primary font-medium' : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="category-drawer"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Khoảng giá (VNĐ)</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Từ"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                />
                <input
                  type="number"
                  placeholder="Đến"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Drawer footer */}
          <div className="p-4 border-t border-gray-100 shrink-0 space-y-3">
            {(searchTerm || minPrice || maxPrice || selectedCategory !== undefined) && (
              <button
                onClick={handleClearFilters}
                className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <i className="fa-solid fa-rotate-left" />
                Xóa bộ lọc
              </button>
            )}
            <button
              onClick={applyFiltersAndClose}
              className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-check" />
              Áp dụng ({totalItems} sản phẩm)
            </button>
          </div>
        </div>
      </>

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
