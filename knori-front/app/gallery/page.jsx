import SEO from '@/components/seo';
import BreadCrumb from '../breadcrumb/breadcrumb';
import FooterTwo from '../footer/footerTwo';
import HeaderTwo from '../header/headerTwo';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Bloggridcontainer from './blog-grid-container';

const Bloggrid = () => {
  return (
    <>
      <SEO pageTitle="Gallery" />
      <HeaderTwo />
      <BreadCrumb
        title="갤러리"
        innerTitle="Gallery"
        bgImage="/img/bg/banner-bg.jpg"
      />
      <Bloggridcontainer />
      <FooterTwo />
      <ScrollToTopButton />
    </>
  );
};

export default Bloggrid;
