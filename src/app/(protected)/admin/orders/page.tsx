'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiOrders } from '@/api/orders';
import Table, { TableColumn } from '@/components/ui/Table';
import Link from 'next/link';

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

export default function OrdersListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const limit = 10;

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['admin-orders', page, search, statusFilter],
    queryFn: async () => {
      return await apiOrders.getList({
        limit,
        offset: (page - 1) * limit,
        search: search || undefined,
        status: statusFilter || undefined,
        sortBy: 'newest',
      });
    },
  });

  const orders = ordersData?.data || [];
  const totalItems = ordersData?.count || 0;
  const totalPages = ordersData?.totalPages || 1;

  const columns: TableColumn[] = [
    {
      key: 'id',
      label: 'Mã đơn',
      width: 100,
      render: (value) => (
        <span className="text-sm font-medium text-gray-900">#{value}</span>
      ),
    },
    {
      key: 'full_name',
      label: 'Khách hàng',
      width: 180,
      render: (value, row: any) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{row.phone}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      width: 180,
      render: (value) => (
        <span className="text-sm text-gray-600 truncate block max-w-[200px]">
          {value}
        </span>
      ),
    },
    {
      key: 'total',
      label: 'Tổng tiền',
      width: 140,
      render: (value) => (
        <span className="text-sm font-semibold text-gray-900">
          {Number(value || 0).toLocaleString('vi-VN')}đ
        </span>
      ),
    },
    {
      key: 'payment_method',
      label: 'Thanh toán',
      width: 140,
      render: (value) => (
        <span className="text-sm text-gray-600">
          {PAYMENT_LABELS[value] || value}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Trạng thái',
      width: 130,
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            STATUS_COLORS[value] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {STATUS_LABELS[value] || value}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Ngày đặt',
      width: 130,
      render: (value) => (
        <span className="text-sm text-gray-600">
          {value
            ? new Date(value).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Thao tác',
      align: 'right',
      className: 'sticky right-0 top-0 bg-white z-10',
      width: 120,
      render: (_, row: any) => (
        <div className="flex justify-end space-x-2">
          <Link
            href={`/admin/orders/${row.id}`}
            className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Xem chi tiết"
          >
            <i className="fas fa-eye"></i>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
          <p className="text-gray-600 mt-1">Tổng cộng: {totalItems} đơn hàng</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Tên, SĐT, Email khách hàng..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Tất cả trạng thái</option>
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <Table
        columns={columns}
        data={orders}
        loading={isLoading}
        emptyMessage="Không có đơn hàng nào"
        emptyIcon={<i className="fas fa-shopping-cart text-4xl text-gray-400 mb-4"></i>}
        pagination={{
          currentPage: page,
          totalPages,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
