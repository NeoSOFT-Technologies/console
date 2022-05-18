import React, { useEffect, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { IKeyCreateState } from "../../../../../../store/features/gateway/key/create";
import { emptyState } from "../../../../../../store/features/gateway/key/create/payload";
import {
  setForms,
  setFormErrors,
} from "../../../../../../store/features/gateway/key/create/slice";
// import { setForms } from "../../../../../../store/features/gateway/key/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import ApplyPolicy from "./apply-policy/ApplyPolicy";
import ChooseApi from "./choose-api/ChooseApi";
export default function AccessRights() {
  const [SelectedTabIndex, setTabIndex] = useState("applyPolicy");
  const [ClickedTabIndex, setClickedTabIndex] = useState("");

  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const state: IKeyCreateState = useAppSelector(
    (RootState) => RootState.createKeyState
  );
  // console.log("keyId", state.data.form.KeyId);
  useEffect(() => {
    if (state.data.form.KeyId === undefined) {
      setTabIndex("applyPolicy");
    } else if (state.data.form.KeyId && state.data.form.Policies.length > 0) {
      setTabIndex("applyPolicy");
    } else {
      setTabIndex("chooseApi");
    }
  }, []);
  useEffect(() => {
    dispatch(setForms({ ...state.data.form, SelectedTabIndex }));
    if (SelectedTabIndex === "applyPolicy") {
      dispatch(
        setFormErrors({
          ...state.data.errors,
          PerApiLimit: [],
        })
      );
    }
  }, [SelectedTabIndex]);
  const handleCancel = () => {
    if (ClickedTabIndex === "applyPolicy") {
      setTabIndex("chooseApi");
      // setForms({ ...state.data.form, SelectedTabIndex: a });
    } else {
      setTabIndex("applyPolicy");
    }
    setShow(false);
  };

  function handleOnTabSelect(key: string) {
    if (SelectedTabIndex !== key) {
      // console.log("tab selected", key, SelectedTabIndex);
      setShow(true);
      setClickedTabIndex(key);
    }
  }
  const handleOk = () => {
    setShow(false);
    // console.log("ok selected", SelectedTabIndex, ClickedTabIndex);
    const form = {
      ...emptyState.data.form,
      KeyId: state.data.form.KeyId,
      KeyName: state.data.form.KeyName,
      Expires: state.data.form.Expires,
      AccessRights: [],
      Policies: [],
      PolicyByIds: [],
    };

    dispatch(setForms(form));
    setTabIndex(ClickedTabIndex);

    //  if(ClickedTabIndex!==)
  };
  return (
    <>
      <Modal size="lg" show={show} onHide={handleCancel} centered>
        {/* sm" | "lg" | "xl */}
        <Modal.Header closeButton>
          <Modal.Title>
            <span>
              Are you sure you want to add Access Rights by{" "}
              {SelectedTabIndex === "chooseApi" ? "Apply Policy" : "Choose Api"}
              !
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Note: </b> key can only have Access Rights added by either Applying
          Policies or by manually Choosing API...
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="align-items-center">
          <div>
            {/* className="pt-2"   style={{ padding: "1rem 0rem" }} */}
            <Tabs
              // style={{ padding: "1rem 0rem" }}
              activeKey={SelectedTabIndex}
              id="uncontrolled-tab"
              // transition={false}
              onSelect={(key) => handleOnTabSelect(key!)}
              className="small" // mb-2
            >
              <Tab eventKey="applyPolicy" title="Apply Policy">
                {SelectedTabIndex === "applyPolicy" ? <ApplyPolicy /> : <></>}
              </Tab>
              <Tab eventKey="chooseApi" title="Choose Api">
                {SelectedTabIndex === "chooseApi" ? <ChooseApi /> : <></>}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
