const Bookingarea = () => {
  return (
    <div
      className="booking__area"
      style={{ backgroundImage: `url('/img/bg/booking.jpg')` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-6">
            <div className="booking__area-form">
              <h3>Find your next stay</h3>
              <p>Morbi et tellus imperdiet</p>
              <form action="#">
                <div className="booking__area-form-check">
                  <div className="booking__area-form-check-item mb-10">
                    <input id="date" type="date" />
                  </div>
                  <div className="booking__area-form-check-item mb-10">
                    <input id="date2" type="date" />
                  </div>
                  <div className="booking__area-form-check-item">
                    <div className="booking__area-form-check-item-room">
                      <select name="select">
                        <option value="1">Room</option>
                        <option value="2">1 Room</option>
                        <option value="3">2 Room</option>
                        <option value="4">3 Room</option>
                        <option value="5">4 Room</option>
                        <option value="6">5 Room</option>
                      </select>
                    </div>
                  </div>
                  <div className="booking__area-form-check-item button">
                    <button className="theme-btn mt-25" type="submit">
                      Check Now<i className="fal fa-long-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingarea;
