'use client';

import { useEffect, useState } from 'react';

import blogsDataNew from '@/components/data/blogs';
import Blogstandardposts from './blog-standard-posts';
import Pagination from './pagination';
import BlogSideBar from '../blog-details/[id]/blog-sidebar';

const ITEMS_PER_PAGE = 3;

const Blogstandardcontainer = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(blogsData.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogItems = blogsData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setBlogsData(blogsDataNew);
  }, []);

  return (
    <>
      <div className="blog__standard section-padding" id="blog-standard">
        <div className="container">
          <div className="row">
            <Blogstandardposts blogsData={currentBlogItems} />
            <BlogSideBar />
            <Pagination
              currentPage={currentPage}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              setCurrentPage={setCurrentPage}
              currentBlogItems={currentBlogItems}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogstandardcontainer;
