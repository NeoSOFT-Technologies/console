import { h } from "gridjs";
import { Grid } from "gridjs-react";
import moment from "moment";
import React, { useEffect } from "react";
import { IApiListState } from "../../../../../store/features/gateway/api/list";
import { getApiList } from "../../../../../store/features/gateway/api/list/slice";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create/index";
import { setForms } from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import { setForm } from "../../../../../store/features/gateway/policy/create/slice";
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
  const removeAccess = (Id: string) => {
    if ((props.state as IPolicyCreateState).data.form.APIs) {
      const removeApi = [
        ...(props.state as IPolicyCreateState).data.form.APIs!,
      ];
      const index = removeApi.findIndex((a) => a.Id === Id);
      removeApi.splice(index, 1);
      dispatch(
        setForm({
          ...(props.state as IPolicyCreateState).data.form,
          APIs: removeApi,
        })
      );
    } else if ((props.state as IKeyCreateState).data.form.AccessRights) {
      const removeApi = [
        ...(props.state as IKeyCreateState).data.form.AccessRights!,
      ];
      const index = removeApi.findIndex((a) => a.ApiId === Id);
      removeApi.splice(index, 1);
      dispatch(
        setForms({
          ...(props.state as IKeyCreateState).data.form,
          AccessRights: removeApi,
        })
      );
    }
  };
  const grid = new Grid({
    columns: [
      {
        name: "Id",
        hidden: true,
      },
      {
        id: "Select",
        width: "6%",
        sort: false,
        formatter: (cell: string, row: any) => {
          const Id = row.cells[1].data;
          let data = false;
          if ((props.state as IPolicyCreateState).data.form.APIs) {
            data = (props.state as IPolicyCreateState).data.form.APIs.some(
              (x: any) => x?.Id === Id
            );
          } else if ((props.state as IKeyCreateState).data.form.AccessRights) {
            data = (
              props.state as IKeyCreateState
            ).data.form.AccessRights?.some((x: any) => x?.ApiId === Id);
          }
          // StateKey.data.form?.Policies?.includes(Id);
          // console.log(props);
          return h("input", {
            name: "tag_" + Id,
            id: "tag_" + Id,
            type: "checkbox",
            checked: data,
            onClick: (event: any) => {
              if (event.target!.checked) {
                handleAddClick(Id);
              } else {
                removeAccess(Id);
              }
            },
          });
        },
      },
      { name: "Name", width: "20%" },
      { name: "Status", sort: false, width: "20%" },
      { name: "Created Date", width: "20%" },
      { name: "Auth Type", width: "20%" },
    ],
    search: true,
    sort: true,
    scrollable: "virtual",
    data:
      accessApiList.data !== undefined &&
      accessApiList.data &&
      accessApiList.data?.Apis?.length! > 0
        ? () =>
            accessApiList.data
              ?.Apis!.filter((a) => a.AuthType !== "keyless")
              .map((data) => [
                data.Action,
                data.Id,
                data.Name,
                data.IsActive ? "Active" : "Inactive",
                data.CreatedDate !== null
                  ? moment(data.CreatedDate).format("DD/MM/YYYY")
                  : data.CreatedDate,
                data.AuthType,
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
