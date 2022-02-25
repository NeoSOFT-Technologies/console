import React from "react";

export default function Pagination({
  previousLabel,
  nextLabel,
  pageCount,
  onPageChange,
  selectedPage,
}) {
  const pageArray = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArray.push(i);
  }
  const setPreviousPage = () => {
    if (selectedPage > 1) {
      selectedPage -= 1;
    }
    onPageChange(selectedPage);
  };
  const setNextPage = () => {
    if (selectedPage < pageCount) {
      selectedPage = selectedPage + 1;
    }
    onPageChange(selectedPage);
  };
  const setCurrentPage = (page) => {
    selectedPage = page;
    onPageChange(selectedPage);
  };
  return (
    <div>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className={`page-link`} onClick={() => setPreviousPage()}>
            {previousLabel}
          </a>
        </li>
        {pageArray.map((page, index) => (
          <li
            className={`page-item ${selectedPage === page && "active"}`}
            key={`pagLink${index}`}
          >
            <a className="page-link " onClick={() => setCurrentPage(page)}>
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className={`page-link`} onClick={() => setNextPage()}>
            {nextLabel}
          </a>
        </li>
      </ul>
    </div>
  );
}
