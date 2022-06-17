import React from "react";
import { Row, Col } from "react-bootstrap";
import ExpandCollapse from "../../../../../../components/expand-collapse/ExpandCollapse";
import BlacklistedIPs from "./blacklisted-ips/BlacklistedIPs";
import CorsOptions from "./cors-options/CorsOptions";
import WhitelistedIPs from "./whitelisted-ips/WhitelistedIPs";

export default function AdvancedOptions() {
  return (
    <div>
      <Row>
        <Col className=".text-left">
          <ExpandCollapse containerId="advanceoptionscollapse" />
        </Col>
      </Row>
      <div id="advanceoptionscollapse">
        <CorsOptions />
        <WhitelistedIPs />
        <BlacklistedIPs />
      </div>
    </div>
  );
}
