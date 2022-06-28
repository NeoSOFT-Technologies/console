import React from "react";
import { Row, Col } from "react-bootstrap";
import ExpandCollapse from "../../../../../../components/expand-collapse/ExpandCollapse";
import { generateBreadcrumbs } from "../../../../../../components/scroll-to/ScrollTo";
import BlacklistedIPs from "./blacklisted-ips/BlacklistedIPs";
import CorsOptions from "./cors-options/CorsOptions";
import WhitelistedIPs from "./whitelisted-ips/WhitelistedIPs";

export default function AdvancedOptions() {
  return (
    <div>
      <Row>
        <Col className=".text-right">
          {generateBreadcrumbs([
            "CorsOptions",
            "WhitelistedIPs",
            "BlacklistedIPs",
          ])}
        </Col>

        <Col className=".text-left">
          <ExpandCollapse containerId="advanceoptionscollapse" />
        </Col>
      </Row>
      <div id="advanceoptionscollapse">
        <div id="CorsOptions">
          <CorsOptions />
        </div>
        <div id="WhitelistedIPs">
          <WhitelistedIPs />
        </div>
        <div id="BlacklistedIPs">
          <BlacklistedIPs />
        </div>
      </div>
    </div>
  );
}
