import React from 'react';
import Footer from '../footer/footer';
import HeaderOne from '../header/HeaderOne';
import BreadCrumb from '../breadcrumb/breadcrumb';
import Link from 'next/link';
import SEO from '@/components/seo';

const NotFound = () => {
  return (
    <>
      <SEO pageTitle="Not Found" />
      <HeaderOne />
      <BreadCrumb
        title="Not Found"
        innerTitle="404 Page"
        bgImage="/img/banner/page-banner-1.jpg"
      />
      <div className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="error-page t-center">
                <img src="/404.svg" alt="error" />
                <div>
                  <Link class="theme-btn mt-50" href="/">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
