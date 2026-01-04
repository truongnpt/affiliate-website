import React from 'react';
import Header from '../../../components/user/layouts/header';
import Footer from '../../../components/user/layouts/footer';
import ProductDetail from '../../../components/user/pages/products/ProductDetail';

export default function ProductDetailPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <ProductDetail />
      <Footer />
    </div>
  );
}

