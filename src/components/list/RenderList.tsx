import React from "react";
import {
  IActionsRenderList,
  IHeadings,
  ITenantDataList,
  ITenantData,
  ITenantUserDataList,
  ITenantUserData,
} from "../../types/index";
import Pagination from "./Pagination";

interface IProperties {
  headings: IHeadings[];
  data: ITenantDataList | ITenantUserDataList;
  pageCount: number;
  handlePageClick: (selected: number) => void;
  actions?: IActionsRenderList[];
  selected: number;
}
const RenderList: React.FC<IProperties> = (properties) => {
  const { headings, data, pageCount, handlePageClick } = properties;
  return (
    <div>
      {/* headings mapping logic */}
      <table className="table">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={`heading${index}`} className={heading.className}>
                {heading.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.list.length === 0 ? (
            <tr>
              <td rowSpan={headings.length}>No data Available</td>
            </tr>
          ) : (
            // actions that is required on buttons
            // @ts-ignore
            data.list.map(
              (value: ITenantData | ITenantUserData, index1: number) => (
                <tr key={index1}>
                  {data.fields.map((field: string, index2: number) => (
                    // @ts-ignore
                    <td key={`list${index1}${index2}`}>{value[field]}</td>
                  ))}
                  {properties.actions && (
                    <td>
                      <div className="btn-group" role="group">
                        {properties.actions.map((button, index) => (
                          <button
                            key={`button${index}`}
                            type="button"
                            className={button.className}
                            onClick={() => {
                              if (button.buttonFunction)
                                button.buttonFunction(value);
                            }}
                          >
                            <i className={button.iconClassName}></i>
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      {/* paginate logic */}
      <Pagination
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        selectedPage={properties.selected}
      />
    </div>
  );
};
export default RenderList;
