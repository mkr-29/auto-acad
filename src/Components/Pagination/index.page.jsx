import React from 'react'
import "./Pagination.scss";

export default function Pagination({ currentPage, totalPages, onNextPage, onPreviousPage }) {
  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={onPreviousPage}
      >
        Previous
      </button>
      <span>{currentPage} of {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  )
}
