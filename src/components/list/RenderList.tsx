import { h } from "gridjs";
import { Grid } from "gridjs-react";
import React from "react";
import "./render-list.scss";
import apiFactory from "../../utils/api";

interface IProps {
  searchBy: string;
  headings: {
    name: string;
    data: string;
    width?: string;
  }[];
  url: string;
  actions?: {
    classNames: string;
    func: (val: any) => void;
  };
}

interface IColumns {
  id?: number;
  name: string;
  data?: (row: any) => void;
  width?: string;
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
    };
  });

  if (props.actions !== undefined) {
    // console.log(props.actions);
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
  const serverConfigs = {
    url,
    data: async (args: any) => {
      const response = await apiFactory().get(`${args.url}`);
      // console.log(args.url, response.data);
      return { data: response.data.data, total: response.data.count };
    },
    // eslint-disable-next-line unicorn/no-thenable
  };

  const paginationConfigs = {
    enabled: true,
    limit: 10,
    server: {
      url: (prev: string, page: number) => `${prev}page=${page + 1}`,
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
    paginationButton: "page-link d-inline",
    paginationButtonCurrent: "active",
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
