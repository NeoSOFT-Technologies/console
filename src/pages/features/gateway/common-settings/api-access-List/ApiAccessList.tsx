import { Grid } from "gridjs-react";
import { RowSelection } from "gridjs/plugins/selection";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { IApiListState } from "../../../../../store/features/gateway/api/list";
import { getApiList } from "../../../../../store/features/gateway/api/list/slice";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create/index";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";

interface IProps {
  state?: IKeyCreateState | IPolicyCreateState;
  stateForm?: any; // any[]
  handleAddClick: (val: any) => void;
}
export let refreshGrid: (ApiId: string) => void;
export default function ApiAccessList(props: IProps) {
  const { handleAddClick } = props;
  const { id } = useParams();
  const accessApiList: IApiListState = useAppSelector(
    (State) => State.apiListState
  );
  const [apiAuth, setApiAuth] = useState<string>();
  const [gridReady, setGridReady] = useState(false);
  const [_deletedRow, setdeletedRow] = useState<any>([]);
  const [_pluginState, setpluginState] = useState<any>();
  const [selectedRows, setselectedRows] = useState<any>({
    state: [],
    prevState: [],
  });
  let checkboxPlugin: any;
  let prp: any;

  const _refreshGrid = (ApiId: string) => {
    setdeletedRow(ApiId);
  };
  refreshGrid = _refreshGrid;
  const dispatch = useAppDispatch();
  const mainCall = async (currentPage: number, pageSize: number) => {
    await dispatch(getApiList({ currentPage, pageSize }));
    setGridReady(true);
  };

  useEffect(() => {
    // method to get grid list
    mainCall(1, 100_000);

    // to get selected data on update screen
    if (id && id !== undefined && props.stateForm.length > 0) {
      const arr = [];
      if ((props.state as IPolicyCreateState).data.form.APIs) {
        for (const iterator of (props.state as IPolicyCreateState).data.form
          .APIs) {
          const x = iterator.Id + "," + iterator.Name + "," + iterator.AuthType;
          arr.push(x);
        }
      } else {
        for (const iterator of (props.state as IKeyCreateState).data.form
          .AccessRights) {
          const x =
            iterator.ApiId + "," + iterator.ApiName + "," + iterator.AuthType;
          arr.push(x);
        }
      }
      setselectedRows({ state: arr, prevState: arr });
    }
  }, []);

  useEffect(() => {
    // set auth type fo fiter records
    props.stateForm.length > 0
      ? setApiAuth(props.stateForm[0].AuthType!)
      : setApiAuth("");
    if (props.stateForm.length < selectedRows.state.length) {
      const ar1: string[] = [];
      for (const iterator of props.stateForm!) {
        const x = iterator.Id + "," + iterator.Name + "," + iterator.AuthType;
        ar1.push(x);
      }
    }
  }, [props.stateForm.length]);

  useEffect(() => {
    if (
      selectedRows.state.length > 0 &&
      selectedRows.state.length > selectedRows.prevState.length
    ) {
      const ApiId: string = selectedRows.state[0].split(",")[0];
      const ApiName = selectedRows.state[0].split(",")[1];
      const auth: string = selectedRows.state[0].split(",")[2];
      handleAddClick(ApiId);
      setApiAuth(auth);
      ToastAlert(`${ApiName} selected`, "success");
    }
  }, [
    id
      ? selectedRows.state.length === selectedRows.prevState.length ||
        selectedRows
      : selectedRows,
  ]);

  const grid = new Grid({
    columns: [
      {
        id: "myCheckbox",
        name: "Select",
        width: "10%",
        plugin: {
          component: RowSelection,
          props: {
            id: (row: any) =>
              row.cells[1].data +
              "," +
              row.cells[2].data +
              "," +
              row.cells[5].data,
          },
        },
      },
      {
        name: "Id",
        hidden: true,
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

  const mygrid = grid.getInstance();
  mygrid.on("ready", () => {
    // find the plugin with the give plugin ID
    checkboxPlugin = mygrid.config.plugin.get("myCheckbox");
    prp = checkboxPlugin?.props;
    setpluginState(prp.store);
    if (id !== undefined) {
      for (const iterator of selectedRows.state) {
        prp!.store.handle("CHECK", {
          ROW_ID: iterator,
        });
      }
    }

    prp!.store.on("updated", (state1: any, prevState1: any) => {
      setselectedRows({ state: state1.rowIds, prevState: prevState1.rowIds });
    });
  });

  useEffect(() => {
    if (_deletedRow !== undefined && _deletedRow.length > 0) {
      checkboxPlugin = mygrid.config.plugin.get("myCheckbox");
      _pluginState.handle("UNCHECK", {
        ROW_ID: _deletedRow,
      });
      setdeletedRow([]);
    }
  }, [_deletedRow]);

  useEffect(() => {
    if (gridReady) {
      mygrid.render(document.querySelector("#gridRender")!);
    }
  }, [gridReady]);

  return (
    <div>
      {gridReady ? <div id="gridRender"></div> : <></>}
      {accessApiList.loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-2">
            {apiAuth && (
              <>
                <b>Note :&nbsp;</b> Apis get filter based on {apiAuth} Auth Type
              </>
            )}
          </div>
          <div className="mt-2">
            {selectedRows.state.length > 0 && (
              <>
                <b>Selected APIs...</b>
                {selectedRows.state.map((rowId: any, idx: number) => {
                  return (
                    <li
                      key={idx}
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => console.log(rowId)}
                    >
                      {rowId.split(",")[1]}
                    </li>
                  );
                })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
