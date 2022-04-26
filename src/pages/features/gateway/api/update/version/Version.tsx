import React from "react";
import { Col, Form } from "react-bootstrap";
import { setFormData } from "../../../../../../resources/gateway/api/api-constants";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import VersionSettings from "./version-settings/VersionSettings";
import Versions from "./versions/Versions";

export default function Version() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData(event, dispatch, state);
  }

  return (
    <div>
      <Col md="12">
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="IsVersioningDisabled"
            name="IsVersioningDisabled"
            label="Enable Versioning"
            checked={state.data.form?.IsVersioningDisabled}
            onChange={(e: any) => validateForm(e)}
          />
        </Form.Group>
      </Col>
      {!state.data.form?.IsVersioningDisabled ? (
        <></>
      ) : (
        <div>
          <VersionSettings />
          <Versions />
        </div>
      )}
    </div>
  );
}
