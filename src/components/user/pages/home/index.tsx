'use client';
import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { apiProductCategories } from '@/api/product-categories';
import SectionNewProducts from './SectionNewProducts';

const Home = () => {
  // Fetch featured categories (top 4 by product count)
  const { data: featuredCategoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['featured_categories'],
    queryFn: async () => await apiProductCategories.getFeatured(4),
  });

  const featuredCategories = featuredCategoriesData?.data || [];

  // Helper function to get icon and color based on category name
  const getCategoryStyle = (name: string) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('hạt') || nameLower.includes('dinh dưỡng') || nameLower.includes('seedling')) {
      return { icon: 'fa-solid fa-seedling', color: 'from-amber-500 to-amber-600' };
    }
    if (nameLower.includes('khô') || nameLower.includes('cookie')) {
      return { icon: 'fa-solid fa-cookie', color: 'from-orange-500 to-orange-600' };
    }
    if (nameLower.includes('trái cây') || nameLower.includes('sấy') || nameLower.includes('apple')) {
      return { icon: 'fa-solid fa-apple-whole', color: 'from-red-500 to-red-600' };
    }
    if (nameLower.includes('đậu') || nameLower.includes('leaf')) {
      return { icon: 'fa-solid fa-leaf', color: 'from-green-500 to-green-600' };
    }
    // Default style
    return { icon: 'fa-solid fa-tag', color: 'from-primary to-primary-hover' };
  };

  return (
    <main>
      {/* HERO SECTION - Full-width, trẻ trung, hiện đại */}
      <section id="hero" className="relative w-full min-h-[100vh] flex items-center overflow-hidden">
        {/* Full-width background */}
        <div className="absolute inset-0 w-full">
          <Image
            src="/images/top-banner.png"
            alt="Thực phẩm khô ngon sạch - Thế Giới KHÔ"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-2xl animate-hero-float" aria-hidden />
        <div className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-primary-hover/15 blur-3xl animate-hero-float" style={{ animationDelay: '0.5s' }} aria-hidden />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full border-2 border-primary/30 animate-hero-float" style={{ animationDelay: '1s' }} aria-hidden />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-hero-fade-up animate-hero-fade-up-delay-1">
              <i className="fa-solid fa-seedling text-primary text-sm" />
              <span className="text-sm font-medium text-white/95">Thực phẩm khô chất lượng</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] animate-hero-fade-up animate-hero-fade-up-delay-2">
              <span className="text-white drop-shadow-lg">Thực phẩm khô</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-hover to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                Tươi mới mỗi ngày
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/90 max-w-xl mb-10 leading-relaxed animate-hero-fade-up animate-hero-fade-up-delay-3">
              Hạt dinh dưỡng, các loại khô, trái cây sấy – thêm vào giỏ hàng & mua ngay
            </p>

            {/* CTAs */}
            <div className="flex gap-4 animate-hero-fade-up animate-hero-fade-up-delay-4">
              <a
                href="/products"
                className="mb-4 group inline-flex items-center justify-center gap-2 px-4 md:px-8 py-2 md:py-4 rounded-full bg-primary text-white font-bold text-sm md:text-lg hover:bg-primary-hover transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30 animate-hero-pulse"
              >
                <i className="fa-solid fa-cart-shopping text-xl group-hover:animate-bounce !hidden md:!inline-block " />
                Xem sản phẩm ngay
                <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform !hidden md:!inline-block " />
              </a>
              <a
                href="/product-categories"
                className="mb-4 inline-flex items-center  justify-center gap-2 px-4 md:px-8 py-2 md:py-4 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-sm md:text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                <i className="fa-solid fa-tags !hidden md:!inline-block " />
                Khám phá danh mục
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
          <span className="text-white/80 text-xs font-medium">Cuộn xuống</span>
          <i className="fa-solid fa-chevron-down text-white/80 text-sm" />
        </div>

        {/* Feature pills - absolute bottom, full width */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-16 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: 'fa-solid fa-leaf', label: 'Thơm Ngon Đậm Đà' },
                { icon: 'fa-solid fa-certificate', label: 'Nguồn Gốc Rõ Ràng' },
                { icon: 'fa-solid fa-truck-fast', label: 'Giao Hàng Nhanh' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center sm:justify-start gap-3 px-3 md:px-6 py-2 md:py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group animate-hero-fade-up ${idx === 0 ? 'animate-hero-fade-up-delay-5' : idx === 1 ? 'animate-hero-fade-up-delay-6' : 'animate-hero-fade-up-delay-7'
                    }`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
                    <i className={`${item.icon} text-primary text-lg md:text-xl`} />
                  </div>
                  <span className="font-semibold text-white/95 text-sm md:text-base">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mua sắm đơn giản – Thêm giỏ hàng & thanh toán
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chọn sản phẩm thực phẩm khô yêu thích, thêm vào giỏ hàng và hoàn tất đơn hàng nhanh chóng.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div id="feature-1" className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-primary/10 transition-colors">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-magnifying-glass text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Chọn sản phẩm</h3>
              <p className="text-gray-600">
                Duyệt hạt dinh dưỡng, các loại khô, trái cây sấy. Tìm đúng sản phẩm bạn cần.
              </p>
            </div>
            <div id="feature-2" className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-primary/10 transition-colors">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-cart-plus text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Thêm vào giỏ hàng</h3>
              <p className="text-gray-600">
                Thêm sản phẩm vào giỏ hàng, điều chỉnh số lượng. Một nơi quản lý đơn hàng.
              </p>
            </div>
            <div id="feature-3" className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-primary/10 transition-colors">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-credit-card text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Thanh toán & nhận hàng</h3>
              <p className="text-gray-600">
                Thanh toán an toàn, giao hàng nhanh. Thực phẩm khô đóng gói cẩn thận.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <i className="fa-solid fa-seedling text-4xl text-primary"></i>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Mua hàng chỉ với 3 bước
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quy trình mua sắm đơn giản và nhanh chóng
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">1</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-primary pt-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary-hover/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-search text-4xl text-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Tìm sản phẩm</h3>
                <p className="text-gray-600">
                  Duyệt danh mục hạt, khô, trái cây sấy. Tìm sản phẩm phù hợp với bạn.
                </p>
              </div>
            </div>
            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-primary pt-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary-hover/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-cart-plus text-4xl text-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Thêm vào giỏ hàng</h3>
                <p className="text-gray-600">
                  Chọn số lượng và thêm vào giỏ hàng. Kiểm tra giỏ hàng bất cứ lúc nào.
                </p>
              </div>
            </div>
            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-primary pt-12">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary-hover/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-truck text-4xl text-primary"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Thanh toán & nhận hàng</h3>
                <p className="text-gray-600">
                  Hoàn tất thanh toán. Giao hàng nhanh, đóng gói cẩn thận.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW PRODUCT SECTION */}
      <SectionNewProducts />

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Phản hồi từ khách hàng đã mua thực phẩm khô tại Thế Giới KHÔ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Nguyễn Thị Lan', avatar: '👩', rating: 5, comment: 'Hạt và trái cây sấy rất tươi, đóng gói sạch. Mua nhiều lần rồi, ủng hộ lâu dài.', product: 'Khách quen' },
              { name: 'Trần Văn Minh', avatar: '👨', rating: 5, comment: 'Thêm giỏ hàng và thanh toán rất nhanh. Giao hàng đúng hẹn, sản phẩm chất lượng.', product: 'Đã mua 8 đơn' },
              { name: 'Lê Thị Hoa', avatar: '👩', rating: 5, comment: 'Thực phẩm khô đa dạng, giá hợp lý. Recommend cho bạn bè.', product: 'Đã mua 12 đơn' },
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{t.comment}"</p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary-hover/20 rounded-full flex items-center justify-center text-2xl">{t.avatar}</div>
                    <div>
                      <h4 className="font-bold text-gray-900">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.product}</p>
                    </div>
                  </div>
                  <i className="fa-solid fa-seedling text-primary text-xl"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="py-20 bg-gradient-to-r from-primary to-primary-hover">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-2">Thực phẩm khô uy tín</h3>
            <p className="text-white/90">Thêm giỏ hàng & mua ngay!</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/90 text-sm">Chất lượng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/90 text-sm">Cập nhật sản phẩm</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1 Click</div>
              <div className="text-white/90 text-sm">Thêm giỏ hàng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/90 text-sm">An toàn & Bảo mật</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING CATEGORIES - Thực phẩm khô */}
      <section id="trending-categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <i className="fa-solid fa-fire text-4xl text-orange-500"></i>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Danh mục nổi bật</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá các nhóm thực phẩm khô được yêu thích
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {isLoadingCategories ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-md border-2 border-gray-100 text-center animate-pulse"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>
              ))
            ) : featuredCategories.length > 0 ? (
              featuredCategories.map((cat) => {
                const style = getCategoryStyle(cat.name);
                return (
                  <a
                    key={cat.id}
                    href={`/products?category=${cat.id}`}
                    className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-primary text-center transform hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${style.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <i className={`${style.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                    <p className="text-sm text-gray-500">{cat.productCount || 0} sản phẩm</p>
                    <div className="mt-4 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold mr-2">Xem ngay</span>
                      <i className="fa-solid fa-arrow-right"></i>
                    </div>
                  </a>
                );
              })
            ) : (
              // Fallback if no categories
              <div className="col-span-4 text-center py-8 text-gray-500">
                <p>Chưa có danh mục nổi bật</p>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <a
              href="/product-categories"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-hover hover:to-primary transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <i className="fa-solid fa-tags"></i>
              Xem tất cả danh mục
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section id="trust-badges" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: 'fa-solid fa-seedling', text: 'Thực phẩm khô chất lượng', color: 'text-green-500' },
              { icon: 'fa-solid fa-lock', text: 'An toàn & Bảo mật', color: 'text-blue-500' },
              { icon: 'fa-solid fa-truck-fast', text: 'Giao hàng nhanh', color: 'text-orange-500' },
              { icon: 'fa-solid fa-headset', text: 'Hỗ trợ 24/7', color: 'text-purple-500' },
            ].map((badge, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <i className={`${badge.icon} ${badge.color} text-4xl mb-4`}></i>
                <p className="text-sm font-semibold text-gray-700">{badge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(193, 127, 60, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212, 146, 90, 0.3) 0%, transparent 50%)' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <i className="fa-solid fa-seedling text-5xl text-primary animate-pulse"></i>
            <h2 className="text-3xl lg:text-5xl font-bold">Bắt đầu mua thực phẩm khô ngay!</h2>
          </div>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Khám phá hạt dinh dưỡng, các loại khô, trái cây sấy. Thêm vào giỏ hàng và thanh toán đơn giản.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-gradient-to-r from-primary to-primary-hover text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-primary-hover hover:to-primary transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3 shadow-2xl"
            >
              <i className="fa-solid fa-shopping-bag text-xl"></i>
              Xem sản phẩm ngay
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a
              href="/cart"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3"
            >
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              Xem giỏ hàng
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-check-circle text-green-400"></i>
                <span className="text-sm">Thêm giỏ hàng đơn giản</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-check-circle text-green-400"></i>
                <span className="text-sm">Thanh toán an toàn</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-check-circle text-green-400"></i>
                <span className="text-sm">Giao hàng tận nơi</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
