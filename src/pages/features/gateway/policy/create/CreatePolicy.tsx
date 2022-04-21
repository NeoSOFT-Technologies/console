import React, { FormEvent } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastAlert } from "../../../../components/ToasterAlert/ToastAlert";
import { IPolicyCreateState } from "../../../../store/features/policy/create";
import { createPolicy } from "../../../../store/features/policy/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import AccessRights from "./access-rights/AccessRights";
import Configurations from "./configurations/Configurations";
export default function CreatePolicy() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const state: IPolicyCreateState = useAppSelector(
    (RootState) => RootState.createPolicyState
  );
  async function handleSubmitPolicy(event: FormEvent) {
    event.preventDefault();
    let validate: any;
    if (state.data.errors !== undefined) {
      validate = Object.values(state.data.errors).every(
        (x) => x === null || x === ""
      );
      // console.log("error", state.data);
    }
    if (validate) {
      const result = await dispatch(createPolicy(state.data.form));
      if (result.meta.requestStatus === "rejected") {
        ToastAlert(result.payload.message, "error");
      } else if (result.meta.requestStatus === "fulfilled") {
        ToastAlert("Policy Created Successfully!!", "success");
        navigate("/policy/list");
      } else {
        ToastAlert("policy Created request is not fulfilled!!", "error");
      }
    } else {
      ToastAlert("Please fill all the fields correctly! ", "error");
    }
  }
  const NavigateToPolicyList = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/policy/list");
  };
  return (
    <div>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div>
            {/*  className="card-body" */}
            <Form
              data-testid="form-input"
              onSubmit={(e: FormEvent) => handleSubmitPolicy(e)}
            >
              <div className="align-items-center">
                <div
                  className="card-header bg-white mt-3 pt-1 pb-4"
                  style={{ padding: "0.5rem 1.5rem" }}
                >
                  <button className=" btn btn-sm btn-success btn-md d-flex float-right mb-3">
                    {" "}
                    Create
                  </button>
                  <button
                    className=" btn btn-sm btn-light btn-md d-flex float-right mb-3"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      NavigateToPolicyList(event)
                    }
                  >
                    {" "}
                    Cancel
                  </button>
                  <span>
                    <b>CREATE POLICY</b>
                  </span>
                </div>
                <div className="card-body pt-2">
                  <Tabs
                    defaultActiveKey="accessRights"
                    id="uncontrolled-tab"
                    // transition={false}
                    className="mb-0 small"
                  >
                    <Tab eventKey="accessRights" title="Access Rights">
                      <AccessRights />
                    </Tab>
                    <Tab eventKey="configurations" title="Configurations">
                      <Configurations />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
