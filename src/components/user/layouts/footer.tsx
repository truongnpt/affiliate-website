'use client';
import React from 'react';
import { appConfig } from '../../../config/app.config';

export const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className={`fa-brands fa-tiktok text-3xl`} style={{ color: appConfig.colors.primary }}></i>
              <div>
                <span className="text-xl font-bold block" style={{ color: appConfig.colors.primary }}>
                  {appConfig.name}
                </span>
                <span className="text-xs text-gray-500">
                  {appConfig.tagline}
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              {appConfig.description}
            </p>
            <div className="rounded-lg p-3 mb-6" style={{ backgroundColor: `${appConfig.colors.primary}10`, border: `1px solid ${appConfig.colors.primary}20` }}>
              <p className="text-xs text-gray-300 flex items-center gap-2">
                <i className={`${appConfig.features.trustedBadge.icon} text-green-400`}></i>
                <span>{appConfig.features.trustedBadge.text}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={appConfig.social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:transition-colors flex items-center gap-2 group"
                style={{ color: 'inherit' }}
                onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                title="Kênh TikTok của tôi"
              >
                <i className="fa-brands fa-tiktok text-2xl group-hover:scale-110 transition-transform"></i>
                <span className="text-sm">{appConfig.social.tiktok.username}</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-tags text-[#ff5183]"></i>
              Danh mục sản phẩm
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href={appConfig.navigation.productCategories}
                  className="transition-colors flex items-center gap-2"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Tất cả danh mục
                </a>
              </li>
              <li>
                <a
                  href={appConfig.navigation.products}
                  className="transition-colors flex items-center gap-2"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Xem tất cả sản phẩm
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-gray-500 mb-2">Danh mục phổ biến:</p>
                <div className="flex flex-wrap gap-2">
                  {appConfig.popularCategories.map((category) => (
                    <a
                      key={category.id}
                      href={category.href}
                      className="text-xs bg-gray-800 hover:text-white px-3 py-1 rounded-full transition-colors"
                      style={{ color: 'inherit' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = appConfig.colors.primary;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '';
                      }}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-building text-[#ff5183]"></i>
              Thông tin
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href={appConfig.navigation.about}
                  className="transition-colors flex items-center gap-2"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href={appConfig.navigation.blogs}
                  className="transition-colors flex items-center gap-2"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href={appConfig.navigation.contact}
                  className="transition-colors flex items-center gap-2"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Liên hệ
                </a>
              </li>
              <li className="pt-2 border-t border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="fa-solid fa-info-circle"></i>
                  <span>Website TikTok Shop affiliate</span>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-headset text-[#ff5183]"></i>
              Hỗ trợ
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href={appConfig.navigation.support}
                  className="transition-colors flex items-center gap-2"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Trung tâm hỗ trợ
                </a>
              </li>
              <li>
                <a
                  href={appConfig.navigation.terms}
                  className="transition-colors flex items-center gap-2"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = appConfig.colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Điều khoản dịch vụ
                </a>
              </li>
              <li className="pt-2 border-t border-gray-800">
                <p className="text-xs text-gray-500 mb-2">Cách sử dụng:</p>
                <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                  {appConfig.features.usageSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                &copy; {appConfig.copyright.year} {appConfig.name}. Thuộc quyền sở hữu của {appConfig.copyright.owner}.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {appConfig.copyright.text}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={appConfig.navigation.products}
                className="text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                style={{ backgroundColor: appConfig.colors.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = appConfig.colors.primaryHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = appConfig.colors.primary}
              >
                <i className="fa-solid fa-shopping-cart"></i>
                Xem sản phẩm ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
