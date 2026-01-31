import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import Checkout from '../../components/user/pages/checkout';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">
      <Header />
      <Checkout />
      <Footer />
    </div>
  );
}
