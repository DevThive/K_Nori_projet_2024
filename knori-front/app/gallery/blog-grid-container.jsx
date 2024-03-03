'use client';
import blogsData from '@/components/data/blogs';
import { useState } from 'react';
import Currentblogitems from './current-blog-items';
import Paginations from './paginations';

const ITEMS_PER_PAGE = 6;

const Bloggridcontainer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(blogsData.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogItems = blogsData.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="blog__grid section-padding" id="blog-grid">
        <Currentblogitems currentBlogItems={currentBlogItems} />
        <div className="container">
          <Paginations
            currentPage={currentPage}
            handlePrevPage={handlePrevPage}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Bloggridcontainer;
