import BreadCrumb from '@/app/breadcrumb/breadcrumb';
import Footer from '../../footer/footer';
import Blogdetailscontainer from './blog-details-container';
import HeaderOne from '@/app/header/HeaderOne';
import ScrollToTopButton from '@/app/scroll-to-top/scrollToTop';
import SEO from '@/components/seo';

const Blogdetails = () => {
  return (
    <>
      <SEO pageTitle="Blog Details" />
      <HeaderOne />
      <BreadCrumb
        title="Blog Details"
        innerTitle="Blog Details"
        bgImage="/img/banner/page-banner-2.jpg"
      />
      <Blogdetailscontainer />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Blogdetails;
