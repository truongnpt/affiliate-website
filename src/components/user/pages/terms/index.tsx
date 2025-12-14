'use client';
import React from 'react';

const Terms = () => {
  return (
    <main className="bg-white min-h-screen py-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <p className="text-[#ff5183] font-bold uppercase tracking-wider mb-2">
          Thông tin pháp lý
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Điều khoản Dịch vụ
        </h1>
        <p className="text-gray-600">Cập nhật lần cuối: 14/12/2025</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-red mx-auto text-gray-600">
          <p className="lead text-xl">
            Chào mừng bạn đến với NờPêTê Affiliate. Khi truy cập và sử dụng dịch
            vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện
            dưới đây.
          </p>

          <h3>1. Giới thiệu chung</h3>
          <p>
            NờPêTê Affiliate là nền tảng kết nối giữa Nhà bán hàng (Advertiser)
            và Người tiếp thị (Publisher/Creator). Chúng tôi cung cấp công cụ để
            bạn tìm kiếm sản phẩm, tạo link tiếp thị và theo dõi hiệu quả kinh
            doanh.
          </p>

          <h3>2. Tài khoản người dùng</h3>
          <ul>
            <li>Bạn phải đủ 18 tuổi để đăng ký tài khoản.</li>
            <li>Bạn chịu trách nhiệm bảo mật thông tin đăng nhập của mình.</li>
            <li>
              Chúng tôi có quyền khóa tài khoản nếu phát hiện hành vi gian lận
              hoặc vi phạm chính sách.
            </li>
          </ul>

          <h3>3. Quyền và nghĩa vụ của Publisher</h3>
          <p>Khi tham gia mạng lưới của chúng tôi, bạn cam kết:</p>
          <ul>
            <li>Cung cấp thông tin trung thực về phương thức quảng bá.</li>
            <li>
              Không sử dụng các biện pháp gian lận để tạo click hoặc đơn hàng
              ảo.
            </li>
            <li>
              Tuân thủ các quy định về quảng cáo của TikTok và pháp luật Việt
              Nam.
            </li>
          </ul>

          <h3>4. Chính sách thanh toán</h3>
          <p>
            Hoa hồng sẽ được đối soát và thanh toán định kỳ vào ngày 15 và 30
            hàng tháng. Số dư tối thiểu để yêu cầu rút tiền là 200.000 VNĐ. Bạn
            có trách nhiệm kê khai và nộp thuế thu nhập cá nhân theo quy định.
          </p>

          <h3>5. Quyền sở hữu trí tuệ</h3>
          <p>
            Tất cả nội dung trên website này, bao gồm logo, hình ảnh, văn bản và
            phần mềm đều thuộc sở hữu của NờPêTê hoặc các bên cấp phép. Bạn
            không được sao chép hoặc sử dụng cho mục đích thương mại mà không có
            sự đồng ý bằng văn bản.
          </p>

          <h3>6. Miễn trừ trách nhiệm</h3>
          <p>
            Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp nào
            phát sinh từ việc sử dụng dịch vụ, bao gồm nhưng không giới hạn ở
            việc mất dữ liệu hoặc lợi nhuận.
          </p>

          <h3>7. Thay đổi điều khoản</h3>
          <p>
            Chúng tôi có quyền thay đổi nội dung của Điều khoản dịch vụ này bất
            cứ lúc nào. Những thay đổi sẽ có hiệu lực ngay khi được đăng tải
            trên website. Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi
            đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
          </p>

          <hr className="my-10 border-gray-200" />

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h4 className="text-gray-900 font-bold mb-2 mt-0">
              Bạn có câu hỏi?
            </h4>
            <p className="mb-4">
              Nếu bạn có bất kỳ thắc mắc nào về Điều khoản dịch vụ này, vui lòng
              liên hệ với chúng tôi.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#ff5183] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#ff5183]/80 transition-colors no-underline"
            >
              Liên hệ hỗ trợ
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Terms;
