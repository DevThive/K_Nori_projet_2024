'use client';
import { useEffect } from 'react';

const SEO = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle + ' - Hostily - Luxury Hotel Next js Template';
  }, []);
};

export default SEO;
