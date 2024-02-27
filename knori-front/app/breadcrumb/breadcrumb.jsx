import Link from 'next/link';
import React from 'react';

const BreadCrumb = ({ title, innerTitle, bgImage }) => {
  return (
    <div
      className="banner__three"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="page__banner-title">
              <h1 style={{ color: 'black' }}>{title}</h1>
              <div className="page__banner-title-menu">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <span>-</span>
                    {innerTitle}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
