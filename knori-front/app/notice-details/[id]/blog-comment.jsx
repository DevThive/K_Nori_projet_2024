const Blogcomment = ({ blogsData }) => {
  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8 lg-mb-30">
      <div className="blog__details-left">
        <div className="blog__details-left-meta">
          <h3 className="mb-20">{blogsData.content_name}</h3>
          <div className="text-end">
            <ul>
              <li>
                <a href="#">
                  <i className="fal fa-user"></i>글쓴이 : 관리자
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fal fa-calendar-alt"></i>07, March 2023
                </a>
              </li>
            </ul>
          </div>
        </div>

        <img
          style={{ height: '400px', objectFit: 'cover' }}
          src={blogsData.photo}
          alt=""
        />
        <div className="blog__details-left-meta"></div>
        <p className="mb-25">{blogsData.content}</p>
        {/* <p>
          Nulla at eleifend lorem. Praesent et ex sed metus egestas feugiat.
          Donec velit libero, feugiat ac dictum vel, dignissim id ante. Praesent
          hendrerit posuere condimentum.
        </p>
        <div className="blog__details-left-box">
          <div className="blog__details-left-box-icon">
            <img src="/img/icon/quote.png" alt="" />
          </div>
          <p>
            Aenean imperdiet finibus sodales. Sed non ex nisl. Maecenas ut
            dictum neque, at euismod felis. Etiam rhoncus neque vitae efficitur
            mollis. Vestibulum sed pulvinar magna. Suspendisse
          </p>
          <h5>David Beckham</h5>
        </div>
        <p>
          Vestibulum eget tellus rhoncus, dictum massa a, mattis massa. Cras in
          leo semper, ultricies ligula nec, ornare tellus. Suspendisse quam
          risus, semper et ultricies a, commodo eu tortor. Phasellus elementum
          tincidunt varius. Nam facilisis, ante eget gravida vestibulum, ante
          nisi feugiat nulla, in dapibus neque turpis et dolor. Vestibulum in
          urna urna.
        </p>
        <div className="row mt-40 mb-40">
          <div className="col-sm-6 sm-mb-30">
            <div className="blog__details-left-list">
              <img className="img__full" src="/img/blog/blog-11.jpg" alt="" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="blog__details-left-list blog__details-left-list-hover">
              <img className="img__full" src="/img/blog/blog-12.jpg" alt="" />
            </div>
          </div>
        </div>
        <p className="mb-30">
          Design pretium fermentum quam, sit amet cursus ante sollicitudin vel.
          Morbi consequat risus consequat, porttitor orci sit amet, iaculis
          nisl. Integer quis sapien neceli ultrices euismod sit amet id lacus.
          Sed a imperdiet erat. Duis eu est dignissim lacus dictum hendrerit
          quis vitae mi. Fusce eu nulla ac nisi cursus tincidun. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Integer tristique
          sem eget leo faucibus porttitor.
        </p> */}
      </div>
    </div>
  );
};

export default Blogcomment;
