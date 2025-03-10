import { ArrowUpDown } from "lucide-react";

export function SortButton({ column, currentSort, onSort, children }) {
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => onSort(column)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </div>
  );
};
