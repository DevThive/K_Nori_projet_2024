import Link from 'next/link';

const Place = () => {
  return (
    <div className="place__two section-padding">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-6 lg-mb-30">
            <div className="place__two-left">
              <div className="place__two-left-image">
                <div className="place__two-left-image-item">
                  <img src="/img/hotel/hotel-6.jpg" alt="" />
                </div>
                <div className="place__two-left-image-item mt-60">
                  <img src="/img/hotel/hotel-7.jpg" alt="" />
                </div>
                <div className="place__two-left-image-item">
                  <img src="/img/hotel/hotel-8.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="place__two-title">
              <span className="subtitle__one">Awesome Place</span>
              <h2>
                전통과 현대가 <br /> 조화로운 특별한 힐링 공간
              </h2>
              <p>
                수백년 전통이 현대와 조화를 이뤄내는 케이놀이문화재단은 단순히
                문화재단의 테두리를 넘어서, 우리에게 잊혀져 가는 전통 놀이의
                가치를 재발견하고, 그것을 현대적 감각으로 재해석하여 새롭게
                빛나는 문화적 공간으로 탈바꿈시키는 곳입니다.
              </p>
              <Link className="theme-btn" href="/about">
                자세히보기<i className="fal fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place;
