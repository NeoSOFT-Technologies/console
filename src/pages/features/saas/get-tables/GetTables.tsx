import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

export default function GetTables() {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.getTableState);

  const [tenantId, setTenantId] = useState("1");
  const getTableData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // console.log(tenantId);
    dispatch(getTables(tenantId));
  };
  useEffect(() => {
    console.log("tableData = " + JSON.stringify(tableData));
    console.log("tableData.error = " + JSON.stringify(tableData.error));
    if (!tableData.loading && tableData.error) {
      ToastAlert(tableData.error as string, "error");
    }
  }, [tableData.data, tableData.error]);

  return (
    <div>
      <Form onSubmit={getTableData}>
        <Row>
          <Col md={10}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Tenant Id"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button
              variant="primary"
              type="submit"
              data-testid="get-tables-btn"
            >
              Get Tables
            </Button>
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
                <td data-testid="table-data">{val}</td>
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
