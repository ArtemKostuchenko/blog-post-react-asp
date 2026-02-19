import useQueryParams from "@/hooks/query-params";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationItemsProps {
  totalPages: number;
}

const getPaginationRange = (currentPage: number, totalPages: number) => {
  const delta = 1;
  const range: (number | "ellipsis")[] = [];

  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);

  if (left > 2) {
    range.push("ellipsis");
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push("ellipsis");
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
};

const PaginationItems = ({ totalPages }: PaginationItemsProps) => {
  const { defaultQueryParams, setQueryParam } = useQueryParams();
  const currentPage = defaultQueryParams.page || 1;

  const goToPage = (page: number) => {
    if (page !== currentPage) {
      setQueryParam("page", page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setQueryParam("page", currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setQueryParam("page", currentPage - 1);
    }
  };

  if (totalPages <= 1) return null;

  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className="sm:my-10 my-5">
      <Pagination className="select-none">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={previousPage} />
            </PaginationItem>
          )}
          {pages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={nextPage} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationItems;
