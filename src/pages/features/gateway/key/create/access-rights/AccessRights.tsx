import React, { useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import ApplyPolicy from "./apply-policy/ApplyPolicy";
import ChooseApi from "./choose-api/ChooseApi";
export default function AccessRights() {
  const [SelectedTabIndex, setTabIndex] = useState("applyPolicy");
  const [ClickedTabIndex, setClickedTabIndex] = useState("");

  const [show, setShow] = useState(false);

  const handleCancel = () => {
    if (ClickedTabIndex === "applyPolicy") {
      setTabIndex("chooseApi");
    } else {
      setTabIndex("applyPolicy");
    }
    setShow(false);
  };

  function handleOnTabSelect(key: string) {
    if (SelectedTabIndex !== key) {
      setShow(true);
      setClickedTabIndex(key);
    }
  }
  const handleOk = () => {
    setShow(false);
    setTabIndex(ClickedTabIndex);
  };
  return (
    <>
      <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to switch!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="align-items-center">
          <div>
            {/* className="pt-2"   style={{ padding: "1rem 0rem" }} */}
            <Tabs
              // style={{ padding: "1rem 0rem" }}
              activeKey={SelectedTabIndex}
              id="uncontrolled-tab"
              // transition={false}
              onSelect={(key) => handleOnTabSelect(key!)}
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
    </>
  );
}
