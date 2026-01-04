import { supabase } from "@/lib/supabase";

export type SortOption =
  | 'popular'
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'commission_desc';

const getList = async (params?: {
  categoryId?: number;
  limit?: number;
  offset?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortOption;
}) => {
  try {
    // Build data query with count
    let dataQuery = supabase
      .from('products')
      .select('*, product_categories(*)', { count: 'exact' });

    // Apply filters
    if (params?.categoryId) {
      dataQuery = dataQuery.eq('category_id', params.categoryId);
    }

    if (params?.search) {
      dataQuery = dataQuery.ilike('name', `%${params.search}%`);
    }

    if (params?.minPrice !== undefined) {
      dataQuery = dataQuery.gte('price', params.minPrice);
    }
    if (params?.maxPrice !== undefined) {
      dataQuery = dataQuery.lte('price', params.maxPrice);
    }

    // Apply sorting
    const sortBy = params?.sortBy || 'newest';
    switch (sortBy) {
      case 'popular':
        // Sort by sales (descending) - assuming there's a sales field
        dataQuery = dataQuery.order('sales', { ascending: false });
        break;
      case 'newest':
        // Sort by created_at (descending), then by id as fallback
        dataQuery = dataQuery.order('created_at', { ascending: false, nullsFirst: false });
        break;
      case 'price_asc':
        dataQuery = dataQuery.order('price', { ascending: true });
        break;
      case 'price_desc':
        dataQuery = dataQuery.order('price', { ascending: false });
        break;
      case 'commission_desc':
        // Sort by commission (descending) - assuming there's a commission field
        dataQuery = dataQuery.order('commission', { ascending: false });
        break;
      default:
        dataQuery = dataQuery.order('created_at', { ascending: false });
    }

    // Apply pagination
    const limit = params?.limit || 12;
    const offset = params?.offset || 0;
    dataQuery = dataQuery.range(offset, offset + limit - 1);

    // Execute query
    const { data: products, count, error } = await dataQuery;

    if (error) {
      console.error('Error fetching products:', error);
      return {
        message: 'Internal Server Error',
        error: error.message || 'Unknown error',
      };
    }

    // Return the list of products as JSON
    return {
      data: products || [],
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
    const { data: product, error } = await supabase
      .from('products')
      .select('*, product_categories(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return { message: 'Internal Server Error', error: error.message };
    }

    return {
      data: product
    };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
};

const getBySlug = async (slug: string) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*, product_categories(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching product by slug:', error);
      return { message: 'Internal Server Error', error: error.message };
    }

    return {
      data: product
    };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
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
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return { message: 'Error creating product', error: error.message };
    }

    return { data };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
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
  try {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return { message: 'Error updating product', error: error.message };
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
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return { message: 'Error deleting product', error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
  }
};

export const productsService = {
  getList,
  getById,
  getBySlug,
  create,
  update,
  deleteById,
};

