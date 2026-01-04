'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiProducts } from '@/api/products';
import ProductCard from './ProductCard';

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [quantity, setQuantity] = useState(1);

  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => await apiProducts.getBySlug(slug),
    enabled: !!slug,
  });

  const product = productData?.data;

  // Fetch related products
  const { data: relatedProductsData } = useQuery({
    queryKey: ['related_products', product?.category_id, product?.id],
    queryFn: async () => {
      if (!product?.category_id) return { data: [], count: 0 };
      const result = await apiProducts.getList({
        categoryId: product.category_id,
        sortBy: 'newest',
        limit: 6, // Get 6 to filter out current product and get 5
      });
      // Filter out current product
      if (result.data) {
        result.data = result.data.filter((p: any) => p.id !== product.id).slice(0, 5);
      }
      return result;
    },
    enabled: !!product?.category_id && !!product?.id,
  });

  const relatedProducts = relatedProductsData?.data || [];

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
    const newMaxIndex = Math.max(0, relatedProducts.length - itemsPerPage);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [itemsPerPage, currentIndex, relatedProducts.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff5183] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="fas fa-exclamation-circle text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white px-6 py-3 rounded-lg font-bold hover:from-[#ff006e] hover:to-[#ff5183] transition-all transform hover:scale-105"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Quay lại danh sách sản phẩm</span>
          </Link>
        </div>
      </div>
    );
  }

  const originalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100)) + product.price
    : product.price;

  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link href="/products" className="text-gray-500 hover:text-[#ff5183] transition-colors">
              Sản phẩm
            </Link>
            {product.product_categories && (
              <>
                <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
                <Link
                  href={`/products?category=${product.product_categories.id}`}
                  className="text-gray-500 hover:text-[#ff5183] transition-colors"
                >
                  {product.product_categories.name}
                </Link>
              </>
            )}
            <i className="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 h-fit-content">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600';
                }}
              />
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-[#ff5183] text-white text-lg font-bold px-4 py-2 rounded-full shadow-xl">
                  -{product.discount}% GIẢM
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black/80 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-2">
                <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
                <span>TikTok Shop</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.product_categories && (
              <div className="flex items-center gap-2">
                <Link
                  href={`/products?category=${product.product_categories.id}`}
                  className="text-[#ff5183] font-semibold text-sm uppercase tracking-wide hover:underline flex items-center gap-2"
                >
                  <i className="fa-solid fa-tag"></i>
                  {product.product_categories.name}
                </Link>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Sales */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, index) => {
                    const rating = product.rating || 0;
                    const filledStars = Math.round(rating);
                    return (
                      <i
                        key={index}
                        className={`${
                          index < filledStars ? 'fa-solid' : 'fa-regular'
                        } fa-star text-yellow-400 text-xl`}
                      />
                    );
                  })}
                </div>
                <span className="text-lg font-bold text-gray-900">{product.rating || 0}</span>
                <span className="text-gray-500 text-sm">({product.sales?.toLocaleString('vi-VN') || 0} đã bán)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-[#ff5183]/10 to-[#ff006e]/10 rounded-xl p-6 border border-[#ff5183]/20">
              <div className="flex items-baseline gap-4">
                {product.discount > 0 && (
                  <span className="text-2xl text-gray-400 line-through">
                    {originalPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
                <span className="text-4xl font-bold text-[#ff5183]">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
                {product.discount > 0 && (
                  <span className="text-lg text-gray-600">
                    (Tiết kiệm {originalPrice - product.price > 0 ? (originalPrice - product.price).toLocaleString('vi-VN') : 0}đ)
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Input & Buy Direct Button - Only show if is_buyis true */}
            {product.is_buy && (
              <div className="space-y-4">
                {/* Quantity Input */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Số lượng
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] transition-colors font-bold text-lg"
                      aria-label="Giảm số lượng"
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1;
                        setQuantity(Math.max(1, value));
                      }}
                      className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183] font-semibold text-lg"
                    />
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] transition-colors font-bold text-lg"
                      aria-label="Tăng số lượng"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>

                {/* Buy Direct Button */}
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all transform flex justify-center items-center gap-3 shadow-xl hover:shadow-2xl"
                >
                  <i className="fa-solid fa-shopping-cart text-2xl"></i>
                  <span>MUA TRỰC TIẾP</span>
                </button>
              </div>
            )}

            {/* CTA Button */}
            <div className="space-y-4">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white py-4 rounded-xl font-bold text-lg hover:from-[#ff006e] hover:to-[#ff5183] transition-all transform flex justify-center items-center gap-3 shadow-xl hover:shadow-2xl"
              >
                <i className="fa-solid fa-cart-plus text-2xl"></i>
                <span>MUA TRÊN TIKTOK SHOP</span>
              </a>
              <p className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-check text-green-500"></i>
                <span>Link TikTok Shop chính thức - An toàn & Chính hãng</span>
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
                <div
                  className={`text-gray-700 leading-relaxed whitespace-pre-wrap ${
                    !isDescriptionExpanded ? 'line-clamp-4' : ''
                  }`}
                >
                  {product.description}
                </div>
                {product.description.length > 200 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-4 text-[#ff5183] hover:text-[#ff006e] font-semibold text-sm flex items-center gap-2 transition-colors"
                  >
                    {isDescriptionExpanded ? (
                      <>
                        <span>Thu gọn</span>
                        <i className="fas fa-chevron-up"></i>
                      </>
                    ) : (
                      <>
                        <span>Xem thêm</span>
                        <i className="fas fa-chevron-down"></i>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Thông tin bổ sung</h3>
              <dl className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-gray-600">Đánh giá</dt>
                  <dd className="font-semibold text-gray-900">
                    {product.rating || 0}/5 <i className="fa-solid fa-star text-yellow-400"></i>
                  </dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-gray-600">Đã bán</dt>
                  <dd className="font-semibold text-gray-900">
                    {product.sales?.toLocaleString('vi-VN') || 0} sản phẩm
                  </dd>
                </div>
                {product.product_categories && (
                  <div className="flex justify-between items-center py-2">
                    <dt className="text-gray-600">Danh mục</dt>
                    <dd className="font-semibold text-[#ff5183]">
                      {product.product_categories.name}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fa-brands fa-tiktok text-2xl text-[#ff5183]"></i>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
                    <span className="bg-[#ff5183] w-2 h-8 mr-3 rounded-full"></span>
                    <span className="leading-tight">Sản phẩm liên quan</span>
                  </h2>
                </div>
                <p className="text-gray-600">
                  Các sản phẩm cùng danh mục bạn có thể quan tâm
                </p>
              </div>
              {/* Desktop Navigation Buttons */}
              {relatedProducts.length > itemsPerPage && (
                <div className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const maxIndex = Math.max(0, relatedProducts.length - itemsPerPage);
                      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
                    }}
                    className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] transition-colors shadow-sm"
                    aria-label="Previous"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={() => {
                      const maxIndex = Math.max(0, relatedProducts.length - itemsPerPage);
                      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
                    }}
                    className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] transition-colors shadow-sm"
                    aria-label="Next"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              )}
            </div>

            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                }}
              >
                {relatedProducts.map((relatedProduct: any) => (
                  <div
                    key={relatedProduct.id}
                    className="flex-shrink-0 px-1.5 sm:px-2 lg:px-3"
                    style={{
                      width: `${100 / itemsPerPage}%`,
                      minWidth: `${100 / itemsPerPage}%`,
                    }}
                  >
                    <ProductCard product={relatedProduct} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Buttons */}
            {relatedProducts.length > itemsPerPage && (
              <div className="flex md:hidden justify-center items-center space-x-2 mt-6">
                <button
                  onClick={() => {
                    const maxIndex = Math.max(0, relatedProducts.length - itemsPerPage);
                    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
                  }}
                  className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] active:bg-[#ff5183] active:text-white transition-colors shadow-sm"
                  aria-label="Previous"
                >
                  <i className="fa-solid fa-chevron-left text-sm"></i>
                </button>
                {/* Dots Indicator */}
                <div className="flex items-center space-x-2 mx-4">
                  {Array.from({ length: Math.max(0, relatedProducts.length - itemsPerPage) + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-[#ff5183] w-8'
                          : 'bg-gray-300 hover:bg-gray-400 w-2'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    const maxIndex = Math.max(0, relatedProducts.length - itemsPerPage);
                    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
                  }}
                  className="w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-[#ff5183] hover:text-white hover:border-[#ff5183] active:bg-[#ff5183] active:text-white transition-colors shadow-sm"
                  aria-label="Next"
                >
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;

