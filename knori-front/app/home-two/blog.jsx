import blogs from '@/components/data/blogs';

const Blog = () => {
  const blogItem = blogs.slice(0, 3);
  return (
    <div className="blog__two section-padding pt-0">
      <div className="container">
        <div className="row mb-30">
          <div className="col-xl-12">
            <div className="blog__two-title">
              <span className="subtitle__one">Our Blog</span>
              <h2>Read Our Blog amd News</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {blogItem.map((data, id) => (
            <>
              <div className="col-xl-4 col-lg-6 col-md-6 mt-30" key={id}>
                <div className="blog__two-item">
                  <div className="blog__two-item-image">
                    <img src={data.img} alt="image" />
                    <div className="blog__two-item-image-date">
                      <h5>{data.date}</h5>
                      <span>{data.month}</span>
                    </div>
                  </div>
                  <div className="blog__two-item-content">
                    <h6>Post by - {data.postby}</h6>
                    <h4>
                      <a href={`/blog-details/${data.id}`}>{data.title}</a>
                    </h4>
                    <a className="simple-btn" href={`/blog-details/${data.id}`}>
                      <i className="far fa-chevron-right"></i>Read More
                    </a>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
