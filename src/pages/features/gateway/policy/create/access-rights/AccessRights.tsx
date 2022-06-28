import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ExpandCollapse from "../../../../../../components/expand-collapse/ExpandCollapse";
import { generateBreadcrumbs } from "../../../../../../components/scroll-to/ScrollTo";
import {
  policystate,
  setForm,
  setFormError,
} from "../../../../../../store/features/gateway/policy/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import GlobalRateLimit from "../../../common-settings/global-limit/GlobalRateLimit";
import { IPropsHelper } from "../../../common-settings/global-limit/rate-limit-helper";
import AccessList from "./api-access-rights/AccessList";
import ApiAccess from "./api-access/ApiAccess";
import Partitions from "./partitions/Partitions";
export default function AccessRights() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const requiredParameters: IPropsHelper = {
    state,
    form: state.data.form!,
    formProp: state.data.form.APIs!,
    errors: state.data.errors!,
    errorProp: state.data.errors?.PerApiLimit!,
    prevState: policystate,
    propName: "APIs",
    setForm,
    setFormError,
    index: 0,
    dispatch,
    id,
    current: "policy",
  };
  return (
    <div>
      <div>
        <div>
          <div className="align-items-center">
            <Row>
              <Col>{generateBreadcrumbs(["GlobalRateLimit"])}</Col>
              <Col className=".text-left">
                <ExpandCollapse containerId="accessrightscollapse" />
              </Col>
            </Row>
            <div className="pt-2" id="accessrightscollapse">
              <AccessList />
              <GlobalRateLimit
                state={state}
                current="policy"
                helper={requiredParameters}
              />
              <Partitions />

              {state.data.form.APIs?.length > 0 ? <ApiAccess /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
