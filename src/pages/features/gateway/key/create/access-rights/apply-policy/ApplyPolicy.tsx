import React from "react";
import { Row, Col } from "react-bootstrap";
import ExpandCollapse from "../../../../../../../components/expand-collapse/ExpandCollapse";
import { generateBreadcrumbs } from "../../../../../../../components/scroll-to/ScrollTo";
import GlobalRateLimit from "../../../../common-settings/global-limit/GlobalRateLimit";
import { IProp } from "../AccessRights";
import Policies from "./policies/Policies";
import PolicyList from "./policy-list/PolicyList";

export default function ApplyPolicy(props: IProp) {
  const { requiredParameters, state } = props;
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
