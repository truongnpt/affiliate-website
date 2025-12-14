import React from 'react';

export const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fa-brands fa-tiktok text-3xl text-[#ff5183]"></i>
              <div>
                <span className="text-xl font-bold text-[#ff5183] block">
                  NờPêTê TikTok Shop
                </span>
                <span className="text-xs text-gray-500">
                  Click vào link để mua hàng
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Website cung cấp link sản phẩm TikTok Shop chính thức. Click vào
              link để tự động thêm vào giỏ hàng và mua ngay với giá tốt nhất!
            </p>
            <div className="bg-[#ff5183]/10 border border-[#ff5183]/20 rounded-lg p-3 mb-6">
              <p className="text-xs text-gray-300 flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-green-400"></i>
                <span>100% Link TikTok Shop chính thức - An toàn & Uy tín</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.tiktok.com/@nopete_affiliate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#ff5183] transition-colors flex items-center gap-2 group"
                title="Kênh TikTok của tôi"
              >
                <i className="fa-brands fa-tiktok text-2xl group-hover:scale-110 transition-transform"></i>
                <span className="text-sm">@nopete_affiliate</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-tags text-[#ff5183]"></i>
              Danh mục sản phẩm
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/product-categories"
                  className="hover:text-[#ff5183] transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Tất cả danh mục
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-[#ff5183] transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Xem tất cả sản phẩm
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-gray-500 mb-2">Danh mục phổ biến:</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/products?category=1"
                    className="text-xs bg-gray-800 hover:bg-[#ff5183] hover:text-white px-3 py-1 rounded-full transition-colors"
                  >
                    Điện tử
                  </a>
                  <a
                    href="/products?category=2"
                    className="text-xs bg-gray-800 hover:bg-[#ff5183] hover:text-white px-3 py-1 rounded-full transition-colors"
                  >
                    Thời trang
                  </a>
                  <a
                    href="/products?category=3"
                    className="text-xs bg-gray-800 hover:bg-[#ff5183] hover:text-white px-3 py-1 rounded-full transition-colors"
                  >
                    Làm đẹp
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-building text-[#ff5183]"></i>
              Thông tin
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/about"
                  className="hover:text-[#ff5183] transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="hover:text-[#ff5183] transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#ff5183] transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Liên hệ
                </a>
              </li>
              <li className="pt-2 border-t border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="fa-solid fa-info-circle"></i>
                  <span>Website TikTok Shop affiliate</span>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-headset text-[#ff5183]"></i>
              Hỗ trợ
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="/support"
                  className="hover:text-[#ff5183] transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Trung tâm hỗ trợ
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-[#ff5183] transition-colors flex items-center gap-2"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Điều khoản dịch vụ
                </a>
              </li>
              <li className="pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-2">Cách sử dụng:</p>
                <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                  <li>Click vào link sản phẩm</li>
                  <li>Tự động mở TikTok Shop</li>
                  <li>Thêm vào giỏ hàng & mua</li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                &copy; 2025 NờPêTê TikTok Shop. Thuộc quyền sở hữu của NờPêTê.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Website cung cấp link TikTok Shop chính thức
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/products"
                className="bg-[#ff5183] hover:bg-[#ff006e] text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-shopping-cart"></i>
                Xem sản phẩm ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
