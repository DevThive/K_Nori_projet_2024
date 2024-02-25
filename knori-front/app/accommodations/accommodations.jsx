'use client';
import Accommodationsimg from './accommodations-img';
import Accommodationstext from './accommodations-text';
import './accommodations.css';

export default function Accommodations() {
  return (
    <div className="accommodations__area section-padding">
      <div className="container">
        <div className="row accommodations d-flex justify-around items-center">
          <Accommodationstext />
          <Accommodationsimg />
        </div>
      </div>
    </div>
  );
}
