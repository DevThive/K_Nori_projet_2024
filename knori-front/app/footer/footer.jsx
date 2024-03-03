// Import necessary components and icons
import footerOne from '@/components/data/footerOne';
import Image from 'next/image';
import Link from 'next/link';
import Social from '../socials/page';

const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title_1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  description,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title_2,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  widgetMenus,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title_3,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title_4,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  office_des,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  officeInfos,
} = footerOne;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pageslink = [
  'Room Cleaning',
  'Car Parking',
  'Swimming pool',
  'Fitness Gym',
];

// Define the Footer component
export default function Footer() {
  return (
    <div className="footer__area">
      <div className="container">
        <div className="row flex justify-between">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 sm-mb-30">
            <div className="footer__area-widget">
              <div className="footer__area-widget-about">
                <div className="footer__area-widget-about-logo">
                  {/* Company logo */}
                  <Link href="/">
                    <Image
                      layout="responsive"
                      src="/logo.png"
                      alt=""
                      width={200}
                      height={50}
                    />
                  </Link>
                </div>
                {/* Company description */}
                <p>
                  Phasellus nisi sapien, rutrum placerat sapien eu, rhoncus
                  tempus
                </p>
                <div className="footer__area-widget-about-social">
                  <Social />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 lg-mb-30">
            <div className="footer__area-widget">
              {/* Contact information */}
              <h5>Information</h5>
              <div className="footer__area-widget-contact">
                {/* Address */}
                {footerOne.officeInfos.map((item, index) => (
                  <div className="footer__area-widget-contact-item" key={index}>
                    <div className="footer__area-widget-contact-item-icon">
                      {item.icon}
                    </div>
                    <div className="footer__area-widget-contact-item-content">
                      {/* Address details */}
                      <span>
                        <Link href={item.link}>{item.info}</Link>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-5 col-sm-4 sm-mb-30">
            <div className="footer__area-widget">
              {/* Page links */}
              <h5>Pages Links</h5>
              <div className="footer__area-widget-menu">
                <ul>
                  {footerOne.widgetMenus.map((item, index) => (
                    <li key={index}>
                      <Link href={item.link}>
                        <i className="fal fa-angle-double-right"></i>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-7 col-sm-8">
            <div className="footer__area-widget">
              {/* Subscription form */}
              <h5>Subscribe</h5>
              <div className="footer__area-widget-subscribe">
                <form action="#">
                  {/* Email input */}
                  <input type="text" name="email" placeholder="Email Address" />
                  {/* Submit button */}
                  <button type="submit">
                    <i className="fal fa-hand-pointer"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright__area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-7 md-mb-10">
              <div className="copyright__area-left md-t-center">
                <p>
                  Copyright © 2023
                  <a href="https://themeforest.net/user/themeori/portfolio">
                    {' '}
                    ThemeOri
                  </a>{' '}
                  Website by<Link href="/"> Hostily</Link>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-5">
              <div className="copyright__area-right t-right md-t-center">
                {/* Footer links */}
                <ul>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                  <li>
                    <a href="#">Terms of Use</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
