'use client';
import blogsData from '@/components/data/blogs';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Blog() {
  const blogs = blogsData.slice(0, 3);
  const [active, setActive] = useState(1);
  const handelActive = (index) => {
    setActive(index);
  };

  return (
    <div className="blog__area section-padding">
      <div className="container">
        <div className="row mb-30">
          <div className="col-xl-12">
            <div className="blog__area-title">
              <span className="subtitle__one">Our Blog</span>
              <h2>Read Our Blog and News</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {blogs?.map((blog, index) => (
            <div key={index} className="col-xl-4 col-lg-6 mt-30">
              <div
                className={`blog__area-item ${
                  active === index ? 'blog__area-item-hover' : ''
                }`}
                key={index}
                onMouseEnter={() => handelActive(index)}
              >
                <div className="blog__area-item-image">
                  <Link href={`/blog-details/${blog.id}`}>
                    <Image
                      src={blog.img}
                      alt="blog-image"
                      width={500}
                      height={500}
                    />
                  </Link>
                </div>
                <div className="blog__area-item-content">
                  <div className="blog__area-item-content-box">
                    <div className="blog__area-item-content-box-date">
                      <h3>{blog.date}</h3>
                      <span>
                        {blog.month} {blog.year}
                      </span>
                    </div>
                    <div className="blog__area-item-content-box-title">
                      <h5>
                        <Link href={`/blog-details/${blog.id}`}>
                          {blog.title}
                        </Link>
                      </h5>
                    </div>
                  </div>
                  <div className="blog__area-item-content-btn">
                    <Link
                      className="simple-btn-2"
                      href={`/blog-details/${blog.id}`}
                    >
                      Read More
                      <i className="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
