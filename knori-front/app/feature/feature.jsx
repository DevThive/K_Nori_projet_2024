import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

export default function Feature() {
  return (
    <div className="feature__area">
      <div className="container">
        <div className="row align-items-center bg-left mb-60 flex justify-between">
          <div className="col-xl-6 col-lg-6">
            <div className="feature__area-image">
              <Image
                alt=""
                src="/img/features/feature-1.jpg"
                width={600}
                height={600}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="feature__area-left">
              <div className="feature__area-left-title">
                <span className="subtitle__one">Our Food</span>
                <h2>Restaurant Silo</h2>
                <p>
                  Proin massa augue, lacinia at blandit ac, fringilla
                  scelerisque tortor. Mauris sit amet lectus porta,
                </p>
                <Link className="theme-border-btn" href="/about">
                  Read More <FaArrowRight className="ml-10" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-right mb-60 flex justify-between">
          <div className="col-xl-6 col-lg-6  order-last order-lg-first">
            <div className="feature__area-left">
              <div className="feature__area-left-title">
                <span className="subtitle__one">Read Our Books</span>
                <h2>The Library</h2>
                <p>
                  Proin massa augue, lacinia at blandit ac, fringilla
                  scelerisque tortor. Mauris sit amet lectus porta,
                </p>
                <Link className="theme-border-btn" href="/about">
                  Read More <FaArrowRight className="ml-10" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="feature__area-image">
              <Image
                src="/img/features/feature-2.jpg"
                alt=""
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-left mb-60 flex justify-between">
          <div className="col-xl-6 col-lg-6">
            <div className="feature__area-image">
              <Image
                src="/img/features/feature-3.jpg"
                alt=""
                width={600}
                height={600}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="feature__area-left">
              <div className="feature__area-left-title p-4">
                <span className="subtitle__one">Fitness Equipment</span>
                <h2>Exercise equipment</h2>
                <p>
                  Proin massa augue, lacinia at blandit ac, fringilla
                  scelerisque tortor. Mauris sit amet lectus porta,
                </p>
                <Link className="theme-border-btn" href="/about">
                  Read More <FaArrowRight className="ml-10" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-right flex justify-between">
          <div className="col-xl-6 col-lg-6 order-last order-lg-first">
            <div className="feature__area-left">
              <div className="feature__area-left-title">
                <span className="subtitle__one">Experiences</span>
                <h2>Swimming Pool</h2>
                <p>
                  Proin massa augue, lacinia at blandit ac, fringilla
                  scelerisque tortor. Mauris sit amet lectus porta,
                </p>
                <Link className="theme-border-btn" href="/about">
                  Read More <FaArrowRight className="ml-10" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="feature__area-image">
              <Image
                src="/img/features/feature-4.jpg"
                alt=""
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
