import hotel1 from '@/public/img/hotel/hotel-1.jpg';
import hotel2 from '@/public/img/hotel/hotel-2.jpg';
import Image from 'next/image';

const Accommodationsimg = () => {
  return (
    <div className="col-xl-7 col-lg-6">
      <div className="accommodations__area-right">
        <div className="accommodations__area-right-image">
          <Image src={hotel1} alt="" width={500} height={350} />
          <div className="accommodations__area-right-image-two">
            <Image src={hotel2} alt="" width={350} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodationsimg;
