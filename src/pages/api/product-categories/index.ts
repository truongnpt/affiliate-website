import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

/**
 * Handle GET requests to fetch all product categories.
 * Note: This file is located in the Pages Router API directory (src/pages/api),
 * so it uses the (req, res) handler format instead of App Router's NextResponse.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Allow only GET requests
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    try {
        // Perform SELECT * FROM product_categories
        const { data: categories, error } = await supabase
            .from('product_categories')
            .select('*'); // Select only necessary columns

        if (error) {
            console.error('Error fetching categories:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }

        // Return the list of categories as JSON
        return res.status(200).json({
            data: categories,
            count: categories ? categories.length : 0
        });
    } catch (err: any) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}
