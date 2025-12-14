'use client';
import React from 'react';
import ProductCard from './ProductCard';

const Products = () => {
  // Mock data for products
  const products = [
    {
      id: 1,
      name: 'Tai nghe Bluetooth chống ồn',
      price: 599000,
      discount: 15,
      category: 'Điện tử',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.8,
      sales: 1200,
      url: 'https://example.com/product-1',
    },
    {
      id: 2,
      name: 'Áo thun cotton cao cấp',
      price: 199000,
      discount: 20,
      category: 'Thời trang',
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww',
      rating: 4.5,
      sales: 850,
      url: 'https://example.com/product-2',
    },
    {
      id: 3,
      name: 'Kem dưỡng ẩm vitamin C',
      price: 350000,
      discount: 25,
      category: 'Làm đẹp',
      image:
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2tpbmNhcmUlMjBwcm9kdWN0fGVufDB8fDB8fHww',
      rating: 4.9,
      sales: 2300,
      url: 'https://example.com/product-3',
    },
    {
      id: 4,
      name: 'Đèn bàn học thông minh',
      price: 450000,
      discount: 10,
      category: 'Nhà cửa',
      image:
        'https://images.unsplash.com/photo-1534073828943-f801091a7d58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRlc2slMjBsYW1wfGVufDB8fDB8fHww',
      rating: 4.6,
      sales: 500,
      url: 'https://example.com/product-4',
    },
    {
      id: 5,
      name: 'Giày Running Sport',
      price: 890000,
      discount: 12,
      category: 'Thời trang',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
      rating: 4.7,
      sales: 1500,
      url: 'https://example.com/product-5',
    },
    {
      id: 6,
      name: 'Loa Bluetooth Mini',
      price: 320000,
      discount: 18,
      category: 'Điện tử',
      image:
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.4,
      sales: 900,
      url: 'https://example.com/product-6',
    },
  ];

  const categories = [
    'Tất cả',
    'Điện tử',
    'Thời trang',
    'Làm đẹp',
    'Nhà cửa',
    'Sức khỏe',
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="fa-brands fa-tiktok text-3xl text-[#ff5183]"></i>
            <h1 className="text-3xl font-bold text-gray-900">
              Sản phẩm TikTok Shop
            </h1>
          </div>
          <p className="mt-2 text-lg text-gray-600 mb-4">
            Click vào link sản phẩm để tự động thêm vào giỏ hàng TikTok Shop
          </p>
          <div className="inline-flex items-center gap-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm">
            <i className="fa-solid fa-shield-halved text-green-600"></i>
            <span className="text-gray-700 font-medium">Link chính thức TikTok Shop - An toàn 100%</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bộ lọc
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tên sản phẩm..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5183] focus:border-[#ff5183]"
                  />
                  <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <div className="space-y-2">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`cat-${idx}`}
                        className="h-4 w-4 text-[#ff5183] focus:ring-[#ff5183] border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`cat-${idx}`}
                        className="ml-2 text-sm text-gray-600 hover:text-[#ff5183] cursor-pointer"
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Mock */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng giá
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              <button className="w-full bg-[#ff5183] text-white py-2 rounded-lg hover:bg-[#ff5183]/80 transition-colors">
                Áp dụng
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center">
              <span className="text-gray-600 mb-2 sm:mb-0">
                Hiển thị{' '}
                <span className="font-semibold text-gray-900">
                  {products.length}
                </span>{' '}
                sản phẩm
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sắp xếp:</span>
                <select className="border-none text-sm font-medium text-gray-900 focus:ring-0 cursor-pointer">
                  <option>Phổ biến nhất</option>
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến cao</option>
                  <option>Giá: Cao đến thấp</option>
                  <option>Hoa hồng cao nhất</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-1">
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="px-3 py-2 rounded-lg bg-[#ff5183] text-white font-medium">
                  1
                </button>
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
                  2
                </button>
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
                  10
                </button>
                <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
