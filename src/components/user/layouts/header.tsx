'use client';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
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
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      id="header"
      className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" onClick={closeMenu}>
                <div className="flex items-center space-x-2">
                  <i className="fa-brands fa-tiktok text-2xl text-[#ff5183]"></i>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 leading-tight">
                      NờPêTê TikTok Shop
                    </span>
                    <span className="text-xs text-gray-500 -mt-0.5">
                      Click vào link để mua hàng
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/products"
              className="text-gray-700 hover:text-[#ff5183] font-medium transition-colors"
            >
              Sản phẩm
            </a>
            <a
              href="/product-categories"
              className="text-gray-700 hover:text-[#ff5183] font-medium transition-colors"
            >
              Danh mục sản phẩm
            </a>
            <a
              href="/blogs"
              className="text-gray-700 hover:text-[#ff5183] font-medium transition-colors"
            >
              Blog
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-[#ff5183] font-medium transition-colors"
            >
              Giới thiệu
            </a>
            <a
              href="/support"
              className="text-gray-700 hover:text-[#ff5183] font-medium transition-colors"
            >
              Hỗ trợ
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Desktop Contact Button */}
            <a
              href="/contact"
              className="hidden md:inline-block bg-[#ff5183] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#ff5183]/80 transition-colors"
            >
              Liên hệ
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="menu-button md:hidden h-[40px] w-[40px] flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff5183] focus:ring-offset-2 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <i className="fa-solid fa-xmark text-2xl"></i>
              ) : (
                <i className="fa-solid fa-bars text-2xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden top-16"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`mobile-menu fixed top-16 left-0 right-0 bottom-0 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col px-4 py-6 space-y-4 min-h-full">
          <a
            href="/products"
            onClick={closeMenu}
            className="text-gray-700 hover:text-[#ff5183] font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sản phẩm
          </a>
          <a
            href="/product-categories"
            onClick={closeMenu}
            className="text-gray-700 hover:text-[#ff5183] font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Danh mục sản phẩm
          </a>
          <a
            href="/blogs"
            onClick={closeMenu}
            className="text-gray-700 hover:text-[#ff5183] font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Blog
          </a>
          <a
            href="/about"
            onClick={closeMenu}
            className="text-gray-700 hover:text-[#ff5183] font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Giới thiệu
          </a>
          <a
            href="/support"
            onClick={closeMenu}
            className="text-gray-700 hover:text-[#ff5183] font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hỗ trợ
          </a>
          <a
            href="/contact"
            onClick={closeMenu}
            className="bg-[#ff5183] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#ff5183]/80 transition-colors text-center mt-4"
          >
            Liên hệ
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
