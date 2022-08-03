import React from "react";
import { Row, Col } from "react-bootstrap";
import ExpandCollapse from "../../../../../../../components/expand-collapse/ExpandCollapse";
import { generateBreadcrumbs } from "../../../../../../../components/scroll-to/ScrollTo";
import GlobalRateLimit from "../../../../common-settings/global-limit/GlobalRateLimit";
import { IProp } from "../AccessRights";
import AccessList from "./api-access-rights/AccessList";
import ApiAccess from "./api-access/ApiAccess";

export default function ChooseApi(props: IProp) {
  const { requiredParameters, state } = props;
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
