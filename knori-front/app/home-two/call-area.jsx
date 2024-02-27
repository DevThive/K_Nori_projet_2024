const Callarea = () => {
  return (
    <div className="call__area">
      <div className="container">
        <div className="row align-items-center call__area-bg three">
          <div className="col-xl-8">
            <div className="call__area-bg-left">
              <h3>문의하기 </h3>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="call__area-bg-right three">
              <div className="call__area-bg-right-icon">
                <i className="fal fa-phone-alt"></i>
              </div>
              <div className="call__area-bg-right-content">
                <span>
                  <a href="tel:+123(458)585568">+123 (458) 585 568</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callarea;
