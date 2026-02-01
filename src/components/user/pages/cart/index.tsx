'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart, removeFromCart, updateCartItemQuantity, clearCart, getCartTotal } from '@/store/cart';
import { appConfig } from '@/config/app.config';
import ModalConfirm from '@/components/ui/ModalConfirm';

const Cart = () => {
  const searchParams = useSearchParams();
  const cartItems = useCart();
  const [isClearing, setIsClearing] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState<number | null>(null);

  useEffect(() => {
    if (searchParams?.get('order') === 'success') {
      setShowOrderSuccess(true);
      window.history.replaceState({}, '', '/cart');
    }
  }, [searchParams]);

  const handleRemoveItem = (productId: number) => {
    setProductIdToRemove(productId);
    setShowRemoveModal(true);
  };

  const confirmRemoveItem = () => {
    if (productIdToRemove !== null) {
      removeFromCart(productIdToRemove);
      setProductIdToRemove(null);
      setShowRemoveModal(false);
    }
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    setIsClearing(true);
    clearCart();
    setTimeout(() => setIsClearing(false), 300);
    setShowClearModal(false);
  };

  const totalPrice = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <main className="bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pt-26 pb-16">
        {showOrderSuccess && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card-glass rounded-2xl p-4 flex items-center gap-3 bg-primary/5 border border-primary/20">
              <i className="fa-solid fa-circle-check text-2xl text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Đặt hàng thành công</p>
                <p className="text-sm text-gray-600">Các tab thanh toán đã mở. Hoàn tất thanh toán tại từng trang nếu cần.</p>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="card-glass rounded-2xl p-12 sm:p-16 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <i className="fa-solid fa-shopping-cart text-5xl text-primary/60" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Giỏ hàng của bạn đang trống</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link
              href={appConfig.navigation.products}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 bg-primary hover:bg-primary-hover hover:scale-105 shadow-lg shadow-primary/20"
            >
              <i className="fa-solid fa-arrow-left" />
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pt-16 pb-16">
      {showOrderSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-2xl p-4 flex items-center gap-3 bg-primary/5 border border-primary/20">
            <i className="fa-solid fa-circle-check text-2xl text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Đặt hàng thành công</p>
              <p className="text-sm text-gray-600">Các tab thanh toán đã mở. Hoàn tất thanh toán tại từng trang nếu cần.</p>
            </div>
          </div>
        </div>
      )}
      {/* Page Header - Liquid glass */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-shopping-cart text-3xl text-primary" />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Giỏ hàng</h1>
                <span className="text-gray-500 text-sm">({cartItems.length} sản phẩm)</span>
              </div>
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
              >
                <i className="fa-solid fa-trash" />
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item, idx) => {
              const itemPrice = item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price;
              const itemTotal = itemPrice * item.quantity;
              return (
                <div key={item.id} className="card-glass card-glass-hover rounded-2xl p-6 transition-all duration-300 animate-product-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <Link href={`/products/${item.slug}`}>
                        <div className="w-32 h-32 sm:w-28 sm:h-28 bg-gray-100 rounded-xl overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200'; }} />
                        </div>
                      </Link>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.slug}`} className="block text-lg font-bold text-gray-900 hover:text-primary transition-colors mb-2 line-clamp-2">
                            {item.name}
                          </Link>
                          {item.product_categories && (
                            <div className="text-sm text-gray-500 mb-2">
                              <i className="fa-solid fa-tag mr-1" />
                              {item.product_categories.name}
                            </div>
                          )}
                        </div>
                        <button onClick={() => handleRemoveItem(item.id)} className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl transition-all" aria-label="Xóa sản phẩm">
                          <i className="fa-solid fa-trash" />
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        <div className="flex items-baseline gap-2">
                          {item.discount > 0 && (
                            <span className="text-sm text-gray-400 line-through">{item.price.toLocaleString('vi-VN')}đ</span>
                          )}
                          <span className="text-xl font-bold text-primary">{itemPrice.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-gray-700">Số lượng:</label>
                          <div className="flex items-center gap-1 border border-gray-200 rounded-xl overflow-hidden">
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Giảm">
                              <i className="fa-solid fa-minus text-xs" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-12 text-center border-0 focus:ring-0 p-0 font-semibold text-primary bg-transparent"
                            />
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors" aria-label="Tăng">
                              <i className="fa-solid fa-plus text-xs" />
                            </button>
                          </div>
                          <span className="text-lg font-bold text-gray-900 min-w-[90px] text-right">{itemTotal.toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="card-glass rounded-2xl p-6 sticky top-24 transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)</span>
                  <span className="font-semibold">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
              <div className="space-y-3">
                <Link href={appConfig.navigation.products} className="block text-center px-4 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-white/60 transition-all duration-300">
                  <i className="fa-solid fa-arrow-left mr-2" />
                  Tiếp tục mua sắm
                </Link>
                <Link
                  href="/checkout"
                  className="w-full px-4 py-3.5 text-white font-semibold rounded-xl transition-all duration-300 bg-primary hover:bg-primary-hover flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  <i className="fa-solid fa-credit-card" />
                  Thanh toán
                </Link>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <i className="fa-solid fa-circle-info mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium mb-1">Lưu ý:</p>
                    <p className="text-xs">Bạn sẽ được chuyển đến trang thanh toán. Hoàn tất đơn hàng tại trang bán hàng tương ứng.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remove Item Modal */}
      <ModalConfirm
        open={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false);
          setProductIdToRemove(null);
        }}
        onConfirm={confirmRemoveItem}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
        confirmText="Xóa"
        cancelText="Hủy"
        variant="danger"
      />

      {/* Clear Cart Modal */}
      <ModalConfirm
        open={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={confirmClearCart}
        title="Xóa tất cả sản phẩm"
        message="Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?"
        confirmText="Xóa tất cả"
        cancelText="Hủy"
        variant="danger"
        loading={isClearing}
      />
    </main>
  );
};

export default Cart;
