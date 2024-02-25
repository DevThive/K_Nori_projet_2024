'use client';
import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';

export default function Videoarea() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className="video__area"
      style={{ backgroundImage: `url('/img/video.jpg')` }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Title */}
          <div className="col-xxl-6 col-xl-7 col-lg-8">
            <div className="video__area-title">
              <h2>Book hotel rooms, get deals & book flights online.</h2>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-5 col-lg-4">
            <div className="video__area-right">
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
    </div>
  );
}
