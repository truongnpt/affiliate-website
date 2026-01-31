'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiOrders } from '@/api/orders';
import type { OrderStatus } from '@/api/orders';
import Button from '@/components/ui/Button';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xử lý',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipped: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-indigo-100 text-indigo-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const PAYMENT_LABELS: Record<string, string> = {
  cod: 'Thanh toán khi nhận hàng',
  bank: 'Chuyển khoản',
  momo: 'Ví MoMo',
  vnpay: 'VNPay',
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const id = Number(params?.id);

  const [statusSelect, setStatusSelect] = useState<string>('');

  const { data: orderData, isLoading } = useQuery({
    queryKey: ['admin-order', id],
    queryFn: async () => await apiOrders.getById(id),
    enabled: !!id,
  });

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: (status: OrderStatus) => apiOrders.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-order', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      setStatusSelect('');
    },
  });

  const order = orderData?.data;
  const orderItems = order?.order_items || [];

  if (!id) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-600 mb-4">Không tìm thấy đơn hàng</p>
        <Button onClick={() => router.back()}>
          <i className="fas fa-arrow-left mr-2"></i>
          Quay lại
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
        <p className="text-gray-600 mb-4">Không tìm thấy đơn hàng</p>
        <Button onClick={() => router.push('/admin/orders')}>
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  const handleStatusChange = () => {
    if (statusSelect && statusSelect !== order.status) {
      updateStatus(statusSelect as OrderStatus);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-2 flex items-center space-x-2"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Quay lại</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Đơn hàng #{order.id}
          </h1>
          <p className="text-gray-500 mt-1">
            Đặt lúc:{' '}
            {order.created_at
              ? new Date(order.created_at).toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '—'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1.5 text-sm font-semibold rounded-full ${
              STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {STATUS_LABELS[order.status] || order.status}
          </span>
          {order.status !== 'delivered' && order.status !== 'cancelled' && (
            <>
              <select
                value={statusSelect}
                onChange={(e) => setStatusSelect(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Cập nhật trạng thái</option>
                {Object.entries(STATUS_LABELS).map(
                  ([key, label]) =>
                    key !== order.status && (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    )
                )}
              </select>
              <Button
                variant="primary"
                size="sm"
                onClick={handleStatusChange}
                disabled={!statusSelect || isUpdating}
              >
                {isUpdating ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Đang cập nhật
                  </span>
                ) : (
                  'Cập nhật'
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin khách hàng
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Họ tên
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{order.full_name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Số điện thoại</dt>
                <dd className="mt-1 text-sm text-gray-900">{order.phone}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{order.email}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Địa chỉ</dt>
                <dd className="mt-1 text-sm text-gray-900">{order.address}</dd>
              </div>
              {order.note && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Ghi chú</dt>
                  <dd className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {order.note}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Chi tiết sản phẩm ({orderItems.length})
            </h2>
            <div className="space-y-4">
              {orderItems.map((item: any) => {
                const finalPrice =
                  Number(item.price) * (1 - Number(item.discount || 0) / 100);
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item.product_image || 'https://via.placeholder.com/64'}
                        alt={item.product_name}
                        className="h-16 w-16 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/64';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {Number(item.price).toLocaleString('vi-VN')}đ
                        {item.discount > 0 && (
                          <span className="ml-2 text-red-600">
                            -{item.discount}%
                          </span>
                        )}
                        {' × '}
                        {item.quantity}
                      </p>
                      {item.product_url && (
                        <a
                          href={item.product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline mt-1 inline-block"
                        >
                          Xem sản phẩm <i className="fas fa-external-link-alt ml-1"></i>
                        </a>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-gray-900">
                        {(finalPrice * item.quantity).toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Thanh toán
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Phương thức
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {PAYMENT_LABELS[order.payment_method] || order.payment_method}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Tổng tiền</dt>
                <dd className="mt-1 text-2xl font-bold text-primary">
                  {Number(order.total).toLocaleString('vi-VN')}đ
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Thao tác
            </h2>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/admin/orders')}
              >
                <i className="fas fa-list mr-2"></i>
                Danh sách đơn hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
