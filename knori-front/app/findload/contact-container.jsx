import Social from '../socials/page';

const Contactcontainer = () => {
  return (
    <>
      <div className="contact__area section-padding pb-0">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-5 col-lg-5 lg-mb-30"
              style={{ marginTop: '120px' }}
            >
              <div className="contact__area-title">
                <h3 className="mb-25">오시는 길</h3>
                <p>
                  경기도 양주시 백석읍 기산로 548 케이놀이문화재단 (주)
                  케이놀이재단
                </p>
              </div>
              <div className="contact__area-info">
                <div className="contact__area-info-item">
                  <div className="contact__area-info-item-icon">
                    <i className="fal fa-phone-alt"></i>
                  </div>
                  <div className="contact__area-info-item-content">
                    <span>문의 전화</span>
                    <h6>
                      <a href="tel:+123(458)896895">+123 ( 458 ) 896 895</a>
                    </h6>
                  </div>
                </div>
                <div className="contact__area-info-item">
                  <div className="contact__area-info-item-icon">
                    <i className="fal fa-envelope"></i>
                  </div>
                  <div className="contact__area-info-item-content">
                    <span>문의 이메일</span>
                    <h6>
                      <a href="mailto:support@gamil.com">support@gamil.com</a>
                    </h6>
                  </div>
                </div>
                <div className="contact__area-info-item">
                  <div className="contact__area-info-item-icon">
                    <i className="fal fa-map-marker-alt"></i>
                  </div>
                  <div className="contact__area-info-item-content">
                    <span>도로명 주소</span>
                    <h6>
                      <a href="#">경기도 양주시 백석읍 기산로 548</a>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="contact__area-social">
                <Social />
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="contact__area-map section-padding">
                <iframe
                  style={{ filter: 'none' }}
                  // width="600"
                  // height="450"
                  // style="border:0"
                  // loading="lazy"
                  // allowfullscreen
                  // referrerpolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBAVID0S0bBc8oQgvmdSLb3p2NJSBOZpvk
    &q=경기도+양주시+백석읍+기산로+548"
                ></iframe>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-xl-12">
              
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Contactcontainer;
