import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import Contact from '../../components/user/pages/contact';

export default function ContactPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <Contact />
      <Footer />
    </div>
  );
}
