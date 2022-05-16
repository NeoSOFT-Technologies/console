import { h } from "gridjs";
import { Grid } from "gridjs-react";
import React from "react";
import apiFactory from "../../utils/api";
interface IProps {
  searchBy: string;
  headings: {
    name: string;
    data: string;
  }[];
  url: string;
  action1?: {
    classNames: string;
    func: (val: any) => void;
  };
  action2?: {
    classNames: string;
    func: (val: any) => void;
  };
}

interface IColums {
  id: number;
  name: string;
  data?: (row: any) => void;
  width?: string;
  formatter?: (cell: any, row: any) => void;
}

let id = 0;
const RenderList1: React.FC<IProps> = (props: IProps) => {
  const { headings, url, searchBy } = props;
  const columns: IColums[] = headings.map((heading) => {
    id += 1;
    return {
      id,
      ...heading,
      data: (row: any) => row[heading.data],
      name: heading.name,
    };
  });
  if (props.action1 !== undefined) {
    id += 1;
    columns.push({
      id,
      name: "Edit",
      formatter: (cell, row) => {
        return h(
          "Button",
          {
            className: props.action1?.classNames,
            onclick: () => props.action1?.func(row),
            "aria-label": "action",
            "data-testid": "action-btn",
          },
          h(
            "i",
            {
              className: "bi bi-pencil-square",
            },
            ""
          )
        );
      },
    });
  }
  if (props.action2 !== undefined) {
    id += 1;
    columns.push({
      id,
      name: "Delete",
      formatter: (cell, row) => {
        return h(
          "Button",
          {
            className: props.action2?.classNames,
            onclick: () => props.action2?.func(row),
            "aria-label": "action",
            "data-testid": "action-btn",
          },
          h(
            "i",
            {
              className: "bi bi-trash-fill",
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
      console.log(url);

      const response = await apiFactory().get(`${args.url}`);

      console.log(response.data.data);
      return { data: response.data.data, total: response.data.count };
    },
  };

  const paginationConfigs = {
    enabled: true,
    limit: 10,
    server: {
      url: (prev: string) => `${prev}`,
    },
  };

  const searchConfig = {
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
        search={searchConfig}
        className={classNames}
      />
    </div>
  );
};
export default RenderList1;
