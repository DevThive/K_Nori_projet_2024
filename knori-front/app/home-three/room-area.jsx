const Roomarea = () => {
  return (
    <div className="room__area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-6">
            <div className="room__area-title">
              <span className="subtitle__one">Our Features</span>
              <h2>Single Room</h2>
              <p>
                Phasellus semper vehicula eros, non ultricies neque rhoncus sed.
                Morbi aliquam ex in dui aliquet consectetur. Fusce pellentesque
                turpis ut lorem elementum commodo.
              </p>
              <div className="room__area-title-contact">
                <div className="room__area-title-contact-icon">
                  <i className="fal fa-phone-alt"></i>
                </div>
                <div className="room__area-title-contact-content">
                  <span>
                    <a href="tel:+123(458)585568">+123 (458) 585 568</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 order-last order-lg-second">
            <div className="room__area-image">
              <img src="/img/hotel/hotel-5.jpg" alt="" />
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 xl-mb-30">
            <div className="room__area-list">
              <div className="room__area-list-item">
                <div className="room__area-list-item-icon">
                  <img src="/img/icon/key.png" alt="" />
                </div>
                <div className="room__area-list-item-content">
                  <h5>Smart Key</h5>
                  <p>
                    Phasellus semper vehicula eros, non ultricies neque rhoncus
                    sed
                  </p>
                </div>
              </div>
              <div className="room__area-list-item">
                <div className="room__area-list-item-icon">
                  <img src="/img/icon/breakfast.png" alt="" />
                </div>
                <div className="room__area-list-item-content">
                  <h5>Breakfast</h5>
                  <p>
                    Phasellus semper vehicula eros, non ultricies neque rhoncus
                    sed
                  </p>
                </div>
              </div>
              <div className="room__area-list-item">
                <div className="room__area-list-item-icon">
                  <img src="/img/icon/wifi-1.png" alt="" />
                </div>
                <div className="room__area-list-item-content">
                  <h5>Home Wifi</h5>
                  <p>
                    Phasellus semper vehicula eros, non ultricies neque rhoncus
                    sed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roomarea;
