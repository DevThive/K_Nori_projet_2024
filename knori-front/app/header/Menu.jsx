import Link from 'next/link';
import { Fragment } from 'react';
export const Home = () => (
  <Fragment>
    <li>
      <Link href="/">Home 01</Link>
    </li>
    <li>
      <Link href="/home-two">Home 02</Link>
    </li>
    <li>
      <Link href="/home-three">Home 03</Link>
    </li>
  </Fragment>
);
export const Page = () => (
  <Fragment>
    <li>
      <Link href="/about">스토리</Link>
    </li>
    <li>
      <Link href="/findload">찾아오시는길</Link>
    </li>
    <li>
      <Link href="/notice">공지사항</Link>
    </li>
    <li>
      <Link href="/services-details">Services Details</Link>
    </li>
    <li>
      <Link href="/404-error">404 Page</Link>
    </li>
  </Fragment>
);
export const Room = () => (
  <Fragment>
    <li>
      <Link href="/class-list">클래스 소개</Link>
    </li>
    <li>
      <Link href="/room-modern">클래스 예약</Link>
    </li>
    <li>
      <Link href="/room-list">클래스 리뷰</Link>
    </li>
    <li>
      <Link href="/room-details">Room Details</Link>
    </li>
  </Fragment>
);
export const Blog = () => (
  <Fragment>
    <li>
      <Link href="/blog-grid">Blog Grid</Link>
    </li>
    <li>
      <Link href="/blog-standard">Blog Standard</Link>
    </li>
    <li>
      <Link href="/blog-details/1">Blog Details</Link>
    </li>
  </Fragment>
);
