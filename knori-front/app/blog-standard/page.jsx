import SEO from '@/components/seo';
import BreadCrumb from '../breadcrumb/breadcrumb';
import Footer from '../footer/footer';
import HeaderOne from '../header/HeaderOne';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Blogstandardcontainer from './blog-standard';

const Blogstandard = () => {
  return (
    <>
      <SEO pageTitle="Blog Standard" />
      <HeaderOne />
      <BreadCrumb
        title="Blog Standard"
        innerTitle="Blog Standard"
        bgImage="/img/banner/page-banner-4.jpg"
      />
      <Blogstandardcontainer />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Blogstandard;
