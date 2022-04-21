import { Grid } from "gridjs-react";
import { h } from "gridjs";
import React, { useEffect } from "react";
import { setForms } from "../../../../../../../store/features/key/create/slice";
import { IPolicyListState } from "../../../../../../../store/features/policy/list";
import { getPolicyList } from "../../../../../../../store/features/policy/list/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import { ToastAlert } from "../../../../../../../components/ToasterAlert/ToastAlert";

export default function PolicyList() {
  const accessPolicyList: IPolicyListState = useAppSelector(
    (state) => state.policyListState
  );
  const StateKey = useAppSelector((RootState) => RootState.createKeyState);
  const dispatch = useAppDispatch();
  const mainCall = async (currentPage: number) => {
    dispatch(getPolicyList({ currentPage }));
  };
  useEffect(() => {
    mainCall(1);
  }, []);
  const handleAddClick = (Id: string) => {
    const data = StateKey.data?.form.Policies.some((x) => x === Id);
    // console.log("policylist check before", data);

    if (!data) {
      // console.log(
      //   "policylist check",
      //   StateKey.data?.form.Policies.some((x) => x === Id)
      // );
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
        // attributes: (cell: string) => {
        //   if (cell) {
        //     return {
        //       "data-cell-content": cell,
        //       onclick: () => handleAddClick(cell),
        //       style: "cursor: pointer",
        //     };
        //   }
        // },
      },
      {
        name: "Name",
        formatter: (cell: string, row: any) => {
          return h(
            "text",
            {
              // className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
              // onClick: () =>
              //   alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`),

              onclick: () => handleAddClick(row.cells[0].data),
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
        // style: "cursor: pointer",
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
      // rowSelection: "multiple",
      // rowMultiSelectWithClick: true,
    },
  });
  return (
    <div>
      <div className="card mb-3">
        <div>
          <div className="align-items-center justify-content-around">
            <div className="accordion" id="accordionSetting">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Apply Policy
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionSetting"
                >
                  <div className="accordion-body">
                    <div>
                      <Grid {...gridTable.props} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
