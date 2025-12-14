import React from 'react';
import Header from '../../components/user/layouts/header';
import Footer from '../../components/user/layouts/footer';
import Blogs from '../../components/user/pages/blogs';

export default function BlogsPage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <Blogs />
      <Footer />
    </div>
  );
}
