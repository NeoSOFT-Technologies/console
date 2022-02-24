import React from "react";
import Pagination from "./Pagination";

export default function RenderList(props) {
  const { headings, data, pageCount, handlePageClick } = props;
  return (
    <div>
      {/* headings mapping logic */}
      <table className="table">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={`heading${index}`} className={heading.class}>
                {heading.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.list.length == 0 ? (
            <tr>
              <td rowSpan={headings.length}>No data Available</td>
            </tr>
          ) : (
            //actions that is required on buttons
            data.list.map((val, index1) => (
              <tr key={index1}>
                {data.fields.map((field, index2) => (
                  <td key={`list${index1}${index2}`}>{val[field]}</td>
                ))}
                {props.actions && (
                  <td>
                    <div className="btn-group" role="group">
                      {props.actions.map((button, index) => (
                        <button
                          key={`button${index}`}
                          type="button"
                          className={button.className}
                          onClick={
                            button.buttonFunction &&
                            (() => button.buttonFunction(val))
                          }
                        >
                          <i className={button.iconClassName}></i>
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* paginate logic */}
      <Pagination
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        selectedPage={props.selected}
      />
    </div>
  );
}
