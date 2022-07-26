import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ExpandCollapse from "../../../../../../../components/expand-collapse/ExpandCollapse";
import { generateBreadcrumbs } from "../../../../../../../components/scroll-to/ScrollTo";
import {
  keystate,
  setForms,
  setFormErrors,
} from "../../../../../../../store/features/gateway/key/create/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/hooks";
import GlobalRateLimit from "../../../../common-settings/global-limit/GlobalRateLimit";
import { IPropsHelper } from "../../../../common-settings/global-limit/rate-limit-helper";
import AccessList from "./api-access-rights/AccessList";
import ApiAccess from "./api-access/ApiAccess";

export default function ChooseApi() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const requiredParameters: IPropsHelper = {
    state,
    form: state.data.form as any,
    formProp: state.data.form.AccessRights as any,
    errors: state.data.errors as any,
    errorProp: state.data.errors?.PerApiLimit as any,
    prevState: keystate,
    propName: "AccessRights",
    setForm: setForms,
    setFormError: setFormErrors,
    index: 0,
    dispatch,
    id,
    current: "policy",
  };
  return (
    <div>
      <Row>
        <Col>{generateBreadcrumbs(["GlobalRateLimit"])}</Col>
        <Col className=".text-left">
          <ExpandCollapse containerId="chooseapicollapse" />
        </Col>
      </Row>
      <div id="chooseapicollapse">
        <AccessList />
        <GlobalRateLimit
          helper={requiredParameters}
          keystate={state}
          current="key"
        />
        {(state.data.form.AccessRights?.length as number) > 0 ? (
          <ApiAccess />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
