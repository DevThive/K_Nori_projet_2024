import Link from 'next/link';
import React from 'react';
import Social from '../socials/page';
import footerOne from '@/components/data/footerOne';

const FooterTwo = () => {
  return (
    <>
      <div className="footer__two">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-5 col-sm-8 sm-mb-30">
              <div className="footer__two-widget">
                <div className="footer__two-widget-about">
                  <div className="footer__two-widget-about-logo">
                    <Link href="/">
                      <img src="/logo-1.png" alt="logo" />
                    </Link>
                  </div>
                  <p>
                    Nunc at lacus at nibh scelerisque scelerisque id vel metus.
                    Vivamus mollis diam maximus, consequat nulla sit amet,
                    ultricies quam. Proin
                  </p>
                  <div className="footer__two-widget-about-social">
                    <Social />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 lg-mb-30">
              <div className="footer__two-widget">
                <h5>Pages Links</h5>
                <div className="footer__two-widget-menu">
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
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 sm-mb-30">
              <div className="footer__two-widget">
                <h5>Recent Post</h5>
                <div className="footer__two-widget-post">
                  <div className="footer__two-widget-post-item">
                    <span>
                      <i className="fal fa-calendar-check"></i>20 June, 2023
                    </span>
                    <h6>
                      <Link href="/blog-details/1">
                        The best architecture is competition
                      </Link>
                    </h6>
                  </div>
                  <div className="footer__two-widget-post-item">
                    <span>
                      <i className="fal fa-calendar-check"></i>29 June, 2023
                    </span>
                    <h6>
                      <Link href="/blog-details/2">
                        The best architecture is competition
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-7 col-sm-6">
              <div className="footer__two-widget">
                <h5>Opening Hours</h5>
                <div className="footer__two-widget-hours">
                  <p>
                    Sun<span>7 : 00 AM - 2 : 00 PM</span>
                  </p>
                  <p>
                    Mon<span>9 : 00 AM - 4 : 00 PM</span>
                  </p>
                  <p>
                    Tue<span>6 : 00 AM - 1 : 00 PM</span>
                  </p>
                  <p>
                    Wed<span>8 : 00 AM - 3 : 00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright__two">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="copyright__two-title">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTwo;
