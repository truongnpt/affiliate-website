'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../products/ProductCard';
import { apiProducts } from '../../../../api/products';

const SectionNewProducts = () => {
  // Fetch new products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ['new_products'],
    queryFn: async () =>
      await apiProducts.getList({
        sortBy: 'newest',
        limit: 12,
      }),
  });

  const products = productsData?.data || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Responsive items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      let newItemsPerPage;
      if (width < 640) {
        // Mobile: 1 item
        newItemsPerPage = 1;
      } else if (width < 1024) {
        // Tablet: 2 items
        newItemsPerPage = 2;
      } else {
        // Desktop: 4 items
        newItemsPerPage = 4;
      }
      setItemsPerPage(newItemsPerPage);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Reset currentIndex when itemsPerPage changes to prevent out of bounds
  useEffect(() => {
    const newMaxIndex = Math.max(0, products.length - itemsPerPage);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [itemsPerPage, currentIndex, products.length]);

  // Loading state
  if (isLoading) {
    return (
      <section id="new-product" className="py-10 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff5183] border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  // Don't render if no products
  if (products.length === 0) {
    return null;
  }

  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="new-product" className="py-10 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <i className="fa-brands fa-tiktok text-2xl sm:text-3xl text-[#ff5183]"></i>
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 flex items-center">
                <span className="bg-[#ff5183] w-1.5 sm:w-2 h-6 sm:h-8 mr-2 sm:mr-3 rounded-full"></span>
                <span className="leading-tight">Sản phẩm hot TikTok Shop</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base lg:text-xl text-gray-600 mb-2">
              Click vào link để tự động thêm vào giỏ hàng TikTok Shop ngay!
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-fire text-orange-500"></i>
                Đang hot
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-clock text-blue-500"></i>
                Cập nhật hàng ngày
              </span>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] transition-colors shadow-sm"
              aria-label="Previous"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] transition-colors shadow-sm"
              aria-label="Next"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {products.map((product: any) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-1.5 sm:px-2 lg:px-3"
                style={{
                  width: `${100 / itemsPerPage}%`,
                  minWidth: `${100 / itemsPerPage}%`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden justify-center items-center space-x-2 mt-6 sm:mt-8">
          <button
            onClick={prevSlide}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] active:bg-[#ff5183] active:text-white transition-colors shadow-sm"
            aria-label="Previous"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          {/* Dots Indicator */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 mx-3 sm:mx-4">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#ff5183] w-6 sm:w-8'
                    : 'bg-gray-300 hover:bg-gray-400 w-1.5 sm:w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] active:bg-[#ff5183] active:text-white transition-colors shadow-sm"
            aria-label="Next"
          >
            <i className="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </div>

        {/* View All Link */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <a
            href="/products"
            className="inline-flex items-center text-sm sm:text-base text-[#ff5183] font-semibold hover:text-[#ff5183]/80 transition-colors"
          >
            Xem tất cả sản phẩm
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SectionNewProducts;
