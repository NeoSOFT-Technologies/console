import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { access, AuthGuard } from "../../../../../components/auth-gaurd";
import { errorSummary } from "../../../../../components/error-summary/ErrorSummary";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import {
  createKey,
  getKeyById,
  setFormErrors,
  updateKey,
} from "../../../../../store/features/gateway/key/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import AccessRights from "./access-rights/AccessRights";
import Configurations from "./configurations/Configurations";
export default function CreateKey() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [clipboard, setClipboard] = useState(false);
  const [visible, setVisible] = useState(false);
  const [keyId, setKeyId] = useState<string>();
  const state: IKeyCreateState = useAppSelector(
    (RootState) => RootState.createKeyState
  );
  const { id } = useParams();
  let validate: boolean;

  validate = false;
  // noted
  const validateFieldValue = state.data.form.KeyName.length > 0;
  const mainCall = async () => {
    if (id !== undefined) {
      const error = [];
      const keybyid = await dispatch(getKeyById(id));
      if (
        keybyid !== undefined &&
        keybyid.payload.Data?.AccessRights.length > 0
      ) {
        for (let i = 0; i < keybyid.payload.Data.AccessRights.length; i++) {
          const perapierror = {
            ApiId: keybyid?.payload.Data?.AccessRights[i]?.ApiId || "",
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
          setFormErrors({
            ...state.data.errors,
            PerApiLimit: error,
          })
        );
      }
    }
  };
  useEffect(() => {
    mainCall();
  }, []);

  // to hide copied message after timeout
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      setClipboard(false);
    }, 2000);
  }, [clipboard]);
  const handleOk = () => {
    setShow(false);
  };



  function setValidate() {
    if (state.data.errors !== undefined) {
      if (
        state.data.errors?.PerApiLimit.length > 0 &&
        state.data.form.SelectedTabIndex === "chooseApi"
      ) {
        for (let i = 0; i < state.data.errors?.PerApiLimit.length; i++) {
          validate = !!(
            validateFieldValue === true &&
            state.data.errors?.GlobalLimit.Rate === "" &&
            state.data.errors?.GlobalLimit.Per === "" &&
            state.data.errors?.GlobalLimit.ThrottleInterval === "" &&
            state.data.errors?.GlobalLimit.ThrottleRetries === "" &&
            state.data.errors?.GlobalLimit.Quota === "" &&
            state.data.errors?.PerApiLimit[i].Per === "" &&
            state.data.errors?.PerApiLimit[i].Rate === "" &&
            state.data.errors?.PerApiLimit[i].Quota === "" &&
            state.data.errors?.PerApiLimit[i].Expires === "" &&
            state.data.errors?.PerApiLimit[i].QuotaRenewalRate === "" &&
            state.data.errors?.PerApiLimit[i].ThrottleInterval === "" &&
            state.data.errors?.PerApiLimit[i].ThrottleRetries === ""
          );
        }
      } else {
        validate = !!(validateFieldValue === true);
      }
    }
  }

  function setKeyNameError() {
    if (!validateFieldValue) {
      dispatch(
        setFormErrors({ ...state.data.errors, KeyName: "Name is required" })
      );
    }
  }

  function toastPolicyApi() {
    if (state.data.form.SelectedTabIndex === "applyPolicy") {
      ToastAlert(" Select at least one Policy  ...! ", "error");
    } else {
      ToastAlert("Select at least one API ...! ", "error");
    }
  }

  async function checkRejectedFullfilled(result: any) {
    if (result.meta.requestStatus === "rejected") {
      ToastAlert(result.payload.message, "error");
    } else if (result.meta.requestStatus === "fulfilled") {
      if (id === undefined) {
        const valId: string = result.payload.Data.KeyId;
        ToastAlert("Key Created Successfully!!", "success");
        if (valId) {
          setShow(true);
          setKeyId(valId);
          await new Promise((resolve) => setTimeout(resolve, 1000));

          await dispatch(getKeyById(valId));
          navigate(`/gateway/keys/update/${valId}`);
        }
      } else {
        ToastAlert("Key Updated Successfully!!", "success");
        await dispatch(getKeyById(id));
      }
    } else {
      ToastAlert("Request is not fulfilled!!", "error");
    }
  }

  async function checkValidate() {
    console.log("check validate", validate);
    if (validate !== undefined && validate) {
      const result = id
        ? await dispatch(updateKey(state.data.form))
        : await dispatch(createKey(state.data.form));
      checkRejectedFullfilled(result);
    } else {
      ToastAlert("Please fill all the fields correctly! ", "error");
    }
  }
  async function handleSubmitKey(event: FormEvent) {
    event.preventDefault();
    setKeyNameError();
    setValidate();
    if (
      state.data.form.Policies.length === 0 &&
      state.data.form.AccessRights.length === 0
    ) {
      toastPolicyApi();
    } else {

      checkValidate();

    }
  }

  const NavigateToKeyList = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/gateway/keys");
  };

  const copyToClipBoard = async () => {
    try {
      if (keyId === undefined) {
        setKeyId(id);
      }

      await navigator.clipboard.writeText(keyId || "");
      setClipboard(true);
      setVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setShow(false);
  };
  function keyid() {
    if (id) {
      return (
        <>
          <b>KEY ID:</b> {id}{" "}
          <i
            data-testid="copy-input"
            className="btn btn-sm bi bi-clipboard"
            // onClick={copyToClipBoard(state.data.form.ApiId)}

            onClick={copyToClipBoard}
          ></i>
          {visible ? "Copied!" : ""}
        </>
      );
    }
  }
  return (
    <>
      <Modal size="lg" show={show} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Key Generated Successfully</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="border p-2 rounded rounded-10"
            style={{ backgroundColor: "#E1F5FE" }}
          >
            Your key has been created... <br />
            <br />
            <b className="mt-2">Key ID : </b> {keyId}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {visible ? "Copied!" : ""}
          <Button
            variant="primary"
            className="rouded-6"
            onClick={copyToClipBoard}
          >
            Copy to Clipboard
          </Button>
          <Button variant="primary" className="rouded-6" onClick={handleOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        {state.loading ? (
          <Spinner />
        ) : (
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div>
                <Form
                  data-testid="form-input"
                  onSubmit={(e: FormEvent) => handleSubmitKey(e)}
                >
                  <div className="align-items-center">
                    <div
                      className="card-header bg-white mt-3 pt-1 pb-4"
                      style={{ padding: "0.5rem 1.5rem" }}
                    >
                      {/* <Button
                      variant="primary"
                      onClick={handleShow}
                      className="btn-sm float-right mb-3"
                    >
                      Modal
                    </Button> */}
                      <AuthGuard
                        resource={access.resources.Key}
                        scope={(() => {
                          return id ? access.scopes.Edit : access.scopes.Create;
                        })()}
                      >
                        <button className=" btn btn-sm btn-success btn-md d-flex float-right mb-3">
                          {" "}
                          {(() => {
                            return id ? "Update" : "Create";
                          })()}
                        </button>
                      </AuthGuard>
                      <button
                        data-testid="cancel-input"
                        className=" btn btn-sm btn-light btn-md d-flex float-right mb-3"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                          NavigateToKeyList(event)
                        }
                      >
                        {" "}
                        Cancel
                      </button>
                      <span>
                        <b>
                          {(() => {
                            return id ? "UPDATE KEY" : "CREATE KEY";
                          })()}{" "}
                        </b>
                      </span>

                      <div className="pt-2">{keyid()}</div>

                    </div>
                    <div className="card-body pt-2">
                      <div>{errorSummary(state.data.errors)}</div>
                      <br />
                      <Tabs
                        defaultActiveKey="accessRights"
                        id="uncontrolled-tab"
                        className="mb-0 small"
                      >
                        <Tab eventKey="accessRights" title="Access Rights">
                          <AccessRights />
                        </Tab>
                        <Tab
                          eventKey="configurations"
                          title={
                            <span>
                              {(() => {
                                return state.data.errors?.KeyName ? (
                                  <i className="bi bi-info-circle-fill text-danger"></i>
                                ) : (
                                  ""
                                );
                              })()}
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
        )}
      </div>
    </>
  );
}
