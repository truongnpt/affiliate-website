import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import Products from '../../components/user/pages/products';

export default function ProductsPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <Products />
      <Footer />
    </div>
  );
}
