'use client';
import Image from 'next/image';
import Offers from '../../public/testimg/aboutimg2.jpeg';

const Offerarea = () => {
  return (
    <>
      <div className="offers__area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="offers__area-title">
                <span className="subtitle__one">Company Offers</span>
                <h2>
                  추억을 빚고 행복을 담는다 <br /> 케이놀이 문화재단
                </h2>
                <p>
                  케이놀이문화재단은 수백년 전통 놀이의 가치를 현대적 감각으로
                  재해석해 특별한 힐링 공간으로 탈바꿈시킨 곳입니다. 이곳에서는
                  전통과 현대가 조화를 이룬 환경에서 옛 놀이문화를 경험하고
                  다양한 교육과 체험 프로그램을 통해 영감을 얻을 수 있습니다.
                  사회적 배려계층에게도 열린 문화의 장을 제공하여 모든
                  방문객에게 마음의 안식을 선사합니다. 케이놀이문화재단에서는
                  자신만의 시간을 갖고 아름다운 전통 속 현대적 감성을 느낄 수
                  있습니다.
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
