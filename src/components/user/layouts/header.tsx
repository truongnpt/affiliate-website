'use client';
import React, { useState, useEffect } from 'react';
import { appConfig } from '../../../config/app.config';

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
                  <i className="fa-brands fa-tiktok text-2xl" style={{ color: appConfig.colors.primary }}></i>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-900 leading-tight">
                      {appConfig.name}
                    </span>
                    <span className="text-xs text-gray-500 -mt-0.5">
                      {appConfig.tagline}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href={appConfig.navigation.products}
              className="text-gray-700 font-medium transition-colors"
              style={{ color: 'inherit' }}
              onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Sản phẩm
            </a>
            <a
              href={appConfig.navigation.productCategories}
              className="text-gray-700 font-medium transition-colors"
              style={{ color: 'inherit' }}
              onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Danh mục sản phẩm
            </a>
            <a
              href={appConfig.navigation.blogs}
              className="text-gray-700 font-medium transition-colors"
              style={{ color: 'inherit' }}
              onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Blog
            </a>
            <a
              href={appConfig.navigation.about}
              className="text-gray-700 font-medium transition-colors"
              style={{ color: 'inherit' }}
              onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Giới thiệu
            </a>
            <a
              href={appConfig.navigation.support}
              className="text-gray-700 font-medium transition-colors"
              style={{ color: 'inherit' }}
              onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Hỗ trợ
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Desktop Contact Button */}
            <a
              href={appConfig.navigation.contact}
              className="hidden md:inline-block text-white px-4 py-2 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: appConfig.colors.primary }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appConfig.colors.primary}CC`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = appConfig.colors.primary}
            >
              Liên hệ
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="menu-button md:hidden h-[40px] w-[40px] flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={{ '--tw-ring-color': appConfig.colors.primary } as React.CSSProperties}
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
            href={appConfig.navigation.products}
            onClick={closeMenu}
            className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            Sản phẩm
          </a>
          <a
            href={appConfig.navigation.productCategories}
            onClick={closeMenu}
            className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            Danh mục sản phẩm
          </a>
          <a
            href={appConfig.navigation.blogs}
            onClick={closeMenu}
            className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            Blog
          </a>
          <a
            href={appConfig.navigation.about}
            onClick={closeMenu}
            className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            Giới thiệu
          </a>
          <a
            href={appConfig.navigation.support}
            onClick={closeMenu}
            className="text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            Hỗ trợ
          </a>
          <a
            href={appConfig.navigation.contact}
            onClick={closeMenu}
            className="text-white px-4 py-3 rounded-lg font-medium transition-colors text-center mt-4"
            style={{ backgroundColor: appConfig.colors.primary }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${appConfig.colors.primary}CC`}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = appConfig.colors.primary}
          >
            Liên hệ
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
