'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { apiAuth } from '@/api/auth';
import { appConfig } from '@/config/app.config';
import { useUser } from '@/store/user';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Tổng quan', icon: 'fa-home', path: '/dashboard' },
  { id: 'products', label: 'Sản phẩm', icon: 'fa-box', path: '/admin/products' },
  { id: 'orders', label: 'Đơn hàng', icon: 'fa-shopping-cart', path: '/admin/orders' },
  { id: 'affiliates', label: 'Đối tác', icon: 'fa-users', path: '/admin/affiliates' },
  { id: 'analytics', label: 'Thống kê', icon: 'fa-chart-line', path: '/admin/analytics' },
  { id: 'settings', label: 'Cài đặt', icon: 'fa-cog', path: '/admin/settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = useUser();

  const getUserRole = useMemo(() => {
    if (user?.role === 'admin') {
      return 'Quản trị viên';
    } else if (user?.role === 'user') {
      return 'Người dùng';
    }
    return 'Khách';
  }, [user]);

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationFn: () => apiAuth.logout(),
    onSuccess: () => {
      localStorage.removeItem('user');
      router.push('/login');
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const session = localStorage.getItem('user') || null;
        if (!session) router.push('/login');
      } catch (error) {
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };
    verifyAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff5183]"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          sidebarOpen ? 'lg:w-64' : 'lg:w-20'
        } bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out fixed h-screen z-30 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-[#ff5183] to-[#ff5183]/90">
          {sidebarOpen ? (
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center">
                <i className="fa-brands fa-tiktok text-[#ff5183] text-xl"></i>
              </div>
              <span className="text-white font-bold text-lg">{appConfig.name}</span>
            </div>
          ) : (
            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center mx-auto">
              <i className="fa-brands fa-tiktok text-[#ff5183] text-xl"></i>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <i className={`fas ${sidebarOpen ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      router.push(item.path);
                      // Close sidebar on mobile after navigation
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center ${
                      sidebarOpen ? 'justify-start px-4' : 'justify-center px-2'
                    } py-3 rounded-lg transition-all duration-200 group ${
                      active
                        ? 'bg-[#ff5183] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#ff5183]'
                    }`}
                    title={!sidebarOpen ? item.label : ''}
                  >
                    <i
                      className={`fas ${item.icon} ${
                        sidebarOpen ? 'mr-3' : 'mr-0'
                      } text-lg ${active ? 'text-white' : 'text-gray-500 group-hover:text-[#ff5183]'}`}
                    ></i>
                    {sidebarOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info (Optional) */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-[#ff5183] rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name || 'Admin'}</p>
                <p className="text-xs text-gray-500 truncate">{getUserRole}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 max-w-[calc(100%-16rem)] ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-300`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-bars text-lg"></i>
                </button>
                <div className="flex items-center space-x-2 relative">
                  <input type="text" placeholder="Tìm kiếm" className="w-full p-2 rounded-lg border border-gray-300" />
                  <i className="fas fa-search absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"></i>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <i className="fas fa-bell text-lg"></i>
                  <span className="absolute top-1 right-1 h-2 w-2 bg-[#ff5183] rounded-full"></span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={() => logout()}
                  disabled={isLoadingLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#ff5183] text-white rounded-lg hover:bg-[#ff5183]/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingLogout ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Đăng xuất</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-120px)] p-4 sm:p-6 overflow-x-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </div>
  );
}
