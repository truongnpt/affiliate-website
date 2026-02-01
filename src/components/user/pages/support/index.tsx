'use client';
import React, { useState } from 'react';

const Support = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => setActiveFaq(activeFaq === index ? null : index);

  const supportTopics = [
    { icon: 'fa-solid fa-cart-shopping', title: 'Cách mua hàng', desc: 'Hướng dẫn thêm sản phẩm vào giỏ hàng và thanh toán đơn giản' },
    { icon: 'fa-solid fa-link', title: 'Link sản phẩm', desc: 'Tìm hiểu về link sản phẩm và cách sử dụng an toàn' },
    { icon: 'fa-solid fa-basket-shopping', title: 'Thêm vào giỏ hàng', desc: 'Hướng dẫn thêm sản phẩm vào giỏ hàng và điều chỉnh số lượng' },
    { icon: 'fa-solid fa-shield-halved', title: 'An toàn & Bảo mật', desc: 'Thông tin về thanh toán an toàn và bảo mật thông tin' },
    { icon: 'fa-solid fa-box', title: 'Sản phẩm & Danh mục', desc: 'Tìm kiếm sản phẩm, xem danh mục và chọn sản phẩm phù hợp' },
    { icon: 'fa-solid fa-headset', title: 'Liên hệ & Hỗ trợ', desc: 'Cách liên hệ với chúng tôi nếu cần hỗ trợ thêm' },
  ];

  const faqs = [
    { question: 'Làm thế nào để mua thực phẩm khô trên website?', answer: 'Rất đơn giản! Bạn chọn sản phẩm, thêm vào giỏ hàng và thanh toán. Có thể xem chi tiết sản phẩm trước khi thêm vào giỏ hoặc mua ngay qua link sản phẩm.' },
    { question: 'Thanh toán và giao hàng có an toàn không?', answer: 'Chúng tôi cam kết thanh toán an toàn và bảo mật thông tin. Giao hàng tận nơi, đóng gói cẩn thận. Bạn có thể liên hệ hỗ trợ bất cứ lúc nào.' },
    { question: 'Tôi có cần đăng ký tài khoản để mua hàng không?', answer: 'Bạn có thể thêm vào giỏ hàng và tiến hành thanh toán theo hướng dẫn trên website. Nếu có yêu cầu đăng nhập từ trang thanh toán, vui lòng làm theo hướng dẫn.' },
    { question: 'Làm sao để tìm sản phẩm thực phẩm khô phù hợp?', answer: 'Bạn có thể duyệt theo danh mục (hạt dinh dưỡng, các loại khô, trái cây sấy), tìm kiếm trên trang sản phẩm hoặc xem các sản phẩm nổi bật trên trang chủ.' },
    { question: 'Chính sách đổi trả như thế nào?', answer: 'Vui lòng xem chi tiết tại trang Điều khoản dịch vụ. Nếu sản phẩm lỗi hoặc không đúng mô tả, liên hệ chúng tôi qua trang Liên hệ để được hỗ trợ.' },
    { question: 'Tôi gặp lỗi khi thanh toán hoặc thêm giỏ hàng thì sao?', answer: 'Bạn vui lòng gửi yêu cầu hỗ trợ qua form Liên hệ hoặc Trung tâm hỗ trợ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-20">


      {/* Page Header - Liquid glass */}
      <div className="relative overflow-hidden pt-14">
        <div className="absolute inset-0 " />
        <div className="relative max-w-7xl mx-auto py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <i className="fa-solid fa-headset text-primary" />
              <span className="text-sm font-semibold text-primary">Hỗ trợ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Trung tâm hỗ trợ</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Chúng tôi sẵn sàng giúp bạn mua thực phẩm khô và sử dụng website dễ dàng nhất
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi về mua hàng, giỏ hàng, thanh toán..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-gray-900 transition-all"
              />
              <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportTopics.map((topic, idx) => (
            <div key={idx} className="card-glass card-glass-hover rounded-2xl p-8 flex flex-col items-center text-center group transition-all duration-300 animate-product-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <i className={topic.icon} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{topic.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{topic.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="card-glass rounded-2xl p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Gửi yêu cầu hỗ trợ</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Chủ đề</label>
              <select className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                <option>Vấn đề về link sản phẩm</option>
                <option>Hướng dẫn mua hàng</option>
                <option>Thêm vào giỏ hàng không được</option>
                <option>Chất lượng sản phẩm</option>
                <option>Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung chi tiết</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
            </div>
            <button type="button" className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold transition-all duration-300">
              Gửi yêu cầu
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <i className="fa-solid fa-circle-question text-3xl text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Câu hỏi thường gặp</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card-glass rounded-2xl overflow-hidden transition-all duration-300">
                <button onClick={() => toggleFaq(idx)} className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/30 transition-colors">
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <i className={`fa-solid fa-chevron-down text-primary transition-transform duration-300 flex-shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-96 py-4' : 'max-h-0 py-0'}`} style={{ overflow: 'hidden' }}>
                  <div className="flex items-start gap-3 bg-white/30 rounded-xl p-4">
                    <i className="fa-solid fa-circle-check text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 card-glass rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-primary p-3 rounded-xl text-white flex-shrink-0">
              <i className="fa-solid fa-headset text-2xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">Vẫn cần trợ giúp?</h4>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">Nếu bạn vẫn còn thắc mắc, đừng ngần ngại liên hệ. Chúng tôi sẵn sàng hỗ trợ!</p>
              <a href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-hover transition-all text-sm">
                <i className="fa-solid fa-envelope" />
                Gửi tin nhắn
              </a>
            </div>
          </div>

          <div className="mt-6 card-glass rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-link text-primary" />
              Liên kết hữu ích
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: '/products', icon: 'fa-solid fa-shopping-bag', label: 'Xem sản phẩm' },
                { href: '/product-categories', icon: 'fa-solid fa-tags', label: 'Danh mục' },
                { href: '/about', icon: 'fa-solid fa-info-circle', label: 'Về chúng tôi' },
                { href: '/blogs', icon: 'fa-solid fa-blog', label: 'Blog' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-gray-600 hover:text-primary hover:bg-white/60 transition-all text-sm font-medium">
                  <i className={item.icon} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Support;
