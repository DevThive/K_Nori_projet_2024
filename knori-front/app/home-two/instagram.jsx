import Link from 'next/link';

const instagram = [
  {
    class: 'col-lg-2 col-sm-4 pl-5 pr-5 lg-mb-10',
    image: '/img/features/instagram-1.jpg',
  },
  {
    class: 'col-lg-2 col-sm-4 pl-5 pr-5 sm-mb-10',
    image: '/img/features/instagram-2.jpg',
  },
  {
    class: 'col-lg-2 col-sm-4 pl-5 pr-5 sm-mb-10',
    image: '/img/features/instagram-3.jpg',
  },
  {
    class: 'col-lg-2 col-sm-4 pl-5 pr-5 sm-mb-10',
    image: '/img/features/instagram-4.jpg',
  },
  {
    class: 'col-lg-2 col-sm-4 pl-5 pr-5 sm-mb-10',
    image: '/img/features/instagram-5.jpg',
  },
  {
    class: 'col-lg-2 col-sm-4 pl-5 pr-5',
    image: '/img/features/instagram-6.jpg',
  },
];

const Instagram = () => {
  return (
    <div className="instagram__area">
      <div className="container-fluid">
        <div className="row">
          {instagram.map((data, id) => (
            <div className={data.class} key={id}>
              <div className="instagram__area-item">
                <img src={data.image} alt="image" />
                <div className="instagram__area-item-icon">
                  <Link href="https://www.instagram.com" target="_blank">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instagram;
