import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function AuthenticationToken() {
  return (
    <div>
      <Row>
        <Col md="12">
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Strip Authorization Data" />
          </Form.Group>
        </Col>
      </Row>
      <div>
        <Row>
          <Col md="8" className="border rounded ml-3 pb-2">
            <br />
            <Form.Group className="mb-3 ">
              <h6>Authentication Token</h6>
              <Form.Label> Auth key Header Name</Form.Label>
              <br />
              {/* <Form.Control
                className="mt-2"
                type="text"
                id="Auth"
                value="Authorization"
                name="Auth"
              /> */}
              <Form.Label className="form-control"> Authorization</Form.Label>
            </Form.Group>
          </Col>
          <Col
            sm="3"
            className="border bg-info bg-opacity-10 rounded ml-4 pb-0"
          >
            <Form.Group className="mt-2  ">
              <small>
                Token mode is the simplest integration method and only requires
                the API consumer to include a header using the key defined below
                (default HTTP standard is Authorization).
              </small>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
}
