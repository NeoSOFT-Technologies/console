import React from "react";
import { Row, Col } from "react-bootstrap";
import ExpandCollapse from "../../../../../../../components/expand-collapse/ExpandCollapse";
import { useAppSelector } from "../../../../../../../store/hooks";
import GlobalRateLimit from "../../../../common-settings/global-limit/GlobalRateLimit";
import AccessList from "./api-access-rights/AccessList";
import ApiAccess from "./api-access/ApiAccess";

export default function ChooseApi() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  // const Apistate = useAppSelector((RootState) => RootState.updateApiState);
  // console.log("parent states", state.data.form);

  return (
    <div>
      <Row>
        <Col className=".text-left">
          <ExpandCollapse containerId="chooseapicollapse" />
        </Col>
      </Row>
      <div id="chooseapicollapse">
        <AccessList />
        {/* <GlobalLimit
        isDisabled={false}
        msg={""}
        // policyId="e9420aa1-eec5-4dfc-8ddf-2bc989a9a47f"
      /> */}
        {/* {Apistate.data.form.RateLimit.IsDisabled ? (
        <div className="text-warning">warning: Ratelimit cannot be apply</div>
      ) : (
        ""
      )} */}
        <GlobalRateLimit keystate={state} current="key" />
        {state.data.form.AccessRights?.length! > 0 ? <ApiAccess /> : <></>}
      </div>
    </div>
  );
}
