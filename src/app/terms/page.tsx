import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import Terms from '../../components/user/pages/terms';

export default function TermsPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <Terms />
      <Footer />
    </div>
  );
}
