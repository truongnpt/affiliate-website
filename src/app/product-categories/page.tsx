import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import ProductCategories from '../../components/user/pages/product-categories';

export default function ProductsCategoriesPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <ProductCategories />
      <Footer />
    </div>
  );
}
