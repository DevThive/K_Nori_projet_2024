import Link from 'next/link';

const Place = () => {
  return (
    <div className="place__two section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-6 lg-mb-30">
            <div className="place__two-left">
              <div className="place__two-left-image">
                <div className="place__two-left-image-item">
                  <img src="/img/hotel/hotel-6.jpg" alt="" />
                </div>
                <div className="place__two-left-image-item mt-60">
                  <img src="/img/hotel/hotel-7.jpg" alt="" />
                </div>
                <div className="place__two-left-image-item">
                  <img src="/img/hotel/hotel-8.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="place__two-title">
              <span className="subtitle__one">Awesome Place</span>
              <h2>We're a unique place to Spend time</h2>
              <p>
                Phasellus malesuada convallis purus bibendum dictum. Maecenas
                semper nulla justo, quis pulvinar risus sagittis eget. Sed
                libero eros, tincidunt eu ante a, ultrices elementum arcu.
              </p>
              <Link className="theme-btn" href="/about">
                Read More<i className="fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place;
