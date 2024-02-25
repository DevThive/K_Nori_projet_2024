'use client';

import blogs from '@/components/data/blogs';
import { useParams, useRouter } from 'next/navigation';
import Blogcomment from './blog-comment';
import BlogSideBar from './blog-sidebar';

const Blogdetailscontainer = () => {
  const params = useParams();
  const blogsData = blogs.find((blog) => blog.id === params.id);
  const router = useRouter();
  if (!blogsData) {
    return router.push('/404-error');
  }

  return (
    <>
      <div className="blog__details section-padding">
        <div className="container">
          <div className="row">
            <Blogcomment blogsData={blogsData} />
            <BlogSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogdetailscontainer;
