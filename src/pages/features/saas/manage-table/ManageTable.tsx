import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteTable } from "../../../../store/features/saas/manage-table/delete-table/slice";

import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ITableSchema } from "../../../../types/saas";
import "./style.css";

export default function ManageTables() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tenantId, setTenantId] = useState("1");
  const allTableData = useAppSelector((state) => state.getTableState);
  // const [tenantId, setTenantId] = useState("");
  const [show, setShow] = useState(false);
  const [table, settable] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (tableName: string, tenantID: string) => {
    settable(tableName);
    setTenantId(tenantID);
    setShow(true);
  };
  const [showEdit, setShowEdit] = useState(false);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (tableName: string, tenantID: string) => {
    settable(tableName);
    setTenantId(tenantID);
    setShowEdit(true);
  };
  const getTableData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // console.log(tenantId);
    dispatch(getTables(tenantId));
  };
  useEffect(() => {}, [allTableData.data, allTableData.loading]);
  const deleteTables = (obj: ITableSchema) => {
    dispatch(deleteTable(obj));
    handleClose();
  };
  return (
    <div className="createbody">
      <Form onSubmit={getTableData} className="mt-5">
        <Row>
          <Col md={8} className="mt-5 ml-2">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Tenant Id"
                value={tenantId}
                onChange={(e) => setTenantId(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="mt-5">
            <Button btn-primary type="submit">
              Get Tables
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="text-nowrap bd-highlight m-4">
        <h5>Table Details</h5>
      </div>
      <div className="card m-4">
        <div className="card-body table-responsive">
          <Table bordered className="text-center">
            <thead>
              <tr id="test">
                <th>SR.NO.</th>
                <th>User</th>
                <th>Table Name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allTableData.data?.map((val, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{tenantId}</td>
                  <td className="">
                    {val}
                    <span className="m-4">
                      <i className="bi bi-info-circle-fill"></i>
                    </span>
                  </td>
                  <td
                    className="text-align-middle"
                    onClick={() => handleEditShow(val, tenantId)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </td>
                  <td
                    className="text-danger"
                    onClick={() => handleShow(val, tenantId)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Button onClick={() => navigate("/saas/addTable")} className="m-4">
        Add New
      </Button>
      <Modal
        show={show}
        data={table}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{table}</b> table?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteTables({ tenantId, tableName: table })}
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEdit}
        data={table}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to edit <b>{table}</b> table?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button variant="primary">Yes,Edit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
