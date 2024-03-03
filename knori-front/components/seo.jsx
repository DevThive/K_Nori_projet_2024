'use client';
import { useEffect } from 'react';

const SEO = ({ pageTitle }) => {
  useEffect(() => {
    document.title = pageTitle;
  }, []);
};

export default SEO;
