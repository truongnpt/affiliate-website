'use client';

import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    product_categories: {
      name: string;
    };
    image: string;
    url: string;
    rating: number;
    sales: number;
    slug?: string;
  };
}
const ProductCard = ({ product }: ProductCardProps) => {
  const originalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100)) + product.price
    : product.price;
  return (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-[#ff5183]"
    >
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {product.slug ? (
          <Link href={`/products/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 cursor-pointer"
            />
          </Link>
        ) : (
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </a>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <div className="bg-[#ff5183] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{product.discount}% GIẢM
          </div>
          <div className="bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <i className="fa-brands fa-tiktok text-[#ff5183]"></i>
            <span>TikTok Shop</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="text-xs text-[#ff5183] font-semibold mb-2 uppercase tracking-wide flex items-center gap-1">
          <i className="fa-solid fa-tag"></i>
          {product.product_categories.name}
        </div>
        <h3 className="text-gray-900 font-bold text-lg mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-[#ff5183] transition-colors">
          {product.slug ? (
            <Link
              href={`/products/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              {product.name}
            </Link>
          ) : (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {product.name}
            </a>
          )}
        </h3>

        <span className="text-gray-900 font-bold text-xl">
              {originalPrice.toLocaleString('vi-VN')}đ
            </span>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span>{product.sales.toLocaleString('vi-VN')} đã bán</span>
          </div>

        <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
          <Link href={`/products/${product.slug}`} className="w-full bg-white text-[#ff5183] py-1 rounded-lg font-bold text-xs hover:bg-[#ff5183] hover:text-white transition-all transform hover:scale-105 flex justify-center items-center gap-2 shadow-lg hover:shadow-xl border border-[#ff5183]">
            <i className="fa-solid fa-eye text-lg"></i>
            <span>XEM SẢN PHẨM</span>
          </Link>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-[#ff5183] to-[#ff006e] text-white py-1 rounded-lg font-bold text-xs hover:from-[#ff006e] hover:to-[#ff5183] transition-all transform hover:scale-105 flex justify-center items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <i className="fa-solid fa-cart-plus text-lg"></i>
            <span>MUA TRÊN TIKTOK SHOP</span>
          </a>
          <p className="text-xs text-center text-gray-500 mt-2">
            <i className="fa-solid fa-circle-check text-green-500 mr-1"></i>
            Link TikTok Shop - An toàn & Chính hãng
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
