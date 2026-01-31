'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiProducts } from '@/api/products';
import ProductCard from './ProductCard';
import { addToCart } from '@/store/cart';
import { useToast } from '@/store/toast';

const ProductDetail = () => {
  const { showToast } = useToast();
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

  const { data: relatedProductsData } = useQuery({
    queryKey: ['related_products', product?.category_id, product?.id],
    queryFn: async () => {
      if (!product?.category_id) return { data: [], count: 0 };
      const result = await apiProducts.getList({
        categoryId: product.category_id,
        sortBy: 'newest',
        limit: 6,
      });
      if (result.data) {
        result.data = result.data.filter((p: any) => p.id !== product.id).slice(0, 5);
      }
      return result;
    },
    enabled: !!product?.category_id && !!product?.id,
  });

  const relatedProducts = relatedProductsData?.data || [];

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      setItemsPerPage(width < 640 ? 1 : width < 1024 ? 2 : 4);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const newMaxIndex = Math.max(0, relatedProducts.length - itemsPerPage);
    if (currentIndex > newMaxIndex) setCurrentIndex(newMaxIndex);
  }, [itemsPerPage, currentIndex, relatedProducts.length]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">

        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
            <i className="fa-solid fa-seedling text-3xl text-primary animate-pulse" />
          </div>
          <p className="text-gray-500 font-medium">Đang tải sản phẩm...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">

        <div className="card-glass rounded-2xl p-12 sm:p-16 text-center max-w-lg mx-auto mt-8">
          <i className="fa-solid fa-box-open text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h2>
          <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
          <Link href="/products" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all">
            <i className="fa-solid fa-arrow-left" />
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </main>
    );
  }

  const salePrice = product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-16">


      {/* Breadcrumb - Liquid glass */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="card-glass rounded-2xl px-6 py-4 flex flex-wrap items-center gap-2 text-sm">
          <Link href="/products" className="text-gray-500 hover:text-primary transition-colors">Sản phẩm</Link>
          {product.product_categories && (
            <>
              <i className="fa-solid fa-chevron-right text-gray-400 text-xs" />
              <Link href={`/products?category=${product.product_categories.id}`} className="text-gray-500 hover:text-primary transition-colors">
                {product.product_categories.name}
              </Link>
            </>
          )}
          <i className="fa-solid fa-chevron-right text-gray-400 text-xs" />
          <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="card-glass card-glass-hover rounded-2xl overflow-hidden p-4 transition-all duration-300">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600'; }} />
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-primary text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  -{product.discount}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.product_categories && (
              <Link href={`/products?category=${product.product_categories.id}`} className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide hover:underline">
                <i className="fa-solid fa-tag" />
                {product.product_categories.name}
              </Link>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`${i < Math.round(product.rating || 0) ? 'fa-solid' : 'fa-regular'} fa-star text-yellow-400 text-xl`} />
                ))}
                <span className="font-bold text-gray-900">{product.rating || 0}</span>
                <span className="text-gray-500 text-sm">({product.sales?.toLocaleString('vi-VN') || 0} đã bán)</span>
              </div>
            </div>

            {/* Price */}
            <div className="card-glass rounded-2xl p-6">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-primary">{salePrice.toLocaleString('vi-VN')}đ</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">{product.price.toLocaleString('vi-VN')}đ</span>
                    <span className="text-sm text-gray-600">(Tiết kiệm {(product.price - salePrice).toLocaleString('vi-VN')}đ)</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="card-glass rounded-2xl p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Số lượng</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all font-bold" aria-label="Giảm">
                    <i className="fa-solid fa-minus" />
                  </button>
                  <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 text-center px-2 h-11 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary font-semibold" />
                  <button onClick={() => setQuantity((q) => q + 1)} className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all font-bold" aria-label="Tăng">
                    <i className="fa-solid fa-plus" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    addToCart({ id: product.id, name: product.name, price: product.price, discount: product.discount || 0, image: product.image, url: product.url, slug: product.slug, product_categories: product.product_categories, quantity });
                    showToast(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`, { variant: 'success', title: 'Thêm vào giỏ' });
                  }}
                  className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary/5 py-4 rounded-2xl font-bold text-lg transition-all flex justify-center items-center gap-3"
                >
                  <i className="fa-solid fa-cart-plus text-xl" />
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={() => {
                    addToCart({ id: product.id, name: product.name, price: product.price, discount: product.discount || 0, image: product.image, url: product.url, slug: product.slug, product_categories: product.product_categories, quantity });
                    router.push('/checkout');
                  }}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold text-lg transition-all flex justify-center items-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02]"
                >
                  <i className="fa-solid fa-bolt text-xl" />
                  Mua ngay
                </button>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
              <i className="fa-solid fa-circle-check text-green-500" />
              Mua ngay sẽ chuyển đến trang thanh toán
            </p>

            {product.description && (
              <div className="card-glass rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
                <div className={`text-gray-700 leading-relaxed whitespace-pre-wrap ${!isDescriptionExpanded ? 'line-clamp-4' : ''}`}>{product.description}</div>
                {product.description.length > 200 && (
                  <button onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} className="mt-4 text-primary hover:text-primary-hover font-semibold text-sm flex items-center gap-2 transition-colors">
                    {isDescriptionExpanded ? <><span>Thu gọn</span><i className="fa-solid fa-chevron-up" /></> : <><span>Xem thêm</span><i className="fa-solid fa-chevron-down" /></>}
                  </button>
                )}
              </div>
            )}

            <div className="card-glass rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Thông tin bổ sung</h3>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-600">Đánh giá</dt>
                  <dd className="font-semibold text-gray-900">{product.rating || 0}/5 <i className="fa-solid fa-star text-yellow-400" /></dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-600">Đã bán</dt>
                  <dd className="font-semibold text-gray-900">{product.sales?.toLocaleString('vi-VN') || 0} sản phẩm</dd>
                </div>
                {product.product_categories && (
                  <div className="flex justify-between py-2">
                    <dt className="text-gray-600">Danh mục</dt>
                    <dd className="font-semibold text-primary">{product.product_categories.name}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <i className="fa-solid fa-seedling text-2xl text-primary" />
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Sản phẩm liên quan</h2>
                </div>
                <p className="text-gray-600">Các sản phẩm cùng danh mục bạn có thể quan tâm</p>
              </div>
              {relatedProducts.length > itemsPerPage && (
                <div className="hidden md:flex items-center gap-2">
                  <button onClick={() => setCurrentIndex((p) => (p <= 0 ? Math.max(0, relatedProducts.length - itemsPerPage) : p - 1))} className="w-12 h-12 rounded-xl bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all" aria-label="Trước">
                    <i className="fa-solid fa-chevron-left" />
                  </button>
                  <button onClick={() => setCurrentIndex((p) => (p >= Math.max(0, relatedProducts.length - itemsPerPage) ? 0 : p + 1))} className="w-12 h-12 rounded-xl bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all" aria-label="Sau">
                    <i className="fa-solid fa-chevron-right" />
                  </button>
                </div>
              )}
            </div>
            <div className="relative overflow-hidden mt-14">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
                {relatedProducts.map((rp: any) => (
                  <div key={rp.id} className="flex-shrink-0 px-2 lg:px-3" style={{ width: `${100 / itemsPerPage}%`, minWidth: `${100 / itemsPerPage}%` }}>
                    <ProductCard product={rp} />
                  </div>
                ))}
              </div>
              {relatedProducts.length > itemsPerPage && (
                <div className="flex md:hidden justify-center items-center gap-2 mt-6">
                  <button onClick={() => setCurrentIndex((p) => (p <= 0 ? Math.max(0, relatedProducts.length - itemsPerPage) : p - 1))} className="w-10 h-10 rounded-xl bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all" aria-label="Trước">
                    <i className="fa-solid fa-chevron-left text-sm" />
                  </button>
                  <div className="flex items-center gap-2 mx-4">
                    {Array.from({ length: Math.max(0, relatedProducts.length - itemsPerPage) + 1 }).map((_, i) => (
                      <button key={i} onClick={() => setCurrentIndex(i)} className={`h-2 rounded-full transition-all ${i === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'}`} aria-label={`Slide ${i + 1}`} />
                    ))}
                  </div>
                  <button onClick={() => setCurrentIndex((p) => (p >= Math.max(0, relatedProducts.length - itemsPerPage) ? 0 : p + 1))} className="w-10 h-10 rounded-xl bg-white/80 border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all" aria-label="Sau">
                    <i className="fa-solid fa-chevron-right text-sm" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default ProductDetail;
