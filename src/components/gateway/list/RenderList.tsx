import React from "react";
import {
  IActionsRenderList,
  IHeadings,
  ITenantDataList,
  ITenantData,
  ITenantUserDataList,
  ITenantUserData,
} from "../../types/index";
import {
  IPolicyData,
  IPolicyDataList,
} from "../../store/features/policy/list/index";
import Pagination from "./Pagination";
import { IKeyData, IKeyDataList } from "../../store/features/key/list/index";
import { IApiData, IApiDataList } from "../../store/features/api/list";

interface IProps {
  headings: IHeadings[];
  data:
    | ITenantDataList
    | ITenantUserDataList
    | IApiDataList
    | IPolicyDataList
    | IKeyDataList;
  pageCount: number;
  handlePageClick: (selected: number) => void;
  actions?: IActionsRenderList[];
  selected: number;
}

const RenderList: React.FC<IProps> = (props) => {
  const { headings, data, pageCount, handlePageClick } = props;
  return (
    <div>
      {/* headings mapping logic */}
      <table className="table table-bordered">
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
              <td className="text-center" colSpan={headings.length}>
                No data Available
              </td>
            </tr>
          ) : (
            // actions that is required on buttons
            // @ts-ignore
            data.list.map(
              (
                val:
                  | ITenantData
                  | ITenantUserData
                  | IApiData
                  | IPolicyData
                  | IKeyData,
                index1: number
              ) => (
                <tr key={index1}>
                  {data.fields.map((field: string, index2: number) => (
                    // @ts-ignore
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
                            onClick={() => {
                              if (button.buttonFunction)
                                button.buttonFunction(val);
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
        selectedPage={props.selected}
      />
    </div>
  );
};
export default RenderList;
