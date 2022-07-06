import { h } from "gridjs";
import { Grid, _ } from "gridjs-react";
import React, { useEffect, useState } from "react";
import "./render-list.scss";
import apiFactory from "../../utils/api";
import {
  checkCount,
  checkFormat,
  checkPaginationUrl,
  checkResponse,
  handleNavigation,
  setGridPage,
  renderPageSizeDropdown,
  checkGridRendered,
  checkSortingUrl,
  checkSearchingUrl,
} from "../../utils/grid-helper";

interface IActionsRenderList {
  classNames: string;
  func: (val: any) => void;
  iconClassName?: string;
}
interface IProps {
  searchBy: string;
  sortBy?: string;
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
  pageSizeList?: number[];
}
interface IColumns {
  id?: number;
  name: string;
  data?: (row: any) => void;
  width?: string;
  sort?: boolean;
  formatter?: (cell: any, row: any) => void;
}

let id = 0;
let grid: any;
const defaultPageSize = 10;
export let refreshGrid: () => void;
export let setPageLimit: (size: number) => void;

const RenderList1: React.FC<IProps> = (props: IProps) => {
  const _pageSize =
    props.pageSizeList !== undefined && props.pageSizeList.length > 0
      ? props.pageSizeList[0]
      : defaultPageSize;
  const [isGridReady, setGridReady] = useState(false);
  const [gridReload, setGridReload] = useState(false);
  const [_count, setCount] = useState(0);
  const [isGridRendered, setGridRendered] = useState(false);
  const [pageSize, setPageSize] = useState(_pageSize);
  const { headings, url, searchBy, sortBy } = props;
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

  // This will be used by Grid for reloading the Grid list
  const _refreshGrid = () => {
    setGridReload(true);
  };
  refreshGrid = _refreshGrid;

  // This will set Grid Page Size based on size selected in dropdown
  const _setPageLimit = (size: number) => {
    setPageSize(size);
    _refreshGrid();
  };
  setPageLimit = _setPageLimit;

  // This will be used when you want to add single button in the list
  if (props.actions !== undefined) {
    id += 1;
    columns.push({
      id,
      name: "Actions",
      sort: false,
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

  // This will be used when you want to add multiple action buttons in the list
  if (props.actionsList !== undefined && props.actionsList.length > 0) {
    columns.push({
      id,
      name: "Actions",
      sort: false,
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
      setCount(totalCount);
      _data = checkFormat(headings, _data);

      return { data: _data, total: totalCount }; // this total is required for pagination
    },
  };

  const paginationConfigs = {
    enabled: true,
    limit: pageSize,
    page: 0, // used to set default selected page
    server: {
      url: (prev: string, page: number, limit: number) =>
        checkPaginationUrl(prev, page, limit),
    },
  };

  const searchConfigs = {
    enabled: true,
    server: {
      url: (prev: string, keyword: string) =>
        checkSearchingUrl(prev, searchBy, keyword),
    },
  };
  const sortConfigs = {
    multiColumn: false,

    server: {
      url: (prev: string, columnAny: string | any[]) =>
        checkSortingUrl(prev, columnAny, sortBy),
    },
  };

  const classNames = {
    table: "table",
    search: "search-field",
  };

  // initial Grid render
  useEffect(() => {
    grid = (
      <Grid
        columns={columns}
        server={serverConfigs}
        pagination={paginationConfigs}
        search={searchConfigs}
        sort={sortConfigs}
        className={classNames}
      />
    );
    // this will be used to set state value as true for indicating our Grid is ready
    setGridReady(true);
  }, []);

  // refreshGrid() call on Url changes
  useEffect(() => {
    refreshGrid();
  }, [url]);

  //  Grid render on invoke of refreshGrid()
  useEffect(() => {
    if (gridReload) {
      // This will be used for handling current selected page after we refresh grid
      setGridPage(paginationConfigs, _count);
      grid = (
        <Grid
          columns={columns}
          server={serverConfigs}
          pagination={paginationConfigs}
          search={searchConfigs}
          sort={sortConfigs}
          className={classNames}
        />
      );
      // this will indicate if grid is rendered
      setGridRendered(checkGridRendered());
      // this will be used to set state value as false for indicating our Grid is refreshed
      setGridReload(false);
      // this will be used to set state value as true for indicating our Grid is ready
      setGridReady(true);
    }
  }, [gridReload]);

  // this will render page size dropdown in grid
  useEffect(() => {
    if (
      isGridRendered &&
      props.pageSizeList !== undefined &&
      props.pageSizeList.length > 0
    ) {
      renderPageSizeDropdown(props.pageSizeList, _setPageLimit, pageSize);
      // Reset state once operation completed
      setGridRendered(false);
    }
  }, [isGridRendered]);

  return isGridReady ? <div>{grid}</div> : <></>;
};
export default RenderList1;
