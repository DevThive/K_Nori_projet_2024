'use client';
import Image from 'next/image';
import Offers from '../../public/img/features/offers.jpg';

const Offerarea = () => {
  return (
    <>
      <div className="offers__area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="offers__area-title">
                <span className="subtitle__one">Company Offers</span>
                <h2>Book now and save up to 35% On hotel rooms</h2>
                <p>
                  hasellus nisi sapien, rutrum placerat sapien eu, rhoncus
                  tempus felis. Nulla non pulvinar enim, vel viverra nunc.
                  Integer condimentum vulputate justo. Morbi rhoncus elit in
                  tellus viverra, vel fermentum orci dictum. Vestibulum non nisi
                  commodo, tincidunt elit non, consectetur tellus. Fusce in
                  commodo velit. In dapibus dui vitae tortor ullamcorper mollis.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="offers__area-image">
                <Image alt="" layout="responsive" src={Offers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offerarea;
