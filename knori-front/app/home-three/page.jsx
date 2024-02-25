'use client';
import SEO from '@/components/seo';
import Footer from '../footer/footer';
import HeaderThree from '../header/headerThree';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Accommodations from './accommodations';
import Bandarea from './band-area';
import Banner from './banner';
import Bookingarea from './booking-area';
import Callarea from './call-area';
import Deluxe from './deluxe';
import Placearea from './place-area';
import Roomarea from './room-area';
import Services from './services';
import Teamarea from './team-area';

const Home3 = () => {
  return (
    <>
      <SEO pageTitle="Home Three" />
      <HeaderThree />
      <Banner />
      <Deluxe />
      <Callarea />
      <Accommodations />
      <Services />
      <Roomarea />
      <Teamarea />
      <Bookingarea />
      <Placearea />
      <Bandarea />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Home3;
