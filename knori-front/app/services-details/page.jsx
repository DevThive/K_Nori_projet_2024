'use client';
import React from 'react';
import Footer from '../footer/footer';
import BreadCrumb from '../breadcrumb/breadcrumb';
import ServicesDetails from './service-details';
import HeaderOne from '../header/HeaderOne';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import SEO from '@/components/seo';

const Servicedetails = () => {
  return (
    <>
      <SEO pageTitle="Services Details" />
      <HeaderOne />
      <BreadCrumb
        title="Services Details"
        innerTitle="Services Details"
        bgImage="/img/banner/page-banner-1.jpg"
      />
      <ServicesDetails />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Servicedetails;
