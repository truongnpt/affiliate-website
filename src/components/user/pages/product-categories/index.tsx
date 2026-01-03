'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiProductCategories } from '../../../../api/product-categories';

const iconProductCategories = [
  {
    id: 1,
    icon: 'fa-solid fa-box',
  },
  {
    id: 2,
    icon: 'fa-solid fa-box',
  },
  {
    id: 3,
    icon: 'fa-solid fa-box',
  },
  {
    id: 4,
    icon: 'fa-solid fa-box',
  },
];
const ProductCategories = () => {
  const { data: productCategories, isLoading } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => await apiProductCategories.getList(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff5183] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <i className="fa-brands fa-tiktok text-5xl animate-pulse"></i>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Danh mục sản phẩm TikTok Shop
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed">
            Khám phá hàng ngàn sản phẩm chất lượng được chọn lọc từ TikTok Shop.
            Chọn danh mục yêu thích và click vào link để thêm vào giỏ hàng ngay!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 text-sm">
              <i className="fa-solid fa-shield-halved text-green-300"></i>
              <span>100% Link TikTok Shop chính thức</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 text-sm">
              <i className="fa-solid fa-bolt text-yellow-300"></i>
              <span>1 Click thêm vào giỏ hàng</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 text-sm">
              <i className="fa-solid fa-check-circle text-green-300"></i>
              <span>An toàn & Uy tín</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Quick Stats */}
        <div className="mb-10 text-center">
          <p className="text-gray-600 mb-2">
            <span className="font-bold text-[#ff5183] text-lg">
              {productCategories?.count || 0}
            </span>{' '}
            danh mục sản phẩm TikTok Shop
          </p>
          <p className="text-sm text-gray-500">
            Click vào danh mục để xem sản phẩm
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productCategories?.data?.map((category) => (
            <a
              href={`/products?category=${category.id}`}
              key={category.id}
              className="group block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 border border-gray-100 hover:border-[#ff5183]"
            >
              <div className="relative h-52 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/80 transition-colors z-10" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* TikTok Badge */}
                <div className="absolute top-3 left-3 z-20 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <i className="fa-brands fa-tiktok text-[#ff5183] text-sm"></i>
                  <span className="text-white text-xs font-semibold">
                    TikTok Shop
                  </span>
                </div>

                {/* Icon Badge */}
                <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg group-hover:bg-[#ff5183] transition-colors">
                  <i
                    className={`${category.icon || 'fa-solid fa-box'} text-2xl text-[#ff5183] group-hover:text-white transition-colors`}
                  ></i>
                </div>

                {/* Product Count Badge */}
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                    <p className="text-sm font-bold text-gray-900">
                      {category?.products?.length || 0} sản
                      phẩm
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ff5183] transition-colors line-clamp-2 min-h-[3.5rem]">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500 font-medium">
                    Xem sản phẩm
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#ff5183]/10 flex items-center justify-center group-hover:bg-[#ff5183] transition-all transform group-hover:scale-110">
                    <i className="fa-solid fa-arrow-right text-[#ff5183] group-hover:text-white text-sm transition-colors"></i>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Featured Collections / Suggestions */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <i className="fa-solid fa-fire text-3xl text-[#ff5183]"></i>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Bộ sưu tập nổi bật từ TikTok Shop
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá những bộ sưu tập sản phẩm hot nhất, được chọn lọc từ kênh
              TikTok của tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/products"
              className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <img
                src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwYXJlbHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Trending"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                    <i className="fa-solid fa-fire mr-1"></i>
                    Đang hot
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                    <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
                    TikTok Shop
                  </div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Top sản phẩm bán chạy
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Những sản phẩm được yêu thích nhất từ TikTok Shop
                </p>
                <div className="flex items-center text-white font-semibold">
                  Xem ngay{' '}
                  <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </a>

            <a
              href="/products"
              className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <img
                src="https://images.unsplash.com/photo-1468495244123-6c6ef332ad63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlY2h8ZW58MHx8MHx8fDA%3D"
                alt="New Products"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-400 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    <i className="fa-solid fa-star mr-1"></i>
                    Mới nhất
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                    <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
                    TikTok Shop
                  </div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Sản phẩm mới cập nhật
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Những sản phẩm mới nhất được cập nhật hàng ngày
                </p>
                <div className="flex items-center text-white font-semibold">
                  Xem ngay{' '}
                  <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </a>

            <a
              href="/products"
              className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <img
                src="https://images.unsplash.com/photo-1512418490979-92798cec1380?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3N8ZW58MHx8MHx8fDA%3D"
                alt="Best Deals"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-green-400 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    <i className="fa-solid fa-tag mr-1"></i>
                    Ưu đãi
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                    <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
                    TikTok Shop
                  </div>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Deal tốt nhất hôm nay
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Những sản phẩm có giá tốt nhất từ TikTok Shop
                </p>
                <div className="flex items-center text-white font-semibold">
                  Xem ngay{' '}
                  <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </div>
            </a>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <a
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#ff006e] hover:to-[#ff5183] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <i className="fa-solid fa-shopping-bag"></i>
              Xem tất cả sản phẩm TikTok Shop
              <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductCategories;
