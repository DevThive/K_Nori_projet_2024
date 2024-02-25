import Link from 'next/link';

const Accommodations = () => {
  return (
    <div className="accommodations__two section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-5 order-last order-lg-first">
            <div className="accommodations__two-left">
              <img src="/img/hotel/hotel-3.jpg" alt="" />
              <div className="accommodations__two-left-roll">
                <img className="content__roll" src="/img/content.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5 lg-mb-30">
            <div className="accommodations__two-title">
              <span className="subtitle__one">Accommodations</span>
              <h2>Traveling with your Company deal</h2>
              <p>
                Nullam tempus vel tortor eget suscipit. Suspendisse enim dolor,
                placerat quis elit et, feugiat consectetur mauris. Cras tempor
                sollicitudin eleifend. Cras efficitur libero sed ante luctus, at
                convallis erat egestas.
              </p>
              <Link className="theme-border-btn" href="/about">
                Read More<i className="fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-7 md-mb-30">
            <div className="accommodations__two-right">
              <img src="/img/hotel/hotel-4.jpg" alt="" />
              <div className="accommodations__two-right-bottom">
                <div className="accommodations__two-right-bottom-signature">
                  <img src="/img/bg/signature.png" alt="" />
                </div>
                <div className="accommodations__two-right-bottom-author">
                  <h5>David Beckham</h5>
                  <span>Founder CEO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodations;
