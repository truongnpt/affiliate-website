'use client';
import React from 'react';

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">


      {/* Hero - Liquid glass overlay */}
      <section className="relative h-[480px] sm:h-[560px] flex items-center overflow-hidden">
        <img
          src="/images/about-banner.png"
          alt="Thực phẩm khô"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="card-glass rounded-3xl p-8 sm:p-10 max-w-3xl mx-auto inline-block">
            <div className="flex items-center justify-center gap-3 mb-6">
              <i className="fa-solid fa-seedling text-4xl sm:text-5xl text-primary" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Về <span className="text-primary">Thế Giới KHÔ</span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Chuyên thực phẩm khô chất lượng: hạt dinh dưỡng, các loại khô, trái cây sấy. Thêm vào giỏ hàng và mua hàng đơn giản.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="card-glass card-glass-hover rounded-2xl overflow-hidden transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop&q=60"
                  alt="Thực phẩm khô"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 card-glass rounded-2xl p-6 shadow-xl hidden lg:block">
                <p className="text-3xl font-bold text-primary mb-1">5+</p>
                <p className="text-sm uppercase tracking-wider text-gray-600 font-medium">Năm kinh nghiệm</p>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-sm font-semibold text-primary">Về Thế Giới KHÔ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Thực phẩm khô chất lượng – Thêm giỏ hàng & mua ngay
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chào mừng bạn đến với Thế Giới KHÔ! Chúng tôi chuyên cung cấp hạt dinh dưỡng, các loại khô, trái cây sấy với chất lượng đảm bảo. Mọi sản phẩm đều được chọn lọc và đóng gói cẩn thận.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Bạn chỉ cần chọn sản phẩm, thêm vào giỏ hàng và thanh toán. Quy trình mua hàng đơn giản, giao hàng nhanh chóng và an toàn.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card-glass rounded-2xl p-5 border-l-4 border-primary">
                  <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-seedling text-primary" />
                    Mục tiêu
                  </h5>
                  <p className="text-sm text-gray-600">Mang thực phẩm khô chất lượng đến mọi gia đình với giá hợp lý.</p>
                </div>
                <div className="card-glass rounded-2xl p-5 border-l-4 border-primary">
                  <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-handshake text-primary" />
                    Cam kết
                  </h5>
                  <p className="text-sm text-gray-600">Chất lượng, an toàn thực phẩm và giao hàng đúng hẹn.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thế Giới KHÔ</h3>
              <p className="text-gray-600">Thực phẩm khô đáng tin cậy</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '100%', label: 'Chất lượng' },
                { value: '1 Click', label: 'Thêm giỏ hàng' },
                { value: '24/7', label: 'Cập nhật sản phẩm' },
                { value: '100%', label: 'An toàn & Bảo mật' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{item.value}</div>
                  <div className="text-gray-600 text-sm lg:text-base">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Tại sao chọn Thế Giới KHÔ?</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Những lý do bạn có thể tin tưởng khi mua thực phẩm khô tại chúng tôi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'fa-solid fa-seedling', title: 'Thực phẩm khô chất lượng', desc: 'Sản phẩm được chọn lọc, đóng gói đảm bảo vệ sinh và an toàn thực phẩm.' },
              { icon: 'fa-solid fa-cart-shopping', title: 'Thêm giỏ hàng & mua đơn giản', desc: 'Chọn sản phẩm, thêm vào giỏ hàng và thanh toán. Quy trình nhanh chóng, dễ dàng.' },
              { icon: 'fa-solid fa-star', title: 'Giao hàng tận nơi', desc: 'Đóng gói cẩn thận, giao hàng nhanh. Hỗ trợ đổi trả theo chính sách.' },
            ].map((item) => (
              <div key={item.title} className="card-glass card-glass-hover rounded-2xl p-8 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-6">
                  <i className={item.icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Cách thức mua hàng</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Mua thực phẩm khô tại Thế Giới KHÔ chỉ cần 3 bước</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Chọn sản phẩm', desc: 'Duyệt danh mục hạt, khô, trái cây sấy và chọn sản phẩm phù hợp.' },
              { step: 2, title: 'Thêm vào giỏ hàng', desc: 'Thêm sản phẩm vào giỏ hàng, điều chỉnh số lượng theo nhu cầu.' },
              { step: 3, title: 'Thanh toán & nhận hàng', desc: 'Hoàn tất thanh toán. Chúng tôi giao hàng tận nơi, đóng gói cẩn thận.' },
            ].map((item) => (
              <div key={item.step} className="card-glass card-glass-hover rounded-2xl p-8 text-center transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg shadow-primary/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
