/**
 * Application Configuration
 * Centralized configuration for the application
 */

export const appConfig = {
  // App Information
  name: 'NờPêTê TikTok Affiliate',
  tagline: 'Click vào link để mua hàng',
  description:
    'Website cung cấp link sản phẩm TikTok Shop chính thức. Click vào link để tự động thêm vào giỏ hàng và mua ngay với giá tốt nhất!',
  copyright: {
    year: 2025,
    owner: 'NờPêTê',
    text: 'Website cung cấp link TikTok Shop chính thức - An toàn & Uy tín',
  },

  // Brand Colors
  colors: {
    primary: '#ff5183',
    primaryHover: '#ff006e',
  },

  // Social Media
  social: {
    tiktok: {
      username: '@nopete_affiliate',
      url: 'https://www.tiktok.com/@nopete_affiliate',
    },
  },

  // Navigation Links
  navigation: {
    products: '/products',
    productCategories: '/product-categories',
    blogs: '/blogs',
    about: '/about',
    support: '/support',
    contact: '/contact',
    terms: '/terms',
  },

  // Features
  features: {
    trustedBadge: {
      icon: 'fa-solid fa-shield-halved',
      text: '100% Link TikTok Shop chính thức - An toàn & Uy tín',
    },
    usageSteps: [
      'Click vào link sản phẩm',
      'Tự động mở TikTok Shop',
      'Thêm vào giỏ hàng & mua',
    ],
  },

  // Popular Categories
  popularCategories: [
    { id: 1, name: 'Điện tử', href: '/products?category=1' },
    { id: 2, name: 'Thời trang', href: '/products?category=2' },
    { id: 3, name: 'Làm đẹp', href: '/products?category=3' },
  ],
} as const;

export type AppConfig = typeof appConfig;
