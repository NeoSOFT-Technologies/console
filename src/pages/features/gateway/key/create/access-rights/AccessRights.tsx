import React, { useEffect, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IKeyCreateState } from "../../../../../../store/features/gateway/key/create";
import { emptyState } from "../../../../../../store/features/gateway/key/create/payload";
import {
  keystate,
  setFormErrors,
  setForms,
} from "../../../../../../store/features/gateway/key/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { IPropsHelper } from "../../../common-settings/global-limit/rate-limit-helper";
import ApplyPolicy from "./apply-policy/ApplyPolicy";
import ChooseApi from "./choose-api/ChooseApi";
export interface IProp {
  requiredParameters: IPropsHelper;
  state: IKeyCreateState;
}
export default function AccessRights() {
  const [SelectedTabIndex, setTabIndex] = useState("applyPolicy");
  const [ClickedTabIndex, setClickedTabIndex] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const state: IKeyCreateState = useAppSelector(
    (RootState) => RootState.createKeyState
  );
  const requiredParameters: IPropsHelper = {
    state,
    form: state.data.form as any,
    formProp: state.data.form.AccessRights as any,
    errors: state.data.errors as any,
    errorProp: state.data.errors?.PerApiLimit || [],
    prevState: keystate,
    propName: "AccessRights",
    setForm: setForms,
    setFormError: setFormErrors,
    index: 0,
    dispatch,
    id,
    current: "policy",
  };

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
  }, [SelectedTabIndex]);
  const handleCancel = () => {
    if (ClickedTabIndex === "applyPolicy") {
      setTabIndex("chooseApi");
    } else {
      setTabIndex("applyPolicy");
    }
    setShow(false);
  };

  function handleOnTabSelect(key: string) {
    if (SelectedTabIndex !== key) {
      //
      setShow(true);
      setClickedTabIndex(key);
    }
  }
  const handleOk = () => {
    setShow(false);
    //
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
            <Tabs
              // style={{ padding: "1rem 0rem" }}
              activeKey={SelectedTabIndex}
              id="uncontrolled-tab"
              // transition={false}
              onSelect={(key) => handleOnTabSelect(key as string)}
              className="small" // mb-2
            >
              <Tab eventKey="applyPolicy" title="Apply Policy">
                {SelectedTabIndex === "applyPolicy" ? (
                  <ApplyPolicy
                    requiredParameters={requiredParameters}
                    state={state}
                  />
                ) : (
                  <></>
                )}
              </Tab>
              <Tab eventKey="chooseApi" title="Choose Api">
                {SelectedTabIndex === "chooseApi" ? (
                  <ChooseApi
                    requiredParameters={requiredParameters}
                    state={state}
                  />
                ) : (
                  <></>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
