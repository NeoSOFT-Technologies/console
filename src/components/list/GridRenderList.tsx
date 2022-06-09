import { h } from "gridjs";
import { Grid, _ } from "gridjs-react";
import React from "react";
import "./render-list.scss";
import apiFactory from "../../utils/api";
import {
  checkCount,
  checkFormat,
  checkResponse,
  handleNavigation,
} from "../../utils/grid-helper";

interface IActionsRenderList {
  classNames: string;
  func: (val: any) => void;
  iconClassName?: string;
}
interface IProps {
  searchBy: string;
  currentPage?: string;
  headings: {
    name: string;
    data: string;
    width?: string;
    format?: (val: any) => void;
    navigate?: (val: any) => void;
  }[];
  url: string;
  actions?: IActionsRenderList;
  actionsList?: IActionsRenderList[];
  paginationUrl?: Boolean;
}

interface IColumns {
  id?: number;
  name: string;
  data?: (row: any) => void;
  idth?: string;
  formatter?: (cell: any, row: any) => void;
}

let id = 0;
const RenderList1: React.FC<IProps> = (props: IProps) => {
  const { headings, url, searchBy } = props;
  const columns: IColumns[] = headings.map((heading) => {
    id += 1;
    return {
      id,
      ...heading,
      data: (row: any) => row[heading.data],
      name: heading.name,
      formatter: (cell: any, row: any) => handleNavigation(cell, row, heading),
    };
  });

  if (props.actions !== undefined) {
    id += 1;
    columns.push({
      id,
      name: "Actions",
      formatter: (cell, row) => {
        return h(
          "Button",
          {
            className: props.actions?.classNames,
            onclick: () => props.actions?.func(row),
            "aria-label": "action",
            "data-testid": "action-btn",
          },
          h(
            "i",
            {
              className: "bi bi-gear-fill",
            },
            ""
          )
        );
      },
    });
  }
  if (props.actionsList !== undefined && props.actionsList.length > 0) {
    columns.push({
      id,
      name: "Actions",
      formatter: (cell, row) => {
        return _(
          <>
            {props.actionsList!.map((data, idx) => {
              return (
                <div key={idx} style={{ display: "flex", float: "left" }}>
                  <button
                    className={data.classNames}
                    onClick={() => data.func(row)}
                  >
                    <i className={data.iconClassName}></i>
                  </button>
                </div>
              );
            })}
          </>
        );
      },
    });
  }

  const serverConfigs = {
    url,
    data: async (args: any) => {
      const response = await apiFactory().get(`${args.url}`);
      let _data = checkResponse(response.data);
      const totalCount = checkCount(response.data);

      _data = checkFormat(headings, _data);

      return { data: _data, total: totalCount }; // this total is requied fo pagination
    },
  };

  const paginationConfigs = {
    enabled: true,
    limit: 4,
    server: {
      url: (prev: string, page: number) =>
        !props.paginationUrl
          ? `${prev}page=${page + 1}`
          : `${prev}pageNum=${page + 1}&pageSize=${paginationConfigs.limit}`,
    },
  };

  const searchConfigs = {
    enabled: true,
    server: {
      url: (prev: string, keyword: string) => `${prev}${searchBy}=${keyword}&`,
    },
  };

  const classNames = {
    table: "table",
    pagination: "d-flex justify-content-around",
    search: "search-field",
  };

  return (
    <div>
      <Grid
        columns={columns}
        server={serverConfigs}
        pagination={paginationConfigs}
        search={searchConfigs}
        className={classNames}
      />
    </div>
  );
};

export default RenderList1;
