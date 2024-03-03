'use client';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Blog, Home, Page, Room } from './Menu';
import DropDown from './DropDown';
import Link from 'next/link';
import SideBar from './sidebar/sidebar';
import Search from './sidebar/search';
import Social from '../socials/page';

const HeaderTwo = ({ variant }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [search, setSearch] = useState(false);
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
    <>
      <div className="header__area three">
        <div className="container custom__container">
          <div className="header__area-top-bar">
            <div className="header__area-top-bar-left">
              <div className="header__area-top-bar-left-info">
                <span>
                  <Link href="https://www.google.com/maps">
                    <i className="fal fa-map-marker-alt"></i>QWHX+4V 양주시
                    경기도
                  </Link>
                </span>
              </div>
            </div>
            <div className="header__area-top-bar-right">
              <div className="header__area-top-bar-right-info">
                <span>Follow Us :</span>
                <Social />
              </div>
            </div>
          </div>
          <div
            className={`header__area-menubar three header__sticky ${variant ? variant : ''} ${isSticky ? 'header__sticky-sticky-menu' : ''}`}
          >
            <div className="header__area-menubar-left">
              <div className="header__area-menubar-left-logo">
                <Link href="/">
                  <img src="/logo2.png" alt="logo" height={'300px'} />
                </Link>
                <span
                  className={
                    mobileToggle
                      ? 'mobile-menu two mobile-menu-active'
                      : 'mobile-menu two'
                  }
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <span></span>
                </span>
              </div>
            </div>
            <div className="header__area-menubar-right three">
              <div className="header__area-menubar-right-menu three menu-responsive">
                <ul
                  className="mobile__menu"
                  style={{ display: `${mobileToggle ? 'block' : 'none'}` }}
                >
                  {/* <li className="menu-item-has-children">
                    <a href="#">Home</a>
                    <DropDown>
                      <ul className="sub-menu">
                        <Home />
                      </ul>
                    </DropDown>
                  </li> */}
                  <li className="menu-item-has-children">
                    <a href="#">회사소개</a>
                    <DropDown>
                      <ul className="sub-menu">
                        <Page />
                      </ul>
                    </DropDown>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">클래스</a>
                    <DropDown>
                      <ul className="sub-menu">
                        <Room />
                      </ul>
                    </DropDown>
                  </li>
                  <li>
                    <a href="/gallery">갤러리</a>
                    {/* <DropDown>
                      <ul className="sub-menu">
                        <Blog />
                      </ul>
                    </DropDown> */}
                  </li>
                  <li>
                    <Link href="/contact">문의하기</Link>
                  </li>
                </ul>
              </div>
              <div className="header__area-menubar-right-box">
                <div className="header__area-menubar-right-box-search">
                  <div className="search">
                    <span
                      className="header__area-menubar-right-box-search-icon two open"
                      onClick={() => setSearch(true)}
                    >
                      <i className="fal fa-search"></i>
                    </span>
                  </div>
                  <Search isOpen={search} setIsOpen={setSearch} />
                </div>
                <div className="header__area-menubar-right-sidebar">
                  <div
                    className="header__area-menubar-right-sidebar-popup-icon three"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <i className="fal fa-bars"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    </>
  );
};

export default HeaderTwo;
