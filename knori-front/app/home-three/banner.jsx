'use client';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import Link from 'next/link';
const bannerData = {
  bannerItem: [
    {
      subtitle: 'Hotel Booking Website',
      title: 'The best way to book hotels online.',
      image: '/img/banner-2.jpg',
    },
    {
      subtitle: 'Hotel Booking Website',
      title: 'The Best Hotel Deals in the World.',
      image: '/img/banner-4.jpg',
    },
  ],
};
const { bannerItem } = bannerData;
const Banner = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="banner__two">
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        effect={'fade'}
        loop={true}
        modules={[EffectFade, Pagination, Autoplay]}
      >
        {bannerItem?.map((data, id) => (
          <SwiperSlide className="banner__two-area" key={id}>
            <div
              className="banner__two-area-image"
              style={{ backgroundImage: `url(${data.image})` }}
            ></div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-12 col-lg-12">
                  <div className="banner__two-content">
                    <span>{data.subtitle}</span>
                    <h1>{data.title}</h1>
                    <div className="banner__two-content-button">
                      <Link className="theme-btn" href="/about">
                        Read More<i className="fal fa-long-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="banner__two-video custom__container">
        <div className="banner__two-video-left">
          <div className="video__play">
            <React.Fragment>
              <span onClick={() => setOpen(true)}>
                <i className="fas fa-play"></i>
              </span>
            </React.Fragment>
          </div>
        </div>
        <div className="banner__two-video-right">
          <span>
            <a href="#deluxe">
              <i className="fal fa-long-arrow-left"></i>Scroll Down
            </a>
          </span>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="SZEflIVnhH8"
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Banner;
