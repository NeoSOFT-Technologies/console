import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import {
  createKey,
  getKeyById,
  updateKey,
} from "../../../../../store/features/gateway/key/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import AccessRights from "./access-rights/AccessRights";
import Configurations from "./configurations/Configurations";
export default function CreateKey() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [keyId, setKeyId] = useState<string>();
  const state: IKeyCreateState = useAppSelector(
    (RootState) => RootState.createKeyState
  );

  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    if (id !== undefined) {
      dispatch(getKeyById(id));
    }
  }, []);

  const handleOk = () => {
    setShow(false);
  };

  async function handleSubmitKey(event: FormEvent) {
    event.preventDefault();
    let validate: any;
    if (state.data.errors !== undefined) {
      validate = Object.values(state.data.errors).every(
        (x) => x === null || x === ""
      );
      // console.log("error", state.data);
    }
    if (validate) {
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
          // navigate("/gateway/policies")
          if (valId) {
            setShow(true);
            setKeyId(valId);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // alert(`${valId}`);
            await dispatch(getKeyById(valId));
            navigate(`/gateway/keys/update/${valId}`);
          }
        } else {
          ToastAlert("Key Updated Successfully!!", "success");
        }
      } else {
        ToastAlert("Key Created request is not fulfilled!!", "error");
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

  return (
    <>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, youre reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>key Generated Successfully</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="border p-2 rounded rounded-4"
            style={{ backgroundColor: "#C8E6C9" }}
          >
            Your key has been created... <br />
            <br />
            <b className="mt-2">Key ID : </b> {keyId}
          </div>
        </Modal.Body>
        <Modal.Footer>
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
        )}
      </div>
    </>
  );
}
