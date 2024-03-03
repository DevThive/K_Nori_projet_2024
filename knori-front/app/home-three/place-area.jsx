import Link from 'next/link';

const Placearea = () => {
  return (
    <div className="place__area section-padding mt-35">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="place__area-image">
              <div className="row">
                <div className="col-6">
                  <div className="place__area-image-one">
                    <img src="/img/hotel/hotel-6.jpg" alt="" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="place__area-image-two">
                    <img src="/img/hotel/hotel-7.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 lg-mt-30">
            <div className="place__area-title">
              <span className="subtitle__one">Awesome Place</span>
              <h2>We're a unique place to Spend time</h2>
              <p>
                Phasellus malesuada convallis purus bibendum dictum. Maecenas
                semper nulla justo, quis pulvinar risus sagittis eget. Sed
                libero eros, tincidunt eu ante a, ultrices elementum arcu.
              </p>
              <Link className="theme-btn" href="about">
                Read More<i className="fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placearea;
