'use client';
import React, { useState } from 'react';

export default function DropDown({ children }) {
  const [mobileToggle, setMobileToggle] = useState(false);
  const handelMobileToggle = () => {
    setMobileToggle(!mobileToggle);
  };
  return (
    <>
      <span
        className={
          mobileToggle ? 'mobile-menu-toggle active' : 'mobile-menu-toggle'
        }
        onClick={handelMobileToggle}
      ></span>
      {children}
    </>
  );
}
