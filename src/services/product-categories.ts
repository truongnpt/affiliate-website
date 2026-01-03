import { supabase } from "@/lib/supabase";

const getList = async () => {
  try {
    // Perform SELECT * FROM product_categories
    const { data: categories, error } = await supabase
        .from('product_categories')
        .select('* , products(*)', { count: 'exact' }); // Select only necessary columns

    if (error) {
        console.error('Error fetching categories:', error);
        return { message: 'Internal Server Error', error: error.message };
    }

    // Return the list of categories as JSON
    return {
        data: categories,
        count: categories ? categories.length : 0
    };
} catch (err: any) {
    console.error('Unexpected error:', err);
    return { message: 'Internal Server Error', error: err.message };
}  
};

export const productCategoriesService = {
  getList,
};
