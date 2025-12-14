import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import About from '../../components/user/pages/about';

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <About />
      <Footer />
    </div>
  );
}
