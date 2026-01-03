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

export const apiProducts = {
  getList,
  getById,
};

