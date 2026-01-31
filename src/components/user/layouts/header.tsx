'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { appConfig } from '../../../config/app.config';
import { useCart } from '../../../store/cart';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isActive = (href: string) => pathname === href && !isHome;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest('.mobile-menu') &&
        !target.closest('.menu-button')
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: appConfig.navigation.products, label: 'Sản phẩm' },
    { href: appConfig.navigation.productCategories, label: 'Danh mục' },
    { href: appConfig.navigation.blogs, label: 'Blog' },
    { href: appConfig.navigation.about, label: 'Giới thiệu' },
    { href: appConfig.navigation.support, label: 'Hỗ trợ' },
  ];

  const navLinkClass =
    'text-gray-600 font-medium transition-all duration-200 hover:text-primary py-2 px-3 rounded-full hover:bg-white border-2 border-transparent hover:border-primary';

  return (
    <>
      {/* Fixed header - liquid glass, rounded, top 20px */}
      <header
        id="header"
        className="header-glass fixed max-w-7xl mx-auto top-5 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-8 z-50 rounded-full overflow-hidden"
      >
        <div className="px-2 sm:px-5 lg:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <a
              href="/"
              onClick={closeMenu}
              className="flex items-center flex-shrink-0 rounded-xl p-1 -m-1 transition-opacity hover:opacity-90"
            >
              <Image
                src={appConfig.logo}
                alt={appConfig.name}
                width={140}
                height={42}
                className="h-9 w-auto sm:h-10 md:h-11 object-contain"
                priority
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${navLinkClass} ${isActive(link.href) ? 'text-primary' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cart - Desktop & Mobile */}
              <a
                href="/cart"
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-gray-600 hover:text-primary hover:bg-white/60 transition-all duration-200 relative"
                aria-label="Giỏ hàng"
              >
                <i className="fa-solid fa-shopping-cart text-lg sm:text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] sm:text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </a>

              {/* Contact - Desktop */}
              <a
                href={appConfig.navigation.contact}
                className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
              >
                <i className="fa-solid fa-envelope text-sm" />
                Liên hệ
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="menu-button lg:hidden flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-xl text-gray-600 hover:text-primary hover:bg-white/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent"
                aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
                aria-expanded={isMenuOpen}
              >
                <i
                  className={`fa-solid text-xl transition-transform duration-300 ${isMenuOpen ? 'fa-xmark' : 'fa-bars'
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden
        />
      )}

      {/* Mobile Menu - Slide from right, glass style, rounded left */}
      <div
        className={`mobile-menu fixed top-5 right-4 bottom-5 w-full max-w-[320px] sm:max-w-sm z-50 lg:hidden transform transition-transform duration-300 ease-out overflow-y-auto mobile-menu-glass ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="pt-20 pb-8 px-6">
          {/* Close button */}
          <button
            onClick={closeMenu}
            className="absolute top-5 right-4 p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white/50 transition-colors"
            aria-label="Đóng menu"
          >
            <i className="fa-solid fa-xmark text-xl" />
          </button>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center gap-3 py-3.5 px-4 rounded-2xl text-gray-700 font-medium hover:bg-white/80 hover:text-primary transition-all duration-200"
              >
                <i className="fa-solid fa-chevron-right text-primary/60 text-xs" />
                {link.label}
              </a>
            ))}

            {/* Contact CTA - Mobile */}
            <a
              href={appConfig.navigation.contact}
              onClick={closeMenu}
              className="mt-6 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-200"
            >
              <i className="fa-solid fa-envelope" />
              Liên hệ
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
