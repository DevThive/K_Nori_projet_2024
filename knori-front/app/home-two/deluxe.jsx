import roomStyleAllBlogs from '@/components/data/room-style-all-blogs';
import Image from 'next/image';
import Link from 'next/link';

const Deluxe = () => {
  const roomItem = roomStyleAllBlogs.slice(0, 3);
  return (
    <div className="deluxe__three section-padding">
      <div className="container">
        <div className="row align-items-center mb-30">
          <div className="col-xl-6 col-lg-6 col-md-8">
            <div className="deluxe__three-title">
              <span className="subtitle__one">Healing Class</span>
              <h2>클래스 소개</h2>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-4">
            <div className="deluxe__three-right">
              <Link className="theme-btn" href="/about">
                자세히보기<i className="fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {roomItem.map((item, index) => (
            <div key={index} className="col-xl-4 col-lg-6 col-md-6 mt-30">
              <div className={`deluxe__three-item ${item.cl}`}>
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
                          <i className="fal fa-bed-alt"></i> ({item.bed}) bed's
                        </li>
                        <li>
                          <i className="fal fa-users"></i> ({item.guest})
                          Guest's
                        </li>
                      </ul>
                    </div>
                    <div className="deluxe__three-item-image-content-bottom">
                      <Link className="simple-btn" href="/room-details">
                        <i className="far fa-chevron-right"></i> 자세히보기
                      </Link>
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
  );
};

export default Deluxe;
