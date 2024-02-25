const Blogcomment = ({ blogsData }) => {
  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8 lg-mb-30">
      <div className="blog__details-left">
        <img src={blogsData.img} alt="" />
        <div className="blog__details-left-meta">
          <ul>
            <li>
              <a href="#">
                <i className="fal fa-user"></i>By - Admin
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fal fa-calendar-alt"></i>07, March 2023
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fal fa-comments"></i>3 Comment
              </a>
            </li>
          </ul>
        </div>
        <h3 className="mb-20">{blogsData.title}</h3>
        <p className="mb-25">
          Maecenas tincidunt hendrerit odio sed consectetur. Duis porta purus
          sapien, eget pretium augue consectetur ut. Nunc nibh augue, pretium
          quis imperdiet pellentesque, molestie eget nisi. Sed rutrum sit amet
          eros ac egestas. Maecenas tincidunt dolor in massa iaculis, vitae
          dignissim sem finibus. Pellentesque elementum vel arcu sit amet
          rhoncus.
        </p>
        <p>
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
        </p>
        <div className="blog__details-left-comment mb-45">
          <h4 className="mb-40">Comment (2)</h4>
          <div className="blog__details-left-comment-item">
            <div className="blog__details-left-comment-item-comment">
              <div className="blog__details-left-comment-item-comment-image">
                <img src="/img/avatar/comment-1.jpg" alt="" /> /
              </div>
              <div className="blog__details-left-comment-item-comment-content">
                <h5>
                  Justin Bieber
                  <a href="#">
                    <i className="far fa-reply-all"></i>Reply
                  </a>
                </h5>
                <span>20 May, 2023 At 9:PM</span>
                <p>
                  Phasellus nisi sapien, rutrum placerat sapien eu, rhoncus
                  tempus felis. Nulla non pulvinar enim, vel viverra nunc.
                  Integer condimentum vulputate justo.
                </p>
              </div>
            </div>
          </div>
          <div className="blog__details-left-comment-item ml-65 sm-ml-0">
            <div className="blog__details-left-comment-item-comment">
              <div className="blog__details-left-comment-item-comment-image">
                <img src="/img/avatar/comment-2.jpg" alt="" />
              </div>
              <div className="blog__details-left-comment-item-comment-content">
                <h5>
                  Camila Cabello
                  <a href="#">
                    <i className="far fa-reply-all"></i>Reply
                  </a>
                </h5>
                <span>22 May, 2023 At 7:PM</span>
                <p>
                  Phasellus nisi sapien, rutrum placerat sapien eu, rhoncus
                  tempus felis. Nulla non pulvinar enim, vel viverra nunc.
                  Integer condimentum vulputate justo.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="blog__details-left-contact">
          <h4 className="mb-40">Add Comment</h4>
          <div className="blog__details-left-contact-form">
            <form action="#">
              <div className="row">
                <div className="col-sm-6 mb-30">
                  <div className="blog__details-left-contact-form-item">
                    <i className="fal fa-user"></i>
                    <input type="text" name="name" placeholder="Full Name" />
                  </div>
                </div>
                <div className="col-sm-6 sm-mb-30">
                  <div className="blog__details-left-contact-form-item">
                    <i className="fal fa-envelope"></i>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div className="col-sm-12 mb-30">
                  <div className="blog__details-left-contact-form-item">
                    <i className="fal fa-globe"></i>
                    <input type="text" name="subject" placeholder="https://" />
                  </div>
                </div>
                <div className="col-sm-12 mb-30">
                  <div className="blog__details-left-contact-form-item">
                    <i className="fal fa-pen"></i>
                    <textarea
                      name="message"
                      placeholder="Type your comments...."
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="blog__details-left-contact-form-item">
                    <button className="theme-btn" type="submit">
                      post Comment<i className="fal fa-long-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogcomment;
