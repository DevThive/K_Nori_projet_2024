const Currentblogitems = ({ currentBlogItems }) => {
  return (
    <div className="container">
      <div className="row">
        {currentBlogItems?.map((data, id) => (
          <>
            <div className="col-xl-4 col-lg-6 col-md-6 mb-30" key={id}>
              <div className="blog__two-item">
                <div className="blog__two-item-image">
                  <img
                    style={{ height: '200px', objectFit: 'cover' }}
                    src={data.img}
                    alt="image"
                  />
                  <div className="blog__two-item-image-date">
                    <h5>{data.date}</h5>
                    <span>{data.month}</span>
                  </div>
                </div>
                <div className="blog__two-item-content">
                  <h6>Post by - {data.postby}</h6>
                  <h4>
                    <a href={`/notice-details/${data.id}`}>{data.title}</a>
                  </h4>
                  <a className="simple-btn" href={`/notice-details/${data.id}`}>
                    <i className="far fa-chevron-right"></i>자세히보기
                  </a>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Currentblogitems;
