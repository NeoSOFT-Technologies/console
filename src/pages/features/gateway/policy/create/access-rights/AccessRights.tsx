import React from "react";
import { Row, Col } from "react-bootstrap";
import ExpandCollapse from "../../../../../../components/expand-collapse/ExpandCollapse";
import { useAppSelector } from "../../../../../../store/hooks";
import GlobalRateLimit from "../../../common-settings/global-limit/GlobalRateLimit";
import AccessList from "./api-access-rights/AccessList";
import ApiAccess from "./api-access/ApiAccess";
import Partitions from "./partitions/Partitions";
export default function AccessRights() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  return (
    <div>
      <div>
        <div>
          <div className="align-items-center">
            <Row>
              <Col className=".text-left">
                <ExpandCollapse containerId="accessrightscollapse" />
              </Col>
            </Row>
            <div className="pt-2" id="accessrightscollapse">
              <AccessList />
              <GlobalRateLimit state={state} current="policy" />
              <Partitions />

              {state.data.form.APIs?.length > 0 ? <ApiAccess /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
