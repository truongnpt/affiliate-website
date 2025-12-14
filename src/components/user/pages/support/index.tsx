'use client';
import React, { useState } from 'react';

const Support = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const supportTopics = [
    {
      icon: 'fa-brands fa-tiktok',
      title: 'Cách mua hàng TikTok Shop',
      desc: 'Hướng dẫn click vào link sản phẩm và thêm vào giỏ hàng TikTok Shop',
    },
    {
      icon: 'fa-solid fa-link',
      title: 'Link sản phẩm TikTok Shop',
      desc: 'Tìm hiểu về link sản phẩm chính thức và cách sử dụng an toàn',
    },
    {
      icon: 'fa-solid fa-cart-shopping',
      title: 'Thêm vào giỏ hàng',
      desc: 'Hướng dẫn chi tiết cách thêm sản phẩm vào giỏ hàng TikTok Shop',
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'An toàn & Bảo mật',
      desc: 'Thông tin về tính an toàn của link TikTok Shop và bảo mật thông tin',
    },
    {
      icon: 'fa-solid fa-box',
      title: 'Sản phẩm & Danh mục',
      desc: 'Tìm kiếm sản phẩm, xem danh mục và chọn sản phẩm phù hợp',
    },
    {
      icon: 'fa-solid fa-headset',
      title: 'Liên hệ & Hỗ trợ',
      desc: 'Cách liên hệ với chúng tôi nếu cần hỗ trợ thêm',
    },
  ];

  const faqs = [
    {
      question: 'Làm thế nào để mua sản phẩm trên TikTok Shop qua website này?',
      answer:
        'Rất đơn giản! Bạn chỉ cần tìm sản phẩm muốn mua trên website, click vào nút "CLICK XEM SẢN PHẨM" hoặc link sản phẩm. Link sẽ tự động mở TikTok Shop và sản phẩm sẽ được thêm vào giỏ hàng của bạn. Sau đó bạn chỉ cần hoàn tất thanh toán trên TikTok Shop.',
    },
    {
      question:
        'Link sản phẩm có an toàn không? Tất cả đều là link chính thức TikTok Shop?',
      answer:
        '100% an toàn! Tất cả link sản phẩm trên website đều là link chính thức từ TikTok Shop. Chúng tôi cam kết chỉ cung cấp link chính thức, đảm bảo an toàn và uy tín cho người mua hàng. Bạn có thể yên tâm click vào bất kỳ link sản phẩm nào trên website.',
    },
    {
      question: 'Tôi cần đăng nhập TikTok Shop để mua hàng không?',
      answer:
        'Có, bạn cần có tài khoản TikTok và đăng nhập TikTok Shop để hoàn tất mua hàng. Khi click vào link sản phẩm, nếu chưa đăng nhập, TikTok Shop sẽ yêu cầu bạn đăng nhập. Sau khi đăng nhập, sản phẩm sẽ tự động được thêm vào giỏ hàng.',
    },
    {
      question: 'Làm sao để tìm sản phẩm phù hợp với nhu cầu của tôi?',
      answer:
        'Bạn có thể tìm kiếm sản phẩm bằng cách: (1) Sử dụng thanh tìm kiếm trên trang sản phẩm, (2) Lọc theo danh mục sản phẩm, (3) Xem các sản phẩm hot trending, (4) Đọc blog review để tham khảo. Tất cả sản phẩm đều được chọn lọc từ TikTok Shop và có link mua hàng trực tiếp.',
    },
    {
      question: 'Tôi có thể xem video review sản phẩm ở đâu?',
      answer:
        'Tất cả sản phẩm trên website đều được chọn lọc từ kênh TikTok @nopete_affiliate của chúng tôi. Bạn có thể theo dõi kênh TikTok để xem video review chi tiết các sản phẩm. Link kênh TikTok có sẵn trên website và footer.',
    },
    {
      question: 'Nếu tôi gặp vấn đề khi mua hàng trên TikTok Shop thì sao?',
      answer:
        'Nếu bạn gặp vấn đề khi mua hàng (như link không hoạt động, sản phẩm hết hàng, vấn đề thanh toán), vui lòng liên hệ trực tiếp với TikTok Shop vì giao dịch được thực hiện trên nền tảng TikTok Shop. Ngoài ra, bạn cũng có thể gửi yêu cầu hỗ trợ cho chúng tôi qua form liên hệ trên trang này.',
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-[#ff5183] to-[#ff006e] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <i className="fa-brands fa-tiktok text-5xl animate-pulse"></i>
            <h1 className="text-3xl lg:text-5xl font-bold text-white">
              Trung tâm hỗ trợ TikTok Shop
            </h1>
          </div>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Chúng tôi sẵn sàng giúp bạn sử dụng website và mua sắm trên TikTok
            Shop một cách dễ dàng nhất
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi về TikTok Shop, cách mua hàng, link sản phẩm..."
              className="w-full pl-12 pr-4 py-4 rounded-full shadow-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <i className="fa-solid fa-search absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportTopics.map((topic, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer flex flex-col items-center text-center group border border-gray-100 hover:border-[#ff5183] transform hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff5183]/10 to-[#ff006e]/10 text-[#ff5183] rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-gradient-to-br group-hover:from-[#ff5183] group-hover:to-[#ff006e] group-hover:text-white transition-all shadow-sm group-hover:shadow-lg">
                <i className={topic.icon}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#ff5183] transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {topic.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Gửi yêu cầu hỗ trợ
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chủ đề
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent">
                <option>Vấn đề về link sản phẩm TikTok Shop</option>
                <option>Hướng dẫn mua hàng</option>
                <option>Thêm vào giỏ hàng không được</option>
                <option>Chất lượng sản phẩm</option>
                <option>Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung chi tiết
              </label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#ff5183] focus:border-transparent"
              ></textarea>
            </div>
            <button className="w-full bg-[#ff5183] text-white py-3 rounded-lg font-bold hover:bg-[#ff5183]/80 transition-colors">
              Gửi yêu cầu
            </button>
          </form>
        </div>

        {/* FAQ Accordion */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <i className="fa-solid fa-circle-question text-3xl text-[#ff5183]"></i>
            <h2 className="text-2xl font-bold text-gray-900">
              Câu hỏi thường gặp về TikTok Shop
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden border border-gray-100 hover:border-[#ff5183]/30 transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <i
                    className={`fa-solid fa-chevron-down text-[#ff5183] transition-transform duration-300 flex-shrink-0 ${activeFaq === idx ? 'transform rotate-180' : ''}`}
                  ></i>
                </button>
                <div
                  className={`px-6 text-gray-600 bg-gradient-to-b from-gray-50 to-white transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-green-500 mt-1 flex-shrink-0"></i>
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-gradient-to-r from-[#ff5183]/10 to-[#ff006e]/10 p-6 rounded-xl flex items-start space-x-4 border-2 border-[#ff5183]/20">
            <div className="bg-gradient-to-br from-[#ff5183] to-[#ff006e] p-3 rounded-xl text-white shadow-lg">
              <i className="fa-solid fa-headset text-2xl"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">
                Vẫn cần trợ giúp?
              </h4>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Nếu bạn vẫn còn thắc mắc về cách sử dụng website hoặc mua hàng
                trên TikTok Shop, đừng ngần ngại liên hệ với chúng tôi. Chúng
                tôi sẵn sàng hỗ trợ bạn!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#ff5183] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#ff006e] transition-colors text-sm"
                >
                  <i className="fa-solid fa-envelope"></i>
                  Gửi tin nhắn
                </a>
                <a
                  href="https://www.tiktok.com/@nopete_affiliate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#ff5183] text-[#ff5183] px-5 py-2.5 rounded-lg font-semibold hover:bg-[#ff5183]/5 transition-colors text-sm"
                >
                  <i className="fa-brands fa-tiktok"></i>
                  Kênh TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-link text-[#ff5183]"></i>
              Liên kết hữu ích
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/products"
                className="flex items-center gap-2 text-gray-600 hover:text-[#ff5183] transition-colors text-sm font-medium p-2 rounded-lg hover:bg-[#ff5183]/5"
              >
                <i className="fa-solid fa-shopping-bag"></i>
                Xem sản phẩm
              </a>
              <a
                href="/product-categories"
                className="flex items-center gap-2 text-gray-600 hover:text-[#ff5183] transition-colors text-sm font-medium p-2 rounded-lg hover:bg-[#ff5183]/5"
              >
                <i className="fa-solid fa-tags"></i>
                Danh mục
              </a>
              <a
                href="/about"
                className="flex items-center gap-2 text-gray-600 hover:text-[#ff5183] transition-colors text-sm font-medium p-2 rounded-lg hover:bg-[#ff5183]/5"
              >
                <i className="fa-solid fa-info-circle"></i>
                Về chúng tôi
              </a>
              <a
                href="/blogs"
                className="flex items-center gap-2 text-gray-600 hover:text-[#ff5183] transition-colors text-sm font-medium p-2 rounded-lg hover:bg-[#ff5183]/5"
              >
                <i className="fa-solid fa-blog"></i>
                Blog
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Support;
