
import { Button } from "flowbite-react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function SimplePagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        aria-label="First page"
        onClick={() => onPageChange(1)}
        type="button"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        aria-label="Last page"
        onClick={() => onPageChange(totalPages)}
        type="button"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  );
}
;
