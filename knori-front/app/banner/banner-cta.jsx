const BannerCta = () => {
  return (
    <div className="row">
      <form action="#">
        <div className="check__area">
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
              <select className="select" name="select">
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
  );
};

export default BannerCta;
