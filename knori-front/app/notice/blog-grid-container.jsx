'use client';
import noticeData from '@/components/data/notices';
import { useState, useEffect } from 'react';
import Currentblogitems from './current-blog-items';
import Paginations from './paginations';

const ITEMS_PER_PAGE = 6;

const Bloggridcontainer = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [notices, setNotices] = useState([]); // 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      const data = await noticeData();
      setNotices(data);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(notices.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogItems = notices.slice(startIndex, endIndex).reverse();

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
