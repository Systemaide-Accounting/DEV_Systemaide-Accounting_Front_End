
import { Button } from "flowbite-react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function SimplePagination ({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center gap-2">
      <Button
        size="xs"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        size="xs"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        size="xs"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        size="xs"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
