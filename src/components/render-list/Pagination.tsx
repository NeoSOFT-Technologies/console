import React from "react";
interface IProps {
  previousLabel: string;
  nextLabel: string;
  pageCount: number;
  onPageChange: (selected: number) => void;
  selectedPage: number;
}
const Pagination: React.FC<IProps> = (props) => {
  let { previousLabel, nextLabel, pageCount, onPageChange, selectedPage } =
    props;
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
  const setCurrentPage = (page: number) => {
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
};
export default Pagination;
