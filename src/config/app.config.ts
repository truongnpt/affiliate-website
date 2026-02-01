/**
 * Application Configuration
 * Thế Giới KHÔ - Thực phẩm khô (hạt, các loại khô, trái cây sấy...)
 */

export const appConfig = {
  // App Information
  name: 'Thế Giới KHÔ',
  tagline: 'Thực phẩm khô chất lượng - Thêm giỏ hàng & mua ngay',
  logo: '/images/logo.png',
  email: 'thegioikho@gmail.com',
  description:
    'Chuyên cung cấp thực phẩm khô chất lượng: hạt dinh dưỡng, các loại khô, trái cây sấy. Thêm vào giỏ hàng và mua hàng đơn giản, nhanh chóng.',
  copyright: {
    year: 2025,
    owner: 'Thế Giới KHÔ',
    text: 'Thực phẩm khô - Chất lượng & Uy tín',
  },

  // Brand colors: sử dụng Tailwind (globals.css --color-primary, --color-primary-hover)

  // Social Media (không dùng TikTok)
  social: {},

  // Navigation Links
  navigation: {
    products: '/products',
    productCategories: '/product-categories',
    blogs: '/blogs',
    about: '/about',
    support: '/support',
    contact: '/contact',
    terms: '/terms',
    login: '/login',
  },

  // Features
  features: {
    trustedBadge: {
      icon: 'fa-solid fa-seedling',
      text: 'Thực phẩm khô chất lượng - Thêm giỏ hàng & mua ngay',
    },
    usageSteps: [
      'Chọn sản phẩm yêu thích',
      'Thêm vào giỏ hàng',
      'Thanh toán & nhận hàng',
    ],
  },

  // Popular Categories - thực phẩm khô
  popularCategories: [
    { id: 1, name: 'Hạt dinh dưỡng', href: '/products?category=1' },
    { id: 2, name: 'Các loại khô', href: '/products?category=2' },
    { id: 3, name: 'Trái cây sấy', href: '/products?category=3' },
  ],
} as const;

export type AppConfig = typeof appConfig;
