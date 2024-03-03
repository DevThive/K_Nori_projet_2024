import BreadCrumb from '@/app/breadcrumb/breadcrumb';
import FooterTwo from '@/app/footer/footerTwo';
import Blogdetailscontainer from './blog-details-container';
import HeaderTwo from '@/app/header/headerTwo';
import ScrollToTopButton from '@/app/scroll-to-top/scrollToTop';
import SEO from '@/components/seo';

const Blogdetails = () => {
  return (
    <>
      <SEO pageTitle="Blog Details" />
      <HeaderTwo />
      <BreadCrumb
        title="공지사항"
        innerTitle="Notice"
        bgImage="/img/bg/banner-bg.jpg"
      />
      <Blogdetailscontainer />
      <FooterTwo />
      <ScrollToTopButton />
    </>
  );
};

export default Blogdetails;
