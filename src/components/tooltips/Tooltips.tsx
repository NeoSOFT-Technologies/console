import React from "react";
import { Button, OverlayTrigger, Tooltip, Image } from "react-bootstrap";
import icon from "../../resources/gateway/images/info-icon1.jpg";

export default function Tooltips({ content }: any) {
  return (
    <div className="float-left">
      {" "}
      <OverlayTrigger
        placement="right"
        delay={{ show: 100, hide: 1500 }}
        overlay={<Tooltip id="button-tooltip">{content}</Tooltip>}
      >
        {({ ref, ...triggerHandler }) => (
          <Button variant="none" {...triggerHandler}>
            <Image
              ref={ref}
              roundedCircle
              src={icon}
              style={{
                height: "25px",
                width: "25px",
              }}
            />
          </Button>
        )}
      </OverlayTrigger>
    </div>
  );
}
