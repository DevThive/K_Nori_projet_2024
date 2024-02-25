import roomStyleAllBlogs from '@/components/data/room-style-all-blogs';
import Link from 'next/link';
import Sidebar from '../room-details/sidebar';

const Roomlistblogs = () => {
  const roomList = roomStyleAllBlogs.slice(0, 5);
  return (
    <div className="room__list section-padding">
      <div className="container">
        <div className="row">
          <Sidebar />
          <div className="col-xl-9 order-first order-xl-1 xl-mb-30">
            {roomList.map((item, index) => (
              <div key={index} className="room__list-item">
                <div className="room__list-item-left">
                  <div className="room__list-item-image">
                    <img src={item.img.src} alt="image" />
                  </div>
                </div>
                <div className="room__list-item-right">
                  <div className="room__list-item-right-content">
                    <h4>
                      <Link href="/room-details">{item.title}</Link>
                    </h4>
                    <p>{item.des}</p>
                    <ul>
                      <li>
                        <i className="fal fa-bed-alt"></i>({item.bed}) bed's
                      </li>
                      <li>
                        <i className="fal fa-users"></i>({item.guest}) Guest's
                      </li>
                    </ul>
                  </div>
                  <div className="room__list-item-right-meta">
                    <div className="room__list-item-right-meta-top">
                      <span>${item.price}/Night</span>
                      <p>
                        <i className="fas fa-star"></i>
                        <span>{item.star}</span>2k
                      </p>
                    </div>
                    <a className="simple-btn" href="/room-details">
                      <i className="far fa-chevron-right"></i>
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roomlistblogs;
