import Link from 'next/link';

//메인페이지 회사정보
const Companyarea = () => {
  return (
    <div className="company__area section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-5 col-sm-4 sm-mb-30">
            {/* <div className="company__area-left sm-t-center">
              <h1>
                <span className="counter">180</span>+
              </h1>
              <h5>Get International</h5>
            </div> */}
          </div>
          <div className="col-xxl-5 col-xl-4 col-lg-4 col-md-7 col-sm-8 lg-mb-30">
            <div className="company__area-image">
              <img src="/comapnyimgTest.jpg" alt="" />
            </div>
          </div>
          <div className="col-xxl-5 col-xl-6 col-lg-6">
            <div className="company__area-title">
              <span className="subtitle__one">COMPANY INTRODUCTION</span>
              <h2>
                추억을 빚고 행복을 담는다 <br />
                케이놀이 문화재단
              </h2>
              <p>
                전통을 기반으로 현대에 빛나는 새로운 문화를 지향하는
                케이놀이문화재단. 우리나라 고유의 놀이문화를 발굴하여 경험하고,
                그 가치를 콘텐츠화하여 더 넓은 세상과 공유합니다.
              </p>
              <Link className="theme-border-btn" href="/about">
                자세히보기<i className="fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companyarea;
