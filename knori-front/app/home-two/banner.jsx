import Link from 'next/link';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';

const Banner = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className="banner__three"
      style={{ backgroundImage: `url('/img/bg/banner-bg.jpg')` }}
    >
      <div className="container custom__container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-7 order-last order-lg-first">
            <div className="banner__three-title">
              <span className="subtitle__one">Hotel Booking Website</span>
              <h1>
                Book hotels online<span> Get 20% Off !</span>
              </h1>
              <Link className="theme-btn" href="/about">
                Read More<i className="fal fa-long-arrow-right"></i>
              </Link>
              <div className="banner__three-title-video">
                <div className="video__play">
                  <React.Fragment>
                    <ModalVideo
                      channel="youtube"
                      isOpen={isOpen}
                      videoId="SZEflIVnhH8"
                      onClose={() => setOpen(false)}
                    />
                    <span onClick={() => setOpen(true)}>
                      <i className="fas fa-play"></i>
                    </span>
                  </React.Fragment>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 lg-mb-60">
            <div className="banner__three-right">
              <img className="img__full" src="/img/banner-6.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
