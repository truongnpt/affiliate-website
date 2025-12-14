'use client';
import React from 'react';

const About = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <i className="fa-brands fa-tiktok text-5xl text-[#ff5183]"></i>
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              Về <span className="text-[#ff5183]">NờPêTê TikTok Shop</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Nơi cung cấp link sản phẩm TikTok Shop chính thức. Click vào link để
            tự động thêm vào giỏ hàng và mua ngay với giá tốt nhất!
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60"
                  alt="Our Team"
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-[#ff5183] text-white p-8 rounded-xl hidden lg:block shadow-xl">
                <p className="text-4xl font-bold mb-1">5+</p>
                <p className="text-sm uppercase tracking-wider">
                  Năm kinh nghiệm
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-[#ff5183] font-bold uppercase tracking-widest mb-2">
                Về NờPêTê TikTok Shop
              </h4>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Mua sắm dễ dàng với TikTok Shop - Chỉ cần click và mua
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chào mừng bạn đến với NờPêTê TikTok Shop! Đây là nơi tôi tập hợp
                và chia sẻ những sản phẩm chất lượng từ TikTok Shop. Tất cả các
                sản phẩm đều được tôi chọn lọc kỹ lưỡng từ kênh TikTok của mình
                để đảm bảo chất lượng tốt nhất cho bạn.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Với một click duy nhất vào link sản phẩm, bạn sẽ được tự động
                chuyển đến TikTok Shop và sản phẩm sẽ được thêm vào giỏ hàng.
                Quá trình mua sắm trở nên nhanh chóng, tiện lợi và an toàn 100%
                vì tất cả đều là link chính thức từ TikTok Shop.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border-l-4 border-[#ff5183] pl-4">
                  <h5 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
                    Mục tiêu
                  </h5>
                  <p className="text-sm text-gray-600">
                    Giúp bạn tìm và mua những sản phẩm tốt nhất từ TikTok Shop
                    một cách dễ dàng và nhanh chóng nhất.
                  </p>
                </div>
                <div className="border-l-4 border-[#ff5183] pl-4">
                  <h5 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <i className="fa-solid fa-handshake text-[#ff5183]"></i>
                    Cam kết
                  </h5>
                  <p className="text-sm text-gray-600">
                    100% link chính thức TikTok Shop, an toàn, uy tín và hỗ trợ
                    bạn mua sắm tốt nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="bg-gradient-to-r from-[#ff5183] to-[#ff006e] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-2">NờPêTê TikTok Shop</h3>
            <p className="text-white/90">Nơi mua sắm đáng tin cậy</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">100%</div>
              <div className="text-white/90 text-sm lg:text-base">
                Link TikTok Shop chính thức
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">1 Click</div>
              <div className="text-white/90 text-sm lg:text-base">
                Thêm vào giỏ hàng ngay
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <div className="text-white/90 text-sm lg:text-base">
                Cập nhật sản phẩm mới
              </div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">100%</div>
              <div className="text-white/90 text-sm lg:text-base">
                An toàn & Bảo mật
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn NờPêTê TikTok Shop?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những lý do khiến bạn nên tin tưởng và sử dụng website của chúng
              tôi để mua sắm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#ff5183]/10 rounded-xl flex items-center justify-center text-[#ff5183] text-2xl mb-6">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Link TikTok Shop chính thức
              </h3>
              <p className="text-gray-600">
                Tất cả link sản phẩm đều là link chính thức từ TikTok Shop, đảm
                bảo 100% an toàn và uy tín. Bạn không cần lo lắng về link giả
                mạo hay lừa đảo.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#ff5183]/10 rounded-xl flex items-center justify-center text-[#ff5183] text-2xl mb-6">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Mua hàng siêu nhanh
              </h3>
              <p className="text-gray-600">
                Chỉ cần 1 click vào link sản phẩm, bạn sẽ được tự động chuyển
                đến TikTok Shop và sản phẩm được thêm vào giỏ hàng ngay lập tức.
                Mua sắm trở nên đơn giản và nhanh chóng hơn bao giờ hết.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-[#ff5183]/10 rounded-xl flex items-center justify-center text-[#ff5183] text-2xl mb-6">
                <i className="fa-solid fa-star"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Sản phẩm được chọn lọc
              </h3>
              <p className="text-gray-600">
                Tất cả sản phẩm đều được tôi chọn lọc kỹ lưỡng từ kênh TikTok
                của mình, đảm bảo chất lượng và phù hợp với nhu cầu của bạn. Chỉ
                những sản phẩm tốt mới được đăng trên website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cách thức hoạt động
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mua sắm với NờPêTê TikTok Shop chỉ cần 3 bước đơn giản
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#ff5183] to-[#ff006e] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Xem sản phẩm
              </h3>
              <p className="text-gray-600">
                Duyệt qua danh sách sản phẩm được chọn lọc từ TikTok Shop trên
                website của chúng tôi.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#ff5183] to-[#ff006e] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Click vào link
              </h3>
              <p className="text-gray-600">
                Click vào nút "CLICK XEM SẢN PHẨM" trên card sản phẩm để mở
                TikTok Shop.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-[#ff5183] to-[#ff006e] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Thêm giỏ hàng & Mua
              </h3>
              <p className="text-gray-600">
                Sản phẩm sẽ tự động được thêm vào giỏ hàng TikTok Shop của bạn.
                Hoàn tất thanh toán và nhận hàng!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TikTok Channel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Theo dõi kênh TikTok của tôi
          </h2>
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#ff5183] to-[#ff006e] rounded-2xl p-8 md:p-12 text-white">
            <div className="flex items-center justify-center gap-4 mb-6">
              <i className="fa-brands fa-tiktok text-5xl"></i>
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-1">@nopete_affiliate</h3>
                <p className="text-white/90">Kênh TikTok chính thức</p>
              </div>
            </div>
            <p className="text-lg mb-8 text-white/90 leading-relaxed">
              Tất cả sản phẩm trên website đều được chọn lọc từ kênh TikTok của
              tôi. Theo dõi kênh để xem video review sản phẩm và cập nhật những
              sản phẩm hot nhất!
            </p>
            <a
              href="https://www.tiktok.com/@nopete_affiliate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#ff5183] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
            >
              <i className="fa-brands fa-tiktok text-2xl"></i>
              Theo dõi kênh TikTok
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Sản phẩm được cập nhật từ TikTok
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#ff5183]/10 rounded-lg flex items-center justify-center text-[#ff5183] text-xl mb-4">
                  <i className="fa-solid fa-video"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Video review thực tế
                </h4>
                <p className="text-gray-600 text-sm">
                  Xem video review chi tiết sản phẩm trên TikTok trước khi quyết
                  định mua.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#ff5183]/10 rounded-lg flex items-center justify-center text-[#ff5183] text-xl mb-4">
                  <i className="fa-solid fa-fire"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Sản phẩm hot trending
                </h4>
                <p className="text-gray-600 text-sm">
                  Cập nhật những sản phẩm đang được nhiều người quan tâm và mua
                  nhất.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-[#ff5183]/10 rounded-lg flex items-center justify-center text-[#ff5183] text-xl mb-4">
                  <i className="fa-solid fa-check-circle"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">
                  Chất lượng đảm bảo
                </h4>
                <p className="text-gray-600 text-sm">
                  Chỉ chia sẻ những sản phẩm đã được kiểm chứng chất lượng và uy
                  tín.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
