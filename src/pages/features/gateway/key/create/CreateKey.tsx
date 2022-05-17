import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
// import { setFormErrorkey } from "../../../../../resources/gateway/key/key-constants";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
// import { emptyState } from "../../../../../store/features/gateway/key/create/payload";
import {
  createKey,
  getKeyById,
  setFormErrors,
  // setForms,
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
  const [keyId, setKeyId] = useState<string>();
  const state: IKeyCreateState = useAppSelector(
    (RootState) => RootState.createKeyState
  );
  const { id } = useParams();
  const mainCall = async () => {
    if (id !== undefined) {
      const error = [];
      const keybyid = await dispatch(getKeyById(id));
      if (
        keybyid !== undefined &&
        keybyid.payload.Data?.AccessRights.length > 0
      ) {
        for (let i = 0; i < keybyid.payload.Data.AccessRights.length; i++) {
          console.log("hii");
          const perapierror = {
            ApiId: keybyid?.payload.Data?.AccessRights[i]?.ApiId!,
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
        console.log("error", error);
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

  const handleOk = () => {
    setShow(false);
  };
  // let TabIcon: any;
  async function handleSubmitKey(event: FormEvent) {
    event.preventDefault();
    let validate: any;
    validate = false;
    // noted
    const validateFieldValue = state.data.form.KeyName.length > 0;
    if (!validateFieldValue) {
      dispatch(
        setFormErrors({ ...state.data.errors, KeyName: "Name is required" })
      );
    }
    if (state.data.errors !== undefined) {
      // validate = Object.values(state.data.errors).every(
      //   (x) => x === null || x === ""
      // );

      // validate = !!(
      //   state.data.errors?.Name === "" &&
      //   validateFieldValue === true &&
      //   state.data.errors?.GlobalLimit.Rate === "" &&
      //   state.data.errors?.GlobalLimit.Per === "" &&
      //   state.data.errors?.GlobalLimit.ThrottleInterval === "" &&
      //   state.data.errors?.GlobalLimit.ThrottleRetries === "" &&
      //   state.data.errors?.GlobalLimit.Quota === ""
      // );
      if (state.data.errors?.PerApiLimit.length > 0) {
        for (let i = 0; i < state.data.errors?.PerApiLimit.length; i++) {
          console.log("enetered here welcome all of you");
          validate = !!(
            state.data.errors?.KeyName === "" &&
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
        validate = !!(
          state.data.errors?.KeyName === "" && validateFieldValue === true
        );
      }
    }
    if (validate) {
      if (
        state.data.form.Policies.length === 0 &&
        state.data.form.AccessRights.length === 0
      ) {
        ToastAlert(
          "You need to add access rights to atleast one API \n or you need to add one Policy ...! ",
          "error"
        );
      } else {
        const result = id
          ? await dispatch(updateKey(state.data.form))
          : await dispatch(createKey(state.data.form));
        if (result.meta.requestStatus === "rejected") {
          ToastAlert(result.payload.message, "error");
        } else if (result.meta.requestStatus === "fulfilled") {
          // ToastAlert("Key Created Successfully!!", "success");
          // navigate("/gateway/keys");
          if (id === undefined) {
            const valId: string = result.payload.Data.KeyId;
            ToastAlert("Key Created Successfully!!", "success");
            if (valId) {
              setShow(true);
              setKeyId(valId);
              await new Promise((resolve) => setTimeout(resolve, 1000));
              // alert(`${valId}`);
              await dispatch(getKeyById(valId));
              navigate(`/gateway/keys/update/${valId}`);
            }
          } else {
            ToastAlert("Key Updated Successfully!!", "success");
          }
        } else {
          ToastAlert("Request is not fulfilled!!", "error");
        }
      }
    } else {
      ToastAlert("Please fill all the fields correctly! ", "error");
    }
  }

  const NavigateToKeyList = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/gateway/keys");
  };

  //  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(keyId!);
      setClipboard(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setShow(false);
  };

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
          {clipboard ? "Copied!" : ""}
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
                {/*  className="card-body" */}
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
                      <button className=" btn btn-sm btn-success btn-md d-flex float-right mb-3">
                        {" "}
                        {id ? "Update" : "Create"}
                      </button>
                      <button
                        className=" btn btn-sm btn-light btn-md d-flex float-right mb-3"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                          NavigateToKeyList(event)
                        }
                      >
                        {" "}
                        Cancel
                      </button>
                      <span>
                        <b>{id ? "UPDATE KEY" : "CREATE KEY"} </b>
                      </span>
                    </div>
                    <div className="card-body pt-2">
                      <Tabs
                        // tab-content
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
                              {state.data.errors?.KeyName ? (
                                <i className="bi bi-info-circle-fill text-danger"></i>
                              ) : (
                                ""
                              )}
                              &nbsp; Configurations
                            </span>
                          }
                        >
                          {/* "Configurations" */}
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
