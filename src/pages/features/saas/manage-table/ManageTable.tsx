import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dialog from "../../../../components/dialogbox/Dialog";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import "./style.css";

export default function ManageTables() {
  const dispatch = useAppDispatch();
  const allTableData = useAppSelector((state) => state.getTableState);
  // const [tenantId, setTenantId] = useState("");

  const [tenantId, setTenantId] = useState("1");
  const getTableData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // console.log(tenantId);
    dispatch(getTables(tenantId));
  };
  useEffect(() => {}, []);

  const [tables, setTables] = useState(allTableData);

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    // Update
    nameProduct: "",
  });
  const idProductRef = useRef();
  const handleDialog = (
    message: string,
    isLoading: boolean,
    nameProduct: string
  ) => {
    setDialog({
      message,
      isLoading,
      // Update
      nameProduct,
    });
  };

  const handleDelete = (tableName: any) => {
    // Update
    //  const index = data.findIndex((p) => p.id === id);

    handleDialog("Are you sure you want to delete?", true, tableName);
    idProductRef.current = tableName;
  };
  // const handleEdit = (id: any) => {
  //   const index = data.findIndex((p) => p.id === id);
  //   handleDialog("Are you sure you want to edit?", true, data[index].tableName);
  //   idProductRef.current = id;
  // };

  const areUSureDelete = (choose: boolean) => {
    if (choose) {
      setTables(tables.filter((p: any) => p !== idProductRef.current));
      handleDialog("", false, "");
    } else {
      handleDialog("", false, "");
    }
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
            <Button btn-primary>Get Tables</Button>
          </Col>
        </Row>
      </Form>
      <div className="text-nowrap bd-highlight m-4">
        <h5>Table Details</h5>
      </div>
      <>
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
                    <td>{"mangesh"}</td>
                    <td className="">
                      {val}
                      <span className="m-4">
                        <i className="bi bi-info-circle-fill"></i>
                      </span>
                    </td>
                    <td className="text-align-middle">
                      <i className="bi bi-pencil-square"></i>
                    </td>
                    <td
                      className="text-danger"
                      onClick={() => handleDelete(val)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {dialog.isLoading && (
              <Dialog onDialog={areUSureDelete} message={dialog.message} />
            )}
          </div>
        </div>
        <Button className="m-4">
          <Link to={"saas/manageTable/addTable"}> Add New</Link>
        </Button>
      </>
    </div>
  );
}
