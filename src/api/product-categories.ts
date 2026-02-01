import { productCategoriesService } from "@/services/product-categories";

const getList = async (params?: {
  limit?: number;
  offset?: number;
  search?: string;
}) => {
    return await productCategoriesService.getList(params);
};

const getById = async (id: number) => {
  return await productCategoriesService.getById(id);
};

const create = async (category: {
  name: string;
  slug?: string;
  image?: string;
  description?: string;
}) => {
  return await productCategoriesService.create(category);
};

const update = async (id: number, category: {
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
}) => {
  return await productCategoriesService.update(id, category);
};

const deleteById = async (id: number) => {
  return await productCategoriesService.deleteById(id);
};

const getFeatured = async (limit?: number) => {
  return await productCategoriesService.getFeatured(limit);
};

export const apiProductCategories = {
    getList,
    getById,
    create,
    update,
    deleteById,
    getFeatured,
};