import classes from './Pagination.module.css';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

function Pagination({ count }) {
  // The Pagination component will store the currentPage in the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page') ? 1 : +searchParams.get('page');
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const nextPage = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', nextPage);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', previousPage);
    setSearchParams(searchParams);
  }

  // If we have no results, don't render on screen the Pagination component
  if (pageCount <= 1) return null;

  return (
    <div className={classes.pagination}>
      <p>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span>{count}</span> results
      </p>
      <div className={classes.pagination__buttons}>
        <button
          className={classes.pagination__button}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft /> <span>Previous</span>
        </button>
        <button
          className={classes.pagination__button}
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span> <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
