'use client';
import React from 'react';

const Terms = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-20">


      {/* Page Header - Liquid glass */}
      <div className="relative overflow-hidden pt-14">
        <div className="absolute inset-0 " />
        <div className="relative max-w-7xl mx-auto py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <i className="fa-solid fa-file-lines text-primary" />
              <span className="text-sm font-semibold text-primary">Pháp lý</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Điều khoản Dịch vụ</h1>
            <p className="text-gray-600">Cập nhật lần cuối: 14/12/2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="card-glass rounded-2xl p-8 sm:p-12">
          <p className="text-xl text-gray-700 leading-relaxed mb-10">
            Chào mừng bạn đến với Thế Giới KHÔ. Khi truy cập và sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây.
          </p>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Giới thiệu chung</h3>
              <p className="text-gray-600 leading-relaxed">
                Thế Giới KHÔ là website bán thực phẩm khô (hạt dinh dưỡng, các loại khô, trái cây sấy). Chúng tôi cung cấp sản phẩm chất lượng và quy trình mua hàng đơn giản: thêm vào giỏ hàng và thanh toán.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Tài khoản người dùng</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                <li>Bạn phải đủ 18 tuổi để đăng ký tài khoản.</li>
                <li>Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình.</li>
                <li>Chúng tôi có quyền khóa tài khoản nếu phát hiện hành vi gian lận hoặc vi phạm chính sách.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Quyền và nghĩa vụ của khách hàng</h3>
              <p className="text-gray-600 mb-2">Khi sử dụng website, bạn cam kết:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                <li>Cung cấp thông tin trung thực về phương thức quảng bá.</li>
                <li>Không sử dụng các biện pháp gian lận để tạo click hoặc đơn hàng ảo.</li>
                <li>Tuân thủ pháp luật Việt Nam và quy định về kinh doanh thực phẩm.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Chính sách thanh toán</h3>
              <p className="text-gray-600 leading-relaxed">
                Thanh toán được thực hiện theo hướng dẫn tại trang thanh toán. Chúng tôi hỗ trợ các phương thức thanh toán phổ biến. Bạn có trách nhiệm cung cấp thông tin chính xác khi đặt hàng.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">5. Quyền sở hữu trí tuệ</h3>
              <p className="text-gray-600 leading-relaxed">
                Tất cả nội dung trên website này, bao gồm logo, hình ảnh, văn bản và phần mềm đều thuộc sở hữu của Thế Giới KHÔ hoặc các bên cấp phép. Bạn không được sao chép hoặc sử dụng cho mục đích thương mại mà không có sự đồng ý bằng văn bản.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">6. Miễn trừ trách nhiệm</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp nào phát sinh từ việc sử dụng dịch vụ, bao gồm nhưng không giới hạn ở việc mất dữ liệu hoặc lợi nhuận.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3">7. Thay đổi điều khoản</h3>
              <p className="text-gray-600 leading-relaxed">
                Chúng tôi có quyền thay đổi nội dung của Điều khoản dịch vụ này bất cứ lúc nào. Những thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website. Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
              </p>
            </section>
          </div>

          <hr className="my-10 border-gray-200" />

          <div className="card-glass rounded-2xl p-6">
            <h4 className="text-gray-900 font-bold mb-2">Bạn có câu hỏi?</h4>
            <p className="text-gray-600 mb-4">Nếu bạn có bất kỳ thắc mắc nào về Điều khoản dịch vụ này, vui lòng liên hệ với chúng tôi.</p>
            <a href="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all">
              <i className="fa-solid fa-envelope" />
              Liên hệ hỗ trợ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Terms;
