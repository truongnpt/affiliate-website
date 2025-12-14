// API base URL - Next.js API routes run on the same domain
// Use NEXT_PUBLIC_API_URL if set, otherwise use current origin
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '/api'; // Relative URL works for same-origin API routes

const getList = async () => {
  const response = await fetch(`${apiBaseUrl}/product-categories`);
  const data = await response.json();
  return data;
};

export const apiProductCategories = {
  getList,
};
