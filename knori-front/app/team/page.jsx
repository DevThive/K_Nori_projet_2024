import BreadCrumb from '../breadcrumb/breadcrumb';
import Footer from '../footer/footer';
import HeaderOne from '../header/HeaderOne';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Servicesteam from './servicesteam';
import SEO from '@/components/seo';

const Team = () => {
  return (
    <>
      <SEO pageTitle="Team" />
      <HeaderOne />
      <BreadCrumb
        title="Services Team"
        innerTitle="Services Team"
        bgImage="/img/banner/page-banner-10.jpg"
      />
      <Servicesteam />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Team;
