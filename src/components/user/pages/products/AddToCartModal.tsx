'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { addToCart } from '@/store/cart';

export interface AddToCartModalProduct {
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
}

interface AddToCartModalProps {
  product: AddToCartModalProduct;
  isOpen: boolean;
  onClose: () => void;
}

const AddToCartModal = ({ product, isOpen, onClose }: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isClickAnimating, setIsClickAnimating] = useState(false);
  const [isSuccessAnimating, setIsSuccessAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setAdded(false);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const salePrice = product.discount
    ? product.price - Math.round(product.price * product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    // Hiệu ứng nhấn nút
    setIsClickAnimating(true);
    setTimeout(() => setIsClickAnimating(false), 250);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: product.image,
      slug: product.slug,
      product_categories: product.product_categories,
      quantity,
    });
    setAdded(true);
    setIsSuccessAnimating(true);
    setTimeout(() => setIsSuccessAnimating(false), 600);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-to-cart-modal-title"
    >
      <div
        className="relative w-full max-w-lg lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-1 right-1 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
          aria-label="Đóng"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        {/* Mobile: dọc. LG: 2 cột - trái ảnh, phải nội dung + action */}
        <div className="p-6 flex flex-col lg:flex-row lg:gap-8">
          {/* Cột trái: Hình ảnh */}
          <div className="flex-shrink-0 lg:w-1/2">
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 lg:mb-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
                }}
              />
              {product.discount > 0 && (
                <div className="absolute top-3 right-3 bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  -{product.discount}%
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Nội dung + action (giống product detail) */}
          <div className="flex-1 min-w-0 flex flex-col lg:py-1">
            {/* Category */}
            {product.product_categories && (
              <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-2 flex items-center gap-1">
                <i className="fa-solid fa-tag"></i>
                {product.product_categories.name}
              </div>
            )}

            {/* Product Name */}
            <Link href={`/products/${product.slug}`} className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
              {product.name}
            </Link>

            {/* Rating & Sales */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span>{product.sales?.toLocaleString('vi-VN') || 0} đã bán</span>
            </div>

            <div className="flex flex-row md:flex-col items-end md:items-start gap-4 mb-6 md:mb-0">
              {/* Price */}
            <div className="md:mb-0">
              <div className="flex items-baseline gap-1 flex-wrap">
                {product.discount > 0 && (
                  <span className="text-sm text-red-400 line-through">
                    {product.price.toLocaleString('vi-VN')}đ
                  </span>
                )}
                <span className="text-2xl font-bold text-primary">
                  {salePrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="md:mb-6">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors font-bold"
                  aria-label="Giảm số lượng"
                >
                  <i className="fa-solid fa-minus text-sm"></i>
                </button>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!Number.isNaN(v)) setQuantity(Math.max(1, v));
                  }}
                  className="w-15 text-center border border-gray-300 rounded-lg py-2 font-semibold focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors font-bold"
                  aria-label="Tăng số lượng"
                >
                  <i className="fa-solid fa-plus text-sm"></i>
                </button>
              </div>
            </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-auto">
              <button
                ref={buttonRef}
                type="button"
                onClick={handleAddToCart}
                disabled={added}
                className={`relative w-full cursor-pointer py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg overflow-hidden transition-all duration-300 ${added
                  ? 'bg-emerald-500 text-white cursor-default'
                  : 'bg-primary hover:bg-primary-hover text-white active:scale-[0.98]'
                  } ${isClickAnimating ? 'animate-add-to-cart-click' : ''} ${isSuccessAnimating ? 'animate-add-to-cart-success' : ''}`}
              >
                {added ? (
                  <>
                    <i className="fa-solid fa-circle-check text-xl animate-add-to-cart-checkmark inline-block"></i>
                    <span className="animate-add-to-cart-text inline-block">
                      Đã thêm vào giỏ
                    </span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-plus text-lg"></i>
                    Thêm vào giỏ hàng
                  </>
                )}
              </button>
              {added && (
                <Link
                  href={`/cart`}
                  onClick={onClose}
                  className="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
                >
                  <i className="fa-solid fa-eye"></i>
                  Xem giỏ hàng
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
