import { h } from "gridjs";
import { Grid } from "gridjs-react";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
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
interface policyObject {
  name: string[];
  policyId: string;
}
export default function PolicyList() {
  const accessPolicyList: IPolicyListState = useAppSelector(
    (state) => state.policyListState
  );
  const StateKey = useAppSelector((RootState) => RootState.createKeyState);
  const dispatch = useAppDispatch();
  const [apis, setApis] = useState<policyObject[]>([]);
  const [uniqueApis, setuniqueApis] = useState<string>("");
  const [selectedApi, setSelectedApi] = useState<string>("");
  const mainCall = async (currentPage: number, pageSize: number) => {
    await dispatch(getPolicyList({ currentPage, pageSize }));
  };
  useEffect(() => {
    mainCall(1, 100_000);
  }, []);
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
    const removePolicyByIds = [...StateKey.data.form.PolicyByIds!];
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
  };
  function containsApis() {
    const policyId: IPolicyData[] = [];
    const listPolicies = accessPolicyList.data?.Policies!.filter(
      (a) =>
        a.AuthType !== "keyless" &&
        !StateKey.data.form.Policies.includes(a.Id!) &&
        !apis.some((i) => i.name.some((name) => a.Apis.includes(name)))
    );
    const selectedlistPolicies = accessPolicyList.data?.Policies!.filter(
      (a) =>
        a.AuthType !== "keyless" && StateKey.data.form.Policies.includes(a.Id!)
    );

    // const selectedlistPoliciesas = accessPolicyList.data?.Policies!.filter(
    //   (a) => a.Apis.includes("Govind")
    // );
    for (const item of selectedlistPolicies!) {
      policyId.push(item);
    }
    for (const item of listPolicies!) {
      policyId.push(item);
    }

    return policyId;
  }
  function bindPolicyList() {
    return selectedApi !== ""
      ? containsApis().map((data) => [
          data.Action,
          data.Id,
          data.Name,
          data.State === "active"
            ? "Active"
            : data.State === "deny"
            ? "Access Denied"
            : "Draft",
          data.Apis.join(", "),
          data.AuthType,
        ])
      : accessPolicyList.data !== undefined &&
        accessPolicyList.data &&
        accessPolicyList.data?.Policies?.length! > 0
      ? accessPolicyList.data?.Policies.filter(
          (a) => a.AuthType !== "keyless"
        ).map((data) => [
          data.Action,
          data.Id,
          data.Name,
          data.State === "active"
            ? "Active"
            : data.State === "deny"
            ? "Access Denied"
            : "Draft",
          data.Apis.join(", "), // ? `${data.Apis.join(", ")}` : "", // data.Apis.join(", ")
          data.AuthType,
        ])
      : [];
  }

  useEffect(() => {
    if (
      StateKey.data.form.KeyId !== undefined &&
      apis.length === 0 &&
      StateKey.data.form.Policies.length > 0
    ) {
      const policyApis = [...apis];
      const accessRightList =
        accessPolicyList !== undefined
          ? accessPolicyList.data?.Policies!.filter(
              (a) =>
                a.AuthType !== "keyless" &&
                StateKey.data.form.Policies.includes(a.Id!)
            )
          : undefined;

      if (accessRightList !== undefined && accessRightList?.length! > 0) {
        for (const policyItem of accessRightList!) {
          policyApis.push({ name: policyItem.Apis!, policyId: policyItem.Id! });
          setApis(policyApis);
          setSelectedApi(policyItem.Id!);
        }
      }
    }
    if (apis.length > 0 && apis.length !== StateKey.data.form.Policies.length) {
      const filterPolicyList = apis.filter((i) =>
        StateKey.data.form.Policies.includes(i.policyId!)
      );
      setApis(filterPolicyList);
      setSelectedApi(
        StateKey.data.form.Policies[StateKey.data.form.Policies.length - 1]!
      );
    }

    bindPolicyList();
  }, [StateKey?.data.form.Policies?.length && accessPolicyList]);

  useEffect(() => {
    // alert(apis);
    bindPolicyList();
    if (apis.length > 0) {
      const selectedApisList = apis.map((a) => a.name);
      setuniqueApis(selectedApisList.join(", "));
    } else {
      setuniqueApis("");
    }
  }, [apis]);
  useEffect(() => {
    if (
      StateKey.data.form.KeyId !== undefined &&
      apis.length === 0 &&
      StateKey.data.form.Policies.length > 0
    ) {
      const policyApis = [...apis];
      const accessRightList =
        accessPolicyList !== undefined
          ? accessPolicyList.data?.Policies!.filter(
              (a) =>
                a.AuthType !== "keyless" &&
                StateKey.data.form.Policies.includes(a.Id!)
            )
          : undefined;

      if (accessRightList !== undefined && accessRightList?.length! > 0) {
        for (const policyItem of accessRightList!) {
          policyApis.push({ name: policyItem.Apis!, policyId: policyItem.Id! });
          setApis(policyApis);
          setSelectedApi(policyItem.Id!);
        }
      }
    }
    if (apis.length > 0 && apis.length !== StateKey.data.form.Policies.length) {
      const filterPolicyList = apis.filter((i) =>
        StateKey.data.form.Policies.includes(i.policyId!)
      );
      setApis(filterPolicyList);
      setSelectedApi(
        StateKey.data.form.Policies[StateKey.data.form.Policies.length - 1]!
      );
    }

    bindPolicyList();
  }, [
    accessPolicyList === undefined
      ? StateKey?.data.form.Policies?.length && accessPolicyList
      : StateKey?.data.form.Policies?.length,
  ]);

  const gridTable = new Grid({
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
          const accessRights = row.cells[4].data.split(", ");
          const data = StateKey.data.form?.Policies?.includes(Id);
          return h("input", {
            name: "tag_" + Id,
            id: "tag_" + Id,
            type: "checkbox",
            checked: data,
            onClick: (event: any) => {
              if (event.target!.checked) {
                handleAddClick(Id);
                setSelectedApi(Id);
                const policyApis = [...apis];
                policyApis.push({ name: accessRights, policyId: Id });
                setApis(policyApis);
                ToastAlert(`${Name} selected`, "success");
              } else {
                removeAccess(Id);
                const SelectedPolicyList = [...apis];
                const filterPolicyList = SelectedPolicyList.filter(
                  (item) => item.policyId !== Id
                );
                setApis(filterPolicyList);
                ToastAlert(`${Name} removed`, "warning");
              }
            },
          });
        },
      },
      { name: "Name", width: "20%" },
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
  return (
    <div>
      <div className="card mb-3">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Apply Policy</Accordion.Header>
            <Accordion.Body>
              <div>
                <Grid {...gridTable.props} />
                <div className="mt-2">
                  {" "}
                  {uniqueApis.length > 0 ? (
                    <>
                      <b>Note :&nbsp;</b> Policies get filter based on
                      &quot;&nbsp;
                      <i>{uniqueApis}</i>&nbsp;&quot; Apis
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
