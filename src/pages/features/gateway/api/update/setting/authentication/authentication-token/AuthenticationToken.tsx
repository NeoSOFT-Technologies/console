import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function AuthenticationToken() {
  return (
    <div>
      <div className="ml-3 mr-3">
        <Row>
          <Col
            md={12}
            className="border bg-info bg-opacity-10 rounded mb-3  p-2"
          >
            <Form.Group>
              Token mode is the simplest integration method and only requires
              the API consumer to include a header using the key defined below
              (default HTTP standard is Authorization).
            </Form.Group>
          </Col>
          <Col md={12} className="border rounded pb-2">
            <br />
            <Form.Group className="mb-3 ">
              <h6>Authentication Token</h6>
              <Form.Label> Auth key Header Name</Form.Label>
              <br />
              <Form.Label className="form-control"> Authorization</Form.Label>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
}
