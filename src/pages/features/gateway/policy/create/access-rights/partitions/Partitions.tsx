import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { setFormData } from "../../../../../../resources/policy/policy-constants";
import { useAppSelector, useAppDispatch } from "../../../../../../store/hooks";

export default function partitions() {
  const state = useAppSelector((RootState) => RootState.createPolicyState);
  const dispatch = useAppDispatch();

  function validateForm(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData(event, dispatch, state);
  }
  return (
    <div className="card col-lg-12 grid-margin stretch-card mt-3 p-3 border-4">
      <Row>
        <Row>
          <Col md="4">
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="accessrights"
                name="Partitions.per_api"
                label="Enforce access rights"
                checked={state.data.form.Partitions.per_api}
                onChange={(e: any) => validateForm(e)}
                // onChange={(e: any) => setRate(e.target.checked)}
              />

              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="usagequota"
                name="Partitions.quota"
                label="Enforce usage quota"
                checked={state.data.form.Partitions.quota}
                onChange={(e: any) => validateForm(e)}
                // onChange={(e: any) => setRate(e.target.checked)}
              />

              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Col>{" "}
          <Col md="4">
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="GlobalRate"
                name="Partitions.rate_limit"
                label="Enforce rate limit"
                checked={state.data.form.Partitions.rate_limit}
                onChange={(e: any) => validateForm(e)}
              />

              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Row>
    </div>
  );
}
