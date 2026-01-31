import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import Cart from '../../components/user/pages/cart';

export default function CartPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <Cart />
      <Footer />
    </div>
  );
}

