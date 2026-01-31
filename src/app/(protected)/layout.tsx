'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
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

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    items: [{ id: 'dashboard', label: 'Tổng quan', icon: 'fa-home', path: '/dashboard' }],
  },
  {
    title: 'Quản lý',
    items: [
      { id: 'product-categories', label: 'Danh mục', icon: 'fa-folder-tree', path: '/admin/product-categories' },
      { id: 'products', label: 'Sản phẩm', icon: 'fa-box', path: '/admin/products' },
      { id: 'orders', label: 'Đơn hàng', icon: 'fa-shopping-cart', path: '/admin/orders' },
    ],
  },
  {
    title: 'Khác',
    items: [
      { id: 'affiliates', label: 'Affiliates', icon: 'fa-users', path: '/admin/affiliates' },
      { id: 'analytics', label: 'Thống kê', icon: 'fa-chart-line', path: '/admin/analytics' },
      { id: 'settings', label: 'Cài đặt', icon: 'fa-cog', path: '/admin/settings' },
    ],
  },
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
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
        className={`${sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
          } ${sidebarOpen ? 'lg:w-64' : 'lg:w-20'
          } bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out fixed h-screen z-30 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-primary to-primary/90">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image
                  src={appConfig.logo}
                  alt={appConfig.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg truncate">{appConfig.name}</span>
            </div>
          ) : (
            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center mx-auto overflow-hidden flex-shrink-0">
              <Image
                src={appConfig.logo}
                alt={appConfig.name}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
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
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx} className={sectionIdx > 0 ? 'mt-6' : ''}>
              {section.title && sidebarOpen && (
                <p className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          router.push(item.path);
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                        className={`group relative w-full flex items-center ${sidebarOpen ? 'justify-start px-4' : 'justify-center px-2'
                          } py-2.5 rounded-xl transition-all duration-200 ${active
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        title={!sidebarOpen ? item.label : ''}
                      >
                        {/* Active indicator */}
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                        )}
                        <span
                          className={`flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 transition-colors ${active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary'
                            }`}
                        >
                          <i className={`fas ${item.icon} text-sm`} />
                        </span>
                        {sidebarOpen && (
                          <span className={`ml-3 font-medium ${active ? 'text-primary' : 'text-gray-700 group-hover:text-gray-900'}`}>
                            {item.label}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User Info (Optional) */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
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
        <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/80 sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex justify-between items-center h-full gap-4">
              {/* Left: Menu toggle + Search */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden flex-shrink-0 p-2.5 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                  aria-label="Mở menu"
                >
                  <i className="fas fa-bars text-lg"></i>
                </button>
                <div className="hidden sm:block flex-1 max-w-md">
                  <div className="relative">
                    <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Right: User + Actions */}
              <div className="flex items-center gap-2">
                {/* Link to store */}
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                  title="Xem trang bán hàng"
                >
                  <i className="fas fa-external-link-alt text-xs"></i>
                  <span>Trang bán hàng</span>
                </a>

                {/* Notifications */}
                <button
                  className="relative p-2.5 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-xl transition-colors"
                  title="Thông báo"
                  aria-label="Thông báo"
                >
                  <i className="fas fa-bell text-lg"></i>
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* User profile + Logout */}
                <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                      {user?.full_name || 'Admin'}
                    </span>
                    <span className="text-xs text-gray-500">{getUserRole}</span>
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user text-primary"></i>
                  </div>
                  <button
                    onClick={() => logout()}
                    disabled={isLoadingLogout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Đăng xuất"
                  >
                    {isLoadingLogout ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-primary"></div>
                    ) : (
                      <i className="fas fa-sign-out-alt"></i>
                    )}
                    <span className="hidden sm:inline">Đăng xuất</span>
                  </button>
                </div>
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
        className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </div>
  );
}
