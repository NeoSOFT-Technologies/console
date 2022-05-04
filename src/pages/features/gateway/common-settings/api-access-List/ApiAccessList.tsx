import { h } from "gridjs";
import { Grid } from "gridjs-react";
import moment from "moment";
import React, { useEffect } from "react";
import { IApiListState } from "../../../../../store/features/gateway/api/list";
import { getApiList } from "../../../../../store/features/gateway/api/list/slice";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create/index";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";

interface IProps {
  state?: IKeyCreateState | IPolicyCreateState;
  handleAddClick: (val: any) => void;
}
export default function ApiAccessList(props: IProps) {
  const { handleAddClick } = props;

  const accessApiList: IApiListState = useAppSelector(
    (State) => State.apiListState
  );
  const dispatch = useAppDispatch();
  const mainCall = async (currentPage: number, pageSize: number) => {
    dispatch(getApiList({ currentPage, pageSize }));
  };
  useEffect(() => {
    mainCall(1, 100_000);
  }, []);

  const grid = new Grid({
    columns: [
      {
        name: "Id",
        hidden: true,
      },
      {
        name: "Name",
        formatter: (cell: string, row: any) => {
          return h(
            "text",
            {
              onclick: () => handleAddClick(row.cells[0].data),
            },
            `${row.cells[1].data}`
          );
        },
        attributes: (cell: string) => {
          if (cell) {
            return {
              "data-cell-content": cell,
              style: "cursor: pointer",
            };
          }
        },
      },
      "Status",
      "CreatedDate",
    ],
    search: true,
    sort: true,
    scrollable: "virtual",
    data:
      accessApiList.data !== undefined &&
      accessApiList.data &&
      accessApiList.data?.Apis?.length! > 0
        ? () =>
            accessApiList.data?.Apis!.map((data) => [
              data.Id,
              data.Name,
              data.IsActive ? "active" : "Inactive",
              data.CreatedDate !== null
                ? moment(data.CreatedDate).format("DD/MM/YYYY")
                : data.CreatedDate,
            ])
        : [],
    style: {
      table: {
        width: "100%",
        fontSize: ".875rem",
      },
    },
  });
  // console.log(props.state);
  return (
    <div>
      <Grid {...grid.props} />
    </div>
  );
}
