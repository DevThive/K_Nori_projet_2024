const BlogSideBar = () => {
  return (
    <div className="col-xxl-3 col-xl-4 col-lg-4">
      <div className="all__sidebar-item-search mb-40">
        <form action="#">
          <input type="text" placeholder="Search....." />
          <button type="submit">
            <i className="fal fa-search"></i>
          </button>
        </form>
      </div>
      <div className="all__sidebar">
        <div className="all__sidebar-item">
          <h5>Category</h5>
          <div className="all__sidebar-item-category">
            <ul>
              <li>
                <a href="#">
                  <i className="far fa-angle-double-right"></i>Luxury Room
                  <span>(08)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="far fa-angle-double-right"></i>Small Suite
                  <span>(06)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="far fa-angle-double-right"></i>Single
                  <span>(05)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="far fa-angle-double-right"></i>Family
                  <span>(09)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="far fa-angle-double-right"></i>Double Room
                  <span>(03)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="all__sidebar-item">
          <h5>Recent Post</h5>
          <div className="all__sidebar-item-post">
            <div className="all__sidebar-item-post-item">
              <div className="all__sidebar-item-post-item-image">
                <a href="/blog-details/1">
                  <img src="/img/blog/post-1.jpg" alt="" />
                </a>
              </div>
              <div className="all__sidebar-item-post-item-content">
                <span>
                  <i className="fal fa-calendar-alt"></i>05 June, 2023
                </span>
                <h6>
                  <a href="/blog-details/1">Book your next Trip today!</a>
                </h6>
              </div>
            </div>
            <div className="all__sidebar-item-post-item">
              <div className="all__sidebar-item-post-item-image">
                <a href="/blog-details/2">
                  <img src="/img/blog/post-2.jpg" alt="" />
                </a>
              </div>
              <div className="all__sidebar-item-post-item-content">
                <span>
                  <i className="fal fa-calendar-alt"></i>02 June, 2023
                </span>
                <h6>
                  <a href="/blog-details/2">Booking is an Easy way to find</a>
                </h6>
              </div>
            </div>
            <div className="all__sidebar-item-post-item">
              <div className="all__sidebar-item-post-item-image">
                <a href="/blog-details/3">
                  <img src="/img/blog/post-3.jpg" alt="" />
                </a>
              </div>
              <div className="all__sidebar-item-post-item-content">
                <span>
                  <i className="fal fa-calendar-alt"></i>04 June, 2023
                </span>
                <h6>
                  <a href="/blog-details/3">Book instantly And also get</a>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="all__sidebar-item">
          <h5>Tag'g</h5>
          <div className="all__sidebar-item-tag">
            <ul>
              <li>
                <a href="#">Hotel</a>
              </li>
              <li>
                <a href="#">Booking Now</a>
              </li>
              <li>
                <a href="#">Luxury</a>
              </li>
              <li>
                <a href="#">Single room</a>
              </li>
              <li>
                <a href="#">Small suite</a>
              </li>
              <li>
                <a href="#">Family</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSideBar;
