import React from "react";
import ReactPaginate from "react-paginate";

export default function RenderList(props) {
    const { headings, data } = props;
    return (
        <div>
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
                    {console.log(data.list.length)}
                    {data && data.list.length == 0 ? (
                        <tr>
                            <td rowSpan={headings.length}>No data Available</td>
                        </tr>
                    ) : (
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
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
}
