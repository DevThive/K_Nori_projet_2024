import roomStyleAllBlogs from '@/components/data/room-style-all-blogs';
import Image from 'next/image';
import Link from 'next/link';

const Deluxe = () => {
  const roomItem = roomStyleAllBlogs.slice(0, 4);
  return (
    <div className="deluxe__two section-padding" id="deluxe">
      <div className="container">
        <div className="row align-items-end mb-30">
          <div className="col-xl-6 col-md-8">
            <div className="deluxe__two-title md-mb-40">
              <span className="subtitle__one">Deluxe and Luxury</span>
              <h2>Luxury Rooms</h2>
            </div>
          </div>
          <div className="col-xl-6 col-md-4">
            <div className="deluxe__two-btn t-right md-t-left">
              <Link className="theme-border-btn" href="/room-list">
                Al room's<i className="fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          {roomItem.map((item, index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6 mt-30">
              <div className="deluxe__two-item">
                <div className="deluxe__two-item-image">
                  <Link href="/room-details">
                    <Image
                      src={item.img.src}
                      alt={item.title}
                      width={500}
                      height={500}
                    />
                  </Link>
                </div>
                <div className="deluxe__two-item-content">
                  <span>${item.price}/Night</span>
                  <h4>
                    <Link href="/room-details">{item.title}</Link>
                  </h4>
                  <p>{item.des}</p>
                  <div className="deluxe__two-item-content-meta">
                    <ul>
                      <li>
                        <i className="fal fa-bed-alt"></i> ({item.bed}) bed's
                      </li>
                      <li>
                        <i className="fal fa-users"></i> ({item.guest}) Guest's
                      </li>
                    </ul>
                  </div>
                  <div className="deluxe__two-item-content-bottom">
                    <Link className="simple-btn" href="/room-details">
                      <i className="far fa-chevron-right"></i> Read More
                    </Link>
                    <p>
                      <i className="fas fa-star"></i>
                      <span>{item.star}</span>2k
                    </p>
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
