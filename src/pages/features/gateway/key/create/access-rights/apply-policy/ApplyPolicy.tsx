import React from "react";
import { Row, Col } from "react-bootstrap";
import ExpandCollapse from "../../../../../../../components/expand-collapse/ExpandCollapse";
import { useAppSelector } from "../../../../../../../store/hooks";
import GlobalRateLimit from "../../../../common-settings/global-limit/GlobalRateLimit";
import Policies from "./policies/Policies";
import PolicyList from "./policy-list/PolicyList";

export default function ApplyPolicy() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  return (
    <div>
      <Row>
        <Col className=".text-left">
          <ExpandCollapse containerId="applypolicycollapse" />
        </Col>
      </Row>
      <div id="applypolicycollapse">
        <PolicyList />
        {state.data.form.Policies?.length > 0 ? (
          <>
            <GlobalRateLimit
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
