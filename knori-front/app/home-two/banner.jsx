import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ModalVideo from 'react-modal-video';

const Banner = () => {
  // const [isOpen, setOpen] = useState(false);
  return (
    <div
      className="banner__three"
      // style={{ backgroundImage: `url('/img/bg/banner-bg.jpg')` }}
    >
      <div className="container custom__container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-7 order-last order-lg-first">
            <div className="banner__three-title">
              <span className="subtitle__one">K-PLAY CULTURE FOUNDATION</span>
              <h2>
                <strong>
                  <span>내 손으로 빚는 프리미엄 힐링</span>
                </strong>
                <br />
              </h2>
              <Link
                className="theme-btn"
                style={{ marginTop: '4%' }}
                href="/about"
              >
                자세히보기<i className="fal fa-long-arrow-right"></i>
              </Link>
              {/* <div className="banner__three-title-video">
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
              </div> */}
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 lg-mb-60">
            <div className="banner__three-right">
              <img className="img__full" src="/example1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
