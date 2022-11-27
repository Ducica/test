import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = _.range(currentPage - 6, currentPage + 6, 1).filter(
        (item) => item > 0 && item < totalPages + 1
    );
    const pageLinks = pageNumbers.map((pageNumber) => (
        <li key={pageNumber} className='pagination'>
        <Link onClick={() => onPageChange(pageNumber)} className={`page-link-${currentPage === pageNumber ? "active" : ""}`}>
            {pageNumber}
        </Link>
        </li>
    ));

    return <ul className="pagination-container">{pageLinks}</ul>;
};

export default Pagination;



