import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Pagination = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
  setCurrentPage,
  totalPages,
  currentBlogItems,
}) => {
  return (
    <div className="theme__pagination mt-50">
      <ul>
        <li>
          <a
            href="#blog-standard"
            className={`${currentPage === 0 ? 'd-none' : ''}`}
            onClick={handlePrevPage}
          >
            <FaChevronLeft />
          </a>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <a
              href="#blog-standard"
              className={`${currentPage === index ? 'active' : ''}`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        {currentBlogItems.length === 0 ? (
          ''
        ) : (
          <li>
            <a
              href="#blog-standard"
              className={`${currentPage === totalPages - 1 ? 'd-none' : ''}`}
              onClick={handleNextPage}
            >
              <FaChevronRight />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
