const Booking = () => {
  return (
    <div
      className="booking__two section-padding"
      style={{ backgroundImage: `url('/img/bg/booking-bg.jpg')` }}
    >
      <div className="container">
        <div className="row mb-60">
          <div className="col-xl-12">
            <div className="booking__two-title">
              <span className="subtitle__one">Booking Aria</span>
              <h2>Find the best hotels in Your area</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <form action="#">
              <div className="check__area two">
                <div className="check__area-item">
                  <p>
                    Check In
                    <input id="date" type="date" />
                  </p>
                </div>
                <div className="check__area-item">
                  <p>
                    Check Out
                    <input id="date2" type="date" />
                  </p>
                </div>
                <div className="check__area-item">
                  <div className="check__area-item-room">
                    <p>Room</p>
                    <select name="select">
                      <option value="1">1 Room</option>
                      <option value="2">2 Room</option>
                      <option value="3">3 Room</option>
                      <option value="4">4 Room</option>
                      <option value="5">5 Room</option>
                    </select>
                  </div>
                </div>
                <div className="check__area-item button">
                  <button className="theme-btn" type="submit">
                    Check Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-100">
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

export default Booking;
