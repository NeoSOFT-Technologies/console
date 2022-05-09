import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { getTables } from "../../../../store/features/saas/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

export default function GetTables() {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.getTableState);

  const [tenantId] = useState("");
  const getTableData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // console.log(tenantId);
    dispatch(getTables(tenantId));
  };
  useEffect(() => {
    // console.log(tableData);
  }, [tableData.data, tableData.error]);

  return (
    <div className=" bg-white">
      <h3 className="font-weight-normal text-justify text-center">
        Insert Data
      </h3>
      <Form onSubmit={getTableData}>
        <Row className="justify-content-center">
          <Col md={6} className="justify-content-center">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User :</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="w-100 pr-3 pt-1 pb-1"
              >
                <option>Select User</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Table Name :</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="w-100 pr-3 pt-1 pb-1"
              >
                <option>Select Table</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <div className="ml-4">
                <Form.Check />
              </div>
              <div className=" ml-4 mr-3">
                <label className="pl-2">NRT</label>
              </div>
            </Form.Group>
            <Form.Group controlId="jsonInput">
              <Form.Label className="mb-2">Data</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="JSON input"
                className=""
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3 ml-5" controlId="formBasicEmail">
              <Button
                className="w-50 ml-5"
                variant="primary"
                type="submit"
                id="save"
              >
                Save
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {tableData.data !== undefined && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Table Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.data.map((val, index) => (
              <tr key={`row${index}`}>
                <td>{index + 1}</td>
                <td>{val}</td>
                <td>
                  <i className="bi bi-gear-fill"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
