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
    rating: number;
    sales: number;
    slug?: string;
  };
  /** Khi được truyền (vd. trang danh sách sản phẩm), modal render ở parent; khi không truyền thì modal render trong card */
  onAddToCart?: (product: AddToCartModalProduct) => void;
  className?: string;
}

const ProductCard = ({ product, onAddToCart, className }: ProductCardProps) => {
  const [isAddToCartOpenLocal, setIsAddToCartOpenLocal] = useState(false);

  const salePrice = product.discount
    ? product.price - Math.round(product.price * product.discount / 100)
    : product.price;

  const productForModal: AddToCartModalProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    discount: product.discount,
    product_categories: product.product_categories,
    image: product.image,
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
      <div className={`card-glass card-glass-hover rounded-md md:rounded-2xl overflow-hidden border border-white/60 transition-all duration-300 group h-full flex flex-col ${className}`}>
        {/* Image */}
        <div className="relative h-30 md:h-56 bg-gray-100 overflow-hidden">
          <Link href={`/products/${product.slug}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </Link>
          {product.discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg">
                -{product.discount}%
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2 md:p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wide">
              <i className="fa-solid fa-tag text-[8px] md:text-base" />
              {product.product_categories.name}
            </span>
          </div>

          <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            <Link
              href={`/products/${product.slug}`}
              className="hover:underline decoration-2 underline-offset-2"
            >
              {product.name}
            </Link>
          </h3>

          {/* Price */}
          <div className="mb-4">
            <span className="text-gray-900 font-bold text-sm md:text-xl">
              {salePrice.toLocaleString('vi-VN')}đ
            </span>
            {product.discount > 0 && (
              <span className="ml-2 text-xs md:text-sm text-gray-400 line-through">
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
            className="mt-auto cursor-pointer w-full py-2 md:py-3 rounded-md md:rounded-xl bg-primary text-white font-bold text-xs md:text-sm hover:bg-primary-hover transition-all duration-300 flex justify-center items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            <i className="fa-solid fa-cart-plus text-xs md:text-base" />
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
