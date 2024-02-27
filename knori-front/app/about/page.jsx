'use client';
import BreadCrumb from '../breadcrumb/breadcrumb';
import FooterTwo from '../footer/footerTwo';
import HeaderTwo from '../header/headerTwo';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import Gallery from './gallery';
import Offerarea from './offer-area';
import Servicestwo from './services-two';
import Team from './team';
import SEO from '@/components/seo';

const About = () => {
  return (
    <>
      <SEO pageTitle="About Us" />
      <HeaderTwo />
      <BreadCrumb
        title="About Us"
        innerTitle="About Us"
        bgImage="/img/bg/banner-bg.jpg"
      />
      <Offerarea />
      <Servicestwo />
      <Gallery />
      <Team />
      <FooterTwo />
      <ScrollToTopButton />
    </>
  );
};

export default About;
