// Cấu hình: Đảm bảo Tailwind CSS đã được cài đặt và cấu hình trong dự án Next.js của bạn

import React from 'react';
import Header from '../components/user/layouts/header';
import Footer from '../components/user/layouts/footer';
import Home from '../components/user/pages/home';
// Hàm Component chính
export default function PagePage() {
  // Vì toàn bộ CSS đã được nhúng sẵn trong mã HTML gốc, chúng ta chỉ cần trả về cấu trúc HTML/JSX
  // Lưu ý: Các thẻ <script> chặn sự kiện được giữ lại ở cuối file để mô phỏng chính xác nội dung srcDoc.
  // Tuy nhiên, trong môi trường Next.js thực tế, bạn nên tránh đặt <style> và <script> này trực tiếp trong component.

  return (
    <div className="bg-gray-50">
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <Home />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
