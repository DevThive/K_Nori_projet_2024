import SEO from '@/components/seo';
import BreadCrumb from '../breadcrumb/breadcrumb';
import Footer from '../footer/footer';
import HeaderOne from '../header/HeaderOne';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Contactcontainer from './contact-container';

const Contact = () => {
  return (
    <>
      <SEO pageTitle="Contact Us" />
      <HeaderOne />
      <BreadCrumb
        title="Contact Us"
        innerTitle="Contact Us"
        bgImage="/img/banner/page-banner-5.jpg"
      />
      <Contactcontainer />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Contact;
