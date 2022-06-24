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
import Policies from "./policies/Policies";
import PolicyList from "./policy-list/PolicyList";

export default function ApplyPolicy() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const requiredParameters: IPropsHelper = {
    state,
    form: state.data.form!,
    formProp: state.data.form.AccessRights!,
    errors: state.data.errors!,
    errorProp: state.data.errors?.PerApiLimit!,
    prevState: keystate,
    propName: "AccessRights",
    setForm: setForms,
    setFormError: setFormErrors,
    index: 0,
    dispatch,
    id,
    current: "policy",
  };
  console.log("hey i am hete in apply poliyc");
  return (
    <div>
      <Row>
        <Col>
          {state.data.form.Policies?.length > 0
            ? generateBreadcrumbs(["GlobalRateLimit"])
            : ""}
        </Col>

        <Col className=".text-left">
          <ExpandCollapse containerId="applypolicycollapse" />
        </Col>
      </Row>
      <div id="applypolicycollapse">
        <PolicyList />
        {state.data.form.Policies?.length > 0 ? (
          <>
            <GlobalRateLimit
              helper={requiredParameters}
              message={" is being set by each policy"}
              current="globalKey-applyPolicy"
            />
            <Policies />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
