import { h } from "gridjs";
import { Grid } from "gridjs-react";
import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
import { setForms } from "../../../../../../../../store/features/gateway/key/create/slice";
import { IPolicyListState } from "../../../../../../../../store/features/gateway/policy/list";
import { getPolicyList } from "../../../../../../../../store/features/gateway/policy/list/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";

export default function PolicyList() {
  const accessPolicyList: IPolicyListState = useAppSelector(
    (state) => state.policyListState
  );
  const StateKey = useAppSelector((RootState) => RootState.createKeyState);
  const dispatch = useAppDispatch();
  const mainCall = async (currentPage: number, pageSize: number) => {
    dispatch(getPolicyList({ currentPage, pageSize }));
  };
  useEffect(() => {
    mainCall(1, 100_000);
  }, []);
  const handleAddClick = (Id: any) => {
    console.log("policyList", StateKey.data?.form.Policies);
    const data = StateKey.data.form?.Policies?.includes(Id);

    if (!data) {
      const list = [...StateKey.data.form.Policies, Id];
      dispatch(setForms({ ...StateKey.data.form, Policies: list }));
    } else {
      ToastAlert("Already select...", "error");
    }
  };

  // console.log(StateKey.data.form);
  const gridTable = new Grid({
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
              onClick: () => handleAddClick(row.cells[0].data),
            },
            `${row.cells[1].data}`
          );
        },
        attributes: (cell: string) => {
          if (cell) {
            return {
              "data-cell-content": cell,
              //  onclick: () => handleAddClick(cell),
              style: "cursor: pointer",
            };
          }
        },
      },
      "State",
      "Access Rights",
      "Auth Type",
    ],
    data: () =>
      accessPolicyList.data !== undefined &&
      accessPolicyList.data &&
      accessPolicyList.data?.Policies?.length! > 0
        ? accessPolicyList.data?.Policies.map((data) => [
            data.Id,
            data.Name,
            data.State ? "active" : "Inactive",
            data.Apis,
            data.AuthType,
          ])
        : [],
    search: true,
    sort: true,
    // height: "400px",
    className: {
      container: "table table-responsive table-bordered table-stripped",
    },
    style: {
      table: {
        width: "100%",
        border: "2px solid #ccc",
      },
      th: {
        color: "#000",
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
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
