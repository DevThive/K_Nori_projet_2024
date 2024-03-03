import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="col-xl-3 col-lg-4 lg-mb-30">
      <div className="all__sidebar">
        <div className="all__sidebar-item">
          <h5>Your Price</h5>
          <div className="all__sidebar-item-price">
            <ul>
              <li>
                <i className="fal fa-bed-alt"></i>(3) bed's
              </li>
              <li>
                <i className="fal fa-users"></i>(6) Guest's
              </li>
            </ul>
            <h4>
              $219<span>/Night</span>
            </h4>
            <a className="theme-btn" href="/contact">
              Book Now<i className="fal fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
        <div className="all__sidebar-item">
          <h5>Category</h5>
          <div className="all__sidebar-item-category">
            <ul>
              <li>
                <Link href="/room-details">
                  <i className="far fa-angle-double-right"></i>Luxury Room
                  <span>(08)</span>
                </Link>
              </li>
              <li>
                <Link href="/room-details">
                  <i className="far fa-angle-double-right"></i>Small Suite
                  <span>(06)</span>
                </Link>
              </li>
              <li>
                <Link href="/room-details">
                  <i className="far fa-angle-double-right"></i>Single
                  <span>(05)</span>
                </Link>
              </li>
              <li>
                <Link href="/room-details">
                  <i className="far fa-angle-double-right"></i>Family
                  <span>(09)</span>
                </Link>
              </li>
              <li>
                <Link href="/room-details">
                  <i className="far fa-angle-double-right"></i>Double Room
                  <span>(03)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="all__sidebar-item">
          <h5>Booking Now</h5>
          <div className="all__sidebar-item-booking">
            <div className="all__sidebar-item-booking-item mb-10">
              <select name="select">
                <option value="1">Check In</option>
                <option value="2">Check In</option>
                <option value="3">Check In</option>
                <option value="4">Check In</option>
                <option value="5">Check In</option>
              </select>
            </div>
            <div className="all__sidebar-item-booking-item mb-10">
              <select name="select">
                <option value="1">Check Out</option>
                <option value="2">Check Out</option>
                <option value="3">Check Out</option>
                <option value="4">Check Out</option>
                <option value="5">Check Out</option>
              </select>
            </div>
            <div className="all__sidebar-item-booking-item mb-30">
              <select name="select">
                <option value="1">Room</option>
                <option value="2">1 Room</option>
                <option value="3">2 Room</option>
                <option value="4">3 Room</option>
                <option value="5">4 Room</option>
              </select>
            </div>
            <Link className="theme-btn" href="#">
              Check<i className="fal fa-long-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
