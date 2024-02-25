import Link from 'next/link';

const Companyarea = () => {
  return (
    <div className="company__area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-5 col-sm-4 sm-mb-30">
            <div className="company__area-left sm-t-center">
              <h1>
                <span className="counter">180</span>+
              </h1>
              <h5>Get International</h5>
            </div>
          </div>
          <div className="col-xxl-5 col-xl-4 col-lg-4 col-md-7 col-sm-8 lg-mb-30">
            <div className="company__area-image">
              <img src="/img/hotel/hotel-9.jpg" alt="" />
            </div>
          </div>
          <div className="col-xxl-5 col-xl-6 col-lg-6">
            <div className="company__area-title">
              <span className="subtitle__one">Company</span>
              <h2>Optimize your business For online bookings.</h2>
              <p>
                Morbi et tellus imperdiet, aliquam nulla sed, dapibus erat.
                Aenean dapibus sem non purus venenatis vulputate. Donec accumsan
                eleifend blandit. Nullam auctor ligula vel ante volutpat,
              </p>
              <Link className="theme-border-btn" href="/about">
                Read More<i className="fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companyarea;
