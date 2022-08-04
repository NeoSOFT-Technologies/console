import { h } from "gridjs";
import { Grid } from "gridjs-react";
import { RowSelection } from "gridjs-selection";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../../../../components/loader/Loader";
import { scrollToSection } from "../../../../../../../../components/scroll-to/ScrollTo";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
import { setForms } from "../../../../../../../../store/features/gateway/key/create/slice";
import {
  IPolicyData,
  IPolicyListState,
} from "../../../../../../../../store/features/gateway/policy/list";
import { getPolicyList } from "../../../../../../../../store/features/gateway/policy/list/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";

interface PolicyObject {
  name: string[];
  policyId: string;
}
export let reloadGrid: () => void;
export let refreshGrid: (PolicyId: string, Id: string) => void;
export function gridOn(
  mygrid: any,
  selectedRows: any,
  gridReload: any,
  setpluginState: any,
  setselectedRows: any,
  id: any
) {
  mygrid.on("ready", () => {
    // find the plugin with the give plugin ID
    const checkboxPlugin = mygrid.config.plugin.get("myCheckbox");
    const prp = checkboxPlugin?.props;
    setpluginState(prp.store);

    if (id !== undefined) {
      for (const iterator of selectedRows.state) {
        prp.store.handle("CHECK", {
          ROW_ID: iterator,
        });
      }
    }
    prp.store.on("updated", (state1: any, prevState1: any) => {
      if (gridReload === false) {
        setselectedRows({
          state: state1.rowIds,
          prevState: prevState1.rowIds,
        });
      }
    });
  });
}
export default function PolicyList() {
  const accessPolicyList: IPolicyListState = useAppSelector(
    (state) => state.policyListState
  );
  const StateKey = useAppSelector((RootState) => RootState.createKeyState);
  const dispatch = useAppDispatch();
  const [apis, setApis] = useState<PolicyObject[]>([]);
  const [uniqueApis, setuniqueApis] = useState<string>("");
  const [selectedApi, setSelectedApi] = useState<string>("");
  const [gridReady, setGridReady] = useState(false);
  const [gridReload, setGridReload] = useState(false);
  const [_deletedRow, setdeletedRow] = useState<any>([]);
  const [_pluginState, setpluginState] = useState<any>();
  const [selectedRows, setselectedRows] = useState<any>({
    state: [],
    prevState: [],
  });
  let checkboxPlugin: any = "";
  let prp: any;
  const { id } = useParams();

  // This will be used by Grid for reloading the list after delete action
  const _refreshGrid = (PolicyId: string, Id: string) => {
    let policyApis: any[] = [];
    const x = accessPolicyList.data?.Policies.find((item) => item.Id === Id);
    policyApis = x?.Apis as string[];
    const deletedRecord = `${PolicyId},${policyApis}`;

    setdeletedRow(deletedRecord);
  };
  refreshGrid = _refreshGrid;
  // reloading grid
  const _reloadGrid = () => {
    setGridReload(true);
  };
  reloadGrid = _reloadGrid;
  const mainCall = async (currentPage: number, pageSize: number) => {
    await dispatch(getPolicyList({ currentPage, pageSize }));
    setGridReady(true);
  };
  // filter policyList based on apis list in accessRights
  function containsApis() {
    const policyId: IPolicyData[] = [];
    const listPolicies = (
      accessPolicyList.data?.Policies as IPolicyData[]
    ).filter(
      (a) =>
        a.AuthType !== "keyless" &&
        !StateKey.data.form.Policies.includes(a.Id as string) &&
        !apis.some((i) => i.name.some((name) => a.Apis.includes(name)))
    );
    const selectedlistPolicies = (accessPolicyList.data?.Policies || []).filter(
      (a) =>
        a.AuthType !== "keyless" &&
        StateKey.data.form.Policies.includes(a.Id as string)
    );
    for (const item of selectedlistPolicies || []) {
      policyId.push(item);
    }
    for (const item of listPolicies || []) {
      policyId.push(item);
    }

    return policyId;
  }
  function DataState(state: string) {
    if (state === "active") {
      return "Active";
    } else if (state === "deny") {
      return "Access Denied";
    } else {
      return "Draft";
    }
  }
  const mapData = (data: any) => {
    return [
      data.Id,
      data.Name,
      DataState(data.State),
      data.Apis.join(","),
      data.AuthType,
    ];
  };
  function bindPolicyList() {
    let bindList = [];
    if (selectedApi !== "") {
      bindList = containsApis().map((data) => mapData(data));
    } else {
      bindList =
        accessPolicyList.data !== undefined &&
        accessPolicyList.data &&
        (accessPolicyList.data?.Policies?.length || 0) > 0
          ? accessPolicyList.data?.Policies.filter(
              (a) => a.AuthType !== "keyless"
            ).map((data) => mapData(data))
          : [];
    }
    return bindList;
  }
  const gridTable = new Grid({
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
              row.cells[4].data,
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
          const gridId = row.cells[1].data;
          const gridName = row.cells[2].data;
          let data = false;

          if (selectedRows.state) {
            data = selectedRows.state.some(
              (x: any) => x?.split(",")[0] === gridId
            );
          }
          return h(
            "text",
            data
              ? {
                  onClick: () => scrollToSection(gridName),
                  style: { cursor: "pointer", color: "blue" },
                }
              : {},
            cell
          );
        },
      },
      { name: "Status", width: "20%", sort: false },
      { name: "Access Rights", width: "20%" },
      { name: "Auth Type", width: "20%" },
    ],
    data: () => bindPolicyList(),
    search: true,
    sort: true,
    fixedHeader: true,
    height: "30vh", // 300px
    style: {
      table: {
        width: "100%",
        fontSize: ".875rem",
      },
    },
  });
  const mygrid = gridTable.getInstance();

  gridOn(mygrid, selectedRows, gridReload, setpluginState, setselectedRows, id);

  // This will set Grid data for update page
  const getDataOnUpdates = () => {
    // to get selected data on update screen
    if (id && id !== undefined && StateKey.data.form.Policies.length > 0) {
      const arr = [];
      for (const _item of StateKey.data.form.Policies) {
        const policyId = _item;
        let policyName: any;
        let policyApis: any[] = [];
        if (
          StateKey.data.form.Policies !== undefined &&
          StateKey.data.form.Policies.length > 0
        ) {
          const x = accessPolicyList.data?.Policies.find(
            (item) => item.Id === _item
          );
          policyName = x?.Name;
          policyApis = x?.Apis as string[];
        }
        const selectedPolicies = `${policyId},${policyName},${policyApis.join(
          ","
        )}`;
        arr.push(selectedPolicies);
      }
      if (
        selectedRows.state.length === 0 &&
        selectedRows.prevState.length === 0
      ) {
        setselectedRows({ state: arr, prevState: arr });
      }
    }
  };

  const handleAddClick = (Id: any) => {
    const data = StateKey.data.form?.Policies?.includes(Id);

    if (!data) {
      const list = [...StateKey.data.form.Policies, Id];
      dispatch(setForms({ ...StateKey.data.form, Policies: list }));
    } else {
      ToastAlert("Already select...", "error");
    }
  };

  const removeAccess = (Id: any) => {
    const removePolicyByIds = [...(StateKey.data.form.PolicyByIds as any[])];
    const removePolicies = [...StateKey.data?.form.Policies];
    const index = removePolicies.indexOf(Id);
    removePolicyByIds.splice(index, 1);
    removePolicies.splice(index, 1);
    dispatch(
      setForms({
        ...StateKey.data.form,
        PolicyByIds: removePolicyByIds,
        Policies: removePolicies,
      })
    );
    reloadGrid();
  };
  // initial render to get data for grid
  useEffect(() => {
    // method to get grid list data
    mainCall(1, 100_000);
    // this will be used to set state value as true for displaying selected apis list on updated page
    if (accessPolicyList.data !== undefined) {
      // this will be used to set state value as true for displaying selected apis list on updated page
      getDataOnUpdates();
    }
  }, []);
  // load selected data on update page
  useEffect(() => {
    if (accessPolicyList.data !== undefined) {
      // this will be used to set state value as true for displaying selected apis list on updated page
      getDataOnUpdates();
    }
  }, [
    id !== undefined &&
      accessPolicyList.data !== undefined &&
      accessPolicyList.loading !== true,
  ]);

  function setFilterList(accessRightList: any, policyApis: PolicyObject[]) {
    if (accessRightList !== undefined && (accessRightList?.length || 0) > 0) {
      for (const policyItem of accessRightList) {
        policyApis.push({
          name: policyItem.Apis,
          policyId: policyItem.Id as string,
        });
        setApis(policyApis);
        setSelectedApi(policyItem.Id || "");
      }
    }
  }
  //  This wil be used to set apis state value & get and set filter list for update page
  useEffect(() => {
    if (
      StateKey.data.form.KeyId !== undefined &&
      apis.length === 0 &&
      StateKey.data.form.Policies.length > 0
    ) {
      const policyApis = [...apis];
      const accessRightList =
        accessPolicyList !== undefined
          ? accessPolicyList.data?.Policies.filter(
              (a) =>
                a.AuthType !== "keyless" &&
                StateKey.data.form.Policies.includes(a.Id as string)
            )
          : undefined;

      setFilterList(accessRightList, policyApis);
    }
    if (apis.length > 0 && apis.length !== StateKey.data.form.Policies.length) {
      const filterPolicyList = apis.filter((i) =>
        StateKey.data.form.Policies.includes(i.policyId || "")
      );
      setApis(filterPolicyList);
      setSelectedApi(
        StateKey.data.form.Policies[StateKey.data.form.Policies.length - 1] ||
          ""
      );
    }
  }, [
    StateKey?.data.form.Policies?.length && accessPolicyList,
    accessPolicyList === undefined
      ? StateKey?.data.form.Policies?.length && accessPolicyList
      : StateKey?.data.form.Policies?.length,
  ]);

  // display list of unique APIs referred by policies below the grid
  useEffect(() => {
    if (apis.length > 0) {
      const selectedApisList = apis.map((a) => a.name);
      setuniqueApis(selectedApisList.join(","));
    } else {
      setuniqueApis("");
    }
  }, [apis]);

  // this will handle rendering of selected and unselected list using checkbox in grid
  useEffect(() => {
    if (
      selectedRows.state.length > 0 &&
      selectedRows.state.length > selectedRows.prevState.length
    ) {
      const Id: string = selectedRows.state[0].split(",")[0];
      const Name = selectedRows.state[0].split(",")[1];
      const accessRights_arr = [];
      for (let i = 2; i < selectedRows.state[0].split(",").length; i++) {
        accessRights_arr.push(selectedRows.state[0].split(",")[i]); //
      }
      const accessRights = accessRights_arr;
      handleAddClick(Id);
      setSelectedApi(Id);
      const policyApis = [...apis];
      policyApis.push({ name: accessRights, policyId: Id });
      setApis(policyApis);
      reloadGrid();
      ToastAlert(`${Name} selected`, "success");
    } else {
      if (
        selectedRows.prevState.length > 0 &&
        selectedRows.state.length < selectedRows.prevState.length &&
        StateKey?.data.form.Policies?.length > selectedRows.state.length
      ) {
        const filterPolicy = selectedRows.prevState.find(
          (i: any) => !selectedRows.state.includes(i)
        );
        removeAccess(filterPolicy.split(",")[0]);
        const SelectedPolicyList = [...apis];
        const filterPolicyList = SelectedPolicyList.filter(
          (item) => item.policyId !== filterPolicy.split(",")[0]
        );
        setApis(filterPolicyList);
        reloadGrid();
        ToastAlert(`${filterPolicy.split(",")[1]} removed`, "warning");
      }
    }
    if (id !== undefined && accessPolicyList.data !== undefined) {
      getDataOnUpdates();
    }
  }, [
    id
      ? selectedRows.state.length === selectedRows.prevState.length ||
        selectedRows
      : selectedRows,
  ]);
  // This will set Grid data after delete action
  useEffect(() => {
    if (_deletedRow !== undefined && _deletedRow.length > 0) {
      _pluginState.handle("UNCHECK", {
        ROW_ID: _deletedRow,
      });
      setdeletedRow([]);
      reloadGrid();
    }
  }, [_deletedRow]);
  // initial Grid render
  useEffect(() => {
    if (gridReady) {
      mygrid.render(document.querySelector("#gridRender") as Element);
    }
  }, [gridReady]);
  //  Grid render on invoke of reloadGrid()
  useEffect(() => {
    if (gridReload) {
      const gridRenderHtmll = document.querySelector("#gridRender");
      (gridRenderHtmll as Element).innerHTML = "";
      mygrid.render(gridRenderHtmll as Element);
      const render_Grid = mygrid.updateConfig({
        data: () => bindPolicyList(),
      });
      render_Grid.on("ready", () => {
        // find the plugin with the give plugin ID
        checkboxPlugin = render_Grid.config.plugin.get("myCheckbox");
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
      render_Grid.forceRender();
    }
    setGridReload(false);
  }, [gridReload]);
  return (
    <div>
      <div className="card mb-3">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Apply Policy</Accordion.Header>

            <Accordion.Body>
              <div>
                {gridReady ? <div id="gridRender"></div> : <></>}
                {/* <Grid {...gridTable.props} /> */}
                {accessPolicyList.loading ? (
                  <Spinner />
                ) : (
                  <div className="mt-2">
                    {" "}
                    {(() => {
                      return uniqueApis.length > 0 ? (
                        <>
                          <b>Note :&nbsp;</b> Policies get filter based on
                          &quot;&nbsp;
                          <i>{uniqueApis}</i>&nbsp;&quot; Apis
                        </>
                      ) : (
                        ""
                      );
                    })()}
                  </div>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
