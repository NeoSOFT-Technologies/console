import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import ApplyPolicy from "./apply-policy/ApplyPolicy";
import ChooseApi from "./choose-api/ChooseApi";
export default function AccessRights() {
  return (
    <div>
      <div className="align-items-center">
        <div>
          {/* className="pt-2"   style={{ padding: "1rem 0rem" }} */}
          <Tabs
            // style={{ padding: "1rem 0rem" }}
            defaultActiveKey="applyPolicy"
            id="uncontrolled-tab"
            // transition={false}
            className="small" // mb-2
          >
            <Tab eventKey="applyPolicy" title="Apply Policy">
              <ApplyPolicy />
            </Tab>
            <Tab eventKey="chooseApi" title="Choose Api">
              <ChooseApi />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
