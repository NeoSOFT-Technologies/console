import { h } from "gridjs";
import { Grid } from "gridjs-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
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
  // selectedAuthType?: string;
}
export default function ApiAccessList(props: IProps) {
  const { handleAddClick } = props;

  const accessApiList: IApiListState = useAppSelector(
    (State) => State.apiListState
  );
  const [apiAuth, setApiAuth] = useState<string>();
  const dispatch = useAppDispatch();
  const mainCall = async (currentPage: number, pageSize: number) => {
    dispatch(getApiList({ currentPage, pageSize }));
  };
  useEffect(() => {
    mainCall(1, 100_000);
  }, []);

  useEffect(() => {
    if ((props.state as IKeyCreateState).data.form.AccessRights) {
      (props.state as IKeyCreateState).data.form.AccessRights.length > 0
        ? setApiAuth(
            (props.state as IKeyCreateState).data?.form.AccessRights[0]
              ?.AuthType!
          )
        : setApiAuth("");
    }
    if ((props.state as IPolicyCreateState).data.form.APIs) {
      // console.log(
      //   "useEffect-[ (props.state as IPolicyCreateState).data?.form.APIs?.length!]",
      //   (props.state as IPolicyCreateState).data?.form.APIs?.length!
      // );
      (props.state as IPolicyCreateState).data.form.APIs.length > 0
        ? setApiAuth(
            (props.state as IPolicyCreateState).data.form.APIs[0]?.AuthType!
          )
        : setApiAuth("");
    }
  }, [
    (props.state as IKeyCreateState).data?.form.AccessRights?.length! ||
      (props.state as IPolicyCreateState).data?.form.APIs?.length!,
  ]);

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
    }
    if ((props.state as IKeyCreateState).data.form.AccessRights) {
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
          const Name = row.cells[2].data;
          const Auth = row.cells[5].data;
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
                setApiAuth(Auth);
                ToastAlert(`${Name} selected`, "success");
              } else {
                removeAccess(Id);
                // setApiAuth("");
                ToastAlert(`${Name} removed`, "warning");
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
    fixedHeader: true,
    height: "300px",
    scrollable: "virtual",
    data:
      accessApiList.data !== undefined &&
      accessApiList.data &&
      accessApiList.data?.Apis?.length! > 0
        ? () =>
            accessApiList.data
              ?.Apis!.filter((a) =>
                apiAuth?.length! > 0
                  ? a.AuthType === apiAuth && a.AuthType !== "keyless"
                  : a.AuthType !== "keyless"
              )
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
      {accessApiList.loading ? (
        <Spinner />
      ) : (
        <>
          <Grid {...grid.props} />
          <div className="mt-2">
            {" "}
            <b>Note :&nbsp;</b>
            {apiAuth ? `Apis get filter based on ${apiAuth} Auth Type` : ""}
          </div>
        </>
      )}
    </div>
  );
}
