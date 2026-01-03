'use client';
import React from 'react';
import SectionNewProducts from './SectionNewProducts';

const Home = () => {
  return (
    <main>
      {/* HERO SECTION */}
      <section
        id="hero"
        className="bg-gradient-to-r from-[#ff5183] to-[#ff5183] py-8 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-brands fa-tiktok text-3xl text-white"></i>
                <span className="text-white/90 font-semibold text-lg">
                  TikTok Shop
                </span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  Link chính thức
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Click vào link để thêm vào giỏ hàng TikTok Shop
              </h1>
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                Tất cả sản phẩm được chọn lọc từ kênh TikTok của tôi. Chỉ cần
                click vào link sản phẩm để tự động thêm vào giỏ hàng TikTok Shop
                và mua ngay!
              </p>
              <div className="flex items-center gap-3 mb-8 text-white/90">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-green-300"></i>
                  <span className="text-sm">Link an toàn</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-bolt text-yellow-300"></i>
                  <span className="text-sm">Thêm giỏ hàng nhanh</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-check-circle text-green-300"></i>
                  <span className="text-sm">Chính hãng TikTok</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/products"
                  className="bg-white text-[#f83e72] px-4 py-2 rounded-lg font-bold hover:bg-gray-50 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
                >
                  <i className="fa-solid fa-cart-shopping mr-2"></i>
                  Xem sản phẩm nào
                </a>
                <a
                  href="https://www.tiktok.com/@nopete_affiliate"
                  target="_blank"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#ff5183] transition-all flex items-center justify-center"
                >
                  <i className="fa-brands fa-tiktok mr-2"></i>
                  Kênh TikTok của tôi
                </a>
              </div>
            </div>
            <div className="relative mx-auto max-w-[500px] transform hover:scale-105 transition-transform duration-300">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff5183] to-[#ff006e] rounded-2xl blur opacity-75 animate-pulse"></div>

              {/* Graphic Design Style with Icons and Elements */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#ff5183] via-[#ff006e] to-[#ff5183] p-8 h-[500px] flex flex-col justify-between">
                {/* Top Section - TikTok Logo & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <i className="fa-brands fa-tiktok text-4xl text-white"></i>
                    </div>
                    <div className="text-white">
                      <div className="text-lg font-bold">TikTok Shop</div>
                      <div className="text-sm text-white/80">
                        Link chính thức
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white text-sm font-semibold">
                      100% An toàn
                    </span>
                  </div>
                </div>

                {/* Center - Floating Product Cards */}
                <div className="relative flex-1 flex items-center justify-center">
                  {/* Floating Card 1 */}
                  <div className="absolute top-10 left-0 bg-white rounded-xl shadow-2xl p-4 transform rotate-[-8deg] hover:rotate-0 transition-transform w-32">
                    <div className="w-full h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg mb-2 flex items-center justify-center">
                      <i className="fa-solid fa-shirt text-3xl text-white"></i>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                  </div>

                  {/* Floating Card 2 - Main */}
                  <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform">
                    <div className="w-48 h-48 bg-gradient-to-br from-[#ff5183] to-[#ff006e] rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20"></div>
                      <i className="fa-solid fa-cart-shopping text-6xl text-white relative z-10"></i>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        1 Click
                      </div>
                      <div className="text-sm text-gray-600">
                        Thêm vào giỏ hàng
                      </div>
                    </div>
                  </div>

                  {/* Floating Card 3 */}
                  <div className="absolute bottom-10 right-0 bg-white rounded-xl shadow-2xl p-4 transform rotate-[8deg] hover:rotate-0 transition-transform w-32">
                    <div className="w-full h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-lg mb-2 flex items-center justify-center">
                      <i className="fa-solid fa-mobile-screen text-3xl text-white"></i>
                    </div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>

                {/* Bottom Section - Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-white mb-1">1</div>
                    <div className="text-xs text-white/80">Click</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-white mb-1">
                      100%
                    </div>
                    <div className="text-xs text-white/80">An toàn</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-white mb-1">
                      24/7
                    </div>
                    <div className="text-xs text-white/80">Cập nhật</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mua sắm dễ dàng với TikTok Shop
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tất cả sản phẩm đều có link trực tiếp đến TikTok Shop. Chỉ cần
              click vào link để tự động thêm vào giỏ hàng và mua ngay!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              id="feature-1"
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-[#ff5183]/10 transition-colors"
            >
              <div className="w-16 h-16 bg-[#ff5183] rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-bolt text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Click và thêm giỏ hàng ngay
              </h3>
              <p className="text-gray-600">
                Chỉ cần 1 click vào link sản phẩm, tự động mở TikTok Shop và
                thêm vào giỏ hàng của bạn ngay lập tức.
              </p>
            </div>
            <div
              id="feature-2"
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-[#ff5183]/10 transition-colors"
            >
              <div className="w-16 h-16 bg-[#ff5183] rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Sản phẩm chính hãng TikTok Shop
              </h3>
              <p className="text-gray-600">
                Tất cả sản phẩm đều được chọn lọc từ TikTok Shop chính thức, đảm
                bảo chất lượng và uy tín 100%.
              </p>
            </div>
            <div
              id="feature-3"
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-[#ff5183]/10 transition-colors"
            >
              <div className="w-16 h-16 bg-[#ff5183] rounded-xl flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-shield-halved text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Link an toàn & Bảo mật
              </h3>
              <p className="text-gray-600">
                Tất cả link đều là link chính thức từ TikTok Shop, an toàn tuyệt
                đối. Không lo lắng về link giả mạo hay lừa đảo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id="how-it-works"
        className="py-20 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <i className="fa-brands fa-tiktok text-4xl text-[#ff5183]"></i>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Mua hàng chỉ với 3 bước đơn giản
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quy trình mua sắm TikTok Shop đơn giản và nhanh chóng nhất
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#ff5183] to-[#ff006e] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  1
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#ff5183] pt-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ff5183]/10 to-[#ff006e]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-search text-4xl text-[#ff5183]"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Tìm sản phẩm yêu thích
                </h3>
                <p className="text-gray-600">
                  Duyệt qua hàng ngàn sản phẩm TikTok Shop được chọn lọc. Tìm
                  kiếm hoặc lọc theo danh mục để tìm sản phẩm phù hợp với bạn.
                </p>
              </div>
            </div>

            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#ff5183] to-[#ff006e] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  2
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#ff5183] pt-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ff5183]/10 to-[#ff006e]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-mouse-pointer text-4xl text-[#ff5183]"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Click vào link sản phẩm
                </h3>
                <p className="text-gray-600">
                  Click vào nút "CLICK XEM SẢN PHẨM" trên card sản phẩm. Link sẽ
                  tự động mở TikTok Shop và sản phẩm được thêm vào giỏ hàng ngay
                  lập tức.
                </p>
              </div>
            </div>

            <div className="text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-gradient-to-r from-[#ff5183] to-[#ff006e] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  3
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#ff5183] pt-12">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ff5183]/10 to-[#ff006e]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-cart-shopping text-4xl text-[#ff5183]"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Hoàn tất thanh toán
                </h3>
                <p className="text-gray-600">
                  Kiểm tra giỏ hàng trên TikTok Shop và hoàn tất thanh toán.
                  Nhận hàng nhanh chóng với dịch vụ giao hàng của TikTok Shop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW PRODUCT SECTION */}
      <SectionNewProducts />

      {/* PRODUCT FORM SECTION */}
      {/* <section id="product-form" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Thêm sản phẩm đầu tiên của bạn
            </h2>
            <p className="text-xl text-gray-600">
              Điền thông tin bên dưới để bắt đầu quảng bá sản phẩm liên kết của
              bạn trên TikTok
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="product-name-2"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tên sản phẩm
                  </label>
                  <input
                    id="product-name-2"
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Danh mục
                  </label>
                  <select
                    id="category"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                  >
                    <option>Chọn danh mục</option>
                    <option>Điện tử</option>
                    <option>Thời trang</option>
                    <option>Làm đẹp</option>
                    <option>Nhà cửa & Đời sống</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="product-url"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Link sản phẩm
                  </label>
                  <input
                    id="product-url"
                    type="url"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                    placeholder="https://example.com/product"
                  />
                </div>
                <div>
                  <label
                    htmlFor="commission-rate-2"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tỷ lệ hoa hồng (%)
                  </label>
                  <input
                    id="commission-rate-2"
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                    placeholder="15"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mô tả sản phẩm
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                  placeholder="Mô tả sản phẩm của bạn..."
                ></textarea>
              </div>
              <div className="flex items-center justify-between pt-6">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Lưu nháp
                </button>
                <button
                  type="submit"
                  className="bg-[#ff5183] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#ff5183]/80 transition-colors"
                >
                  <i className="fa-solid fa-plus mr-2"></i>
                  Thêm sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      </section> */}

      {/* TIKTOK VIDEOS SHOWCASE */}
      <section id="tiktok-videos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <i className="fa-brands fa-tiktok text-4xl text-[#ff5183] animate-pulse"></i>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Video Review từ TikTok
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Xem video review thực tế các sản phẩm TikTok Shop từ kênh của
              chúng tôi
            </p>
            <a
              href="https://www.tiktok.com/@nopete_affiliate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#ff5183] font-semibold hover:underline"
            >
              Theo dõi kênh TikTok <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden aspect-[9/16] hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400 group-hover:text-white transition-colors z-20">
                    <i className="fa-brands fa-tiktok text-6xl mb-4"></i>
                    <p className="text-sm font-semibold">Video Review TikTok</p>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="https://www.tiktok.com/@nopete_affiliate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
                    Xem trên TikTok
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Người dùng nói gì về chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Phản hồi thực tế từ những khách hàng đã mua sắm qua website
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Nguyễn Thị Lan',
                avatar: '👩',
                rating: 5,
                comment:
                  'Website rất dễ sử dụng! Click vào link là tự động mở TikTok Shop luôn. Đã mua được nhiều sản phẩm ưng ý.',
                product: 'Đã mua 15 sản phẩm',
              },
              {
                name: 'Trần Văn Minh',
                avatar: '👨',
                rating: 5,
                comment:
                  'Link sản phẩm rất an toàn, 100% chính thức từ TikTok Shop. Mua hàng nhanh chóng và tiện lợi!',
                product: 'Đã mua 8 sản phẩm',
              },
              {
                name: 'Lê Thị Hoa',
                avatar: '👩',
                rating: 5,
                comment:
                  'Sản phẩm được chọn lọc kỹ, chất lượng tốt. Thích nhất là xem video review trên TikTok trước khi mua.',
                product: 'Đã mua 12 sản phẩm',
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-yellow-400"></i>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#ff5183]/20 to-[#ff006e]/20 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.product}
                      </p>
                    </div>
                  </div>
                  <i className="fa-brands fa-tiktok text-[#ff5183] text-xl"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        id="stats"
        className="py-20 bg-gradient-to-r from-[#ff5183] to-[#ff006e]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-2">
              Sản phẩm TikTok Shop uy tín
            </h3>
            <p className="text-white/90">Click vào link để mua hàng ngay!</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/90 text-sm">
                Link TikTok Shop chính thức
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/90 text-sm">Cập nhật sản phẩm mới</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1 Click</div>
              <div className="text-white/90 text-sm">
                Thêm vào giỏ hàng ngay
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/90 text-sm">An toàn & Bảo mật</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING CATEGORIES */}
      <section id="trending-categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <i className="fa-solid fa-fire text-4xl text-orange-500"></i>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Danh mục đang hot
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá những danh mục sản phẩm được tìm kiếm nhiều nhất
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Điện tử',
                icon: 'fa-solid fa-laptop',
                color: 'from-blue-500 to-blue-600',
                count: '500+',
              },
              {
                name: 'Thời trang',
                icon: 'fa-solid fa-shirt',
                color: 'from-pink-500 to-pink-600',
                count: '800+',
              },
              {
                name: 'Làm đẹp',
                icon: 'fa-solid fa-palette',
                color: 'from-purple-500 to-purple-600',
                count: '600+',
              },
              {
                name: 'Nhà cửa',
                icon: 'fa-solid fa-house',
                color: 'from-green-500 to-green-600',
                count: '400+',
              },
            ].map((category, idx) => (
              <a
                key={idx}
                href={`/products?category=${idx + 1}`}
                className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-[#ff5183] text-center transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <i className={`${category.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ff5183] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} sản phẩm
                </p>
                <div className="mt-4 flex items-center justify-center text-[#ff5183] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold mr-2">Xem ngay</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/product-categories"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#ff006e] hover:to-[#ff5183] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
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
              {
                icon: 'fa-solid fa-shield-halved',
                text: 'Link TikTok Shop chính thức',
                color: 'text-green-500',
              },
              {
                icon: 'fa-solid fa-lock',
                text: 'An toàn & Bảo mật',
                color: 'text-blue-500',
              },
              {
                icon: 'fa-solid fa-truck-fast',
                text: 'Giao hàng nhanh chóng',
                color: 'text-orange-500',
              },
              {
                icon: 'fa-solid fa-headset',
                text: 'Hỗ trợ 24/7',
                color: 'text-purple-500',
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <i className={`${badge.icon} ${badge.color} text-4xl mb-4`}></i>
                <p className="text-sm font-semibold text-gray-700">
                  {badge.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="cta"
        className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(255, 81, 131, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 0, 110, 0.3) 0%, transparent 50%)',
            }}
          ></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <i className="fa-brands fa-tiktok text-5xl text-[#ff5183] animate-pulse"></i>
            <h2 className="text-3xl lg:text-5xl font-bold">
              Bắt đầu mua sắm TikTok Shop ngay hôm nay!
            </h2>
          </div>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Khám phá hàng ngàn sản phẩm hot từ TikTok Shop. Chỉ cần click vào
            link sản phẩm để tự động thêm vào giỏ hàng và mua ngay với giá ưu
            đãi nhất!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white px-10 py-5 rounded-xl font-bold text-lg hover:from-[#ff006e] hover:to-[#ff5183] transition-all transform hover:scale-105 inline-flex items-center justify-center gap-3 shadow-2xl"
            >
              <i className="fa-solid fa-shopping-bag text-xl"></i>
              Xem sản phẩm ngay
              <i className="fa-solid fa-arrow-right"></i>
            </a>
            <a
              href="https://www.tiktok.com/@nopete_affiliate"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-3"
            >
              <i className="fa-brands fa-tiktok text-xl"></i>
              Theo dõi TikTok
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-check-circle text-green-400"></i>
                <span className="text-sm">Không cần đăng ký</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-check-circle text-green-400"></i>
                <span className="text-sm">Miễn phí sử dụng</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-check-circle text-green-400"></i>
                <span className="text-sm">100% Link chính thức</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
