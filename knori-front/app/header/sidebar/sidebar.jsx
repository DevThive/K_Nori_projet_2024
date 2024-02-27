import Social from '@/app/socials/page';
import Link from 'next/link';
import React from 'react';

const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <div
        className={`header__area-menubar-right-sidebar-popup three ${isOpen ? 'active' : ''}`}
      >
        <div className="sidebar-close-btn" onClick={() => setIsOpen(false)}>
          <i className="fal fa-times"></i>
        </div>
        <div className="header__area-menubar-right-sidebar-popup-logo">
          <Link href="/">
            <img src="/playnori.png" alt="logo" />
          </Link>
        </div>
        <p>
          Morbi et tellus imperdiet, aliquam nulla sed, dapibus erat. Aenean
          dapibus sem non purus venenatis vulputate. Donec accumsan eleifend
          blandit. Nullam auctor ligula
        </p>
        <div className="header__area-menubar-right-box-sidebar-popup-image">
          <img src="/img/bar.jpg" alt="" />
        </div>
        <div className="header__area-menubar-right-box-sidebar-popup-contact">
          <h4 className="mb-30">Contact Info</h4>
          <div className="header__area-menubar-right-box-sidebar-popup-contact-item">
            <div className="header__area-menubar-right-box-sidebar-popup-contact-item-icon">
              <i className="fal fa-phone-alt"></i>
            </div>
            <div className="header__area-menubar-right-box-sidebar-popup-contact-item-content">
              <span>Call Now</span>
              <h6>
                <Link href="tel:+125(895)658568">+125 (895) 658 568</Link>
              </h6>
            </div>
          </div>
          <div className="header__area-menubar-right-box-sidebar-popup-contact-item">
            <div className="header__area-menubar-right-box-sidebar-popup-contact-item-icon">
              <i className="fal fa-envelope"></i>
            </div>
            <div className="header__area-menubar-right-box-sidebar-popup-contact-item-content">
              <span>Quick Email</span>
              <h6>
                <Link href="mailto:info.help@gmail.com">
                  info.help@gmail.com
                </Link>
              </h6>
            </div>
          </div>
          <div className="header__area-menubar-right-box-sidebar-popup-contact-item">
            <div className="header__area-menubar-right-box-sidebar-popup-contact-item-icon">
              <i className="fal fa-map-marker-alt"></i>
            </div>
            <div className="header__area-menubar-right-box-sidebar-popup-contact-item-content">
              <span>Office Address</span>
              <h6>
                <Link href="https://www.google.com/maps">
                  PV3M+X68 Welshpool United Kingdom
                </Link>
              </h6>
            </div>
          </div>
        </div>
        <div className="header__area-menubar-right-box-sidebar-popup-social">
          <Social />
        </div>
      </div>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`}></div>
    </>
  );
};

export default SideBar;
