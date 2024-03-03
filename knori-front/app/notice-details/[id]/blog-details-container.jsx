'use client';

import instance from '@/app/axios/axiosInstance';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Blogcomment from './blog-comment';
import BlogSideBar from './blog-sidebar';

const Blogdetailscontainer = () => {
  const params = useParams();
  const [noticeData, setNoticeData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/notices/${params.id}`);
        console.log(response.data);
        setNoticeData(response.data);
      } catch (error) {
        router.push('/404-error');
      }
    };

    fetchData();
  }, [params.id, router]);

  if (!noticeData) {
    return null; // 또는 로딩 상태를 표시할 수 있는 컴포넌트를 반환할 수도 있습니다.
  }

  return (
    <>
      <div className="blog__details section-padding">
        <div className="container">
          <div className="row">
            <Blogcomment blogsData={noticeData} />
            <BlogSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogdetailscontainer;
