import noticeData from '@/components/data/notices';
import { useState, useEffect } from 'react';

const Blog = () => {
  const [notices, setNotices] = useState([]); // 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      const data = await noticeData();
      setNotices(data);
    };
    fetchData();
  }, []);

  const blogItem = notices.reverse().slice(0, 3);

  return (
    <div className="blog__two section-padding pt-0">
      <div className="container">
        <div className="row mb-30">
          <div className="col-xl-12">
            <div className="blog__two-title">
              <span className="subtitle__one">Notices</span>
              <h2>공지사항</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {blogItem.map((data, id) => (
            <>
              <div className="col-xl-4 col-lg-6 col-md-6 mt-30" key={id}>
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
                      <a href={`/blog-details/${data.id}`}>{data.title}</a>
                    </h4>
                    <a
                      className="simple-btn"
                      href={`/notice-details/${data.id}`}
                    >
                      <i className="far fa-chevron-right"></i>자세히보기
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
