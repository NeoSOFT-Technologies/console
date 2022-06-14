import React, { FormEvent, useEffect } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { access, AuthGuard } from "../../../../../components/auth-gaurd";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import {
  createPolicy,
  getPolicybyId,
  setFormError,
  updatePolicy,
  policystate,
} from "../../../../../store/features/gateway/policy/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import AccessRights from "./access-rights/AccessRights";
import Configurations from "./configurations/Configurations";
export default function CreatePolicy() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state: IPolicyCreateState = useAppSelector(
    (RootState) => RootState.createPolicyState
  );

  const { id } = useParams();
  const mainCall = async () => {
    if (id !== undefined) {
      const error = [];
      const policybyid = await dispatch(getPolicybyId(id));
      for (let i = 0; i < policybyid.payload.Data.APIs.length; i++) {
        const perapierror = {
          ApiId: policybyid.payload.Data.APIs[i].Id,
          Per: "",
          Rate: "",
          Quota: "",
          Expires: "",
          QuotaRenewalRate: "",
          ThrottleInterval: "",
          ThrottleRetries: "",
        };
        error.push(perapierror);
      }
      dispatch(
        setFormError({
          ...state.data.errors,
          PerApiLimit: error,
        })
      );
    }
  };
  useEffect(() => {
    mainCall();
  }, []);

  async function handleSubmitPolicy(event: FormEvent) {
    event.preventDefault();
    const validateFieldValue = state.data.form.Name.length > 0;
    if (!validateFieldValue) {
      dispatch(
        setFormError({ ...state.data.errors, Name: "Name is required" })
      );
    }

    let validate: boolean;
    validate = false;
    validate = !!(
      state.data.errors?.Name === "" &&
      validateFieldValue === true &&
      state.data.errors?.GlobalLimit.Rate === "" &&
      state.data.errors?.GlobalLimit.Per === "" &&
      state.data.errors?.GlobalLimit.ThrottleInterval === "" &&
      state.data.errors?.GlobalLimit.ThrottleRetries === "" &&
      state.data.errors?.GlobalLimit.Quota === ""
    );

    if (state.data.form.APIs.length > 0) {
      if (validate) {
        if (id !== undefined) {
          console.log("update policy checking", policystate);
        }
        const result =
          id === undefined
            ? await dispatch(createPolicy(state.data.form))
            : await dispatch(updatePolicy(state.data.form));
        if (result.meta.requestStatus === "rejected") {
          ToastAlert(result.payload.message, "error");
        } else if (result.meta.requestStatus === "fulfilled") {
          if (state.data.form.APIs.length > 0) {
            if (id === undefined) {
              const valId: string = result.payload.Data.PolicyId;
              ToastAlert("Policy Created Successfully!!", "success");
              // navigate("/gateway/policies")
              if (valId) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                await dispatch(getPolicybyId(valId));
                navigate(`/gateway/policies/update/${valId}`);
              }
            } else {
              ToastAlert("Policy Updated Successfully!!", "success");
              await dispatch(getPolicybyId(id));
            }
          } else {
            ToastAlert("Please select atleast one Api!", "error");
          }
        } else {
          ToastAlert("policy Created request is not fulfilled!!", "error");
        }
      } else {
        ToastAlert("Please fill all the fields correctly! ", "error");
      }
    } else {
      ToastAlert("Please select atleast one Api ", "error");
    }
  }
  const NavigateToPolicyList = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/gateway/policies");
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
                  <AuthGuard
                    resource={access.resources.Policy}
                    scope={id ? access.scopes.Edit : access.scopes.Create}
                  >
                    <button
                      className=" btn btn-sm btn-success btn-md d-flex float-right mb-3"
                      data-testid="create-input"
                    >
                      {" "}
                      {id === undefined ? "Create" : "Update"}
                    </button>
                  </AuthGuard>
                  <button
                    className=" btn btn-sm btn-light btn-md d-flex float-right mb-3"
                    data-testid="cancel-input"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      NavigateToPolicyList(event)
                    }
                  >
                    {" "}
                    Cancel
                  </button>
                  <span>
                    <b>
                      {id === undefined ? "CREATE POLICY" : "UPDATE POLICY"}
                    </b>
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
                    <Tab
                      eventKey="configurations"
                      title={
                        <span>
                          {state.data.errors?.Name ? (
                            <i className="bi bi-info-circle-fill text-danger"></i>
                          ) : (
                            ""
                          )}
                          &nbsp; Configurations
                        </span>
                      }
                    >
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
