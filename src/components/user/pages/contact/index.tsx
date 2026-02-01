'use client';
import React, { useState } from 'react';
import { contactFormTemplate } from '@/email-templates/contact-form';

const Contact = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const body = contactFormTemplate(form.get("name"), form.get("email"), form.get("message"));

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        body: JSON.stringify({ subject: 'Contact from website', html: body }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.');
      } else {
        setError('Lỗi kết nối. Vui lòng thử lại.');
      }
    } catch (error) {
      setError('Lỗi kết nối. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-20">


      {/* Page Header - Liquid glass */}
      <div className="relative overflow-hidden pt-14">
        <div className="absolute inset-0 " />
        <div className="relative max-w-7xl mx-auto py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <i className="fa-solid fa-envelope text-primary" />
              <span className="text-sm font-semibold text-primary">Liên hệ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Liên hệ Thế Giới KHÔ</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
              Chúng tôi sẵn sàng hỗ trợ bạn về mua thực phẩm khô, giỏ hàng, thanh toán hoặc bất kỳ thắc mắc nào. Hãy để lại tin nhắn và chúng tôi sẽ phản hồi sớm nhất!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-sm text-gray-700">
                <i className="fa-solid fa-headset text-primary" />
                Hỗ trợ nhanh
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-sm text-gray-700">
                <i className="fa-solid fa-reply text-primary" />
                Phản hồi trong 24h
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="card-glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-primary to-primary-hover p-8 sm:p-12 text-white">
              <div className="flex items-center gap-3 mb-8">
                <i className="fa-solid fa-seedling text-3xl" />
                <h2 className="text-xl sm:text-2xl font-bold">Thông tin liên hệ</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/20 transition-all">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-envelope text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <a href="mailto:support@nopeteaffiliate.com" className="text-white/90 hover:text-white hover:underline transition-colors block">
                      support@nopeteaffiliate.com
                    </a>
                    <p className="text-white/80 text-sm mt-1">Gửi email để được hỗ trợ</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/20 transition-all">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-circle-question text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Trung tâm hỗ trợ</h3>
                    <a href="/support" className="text-white/90 hover:text-white hover:underline transition-colors block">
                      Xem FAQ & Hướng dẫn
                    </a>
                    <p className="text-white/80 text-sm mt-1">Tìm câu trả lời nhanh cho câu hỏi của bạn</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">Kết nối với chúng tôi</h3>
                <div className="flex gap-3">
                  <a href="/products" className="w-12 h-12 bg-white/20 hover:bg-white hover:text-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110" title="Xem sản phẩm">
                    <i className="fa-solid fa-shopping-bag text-xl" />
                  </a>
                  <a href="/blogs" className="w-12 h-12 bg-white/20 hover:bg-white hover:text-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110" title="Blog">
                    <i className="fa-solid fa-blog text-xl" />
                  </a>
                </div>
              </div>
              <div className="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-lightbulb text-yellow-300 text-xl mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Mẹo nhanh</h4>
                    <p className="text-white/90 text-sm">Để được hỗ trợ nhanh nhất, vui lòng mô tả chi tiết vấn đề của bạn (đơn hàng, thanh toán, giao hàng...).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 sm:p-12 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-paper-plane text-white text-xl" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Gửi tin nhắn cho chúng tôi</h2>
              </div>
              <p className="text-gray-600 mb-8 text-sm">Điền thông tin bên dưới, chúng tôi sẽ phản hồi bạn trong vòng 24 giờ</p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                    <input type="text" id="name" name="name" placeholder="Nhập họ và tên" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" name="email" placeholder="your.email@example.com" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">Chủ đề cần hỗ trợ</label>
                  <select id="subject" name="subject" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                    <option value="">-- Chọn chủ đề --</option>
                    <option value="link-product">Vấn đề về link sản phẩm</option>
                    <option value="how-to-buy">Hướng dẫn mua hàng</option>
                    <option value="add-cart">Không thể thêm vào giỏ hàng</option>
                    <option value="product-info">Thắc mắc về sản phẩm</option>
                    <option value="website">Vấn đề về website</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Nội dung tin nhắn</label>
                  <textarea id="message" name="message" rows={5} placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..." className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
                  <p className="text-xs text-gray-500 mt-1">Vui lòng mô tả chi tiết để chúng tôi có thể hỗ trợ bạn tốt nhất</p>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02]">
                  {loading ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-paper-plane" />}
                  {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                </button>
                {error && <div className="text-red-500 text-sm mt-2 p-2 rounded-lg bg-red-50"><i className="fa-solid fa-exclamation-circle mr-2" />{error}</div>}
                {success && <div className="text-green-500 text-sm mt-2 p-2 rounded-lg bg-green-50"><i className="fa-solid fa-check-circle mr-2" />{success}</div>}
              </form>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <i className="fa-solid fa-info-circle text-primary mt-0.5" />
                  <p><strong className="text-gray-900">Lưu ý:</strong> Nếu bạn gặp vấn đề khi mua hàng, vui lòng mô tả chi tiết trong tin nhắn để chúng tôi hỗ trợ nhanh nhất.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { href: '/support', icon: 'fa-solid fa-circle-question', title: 'Trung tâm hỗ trợ', desc: 'Xem FAQ và hướng dẫn chi tiết về cách sử dụng website và mua hàng' },
            { href: '/products', icon: 'fa-solid fa-shopping-bag', title: 'Xem sản phẩm', desc: 'Khám phá thực phẩm khô chất lượng, thêm giỏ hàng và mua ngay' },
            { href: '/blogs', icon: 'fa-solid fa-blog', title: 'Blog', desc: 'Đọc bài viết về thực phẩm khô, mẹo mua hàng và ưu đãi' },
          ].map((item) => (
            <a key={item.title} href={item.href} className="card-glass card-glass-hover rounded-2xl p-6 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
                <i className={`${item.icon} text-2xl text-primary group-hover:text-white transition-colors`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Contact;
