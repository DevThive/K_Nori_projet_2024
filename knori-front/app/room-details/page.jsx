import SEO from '@/components/seo';
import BreadCrumb from '../breadcrumb/breadcrumb';
import Footer from '../footer/footer';
import HeaderOne from '../header/HeaderOne';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Roomdetailscontainer from './room-details-container';

const Roomdetails = () => {
  return (
    <>
      <SEO pageTitle="Room Details" />
      <HeaderOne />
      <BreadCrumb
        title="Room Details"
        innerTitle="Room Details"
        bgImage="/img/banner/page-banner-6.jpg"
      />
      <Roomdetailscontainer />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Roomdetails;
