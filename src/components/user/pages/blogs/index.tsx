'use client';
import React from 'react';

const Blogs = () => {
  const posts = [
    { id: 1, title: 'Top 10 thực phẩm khô bán chạy nhất tháng 12/2025', excerpt: 'Khám phá những hạt dinh dưỡng, trái cây sấy đang được ưa chuộng. Review chi tiết và gợi ý mua hàng.', image: 'https://images.unsplash.com/photo-1600326145552-327f74b2c3b6?w=500&auto=format&fit=crop&q=60', date: '12 Tháng 12, 2025', author: 'Thế Giới KHÔ', category: 'Review sản phẩm' },
    { id: 2, title: 'Cách mua thực phẩm khô online: Hướng dẫn từ A-Z', excerpt: 'Hướng dẫn thêm vào giỏ hàng và thanh toán đơn giản. Mua hạt, khô, trái cây sấy an toàn và nhanh chóng.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60', date: '10 Tháng 12, 2025', author: 'Thế Giới KHÔ', category: 'Hướng dẫn' },
    { id: 3, title: 'Review hạt dinh dưỡng: Óc chó, hạnh nhân, macca', excerpt: 'So sánh giá và chất lượng các loại hạt dinh dưỡng. Gợi ý sử dụng và bảo quản.', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=60', date: '08 Tháng 12, 2025', author: 'Thế Giới KHÔ', category: 'Review sản phẩm' },
    { id: 4, title: 'Trái cây sấy tốt cho sức khỏe', excerpt: 'Tổng hợp các loại trái cây sấy giàu dinh dưỡng. Cách chọn và bảo quản.', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60', date: '05 Tháng 12, 2025', author: 'Thế Giới KHÔ', category: 'Xu hướng' },
    { id: 5, title: 'Deal tốt nhất: Thực phẩm khô giảm giá', excerpt: 'Cập nhật ưu đãi hạt, khô, trái cây sấy. Thêm vào giỏ hàng và mua ngay với giá tốt.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60', date: '01 Tháng 12, 2025', author: 'Thế Giới KHÔ', category: 'Deal tốt' },
    { id: 6, title: '5 mẹo mua thực phẩm khô chất lượng', excerpt: 'Bí quyết chọn hạt, khô, trái cây sấy tươi ngon. Mua đúng nơi, đúng giá.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60', date: '28 Tháng 11, 2025', author: 'Thế Giới KHÔ', category: 'Mẹo hay' },
  ];

  const categories = [
    { name: 'Review sản phẩm', count: 25, icon: 'fa-solid fa-star' },
    { name: 'Hướng dẫn mua hàng', count: 18, icon: 'fa-solid fa-book' },
    { name: 'Sản phẩm hot', count: 32, icon: 'fa-solid fa-fire' },
    { name: 'Deal tốt nhất', count: 15, icon: 'fa-solid fa-tag' },
    { name: 'Mẹo hay', count: 12, icon: 'fa-solid fa-lightbulb' },
  ];

  const tags = [
    { tag: '#thucphamKHÔ', icon: 'fa-solid fa-seedling' },
    { tag: '#review', icon: 'fa-solid fa-star' },
    { tag: '#hot', icon: 'fa-solid fa-fire' },
    { tag: '#deal', icon: 'fa-solid fa-tag' },
    { tag: '#muahang', icon: 'fa-solid fa-shopping-cart' },
    { tag: '#sanpham', icon: 'fa-solid fa-box' },
    { tag: '#hatdinhduong', icon: 'fa-solid fa-seedling' },
    { tag: '#giare', icon: 'fa-solid fa-dollar-sign' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-20">


      {/* Page Header - Liquid glass */}
      <div className="relative overflow-hidden mt-14">
        <div className="absolute inset-0 " />
        <div className="relative max-w-7xl mx-auto py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <i className="fa-solid fa-pen-nib text-primary" />
              <span className="text-sm font-semibold text-primary">Blog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Blog Thế Giới KHÔ</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
              Chia sẻ kinh nghiệm mua thực phẩm khô, review hạt dinh dưỡng, trái cây sấy và mẹo chọn mua chất lượng.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-sm text-gray-700">Review thực phẩm khô</span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-sm text-gray-700">Sản phẩm hot</span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-sm text-gray-700">Deal tốt nhất</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {/* Featured Post */}
        <div className="card-glass card-glass-hover rounded-2xl overflow-hidden mb-12 transition-all duration-300">
          <div className="relative h-[380px] md:h-[480px] group">
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop&q=80" alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold">Nổi bật</span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-bold">Thực phẩm khô</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                Review tổng hợp: Top thực phẩm khô đáng mua nhất 2025
              </h2>
              <p className="text-white/90 text-base max-w-2xl line-clamp-2 mb-6">
                Tổng hợp những thực phẩm khô được đánh giá cao nhất. Click vào link để xem chi tiết và thêm vào giỏ hàng ngay!
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">15 Tháng 12, 2025</span>
                <span className="flex items-center text-white font-semibold group-hover:text-primary transition-colors">
                  Đọc ngay <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <i className="fa-solid fa-seedling text-primary" />
                Bài viết mới nhất
              </h3>
              <a href="/products" className="text-primary font-semibold hover:underline flex items-center gap-2 text-sm">
                Xem sản phẩm <i className="fa-solid fa-arrow-right" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, idx) => (
                <article key={post.id} className="card-glass card-glass-hover rounded-2xl overflow-hidden group transition-all duration-300 animate-product-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="h-48 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                      <i className="fa-regular fa-calendar" />
                      {post.date} • {post.author}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      <a href="#" className="hover:underline">{post.title}</a>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">{post.excerpt}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:underline group/link">
                      Đọc tiếp <i className="fa-solid fa-arrow-right group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 flex justify-center gap-2">
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
                <i className="fa-solid fa-chevron-left" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-md">1</button>
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-primary/10 hover:text-primary font-medium transition-colors">2</button>
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-primary/10 hover:text-primary font-medium transition-colors">3</button>
              <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors">
                <i className="fa-solid fa-chevron-right" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card-glass rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-4">Tìm kiếm</h4>
              <div className="relative">
                <input type="text" placeholder="Tìm bài viết..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="card-glass rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-folder text-primary" />
                Chuyên mục
              </h4>
              <ul className="space-y-2">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <a href="#" className="flex items-center justify-between py-2.5 px-3 rounded-xl text-gray-600 hover:text-primary hover:bg-white/80 transition-all group">
                      <div className="flex items-center gap-2">
                        <i className={`${cat.icon} text-sm text-gray-400 group-hover:text-primary`} />
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-lg font-semibold group-hover:bg-primary group-hover:text-white transition-colors">{cat.count}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-glass rounded-2xl p-6 bg-gradient-to-br from-primary/10 to-primary-hover/10 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <i className="fa-solid fa-seedling text-3xl text-primary" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Thế Giới KHÔ</h4>
                  <p className="text-gray-600 text-sm">Thực phẩm khô chất lượng</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">Thêm vào giỏ hàng và mua ngay. Hạt dinh dưỡng, các loại khô, trái cây sấy.</p>
              <a href="/products" className="inline-flex items-center justify-center gap-2 w-full bg-primary text-white py-3 px-4 rounded-xl font-bold hover:bg-primary-hover transition-all">
                <i className="fa-solid fa-cart-shopping" />
                Xem sản phẩm
                <i className="fa-solid fa-arrow-right" />
              </a>
            </div>

            <div className="card-glass rounded-2xl p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-tags text-primary" />
                Thẻ phổ biến
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((item, idx) => (
                  <a key={idx} href="#" className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-primary hover:text-white transition-all font-medium flex items-center gap-1.5">
                    <i className={`${item.icon} text-xs`} />
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
