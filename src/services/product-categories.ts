import { supabase } from "@/lib/supabase";

const getList = async (params?: {
  limit?: number;
  offset?: number;
  search?: string;
}) => {
  try {
    let dataQuery = supabase
      .from('product_categories')
      .select('*, products(*)', { count: 'exact' });

    if (params?.search) {
      dataQuery = dataQuery.ilike('name', `%${params.search}%`);
    }

    // Apply pagination
    const limit = params?.limit || 10;
    const offset = params?.offset || 0;
    dataQuery = dataQuery.range(offset, offset + limit - 1);

    // Order by created_at
    dataQuery = dataQuery.order('created_at', { ascending: false });

    const { data: categories, count, error } = await dataQuery;

    if (error) {
        console.error('Error fetching categories:', error);
        return { message: 'Internal Server Error', error: error.message };
    }

    // Return the list of categories as JSON
    return {
        data: categories || [],
        count: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
    };
} catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
}  
};

const getById = async (id: number) => {
  try {
    const { data: category, error } = await supabase
      .from('product_categories')
      .select('*, products(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching category:', error);
      return { message: 'Internal Server Error', error: error.message };
    }

    return {
      data: category
    };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
};

const create = async (category: {
  name: string;
  slug?: string;
  image?: string;
  description?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .insert([category])
      .select()
      .single();

    if (error) {
      console.error('Error creating category:', error);
      return { message: 'Error creating category', error: error.message };
    }

    return { data };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
};

const update = async (id: number, category: {
  name?: string;
  slug?: string;
  image?: string;
  description?: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating category:', error);
      return { message: 'Error updating category', error: error.message };
    }

    return { data };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
};

const deleteById = async (id: number) => {
  try {
    const { error } = await supabase
      .from('product_categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting category:', error);
      return { message: 'Error deleting category', error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
};

const getFeatured = async (limit: number = 4) => {
  try {
    // Get all categories with their products
    const { data: categories, error } = await supabase
      .from('product_categories')
      .select('*, products(id)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured categories:', error);
      return { message: 'Internal Server Error', error: error.message };
    }

    if (!categories) {
      return { data: [] };
    }

    // Calculate product count for each category and sort by count
    const categoriesWithCount = categories
      .map((category) => ({
        ...category,
        productCount: Array.isArray(category.products) ? category.products.length : 0,
      }))
      .sort((a, b) => b.productCount - a.productCount)
      .slice(0, limit)
      .map(({ products, ...category }) => category); // Remove products array, keep only count

    return {
      data: categoriesWithCount,
    };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
};

export const productCategoriesService = {
  getList,
  getById,
  create,
  update,
  deleteById,
  getFeatured,
};
