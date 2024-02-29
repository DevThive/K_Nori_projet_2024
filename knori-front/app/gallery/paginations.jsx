import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Paginations = ({
  currentPage,
  handlePrevPage,
  totalPages,
  handleNextPage,
  setCurrentPage,
}) => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="theme__pagination t-center mt-30">
          <ul>
            <li>
              <a
                href="#blog-grid"
                className={`${currentPage === 0 ? 'd-none' : ''}`}
                onClick={handlePrevPage}
              >
                <FaChevronLeft />
              </a>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index}>
                <a
                  href="#blog-grid"
                  className={`${currentPage === index ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#blog-grid"
                className={`${currentPage === totalPages - 1 ? 'd-none' : ''}`}
                onClick={handleNextPage}
              >
                <FaChevronRight />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Paginations;
