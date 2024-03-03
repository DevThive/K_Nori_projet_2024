import teams from '@/components/data/team';
import Social from '../socials/page';
import Image from 'next/image';

const Teamarea = () => {
  const teamItem = teams.slice(0, 4);
  return (
    <div className="team__area section-padding">
      <div className="container">
        <div className="row mb-30">
          <div className="col-xl-12">
            <div className="team__area-title">
              <span className="subtitle__one">Our Exprt Meamber</span>
              <h2>Expert Our Services man</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {teamItem?.map((data, id) => (
            <div className="col-xl-3 col-lg-4 col-md-6 mt-30" key={id}>
              <div className="team__area-item">
                <div className="team__area-item-image">
                  <Image alt="" src={data.img} />
                  <div className="team__area-item-image-overlay">
                    <div className="team__area-item-image-overlay-social">
                      <Social />
                    </div>
                    <div className="team__area-item-image-overlay-content">
                      <h5>{data.name}</h5>
                      <span>{data.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teamarea;
