import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import "./style.css";

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="createbody">
      <h4 className="pl-5 pt-5">Edit Table</h4>
      <br></br>

      <Form onSubmit={getTableData} className="pl-5">
        <Row>
          <Col>
            <Row>
              <Form.Label
                column="lg"
                lg={3}
                className="pl-5 text-center createbody"
              >
                User
              </Form.Label>

              <Col sm lg="4">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1 createbody"
                  id="box"
                >
                  <option>Select User</option>
                  <option value="1">S1</option>
                  <option value="2">S2</option>
                  <option value="3">S3</option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Form.Label
                column="lg"
                lg={3}
                className="pl-5 text-center createbody"
              >
                Table Name
              </Form.Label>
              <Col sm lg="4">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1 createbody"
                  id="box"
                >
                  <option>Select Table Name</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Form.Label
                column="lg"
                lg={3}
                className="pl-5 text-center createbody"
              >
                columns :
              </Form.Label>
              <Col sm lg="8" className="ml-2 mt-5 pl-1 pr-0 table-responsive ">
                <Table bordered className="text-center pr-0">
                  <thead>
                    <tr id="test">
                      <th>Name</th>
                      <th>Title</th>
                      <th>Required</th>
                      <th>Partial Search</th>
                      <th>Filterable</th>
                      <th>Sortable</th>
                      <th>Multivalue</th>
                      <th>Storable</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ravi</td>
                      <td>Product</td>
                      <td>true</td>
                      <td>false</td>
                      <td>true </td>
                      <td>false</td>
                      <td>true</td>
                      <td>true </td>
                      <td>
                        <i
                          className="bi bi-pencil-square "
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          onClick={handleShow}
                        ></i>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>Sam</td>
                      <td>Price</td>
                      <td>true</td>
                      <td>false</td>
                      <td>true </td>
                      <td>false</td>
                      <td>true</td>
                      <td>true </td>
                      <td>
                        <i
                          className="bi bi-pencil-square"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          onClick={handleShow}
                        ></i>{" "}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <br />
          </Col>

          <br></br>
          <br></br>
          <br></br>
        </Row>
      </Form>
      <Row className="mb-5">
        <div className=" text-center ml-0 pl-0 col-md-12  text-right pr-5 mt-5">
          <Button
            variant="btn btn-success"
            type="submit"
            className="float-center pr-5 pl-5"
          >
            Save
          </Button>
        </div>
      </Row>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title className="text-center">Add Column</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={handleClose}
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">Name</Form.Label>
              </Col>

              <Col sm lg="7">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Name"
                    aria-label="Name"
                    aria-describedby="basic-addon"
                  />
                </div>
              </Col>
            </Row>

            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">Title</Form.Label>
              </Col>

              <Col sm lg="7">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon"
                  />
                </div>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">Required</Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
                >
                  <option className="text-center">Select</option>
                  <option value="1">S1</option>
                  <option value="2">S2</option>
                  <option value="3">S3</option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 p-0">Partial Search</Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
                >
                  <option className="text-center"> Select</option>
                  <option value="1">S1</option>
                  <option value="2">S2</option>
                  <option value="3">S3</option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">Filterable</Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
                >
                  <option className="text-center">Select</option>
                  <option value="1">S1</option>
                  <option value="2">S2</option>
                  <option value="3">S3</option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">Sortable</Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
                >
                  <option className="text-center">Select</option>
                  <option value="1">S1</option>
                  <option value="2">S2</option>
                  <option value="3">S3</option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">Multivalue</Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
                >
                  <option className="text-center">Select</option>
                  <option value="1">S1</option>
                  <option value="2">S2</option>
                  <option value="3">S3</option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>

            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">Storable</Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
                >
                  <option className="text-center"> select</option>
                  <option value="1">S1</option>
                  <option value="2">S2</option>
                  <option value="3">S3</option>
                </Form.Select>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      <br></br>
    </div>
  );
}
