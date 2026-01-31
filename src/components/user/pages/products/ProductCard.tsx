'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AddToCartModal, { type AddToCartModalProduct } from './AddToCartModal';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    product_categories: {
      name: string;
      id?: number;
    };
    image: string;
    url: string;
    rating: number;
    sales: number;
    slug?: string;
  };
  /** Khi được truyền (vd. trang danh sách sản phẩm), modal render ở parent; khi không truyền thì modal render trong card */
  onAddToCart?: (product: AddToCartModalProduct) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isAddToCartOpenLocal, setIsAddToCartOpenLocal] = useState(false);

  const salePrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const productForModal: AddToCartModalProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    discount: product.discount,
    product_categories: product.product_categories,
    image: product.image,
    url: product.url,
    rating: product.rating,
    sales: product.sales,
    slug: product.slug,
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(productForModal);
    } else {
      setIsAddToCartOpenLocal(true);
    }
  };

  return (
    <>
      <div className="card-glass card-glass-hover rounded-2xl overflow-hidden border border-white/60 transition-all duration-300 group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 sm:h-56 bg-gray-100 overflow-hidden">
          {product.slug ? (
            <Link href={`/products/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </Link>
          ) : (
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </a>
          )}
          {product.discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wide">
              <i className="fa-solid fa-tag text-[10px]" />
              {product.product_categories.name}
            </span>
          </div>

          <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors duration-200">
            {product.slug ? (
              <Link
                href={`/products/${product.slug}`}
                className="hover:underline decoration-2 underline-offset-2"
              >
                {product.name}
              </Link>
            ) : (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline decoration-2 underline-offset-2"
              >
                {product.name}
              </a>
            )}
          </h3>

          {/* Price */}
          <div className="mb-4">
            <span className="text-gray-900 font-bold text-xl">
              {salePrice.toLocaleString('vi-VN')}đ
            </span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                {product.price.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>

          {/* Rating & Sales */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <i className="fa-solid fa-star text-amber-400" />
              <span className="font-medium text-gray-700">{product.rating}</span>
            </div>
            <span>{product.sales.toLocaleString('vi-VN')} đã bán</span>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={handleAddToCartClick}
            className="mt-auto cursor-pointer w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-all duration-300 flex justify-center items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <i className="fa-solid fa-cart-plus text-base" />
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* Modal nội bộ khi không dùng onAddToCart (trang chủ, trang chi tiết) */}
      {!onAddToCart && (
        <AddToCartModal
          product={productForModal}
          isOpen={isAddToCartOpenLocal}
          onClose={() => setIsAddToCartOpenLocal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
