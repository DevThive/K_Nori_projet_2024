import Image from 'next/image';
import FooterTwo from '../footer/footerTwo';
import ScrollToTopButton from '../scroll-to-top/scrollToTop';
import roomStyleAllBlogs from '@/components/data/room-style-all-blogs';
import BreadCrumb from '../breadcrumb/breadcrumb';
import HeaderTwo from '../header/headerTwo';
import SEO from '@/components/seo';

const Class = () => {
  return (
    <>
      <SEO pageTitle="Class List" />
      <HeaderTwo />
      <BreadCrumb
        title="클래스 목록"
        innerTitle="Class List"
        bgImage="/img/bg/banner-bg.jpg"
      />
      <div className="modern__room section-padding">
        <div className="container">
          <div className="row">
            {roomStyleAllBlogs.map((item, index) => (
              <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-30">
                <div className="deluxe__three-item">
                  <div className="deluxe__three-item-image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={500}
                    />
                    <div className="deluxe__three-item-image-content">
                      <h4>
                        <a href="/room-details">{item.title}</a>
                        <span>${item.price}/Night</span>
                      </h4>
                      <p>{item.des}</p>
                      <div className="deluxe__three-item-image-content-meta">
                        <ul>
                          <li>
                            <i className="fal fa-bed-alt"></i> ({item.bed})
                            bed's
                          </li>
                          <li>
                            <i className="fal fa-users"></i> ({item.guest})
                            Guest's
                          </li>
                        </ul>
                      </div>
                      <div className="deluxe__three-item-image-content-bottom">
                        <a className="simple-btn" href="/room-details">
                          <i className="far fa-chevron-right"></i> Read More
                        </a>
                        <p>
                          <i className="fas fa-star"></i> <span>4.8</span>2k
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterTwo />
      <ScrollToTopButton />
    </>
  );
};

export default Class;
