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
  name: string;
  data?: (row: any) => void;
  width?: string;
  formatter?: (cell: any, row: any) => void;
}

const RenderList1: React.FC<IProps> = (props: IProps) => {
  const { headings, url, searchBy } = props;
  const columns: IColumns[] = headings.map((heading) => ({
    ...heading,
    data: (row: any) => row[heading.data],
    name: heading.name,
  }));

  if (props.actions !== undefined) {
    // console.log(props.actions);
    columns.push({
      name: "Actions",
      formatter: (cell, row) => {
        return h(
          "Button",
          {
            className: props.actions?.classNames,
            onclick: () => props.actions?.func(row),
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
  // console.log(`Bearer ${tokenService.getLocalAccessToken()}`);
  const serverConfigs = {
    url: url,
    data: async (args: any) => {
      const response = await apiFactory().get(`${args.url}`);
      return response.data;
    },
    // eslint-disable-next-line unicorn/no-thenable
    then: (res: any) => res.data,
    total: (res: any) => res.count,
  };

  const paginationConfigs = {
    enabled: true,
    limit: 10,
    server: {
      url: (prev: string, page: number, limit: Number) =>
        `${prev}page=${page + 1}&size=${limit}`,
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
