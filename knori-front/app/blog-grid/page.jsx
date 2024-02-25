import SEO from '@/components/seo';
import BreadCrumb from '../breadcrumb/breadcrumb';
import Footer from '../footer/footer';
import HeaderOne from '../header/HeaderOne';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Bloggridcontainer from './blog-grid-container';

const Bloggrid = () => {
  return (
    <>
      <SEO pageTitle="Blog Grid" />
      <HeaderOne />
      <BreadCrumb
        title="Blog Grid"
        innerTitle="Blog Grid"
        bgImage="/img/banner/page-banner-3.jpg"
      />
      <Bloggridcontainer />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Bloggrid;
