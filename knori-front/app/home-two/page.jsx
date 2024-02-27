'use client';
import SEO from '@/components/seo';
import FooterTwo from '../footer/footerTwo';
import HeaderTwo from '../header/headerTwo';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Banner from './banner';
import Blog from './blog';
import Booking from './booking';
import Callarea from './call-area';
import Companyarea from './company-area';
import Deluxe from './deluxe';
import Instagram from './instagram';
import Place from './place';

const Home2 = () => {
  return (
    <>
      <SEO pageTitle="K-PLAY" />
      <HeaderTwo />
      <Banner />
      <Companyarea />
      <Callarea />
      <Deluxe />
      <Booking />
      <Place />
      <Blog />
      <Instagram />
      <FooterTwo />
      <ScrollToTopButton />
    </>
  );
};

export default Home2;
