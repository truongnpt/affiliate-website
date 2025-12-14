'use client';
import React from 'react';

const Blogs = () => {
  const posts = [
    {
      id: 1,
      title: 'Top 10 sản phẩm TikTok Shop bán chạy nhất tháng 12/2025',
      excerpt:
        'Khám phá những sản phẩm đang được săn đón nhất trên TikTok Shop. Review chi tiết và link mua hàng trực tiếp cho từng sản phẩm.',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFya2V0aW5nfGVufDB8fDB8fHww',
      date: '12 Tháng 12, 2025',
      author: 'NờPêTê',
      category: 'Review sản phẩm',
    },
    {
      id: 2,
      title: 'Cách mua hàng trên TikTok Shop: Hướng dẫn từ A-Z',
      excerpt:
        'Hướng dẫn chi tiết cách click vào link sản phẩm, thêm vào giỏ hàng và hoàn tất đơn hàng trên TikTok Shop một cách nhanh chóng và an toàn.',
      image:
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D',
      date: '10 Tháng 12, 2025',
      author: 'NờPêTê',
      category: 'Hướng dẫn',
    },
    {
      id: 3,
      title: 'Review chi tiết: Tai nghe Bluetooth bán chạy nhất TikTok Shop',
      excerpt:
        'Đánh giá thực tế 5 mẫu tai nghe Bluetooth đang hot trên TikTok Shop. So sánh giá, chất lượng và link mua hàng trực tiếp.',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
      date: '08 Tháng 12, 2025',
      author: 'NờPêTê',
      category: 'Review sản phẩm',
    },
    {
      id: 4,
      title: 'Top sản phẩm làm đẹp đang hot trên TikTok Shop',
      excerpt:
        'Tổng hợp những sản phẩm làm đẹp được nhiều người review tích cực trên TikTok Shop. Click vào link để xem giá và mua ngay.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D',
      date: '05 Tháng 12, 2025',
      author: 'NờPêTê',
      category: 'Xu hướng',
    },
    {
      id: 5,
      title: 'Deal tốt nhất hôm nay: Sản phẩm TikTok Shop giảm giá',
      excerpt:
        'Cập nhật những sản phẩm đang có ưu đãi tốt nhất trên TikTok Shop. Chỉ cần click vào link để thêm vào giỏ hàng và mua ngay.',
      image:
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29jaWFsJTIwbWVkaWF8ZW58MHx8MHx8fDA%3D',
      date: '01 Tháng 12, 2025',
      author: 'NờPêTê',
      category: 'Deal tốt',
    },
    {
      id: 6,
      title: '5 mẹo mua sắm thông minh trên TikTok Shop',
      excerpt:
        'Bí quyết giúp bạn tìm được sản phẩm chất lượng với giá tốt nhất trên TikTok Shop. Hướng dẫn sử dụng link sản phẩm hiệu quả.',
      image:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVuZHN8ZW58MHx8MHx8fDA%3D',
      date: '28 Tháng 11, 2025',
      author: 'NờPêTê',
      category: 'Mẹo hay',
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Blog Header */}
      <div className="bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <i className="fa-brands fa-tiktok text-5xl animate-pulse"></i>
            <h1 className="text-4xl lg:text-5xl font-bold">Blog TikTok Shop</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-6">
            Chia sẻ kinh nghiệm mua sắm, review sản phẩm hot từ TikTok Shop và
            những bí quyết giúp bạn tìm được sản phẩm chất lượng với giá tốt
            nhất.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 text-sm">
              <i className="fa-solid fa-pen-nib text-yellow-300"></i>
              <span>Review sản phẩm TikTok Shop</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 text-sm">
              <i className="fa-solid fa-fire text-orange-300"></i>
              <span>Sản phẩm hot trending</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 text-sm">
              <i className="fa-solid fa-tag text-green-300"></i>
              <span>Deal tốt nhất hôm nay</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Featured Post */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer h-[400px] md:h-[500px] border-2 border-transparent hover:border-[#ff5183] transition-all">
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80"
              alt="Featured"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block bg-[#ff5183] text-white text-xs font-bold px-4 py-2 rounded-full w-fit flex items-center gap-2">
                  <i className="fa-solid fa-fire"></i>
                  Nổi bật
                </span>
                <span className="inline-block bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full w-fit flex items-center gap-2">
                  <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
                  TikTok Shop
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-[#ff5183] transition-colors">
                Review tổng hợp: Top sản phẩm TikTok Shop đáng mua nhất 2025
              </h2>
              <p className="text-white/90 text-lg max-w-3xl line-clamp-2 mb-6">
                Tổng hợp những sản phẩm được đánh giá cao nhất trên TikTok Shop.
                Click vào link để xem chi tiết và thêm vào giỏ hàng ngay!
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-white/80 text-sm">
                  <span className="font-semibold text-white">NờPêTê</span>
                  <span className="mx-2">•</span>
                  <span>15 Tháng 12, 2025</span>
                </div>
                <div className="flex items-center text-white font-semibold group-hover:text-[#ff5183] transition-colors">
                  Đọc ngay{' '}
                  <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fa-brands fa-tiktok text-[#ff5183] text-2xl mr-3"></i>
                Bài viết mới nhất về TikTok Shop
              </h3>
              <a
                href="/products"
                className="text-[#ff5183] font-semibold hover:underline flex items-center gap-2 text-sm"
              >
                Xem sản phẩm <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full border border-gray-100 hover:border-[#ff5183]"
                >
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="bg-black/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                        <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
                        TikTok Shop
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-sm text-gray-500 mb-3 flex items-center">
                      <i className="fa-regular fa-calendar mr-2"></i>
                      {post.date}
                      <span className="mx-2">•</span>
                      <span className="font-medium text-gray-700">
                        {post.author}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#ff5183] transition-colors">
                      <a href="#" className="hover:underline">
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-2">
                        <i className="fa-solid fa-eye"></i>
                        Đọc bài viết
                      </span>
                      <a
                        href="#"
                        className="text-[#ff5183] text-sm font-bold hover:underline flex items-center gap-2 group-hover:gap-3 transition-all"
                      >
                        Đọc tiếp
                        <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#ff5183]/10 hover:text-[#ff5183] transition-colors">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="w-10 h-10 rounded-full bg-[#ff5183] text-white flex items-center justify-center font-bold shadow-md">
                  1
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#ff5183]/10 hover:text-[#ff5183] transition-colors font-medium">
                  2
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#ff5183]/10 hover:text-[#ff5183] transition-colors font-medium">
                  3
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#ff5183]/10 hover:text-[#ff5183] transition-colors">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4">Tìm kiếm</h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm bài viết..."
                  className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183] bg-gray-50 focus:bg-white transition-colors"
                />
                <button className="absolute right-2 top-2 p-1 text-gray-400 hover:text-[#ff5183]">
                  <i className="fa-solid fa-search"></i>
                </button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-folder text-[#ff5183]"></i>
                Chuyên mục
              </h4>
              <ul className="space-y-3">
                {[
                  {
                    name: 'Review sản phẩm',
                    count: 25,
                    icon: 'fa-solid fa-star',
                  },
                  {
                    name: 'Hướng dẫn mua hàng',
                    count: 18,
                    icon: 'fa-solid fa-book',
                  },
                  { name: 'Sản phẩm hot', count: 32, icon: 'fa-solid fa-fire' },
                  { name: 'Deal tốt nhất', count: 15, icon: 'fa-solid fa-tag' },
                  {
                    name: 'Mẹo hay TikTok Shop',
                    count: 12,
                    icon: 'fa-solid fa-lightbulb',
                  },
                ].map((cat, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="flex items-center justify-between text-gray-600 hover:text-[#ff5183] group transition-colors p-2 rounded-lg hover:bg-[#ff5183]/5"
                    >
                      <div className="flex items-center gap-2">
                        <i
                          className={`${cat.icon} text-sm text-gray-400 group-hover:text-[#ff5183]`}
                        ></i>
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full font-semibold group-hover:bg-[#ff5183] group-hover:text-white transition-colors">
                        {cat.count}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* TikTok Channel CTA */}
            <div className="bg-gradient-to-r from-[#ff5183] to-[#ff006e] p-8 rounded-xl shadow-lg text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <i className="fa-brands fa-tiktok text-4xl animate-pulse"></i>
                <div className="text-left">
                  <h4 className="text-xl font-bold">@nopete_affiliate</h4>
                  <p className="text-white/80 text-sm">Kênh TikTok của tôi</p>
                </div>
              </div>
              <p className="text-white/90 mb-6 text-sm leading-relaxed">
                Theo dõi kênh TikTok để xem video review sản phẩm và cập nhật
                những sản phẩm hot nhất từ TikTok Shop!
              </p>
              <a
                href="https://www.tiktok.com/@nopete_affiliate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full bg-white text-[#ff5183] py-3 px-4 rounded-lg font-bold hover:bg-gray-100 transition-colors justify-center"
              >
                <i className="fa-brands fa-tiktok"></i>
                Theo dõi kênh TikTok
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            {/* Quick Link to Products */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm border-2 border-[#ff5183]/20">
              <div className="text-center">
                <i className="fa-solid fa-shopping-bag text-3xl text-[#ff5183] mb-3"></i>
                <h4 className="font-bold text-gray-900 mb-2">
                  Xem sản phẩm TikTok Shop
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Click vào link để thêm vào giỏ hàng ngay
                </p>
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#ff5183] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#ff006e] transition-colors text-sm"
                >
                  Xem tất cả sản phẩm
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-tags text-[#ff5183]"></i>
                Thẻ phổ biến
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { tag: '#tiktokshop', icon: 'fa-brands fa-tiktok' },
                  { tag: '#review', icon: 'fa-solid fa-star' },
                  { tag: '#hot', icon: 'fa-solid fa-fire' },
                  { tag: '#deal', icon: 'fa-solid fa-tag' },
                  { tag: '#muahang', icon: 'fa-solid fa-shopping-cart' },
                  { tag: '#sanpham', icon: 'fa-solid fa-box' },
                  { tag: '#tiktok', icon: 'fa-brands fa-tiktok' },
                  { tag: '#giare', icon: 'fa-solid fa-dollar-sign' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-[#ff5183] hover:text-white transition-all font-medium flex items-center gap-1.5 border border-transparent hover:border-[#ff5183]"
                  >
                    <i className={`${item.icon} text-xs`}></i>
                    {item.tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blogs;
