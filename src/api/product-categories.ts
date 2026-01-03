
import { productCategoriesService } from "@/services/product-categories";

const getList = async () => {
    return await productCategoriesService.getList();
};

export const apiProductCategories = {
    getList,
};