import SEO from '@/components/seo';
import BreadCrumb from '../breadcrumb/breadcrumb';
import FooterTwo from '../footer/footerTwo';
import HeaderTwo from '../header/headerTwo';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Contactcontainer from './contact-container';

const Load = () => {
  return (
    <>
      <SEO pageTitle="Contact Us" />
      <HeaderTwo />
      <BreadCrumb
        title="찾아오시는 길"
        innerTitle="Directions"
        bgImage="/img/bg/banner-bg.jpg"
      />
      <Contactcontainer />
      <FooterTwo />
      <ScrollToTopButton />
    </>
  );
};

export default Load;
