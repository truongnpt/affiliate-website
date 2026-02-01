'use client';
import React from 'react';
import Image from 'next/image';
import { appConfig } from '../../../config/app.config';

export const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <Image
                src={appConfig.logo}
                alt={appConfig.name}
                width={180}
                height={54}
                className="h-50 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              {appConfig.description}
            </p>
            <div className="rounded-lg p-3 mb-6 bg-primary/10 border border-primary/20">
              <p className="text-xs text-gray-300 flex items-center gap-2">
                <i className={`${appConfig.features.trustedBadge.icon} text-green-400`}></i>
                <span>{appConfig.features.trustedBadge.text}</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-tags text-primary"></i>
              Danh mục sản phẩm
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href={appConfig.navigation.productCategories}
                  className="transition-colors flex items-center gap-2 text-gray-400 hover:text-primary"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Tất cả danh mục
                </a>
              </li>
              <li>
                <a
                  href={appConfig.navigation.products}
                  className="transition-colors flex items-center gap-2 text-gray-400 hover:text-primary"
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
                      className="text-xs bg-gray-800 hover:bg-primary hover:text-white px-3 py-1 rounded-full transition-colors text-gray-400"
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
              <i className="fa-solid fa-building text-primary"></i>
              Thông tin
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href={appConfig.navigation.about}
                  className="transition-colors flex items-center gap-2 text-gray-400 hover:text-primary"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  href={appConfig.navigation.blogs}
                  className="transition-colors flex items-center gap-2 text-gray-400 hover:text-primary"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Blog
                </a>
              </li>
              <li>
                <a
                  href={appConfig.navigation.contact}
                  className="transition-colors flex items-center gap-2 text-gray-400 hover:text-primary"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Liên hệ
                </a>
              </li>
              <li className="pt-2 border-t border-gray-800">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <i className="fa-solid fa-info-circle"></i>
                  <span>Thế Giới KHÔ - Thực phẩm khô chất lượng</span>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-headset text-primary"></i>
              Hỗ trợ
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href={appConfig.navigation.support}
                  className="transition-colors flex items-center gap-2 text-gray-400 hover:text-primary"
                >
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                  Trung tâm hỗ trợ
                </a>
              </li>
              <li>
                <a
                  href={appConfig.navigation.terms}
                  className="transition-colors flex items-center gap-2 text-gray-400 hover:text-primary"
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
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
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
