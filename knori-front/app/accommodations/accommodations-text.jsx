import Link from 'next/link';

const Accommodationstext = () => {
  return (
    <div className="col-xl-5 col-lg-6 lg-mb-50">
      <div className="accommodations__area-title">
        <span className="subtitle__one">Accommodations</span>
        <h2>Welcome Our Hotels And Resorts</h2>
        <p>
          Savvy travelers are looking for more than just the next destination on
          the map. They are looking for a memorable experience and to make new
          friends along the way.
        </p>
        <Link className="theme-btn" href="/about">
          Read More <i className="fal fa-long-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Accommodationstext;
