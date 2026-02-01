'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiProductCategories } from '../../../../api/product-categories';

const ProductCategories = () => {
  const { data: productCategories, isLoading } = useQuery({
    queryKey: ['product_categories'],
    queryFn: async () => await apiProductCategories.getList(),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">

        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
            <i className="fa-solid fa-layer-group text-3xl text-primary animate-pulse" />
          </div>
          <p className="text-gray-500 font-medium">Đang tải danh mục...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-16">


      {/* Page Header - Liquid glass */}
      <div className="relative overflow-hidden pt-14">
        <div className="absolute inset-0 " />
        <div className="relative max-w-7xl mx-auto py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <i className="fa-solid fa-layer-group text-primary" />
              <span className="text-sm font-semibold text-primary">Danh mục</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Danh mục thực phẩm khô
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
              Khám phá hạt dinh dưỡng, các loại khô, trái cây sấy. Chọn danh mục và thêm vào giỏ hàng & mua ngay.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-sm text-gray-700">
                <i className="fa-solid fa-seedling text-primary" />
                Chất lượng
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-sm text-gray-700">
                <i className="fa-solid fa-bolt text-primary" />
                Thêm giỏ & mua
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 text-sm text-gray-700">
                <i className="fa-solid fa-check-circle text-primary" />
                An toàn & Uy tín
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {/* Quick Stats */}
        <div className="card-glass rounded-2xl p-6 mb-8 text-center">
          <p className="text-gray-600">
            <span className="font-bold text-primary text-lg">{productCategories?.count || 0}</span> danh mục thực phẩm khô
          </p>
          <p className="text-sm text-gray-500 mt-1">Click vào danh mục để xem sản phẩm</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productCategories?.data?.map((category, idx) => (
            <a
              href={`/products?category=${category.id}`}
              key={category.id}
              className="card-glass card-glass-hover block rounded-2xl overflow-hidden transition-all duration-300 group animate-product-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative h-52 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors z-10" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                    <p className="text-sm font-bold text-gray-900">
                      {category?.products?.length || 0} sản phẩm
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {category.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100/80">
                  <span className="text-sm text-gray-500 font-medium">Xem sản phẩm</span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
                    <i className="fa-solid fa-arrow-right text-primary group-hover:text-white text-sm transition-colors" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Featured Collections */}
        {/* <div className="mt-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <i className="fa-solid fa-fire text-primary" />
              <span className="text-sm font-semibold text-primary">Nổi bật</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sản phẩm nổi bật</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Khám phá những sản phẩm thực phẩm khô được yêu thích nhất</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Top sản phẩm bán chạy', desc: 'Những thực phẩm khô được yêu thích nhất', badge: 'Đang hot', color: 'yellow', img: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=500&auto=format&fit=crop&q=60' },
              { title: 'Sản phẩm mới cập nhật', desc: 'Những sản phẩm mới nhất được cập nhật hàng ngày', badge: 'Mới nhất', color: 'blue', img: 'https://images.unsplash.com/photo-1468495244123-6c6ef332ad63?w=500&auto=format&fit=crop&q=60' },
              { title: 'Deal tốt nhất hôm nay', desc: 'Những thực phẩm khô có giá tốt nhất', badge: 'Ưu đãi', color: 'green', img: 'https://images.unsplash.com/photo-1512418490979-92798cec1380?w=500&auto=format&fit=crop&q=60' },
            ].map((item) => (
              <a
                key={item.title}
                href="/products"
                className="card-glass card-glass-hover relative h-72 rounded-2xl overflow-hidden group transition-all duration-300"
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold w-fit mb-3 ${item.color === 'yellow' ? 'bg-yellow-400 text-black' : item.color === 'blue' ? 'bg-blue-400 text-white' : 'bg-green-400 text-white'
                    }`}>
                    <i className={`fa-solid ${item.color === 'yellow' ? 'fa-fire' : item.color === 'blue' ? 'fa-star' : 'fa-tag'}`} />
                    {item.badge}
                  </span>
                  <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{item.desc}</p>
                  <span className="flex items-center text-white font-semibold">
                    Xem ngay <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/products"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20"
            >
              <i className="fa-solid fa-shopping-bag" />
              Xem tất cả sản phẩm
              <i className="fa-solid fa-arrow-right" />
            </a>
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default ProductCategories;
