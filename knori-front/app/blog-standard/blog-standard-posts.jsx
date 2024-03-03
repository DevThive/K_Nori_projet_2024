import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const Blogstandardposts = ({ blogsData }) => {
  return (
    <div className="col-xxl-9 col-xl-8 col-lg-8 lg-mb-30">
      <div className="blog__standard-left">
        {blogsData?.map((blog, id) => (
          <div key={id} className="blog__standard-left-item">
            <div className="blog__standard-left-item-image">
              <Link href={`/blog-details/${blog.id}`}>
                <Image src={blog.img} alt="" width={500} height={500} />
              </Link>
            </div>
            <div className="blog__standard-left-item-content">
              <div className="blog__standard-left-item-content-meta">
                <ul>
                  <li>
                    <Link href="#">
                      <i className="fal fa-user"></i>By- Admin
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fal fa-calendar-alt"></i>07, March 2023
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fal fa-comments"></i>3 Comment
                    </Link>
                  </li>
                </ul>
              </div>
              <h3>
                <Link href={`/blog-details/${blog.id}`}>{blog.title}</Link>
              </h3>
              <p className="mb-40">
                Praesent non ullamcorper ligula. Proin a mi vitae massa lacinia
                sollicitudin eget eu ante. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Pellentesque consectetur rhoncus
                lobortis. Curabitur sit amet velit sagittis, pellentesque diam
                euismod, faucibus quam. Cras non rhoncus ipsum. Quisque mattis
                arcu metus,
              </p>
              <Link
                className="theme-border-btn"
                href={`/blog-details/${blog.id}`}
              >
                Read More
                <FaArrowRight className="ms-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogstandardposts;
