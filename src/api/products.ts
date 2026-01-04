import { productsService, SortOption } from "@/services/products";

const getList = async (params?: {
  categoryId?: number;
  limit?: number;
  offset?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
}) => {
  return await productsService.getList(params);
};

export type { SortOption };

const getById = async (id: number) => {
  return await productsService.getById(id);
};

const getBySlug = async (slug: string) => {
  return await productsService.getBySlug(slug);
};

const create = async (product: {
  name: string;
  price: number;
  discount?: number;
  category_id: number;
  image: string;
  url: string;
  rating?: number;
  sales?: number;
  description?: string;
}) => {
  return await productsService.create(product);
};

const update = async (id: number, product: {
  name?: string;
  price?: number;
  discount?: number;
  category_id?: number;
  image?: string;
  url?: string;
  rating?: number;
  sales?: number;
  description?: string;
}) => {
  return await productsService.update(id, product);
};

const deleteById = async (id: number) => {
  return await productsService.deleteById(id);
};

export const apiProducts = {
  getList,
  getById,
  getBySlug,
  create,
  update,
  deleteById,
};

