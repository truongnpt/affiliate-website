'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useCart, removeFromCart, updateCartItemQuantity, getCartTotal, clearCart } from '@/store/cart';
import { apiOrders, CreateOrderPayload } from '@/api/orders';
import ModalConfirm from '@/components/ui/ModalConfirm';
import { orderTemplate } from '@/email-templates/order-template';
import { useToast } from '@/store/toast';
import Button from '@/components/ui/Button';

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
};

const initialForm: FormData = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  note: '',
};

const Checkout = () => {
  const { showToast } = useToast();
  const cartItems = useCart();
  const totalPrice = getCartTotal();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState<number | null>(null);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) next.fullName = 'Vui lòng nhập họ và tên';
    if (!form.phone.trim()) next.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9+\s-]{9,15}$/.test(form.phone)) next.phone = 'Số điện thoại không hợp lệ';
    if (!form.email.trim()) next.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Email không hợp lệ';
    if (!form.address.trim()) next.address = 'Vui lòng nhập địa chỉ giao hàng';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

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

  // Create order mutation
  const { mutate: createOrder, isPending: isSubmitting } = useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      const result = await apiOrders.create(payload);
      if (!result.data) {
        const errorMessage = (result as { message?: string; error?: string }).message ||
          (result as { error?: string }).error ||
          'Không thể tạo đơn hàng. Vui lòng thử lại.';
        showToast(errorMessage, { variant: 'error', title: 'Lỗi' });
      }
      return result.data;
    },
    onSuccess: (order) => {
      showToast('Chúng tôi đã nhận đơn hàng của bạn.', { variant: 'success', title: 'Đặt hàng thành công' });
      setShowOrderSuccess(true);
      // Gửi email thông báo đơn hàng mới
      try {
        const emailHtml = orderTemplate({
          orderId: order.id,
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          note: form.note.trim() || undefined,
          total: totalPrice,
          paymentMethod: 'cod',
          items: cartItems.map((item) => ({
            product_name: item.name,
            product_image: item.image,
            product_url: `/products/${item.slug}`,
            price: item.price,
            discount: item.discount ?? 0,
            quantity: item.quantity,
          })),
          createdAt: order.created_at,
        });

        fetch('/api/send-mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: `Đơn hàng mới #ORD${order.id} - ${form.fullName.trim()}`,
            html: emailHtml,
          }),
        });
      } catch (emailError) {
        console.error('Error sending order email:', emailError);
        // Không chặn flow nếu gửi email lỗi
      }

      clearCart();
    },
    onError: (error: Error) => {
      showToast(error.message || 'Lỗi kết nối. Vui lòng thử lại.', { variant: 'error', title: 'Lỗi' });
      setSubmitError(error.message || 'Lỗi kết nối. Vui lòng thử lại.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const payload: CreateOrderPayload = {
      full_name: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      note: form.note.trim() || undefined,
      total: totalPrice,
      payment_method: 'cod',
      items: cartItems.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        product_url: `/products/${item.slug}`,
        price: item.price,
        discount: item.discount ?? 0,
        quantity: item.quantity,
      })),
    };

    createOrder(payload);
  };

  if (showOrderSuccess) {
    return (
      <main className="bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-16">
        <div className="h-[5.25rem] sm:h-[5.5rem]" aria-hidden />
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <i className="fa-solid fa-circle-check text-3xl text-primary" />
          </div>
          <p className="text-gray-500 font-medium">Chúng tôi đã nhận đơn hàng của bạn. Cảm ơn bạn đã mua hàng.</p>
          <div className="flex items-center gap-2">
            <Link href="/products" className="text-primary font-medium"><Button><i className="fa-solid fa-shopping-bag mr-2" /> Tiếp tục mua sắm</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0 && !showOrderSuccess) {
    return (
      <main className="bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-16">
        <div className="h-[5.25rem] sm:h-[5.5rem]" aria-hidden />
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <i className="fa-solid fa-sad-tear text-3xl text-primary" />
          </div>
          <p className="text-gray-500 font-medium">Không có sản phẩm nào cả. Hãy thêm sản phẩm vào giỏ hàng để tiếp tục.</p>
          <div className="flex items-center gap-2">
            <Link href="/products" className="text-primary font-medium hover:underline"><Button variant="outline"><i className="fa-solid fa-shopping-bag mr-2" /> Xem sản phẩm</Button></Link>
            <Link href="/cart" className="text-primary font-medium hover:underline"><Button><i className="fa-solid fa-cart-shopping mr-2" /> Quay lại giỏ hàng</Button></Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50 pb-16">
      <div className="h-[5.25rem] sm:h-[5.5rem]" aria-hidden />

      {/* Page Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="card-glass rounded-3xl p-8 sm:p-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <i className="fa-solid fa-credit-card text-primary" />
              <span className="text-sm font-semibold text-primary">Thanh toán</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Thanh toán đơn hàng</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Điền thông tin giao hàng và chọn phương thức thanh toán
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form + Order Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="card-glass rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-bag-shopping text-primary" />
                Sản phẩm trong đơn
              </h2>
              <div className="space-y-4">
                {cartItems.map((item, idx) => {
                  const itemPrice = item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price;
                  const itemTotal = itemPrice * item.quantity;
                  return (
                    <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-white/50 border border-gray-100">
                      <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200'; }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <Link href={`/products/${item.slug}`} className="font-bold text-gray-900 hover:text-primary line-clamp-2 text-sm sm:text-base">
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500 mt-0.5">x{item.quantity}</p>
                          </div>
                          <span className="font-bold text-primary whitespace-nowrap">{itemTotal.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button type="button" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-xs" aria-label="Giảm">
                            <i className="fa-solid fa-minus" />
                          </button>
                          <span className="font-semibold text-sm min-w-[20px] text-center">{item.quantity}</span>
                          <button type="button" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-xs" aria-label="Tăng">
                            <i className="fa-solid fa-plus" />
                          </button>
                          <button type="button" onClick={() => handleRemoveItem(item.id)} className="ml-2 text-red-500 hover:text-red-700 text-xs" aria-label="Xóa">
                            <i className="fa-solid fa-trash" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Thông tin giao hàng */}
            <div className="card-glass rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-truck text-primary" />
                Thông tin giao hàng
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange('fullName')}
                    placeholder="Nguyễn Văn A"
                    className={`w-full px-4 py-3 rounded-xl bg-white/60 border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.fullName ? 'border-red-400' : 'border-gray-200/80'
                      }`}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder="0901234567"
                    className={`w-full px-4 py-3 rounded-xl bg-white/60 border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.phone ? 'border-red-400' : 'border-gray-200/80'
                      }`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="email@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-white/60 border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.email ? 'border-red-400' : 'border-gray-200/80'
                      }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ giao hàng <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange('address')}
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                    className={`w-full px-4 py-3 rounded-xl bg-white/60 border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all ${errors.address ? 'border-red-400' : 'border-gray-200/80'
                      }`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ghi chú đơn hàng
                  </label>
                  <textarea
                    id="note"
                    rows={3}
                    value={form.note}
                    onChange={handleChange('note')}
                    placeholder="Ghi chú về đơn hàng, ví dụ: giao giờ hành chính..."
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-200/80 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="card-glass rounded-2xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-wallet text-primary" />
                Phương thức thanh toán
              </h2>
              <label className="flex items-start gap-4 p-4 rounded-2xl border-2 border-primary bg-primary/5 cursor-pointer">
                <input type="radio" name="payment" value="cod" defaultChecked className="mt-1 w-5 h-5 text-primary focus:ring-primary" />
                <div className="flex-1">
                  <div className="font-bold text-gray-900">Thanh toán khi nhận hàng (COD)</div>
                  <p className="text-sm text-gray-600 mt-1">
                    Thanh toán bằng tiền mặt hoặc chuyển khoản khi nhận hàng
                  </p>
                </div>
                <i className="fa-solid fa-hand-holding-dollar text-2xl text-primary" />
              </label>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-glass rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)</span>
                  <span className="font-semibold">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Phương thức</span>
                  <span className="font-medium text-gray-900">Thanh toán khi nhận hàng</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>

              {submitError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation flex-shrink-0" />
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold text-lg transition-all flex justify-center items-center gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] mb-3 disabled:opacity-70 disabled:pointer-events-none disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner text-xl animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check-circle text-xl" />
                    Đặt hàng
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mb-4">
                Bạn sẽ được chuyển đến trang thanh toán của từng sản phẩm để hoàn tất
              </p>

              <Link
                href="/cart"
                className="block text-center py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-white/60 transition-all"
              >
                <i className="fa-solid fa-arrow-left mr-2" />
                Quay lại giỏ hàng
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <i className="fa-solid fa-circle-info mt-0.5 text-primary" />
                  <div>
                    <p className="font-medium mb-1">Lưu ý:</p>
                    <p className="text-xs">
                      Mỗi sản phẩm có thể được bán bởi nhà cung cấp khác nhau. Sau khi đặt hàng, bạn sẽ mở từng trang để hoàn tất.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Remove Item Modal */}
      <ModalConfirm
        open={showRemoveModal}
        onClose={() => {
          setShowRemoveModal(false);
          setProductIdToRemove(null);
        }}
        onConfirm={confirmRemoveItem}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này?"
        confirmText="Xóa"
        cancelText="Hủy"
        variant="danger"
      />
    </main>
  );
};

export default Checkout;
