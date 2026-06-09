import type { PropsWithChildren } from "react";
import type { OffersDataType } from "../../types/offers";
import { useSearchParams } from "react-router-dom";
import { cn } from "../../helpers/cn";

type PaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  pagesTab: number[];
  data: OffersDataType;
  currentPage: number;
};

export const Pagination = ({
  setPage,
  limit,
  pagesTab,
  data,
  currentPage,
}: PaginationProps) => {
  const _lastPage = Math.ceil(data.count / limit);

  const [searchParams, setSearchParams] = useSearchParams();
  const nextSearchParams = new URLSearchParams(searchParams);

  const firstPage = () => {
    setPage(1);
    nextSearchParams.set("page", "1");
    setSearchParams(nextSearchParams);
  };

  const lastPage = () => {
    setPage(_lastPage);
    nextSearchParams.set("page", String(_lastPage));
    setSearchParams(nextSearchParams);
  };

  const nextPage = () => {
    setPage((v) => v + 1);
    nextSearchParams.set(
      "page",
      String(Number(nextSearchParams.get("page")) + 1),
    );
    setSearchParams(nextSearchParams);
  };

  const prevPage = () => {
    setPage((v) => v - 1);
    nextSearchParams.set(
      "page",
      String(Number(nextSearchParams.get("page")) - 1),
    );
    setSearchParams(nextSearchParams);
  };

  const goToPage = (page: number) => {
    setPage(page);
    nextSearchParams.set("page", String(page));
    setSearchParams(nextSearchParams);
  };

  const Button = ({
    onClick,
    children,
    active,
  }: PropsWithChildren<{ onClick: () => void; active?: boolean }>) => (
    <button
      className={cn(
        "border border-lagoon-500 text-lagoon-500 px-2 py-1 rounded-sm cursor-pointer",
        active ? "font-bold border-2" : "",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div className="flex gap-2 justify-center align-center mb-6">
      <Button onClick={firstPage}>{"<<"}</Button>
      {currentPage > 1 && <Button onClick={prevPage}>{"prec."}</Button>}
      {pagesTab.map((pageNumber, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              goToPage(pageNumber);
            }}
            active={index + 1 === currentPage}
          >
            {pageNumber}
          </Button>
        );
      })}
      {currentPage < _lastPage && <Button onClick={nextPage}>{"suiv."}</Button>}
      <Button onClick={lastPage}>{">>"}</Button>
    </div>
  );
};
