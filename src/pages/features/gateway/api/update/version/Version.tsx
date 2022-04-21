import React from "react";
import Versions from "./versions/Versions";
import VersionSettings from "./version-settings/VersionSettings";
import { Col, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { setFormData } from "../../../../../resources/api/api-constants";

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
            label="Disable Versioning"
            checked={state.data.form?.IsVersioningDisabled}
            onChange={(e: any) => validateForm(e)}
          />
        </Form.Group>
      </Col>
      {state.data.form?.IsVersioningDisabled ? (
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
