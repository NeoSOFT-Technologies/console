import { h } from "gridjs";
import { Grid } from "gridjs-react";
import { RowSelection } from "gridjs-selection";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { scrollToSection } from "../../../../../components/scroll-to/ScrollTo";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import {
  IApiData,
  IApiListState,
} from "../../../../../store/features/gateway/api/list";
import { getApiList } from "../../../../../store/features/gateway/api/list/slice";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create/index";
import { setForms } from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import { setForm } from "../../../../../store/features/gateway/policy/create/slice";
import { useAppSelector, useAppDispatch } from "../../../../../store/hooks";
import { gridOn } from "../../key/create/access-rights/apply-policy/policy-list/PolicyList";
interface IProps {
  state?: IKeyCreateState | IPolicyCreateState;
  stateForm?: any; // any[]
  handleAddClick: (val: any) => void;
}
export let reloadGrid: () => void;
export let refreshGrid: (ApiId: string) => void;
export function setDeletedRowEffect(
  _deletedRow: any,
  _pluginState: any,
  setdeletedRow: any
) {
  if (_deletedRow !== undefined && _deletedRow.length > 0) {
    _pluginState.handle("UNCHECK", {
      ROW_ID: _deletedRow,
    });
    setdeletedRow([]);
    reloadGrid();
  }
}
export function gridReadyEffect(gridReady: any, mygrid: any) {
  if (gridReady) {
    mygrid.render(document.querySelector("#gridRender") as Element);
  }
}
export default function ApiAccessList(props: IProps) {
  const { handleAddClick } = props;
  const { id } = useParams();
  const accessApiList: IApiListState = useAppSelector(
    (State) => State.apiListState
  );
  const dispatch = useAppDispatch();
  const [apiAuth, setApiAuth] = useState<string>();
  const [gridReady, setGridReady] = useState(false);
  const [gridReload, setGridReload] = useState(false);
  const [_deletedRow, setdeletedRow] = useState<any>([]);
  const [_pluginState, setpluginState] = useState<any>();
  const [selectedRows, setselectedRows] = useState<any>({
    state: [],
    prevState: [],
  });
  let checkboxPlugin: any;
  let prp: any;

  // This will be used by Grid for reloading the list after delete action
  const _refreshGrid = (ApiId: string) => {
    setdeletedRow(ApiId);
  };
  refreshGrid = _refreshGrid;
  // reloading grid
  const _reloadGrid = () => {
    setGridReload(true);
  };
  reloadGrid = _reloadGrid;
  const mainCall = async (currentPage: number, pageSize: number) => {
    await dispatch(getApiList({ currentPage, pageSize }));
    setGridReady(true);
  };
  // This will set Grid data for update page
  const getDataOnUpdate = () => {
    // to get selected data on update screen
    if (id && id !== undefined && props.stateForm.length > 0) {
      const arr = [];
      if ((props.state as IPolicyCreateState).data.form.APIs) {
        for (const iterator of (props.state as IPolicyCreateState).data.form
          .APIs) {
          const x = `${iterator.ApiId},${iterator.ApiName},${iterator.AuthType}`;
          arr.push(x);
        }
      } else {
        for (const iterator of (props.state as IKeyCreateState).data.form
          .AccessRights) {
          const x = `${iterator.ApiId},${iterator.ApiName},${iterator.AuthType}`;
          arr.push(x);
        }
      }
      if (
        selectedRows.state.length === 0 &&
        selectedRows.prevState.length === 0
      ) {
        setselectedRows({ state: arr, prevState: arr });
      }
    }
  };
  // initial render to get data for grid
  useEffect(() => {
    // method to get grid list data
    mainCall(1, 100_000);
    // this will be used to set state value as true for displaying selected apis list when updated page is loaded
    getDataOnUpdate();
  }, []);

  //  This wil be used to set auth type to fiter records on update page
  useEffect(() => {
    // set auth type
    props.stateForm.length > 0
      ? setApiAuth(props.stateForm[0].AuthType || "")
      : setApiAuth("");
  }, [props.stateForm.length]);

  function containsApis() {
    let listApis: IApiData[] = [];
    if (
      accessApiList.data !== undefined &&
      accessApiList.data &&
      (accessApiList.data?.Apis?.length || 0) > 0
    ) {
      listApis = accessApiList.data?.Apis.filter((a) =>
        (apiAuth?.length as number) > 0
          ? a.AuthType === apiAuth && a.AuthType !== "keyless"
          : a.AuthType !== "keyless"
      );
    }
    return listApis;
  }
  function bindApisList() {
    return accessApiList.data !== undefined &&
      accessApiList.data &&
      (accessApiList.data?.Apis?.length || 0) > 0
      ? containsApis().map((data) => [
          data.Id,
          data.Name,
          data.IsActive ? "Active" : "Inactive",
          data.CreatedDate !== null
            ? moment(data.CreatedDate).format("DD/MM/YYYY")
            : data.CreatedDate,
          data.AuthType,
        ])
      : [];
  }

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
              `${row.cells[1].data},${row.cells[2].data},${row.cells[5].data}`,
          },
        },
      },
      {
        name: "Id",
        hidden: true,
      },
      {
        name: "Name",
        width: "20%",
        formatter: (cell: string, row: any) => {
          const Id = row.cells[1].data;
          const Name = row.cells[2].data;
          let data = false;

          if (selectedRows.state) {
            data = selectedRows.state.some((x: any) => x?.split(",")[0] === Id);
          }
          return h(
            "text",
            data
              ? {
                  onClick: () => scrollToSection(Name),
                  style: { cursor: "pointer", color: "blue" },
                }
              : {},
            cell
          );
        },
      },
      { name: "Status", sort: false, width: "20%" },
      { name: "Created Date", width: "20%" },
      { name: "Auth Type", width: "20%" },
    ],
    search: true,
    sort: true,
    fixedHeader: true,
    height: "300px",
    scrollable: "virtual",
    data: () => bindApisList(),
    style: {
      table: {
        width: "100%",
        fontSize: ".875rem",
      },
    },
  });
  // This will used to create instance of Grid
  const mygrid = grid.getInstance();

  gridOn(mygrid, selectedRows, gridReload, setpluginState, setselectedRows, id);

  const removeAccess = (Id: string) => {
    if (props.stateForm) {
      const removeApi = [...props.stateForm];

      if ((props.state as IPolicyCreateState).data.form.APIs) {
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
        const index = removeApi.findIndex((a) => a.ApiId === Id);
        removeApi.splice(index, 1);
        dispatch(
          setForms({
            ...(props.state as IKeyCreateState).data.form,
            AccessRights: removeApi,
          })
        );
      }
    }
    reloadGrid();
  };

  // this will handle rendering of selected and unselected list using checkbox in grid
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
      reloadGrid();
      ToastAlert(`${ApiName} selected`, "success");
    } else {
      if (
        selectedRows.prevState.length > 0 &&
        selectedRows.state.length < selectedRows.prevState.length &&
        props.stateForm.length > selectedRows.state.length
      ) {
        const filterApiList = selectedRows.prevState.find(
          (i: any) => !selectedRows.state.includes(i)
        );
        removeAccess(filterApiList.split(",")[0]);
        if (selectedRows.state.length > 0) {
          setApiAuth(selectedRows.state[0].split(",")[2]);
        } else {
          setApiAuth("");
        }
        reloadGrid();
        ToastAlert(`${filterApiList.split(",")[1]} removed`, "warning");
      }
    }
    if (id !== undefined) {
      // this will be used to set state value as true for displaying selected apis list when updated page is loaded
      getDataOnUpdate();
    }
  }, [
    id
      ? selectedRows.state.length === selectedRows.prevState.length ||
        selectedRows
      : selectedRows,
  ]);
  // This will set Grid data after delete action
  useEffect(() => {
    setDeletedRowEffect(_deletedRow, _pluginState, setdeletedRow);
  }, [_deletedRow]);

  // initial Grid render
  useEffect(() => {
    gridReadyEffect(gridReady, mygrid);
  }, [gridReady]);

  //  Grid render on invoke of reloadGrid()
  useEffect(() => {
    if (gridReload) {
      const gridRenderHtml = document.querySelector("#gridRender");
      (gridRenderHtml as Element).innerHTML = "";
      mygrid.render(gridRenderHtml as Element);
      const renderGrid = mygrid.updateConfig({
        data: () => bindApisList(),
      });
      renderGrid.on("ready", () => {
        // find the plugin with the give plugin ID
        checkboxPlugin = renderGrid.config.plugin.get("myCheckbox");
        prp = checkboxPlugin?.props;

        for (const iterator of selectedRows.state) {
          prp.store.handle("CHECK", {
            ROW_ID: iterator,
          });
        }
        prp.store.on("updated", (state1: any, prevState1: any) => {
          setselectedRows({
            state: state1.rowIds,
            prevState: prevState1.rowIds,
          });
        });
      });
      renderGrid.forceRender();
    }
    setGridReload(false);
  }, [gridReload]);
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
        </>
      )}
    </div>
  );
}
