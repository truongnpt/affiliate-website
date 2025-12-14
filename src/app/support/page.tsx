import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import Support from '../../components/user/pages/support';

export default function SupportPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <Support />
      <Footer />
    </div>
  );
}
