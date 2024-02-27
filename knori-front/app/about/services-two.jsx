'use client';
import Image from 'next/image';
import CarParking from '../../public/img/icon/car-parking.png';
import Locaion1 from '../../public/img/icon/location-1.png';
import SwimmingPool from '../../public/img/icon/swimming-pool.png';

const Servicestwo = () => {
  return (
    <>
      <div className="services__two">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 xl-mb-30">
              <div className="services__two-item">
                <span>01</span>
                <div className="services__two-item-icon">
                  <Image alt="" layout="responsive" src={Locaion1} />
                </div>
                <div className="services__two-item-content">
                  <h4>깨끗한 시설</h4>
                  <p>
                    Proin massa augue, lacinia at blandit ac, Fringilla
                    scelerisque tortor. Mauris
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 lg-mb-30">
              <div className="services__two-item">
                <span>02</span>
                <div className="services__two-item-icon">
                  <Image alt="" layout="responsive" src={CarParking} />
                </div>
                <div className="services__two-item-content">
                  <h4>넓은 주차장</h4>
                  <p>
                    Proin massa augue, lacinia at blandit ac, Fringilla
                    scelerisque tortor. Mauris
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 lg-mb-30">
              <div className="services__two-item">
                <span>03</span>
                <div className="services__two-item-icon">
                  <Image alt="" layout="responsive" src={SwimmingPool} />
                </div>
                <div className="services__two-item-content">
                  <h4>장점 3</h4>
                  <p>
                    Proin massa augue, lacinia at blandit ac, Fringilla
                    scelerisque tortor. Mauris
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="services__two-item">
                <span>04</span>
                <div className="services__two-item-icon">
                  <Image alt="" layout="responsive" src={Locaion1} />
                </div>
                <div className="services__two-item-content">
                  <h4>장점 4</h4>
                  <p>
                    Proin massa augue, lacinia at blandit ac, Fringilla
                    scelerisque tortor. Mauris
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Servicestwo;
