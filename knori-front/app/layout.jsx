'use client';
import NextTopLoader from 'nextjs-toploader';
import { useEffect } from 'react';
import './styles/styles.css';
import './assets/css/all.css';
import './assets/css/meanmenu.min.css';
import './assets/sass/style.css';

export default function RootLayout({ children }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.min.js');
  }, []);
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="favicon.png" />
      <body>
        <NextTopLoader showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
