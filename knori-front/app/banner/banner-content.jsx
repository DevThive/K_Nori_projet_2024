import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';

const BannerContent = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="banner__area-title">
          <h1>
            The Best Hotel<span>Deals in the World</span>
          </h1>
          <div className="banner__area-title-video">
            <div className="video__play">
              <React.Fragment>
                <ModalVideo
                  channel="youtube"
                  isOpen={isOpen}
                  videoId="SZEflIVnhH8"
                  onClose={() => setOpen(false)}
                />
                <span onClick={() => setOpen(true)}>
                  <i className="fas fa-play"></i>
                </span>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContent;
