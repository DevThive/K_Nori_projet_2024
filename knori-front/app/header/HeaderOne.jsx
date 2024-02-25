'use client';

import React, { useEffect, useState } from 'react';
import { Blog, Home, Page, Room } from './Menu';
import DropDown from './DropDown';
import Link from 'next/link';

export default function HeaderOne({ variant }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  return (
    <div
      className={`header__sticky ${variant ? variant : ''} ${isSticky ? 'header__sticky-sticky-menu' : ''}`}
    >
      <div className="header__area">
        <div className="container custom__container">
          <div className="header__area-menubar">
            <div className="header__area-menubar-left">
              <div className="header__area-menubar-left-logo">
                <Link href="/">
                  <img src="/logo.png" alt="logo" />
                </Link>
                <span
                  className={
                    mobileToggle
                      ? 'mobile-menu mobile-menu-active'
                      : 'mobile-menu'
                  }
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <span></span>
                </span>
              </div>
            </div>
            <div className="header__area-menubar-right">
              <div className="header__area-menubar-right-menu menu-responsive">
                <ul
                  className="mobile__menu"
                  style={{ display: `${mobileToggle ? 'block' : 'none'}` }}
                >
                  <li className="menu-item-has-children">
                    <a href="#">Home</a>
                    <DropDown />
                    <ul className="sub-menu">
                      <Home />
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Pages</a>
                    <DropDown />
                    <ul className="sub-menu">
                      <Page />
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Room</a>
                    <DropDown />
                    <ul className="sub-menu">
                      <Room />
                    </ul>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">Blog</a>
                    <DropDown />
                    <ul className="sub-menu">
                      <Blog />
                    </ul>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header__area-menubar-right-box">
              <div className="header__area-menubar-right-box-btn">
                <Link className="theme-btn" href="/contact">
                  Book Now<i className="fal fa-long-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
