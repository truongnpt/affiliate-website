// Cấu hình: Đảm bảo Tailwind CSS đã được cài đặt và cấu hình trong dự án Next.js của bạn

import React from "react";

// Hàm Component chính
export default function Home() {
  // Vì toàn bộ CSS đã được nhúng sẵn trong mã HTML gốc, chúng ta chỉ cần trả về cấu trúc HTML/JSX
  // Lưu ý: Các thẻ <script> chặn sự kiện được giữ lại ở cuối file để mô phỏng chính xác nội dung srcDoc.
  // Tuy nhiên, trong môi trường Next.js thực tế, bạn nên tránh đặt <style> và <script> này trực tiếp trong component.

  return (
    <div className="bg-gray-50">
      {/* HEADER */}
      <header
        id="header"
        className="bg-white shadow-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-2">
                  {/* Sử dụng Icon React nếu không dùng Font Awesome CDN */}
                  <i className="fa-brands fa-tiktok text-2xl text-red-600"></i>{" "}
                  {/* Giả định primary-600 là màu đỏ (red-600) */}
                  <span className="text-xl font-bold text-gray-900">
                    AffiliateHub
                  </span>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Analytics
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Support
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                Add Product
              </button>
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        {/* HERO SECTION */}
        <section
          id="hero"
          className="bg-gradient-to-r from-red-600 to-red-700 h-[600px] flex items-center"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  Add Your TikTok Affiliate Products
                  <span className="text-red-200">Effortlessly</span>
                </h1>
                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                  Streamline your affiliate marketing with our powerful product
                  management platform. Add, track, and optimize your TikTok
                  affiliate products in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add Product Now
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
                    Watch Demo
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Add New Product
                    </h3>
                    <i className="fa-brands fa-tiktok text-2xl text-red-600"></i>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="product-name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Product Name
                      </label>
                      <input
                        id="product-name"
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="Wireless Bluetooth Earbuds"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="commission-rate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Commission Rate
                      </label>
                      <input
                        id="commission-rate"
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="15%"
                      />
                    </div>
                    <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium">
                      Add Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform provides all the tools you need to manage and
                optimize your TikTok affiliate products effectively.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                id="feature-1"
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors"
              >
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-bolt text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Setup
                </h3>
                <p className="text-gray-600">
                  Add products in seconds with our streamlined interface and
                  automated data fetching.
                </p>
              </div>
              <div
                id="feature-2"
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors"
              >
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-chart-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Real-time Analytics
                </h3>
                <p className="text-gray-600">
                  Track performance, clicks, conversions, and earnings with
                  detailed analytics dashboard.
                </p>
              </div>
              <div
                id="feature-3"
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-red-50 transition-colors"
              >
                <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <i className="fa-solid fa-shield-halved text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Secure &amp; Reliable
                </h3>
                <p className="text-gray-600">
                  Enterprise-grade security with 99.9% uptime guarantee for your
                  affiliate business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT FORM SECTION */}
        <section id="product-form" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Add Your First Product
              </h2>
              <p className="text-xl text-gray-600">
                Fill in the details below to start promoting your affiliate
                products on TikTok
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="product-name-2"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Product Name
                    </label>
                    <input
                      id="product-name-2"
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option>Select category</option>
                      <option>Electronics</option>
                      <option>Fashion</option>
                      <option>Beauty</option>
                      <option>Home &amp; Garden</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="product-url"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Product URL
                    </label>
                    <input
                      id="product-url"
                      type="url"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="https://example.com/product"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="commission-rate-2"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Commission Rate (%)
                    </label>
                    <input
                      id="commission-rate-2"
                      type="number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="15"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Describe your product..."
                  ></textarea>
                </div>
                <div className="flex items-center justify-between pt-6">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section id="stats" className="py-20 bg-red-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-red-200">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">2M+</div>
                <div className="text-red-200">Products Added</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">$10M+</div>
                <div className="text-red-200">Commissions Earned</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-red-200">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section id="cta" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Affiliate Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of successful affiliate marketers who are already
              using our platform to grow their TikTok business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Get Started Free
              </button>
              <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="footer" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <i className="fa-brands fa-tiktok text-2xl text-red-500"></i>
                <span className="text-xl font-bold">AffiliateHub</span>
              </div>
              <p className="text-gray-400 mb-6">
                The ultimate platform for TikTok affiliate marketers to manage
                and optimize their product campaigns.
              </p>
              <div className="flex space-x-4">
                <i className="fa-brands fa-twitter text-gray-400 hover:text-white cursor-pointer"></i>
                <i className="fa-brands fa-facebook text-gray-400 hover:text-white cursor-pointer"></i>
                <i className="fa-brands fa-instagram text-gray-400 hover:text-white cursor-pointer"></i>
                <i className="fa-brands fa-linkedin text-gray-400 hover:text-white cursor-pointer"></i>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 AffiliateHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
