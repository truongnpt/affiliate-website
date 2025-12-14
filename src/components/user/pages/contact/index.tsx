'use client';
import React from 'react';

const Contact = () => {
  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <i className="fa-brands fa-tiktok text-5xl animate-pulse"></i>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Liên hệ NờPêTê TikTok Shop
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
            Chúng tôi sẵn sàng hỗ trợ bạn về việc sử dụng website, mua hàng trên
            TikTok Shop, hoặc bất kỳ thắc mắc nào về sản phẩm. Hãy để lại tin
            nhắn và chúng tôi sẽ phản hồi sớm nhất!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 text-sm">
              <i className="fa-solid fa-headset text-yellow-300"></i>
              <span>Hỗ trợ nhanh chóng</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 text-sm">
              <i className="fa-solid fa-reply text-green-300"></i>
              <span>Phản hồi trong 24h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="bg-white rounded-2xl shadow-[0_0_15px_0_rgba(0,0,0,0.1)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info Section */}
            <div className="bg-gradient-to-br from-[#ff5183] to-[#ff006e] p-12 text-white">
              <div className="flex items-center gap-3 mb-8">
                <i className="fa-brands fa-tiktok text-3xl"></i>
                <h2 className="text-2xl font-bold">Thông tin liên hệ</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fa-brands fa-tiktok text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Kênh TikTok</h3>
                    <a
                      href="https://www.tiktok.com/@nopete_affiliate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 hover:text-white hover:underline transition-colors"
                    >
                      @nopete_affiliate
                    </a>
                    <p className="text-white/80 text-sm mt-1">
                      Theo dõi để xem video review sản phẩm
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:support@nopeteaffiliate.com"
                      className="text-white/90 hover:text-white hover:underline transition-colors block"
                    >
                      support@nopeteaffiliate.com
                    </a>
                    <p className="text-white/80 text-sm mt-1">
                      Gửi email để được hỗ trợ
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-circle-question text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Trung tâm hỗ trợ</h3>
                    <a
                      href="/support"
                      className="text-white/90 hover:text-white hover:underline transition-colors block"
                    >
                      Xem FAQ & Hướng dẫn
                    </a>
                    <p className="text-white/80 text-sm mt-1">
                      Tìm câu trả lời nhanh cho câu hỏi của bạn
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-share-nodes"></i>
                  Kết nối với chúng tôi
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.tiktok.com/@nopete_affiliate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/20 hover:bg-white hover:text-[#ff5183] rounded-xl flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                    title="Kênh TikTok"
                  >
                    <i className="fa-brands fa-tiktok text-xl"></i>
                  </a>
                  <a
                    href="/products"
                    className="w-12 h-12 bg-white/20 hover:bg-white hover:text-[#ff5183] rounded-xl flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                    title="Xem sản phẩm"
                  >
                    <i className="fa-solid fa-shopping-bag text-xl"></i>
                  </a>
                  <a
                    href="/blogs"
                    className="w-12 h-12 bg-white/20 hover:bg-white hover:text-[#ff5183] rounded-xl flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
                    title="Blog"
                  >
                    <i className="fa-solid fa-blog text-xl"></i>
                  </a>
                </div>
              </div>

              {/* Quick Help */}
              <div className="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-lightbulb text-yellow-300 text-xl mt-1"></i>
                  <div>
                    <h4 className="font-bold mb-1">Mẹo nhanh</h4>
                    <p className="text-white/90 text-sm">
                      Để được hỗ trợ nhanh nhất, vui lòng mô tả chi tiết vấn đề
                      của bạn. Nếu là vấn đề về mua hàng trên TikTok Shop, vui
                      lòng liên hệ trực tiếp với TikTok Shop.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="p-12 bg-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff5183] to-[#ff006e] rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-paper-plane text-white text-xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Gửi tin nhắn cho chúng tôi
                </h2>
              </div>
              <p className="text-gray-600 mb-8 text-sm">
                Điền thông tin bên dưới, chúng tôi sẽ phản hồi bạn trong vòng 24
                giờ
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                    >
                      <i className="fa-solid fa-user text-gray-400 text-xs"></i>
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183] transition-colors bg-gray-50 focus:bg-white"
                      placeholder="Nhập họ và tên của bạn"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                    >
                      <i className="fa-solid fa-envelope text-gray-400 text-xs"></i>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183] transition-colors bg-gray-50 focus:bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-tag text-gray-400 text-xs"></i>
                    Chủ đề cần hỗ trợ
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183] transition-colors bg-gray-50 focus:bg-white"
                  >
                    <option value="">-- Chọn chủ đề --</option>
                    <option value="link-product">
                      Vấn đề về link sản phẩm TikTok Shop
                    </option>
                    <option value="how-to-buy">
                      Hướng dẫn mua hàng trên TikTok Shop
                    </option>
                    <option value="add-cart">
                      Không thể thêm vào giỏ hàng
                    </option>
                    <option value="product-info">Thắc mắc về sản phẩm</option>
                    <option value="website">Vấn đề về website</option>
                    <option value="tiktok-channel">
                      Câu hỏi về kênh TikTok
                    </option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-message text-gray-400 text-xs"></i>
                    Nội dung tin nhắn
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183] transition-colors bg-gray-50 focus:bg-white resize-none"
                    placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn. Nếu liên quan đến việc mua hàng trên TikTok Shop, vui lòng cung cấp thêm thông tin như link sản phẩm, thời gian gặp vấn đề..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    Vui lòng mô tả chi tiết để chúng tôi có thể hỗ trợ bạn tốt
                    nhất
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white py-4 rounded-lg font-bold text-lg hover:from-[#ff006e] hover:to-[#ff5183] transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                  Gửi tin nhắn
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <i className="fa-solid fa-info-circle text-[#ff5183] mt-0.5"></i>
                  <p>
                    <strong className="text-gray-900">Lưu ý:</strong> Nếu bạn
                    gặp vấn đề khi mua hàng trên TikTok Shop (thanh toán, giao
                    hàng, đổi trả), vui lòng liên hệ trực tiếp với{' '}
                    <a
                      href="https://www.tiktok.com/shop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ff5183] hover:underline"
                    >
                      TikTok Shop Support
                    </a>{' '}
                    vì giao dịch được thực hiện trên nền tảng TikTok Shop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/support"
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-[#ff5183] group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#ff5183]/10 to-[#ff006e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#ff5183] group-hover:to-[#ff006e] transition-all">
              <i className="fa-solid fa-circle-question text-2xl text-[#ff5183] group-hover:text-white transition-colors"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ff5183] transition-colors">
              Trung tâm hỗ trợ
            </h3>
            <p className="text-gray-600 text-sm">
              Xem FAQ và hướng dẫn chi tiết về cách sử dụng website và mua hàng
              TikTok Shop
            </p>
          </a>

          <a
            href="/products"
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-[#ff5183] group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#ff5183]/10 to-[#ff006e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#ff5183] group-hover:to-[#ff006e] transition-all">
              <i className="fa-solid fa-shopping-bag text-2xl text-[#ff5183] group-hover:text-white transition-colors"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ff5183] transition-colors">
              Xem sản phẩm
            </h3>
            <p className="text-gray-600 text-sm">
              Khám phá hàng ngàn sản phẩm TikTok Shop và click vào link để mua
              ngay
            </p>
          </a>

          <a
            href="https://www.tiktok.com/@nopete_affiliate"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-[#ff5183] group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-[#ff5183]/10 to-[#ff006e]/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-[#ff5183] group-hover:to-[#ff006e] transition-all">
              <i className="fa-brands fa-tiktok text-2xl text-[#ff5183] group-hover:text-white transition-colors"></i>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ff5183] transition-colors">
              Kênh TikTok
            </h3>
            <p className="text-gray-600 text-sm">
              Theo dõi @nopete_affiliate để xem video review sản phẩm và cập
              nhật hot nhất
            </p>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Contact;
