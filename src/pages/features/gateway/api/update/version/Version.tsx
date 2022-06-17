import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import ExpandCollapse from "../../../../../../components/expand-collapse/ExpandCollapse";
import {
  setForm,
  setFormError,
} from "../../../../../../store/features/gateway/api/update/slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import VersionSettings from "./version-settings/VersionSettings";
import Versions from "./versions/Versions";

export default function Version() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  // console.log("version", state.data.form);
  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked === false) {
      const versionInfoList = {
        Location: 0,
        Key: "",
      };

      const list = [
        {
          Name: "Default",
          OverrideTarget: "",
          Expires: "",
          GlobalRequestHeaders: {},
          GlobalRequestHeadersRemove: [],
          GlobalResponseHeaders: {},
          GlobalResponseHeadersRemove: [],
          ExtendedPaths: undefined,
        },
      ];
      dispatch(
        setForm({
          ...state.data.form,
          IsVersioningDisabled: !event.target.checked,
          VersioningInfo: versionInfoList,
          Versions: list,
        })
      );

      const errlist = [
        {
          OverrideTarget: "",
        },
      ];

      dispatch(
        setFormError({
          ...state.data.errors,
          Versions: errlist,
        })
      );
    } else {
      dispatch(
        setForm({
          ...state.data.form,
          IsVersioningDisabled: !event.target.checked,
        })
      );
    }
  }

  return (
    <div>
      {state.data.form.EnableRoundRobin ? (
        <h6>Note: Version doesn&apos;t works with Round-Robin LoadBalacing</h6>
      ) : (
        <></>
      )}
      <Row>
        <Col md={9}>
          <Form.Group className="ml-4 mb-3">
            <Form.Check
              type="switch"
              id="IsVersioningDisabled"
              name="IsVersioningDisabled"
              label="Enable Versioning"
              // disabled={state.data.form.EnableRoundRobin}
              checked={!state.data.form?.IsVersioningDisabled}
              onChange={(e: any) => validateForm(e)}
            />
          </Form.Group>
        </Col>
        {state.data.form?.IsVersioningDisabled ? (
          <></>
        ) : (
          <Col md={3}>
            <ExpandCollapse containerId="settingcollapse" />
          </Col>
        )}
      </Row>

      {state.data.form?.IsVersioningDisabled ? (
        <></>
      ) : (
        <div id="versioncollapse">
          <VersionSettings />
          <Versions />
        </div>
      )}
    </div>
  );
}
