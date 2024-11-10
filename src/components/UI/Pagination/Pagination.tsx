import "./Pagination.css";
export const Pagination: React.FC<{
  onPageChanged: (_: number) => void;
  pagesCount: number;
  currentPage: number;
}> = ({ onPageChanged, pagesCount, currentPage }) => {
  if (currentPage < 1 || currentPage > pagesCount) currentPage = 1;
  const numOfPagesBeforeOrAfterCurrent = 1;
  let start = currentPage - numOfPagesBeforeOrAfterCurrent;
  start = start < 2 ? 2 : start;

  let end = currentPage + numOfPagesBeforeOrAfterCurrent;
  end = end >= pagesCount ? pagesCount - 1 : end;

  const pages = [];
  let index = 0;
  for (let pg = start; pg <= end; pg++) {
    pages[index] = pg;
    index++;
  }

  return (
    <span className="pagination-container">
      {pagesCount > 0 && (
        <SinglePage
          page={1}
          onPageChanged={onPageChanged}
          isCurrent={currentPage === 1}
        />
      )}
      {start > 2 ? <div>...</div> : null}

      {pages.map((p) => (
        <SinglePage
          key={`page-${p}`}
          page={p}
          onPageChanged={onPageChanged}
          isCurrent={currentPage === p}
        />
      ))}
      {end < pagesCount - 1 ? <div>...</div> : null}
      {/* display last page */}
      {pagesCount > 1 && (
        <SinglePage
          page={pagesCount}
          onPageChanged={onPageChanged}
          isCurrent={currentPage === pagesCount}
        />
      )}
    </span>
  );
};

const SinglePage = ({
  page,
  isCurrent,
  onPageChanged,
}: {
  page: number;
  isCurrent?: boolean;
  onPageChanged: (page: number) => void;
}) => {
  return (
    <div
      className={`page-no ${isCurrent ? "selected-page" : ""}`}
      onClick={() => {
        if (!isCurrent) onPageChanged(page);
      }}
    >
      {page}
    </div>
  );
};
