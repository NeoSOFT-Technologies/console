import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { getTables } from "../../../../store/features/saas/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import "./style.css";

export default function GetTables() {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector((state) => state.getTableState);

  const [modalState, setModalState] = useState<
    "modal-one" | "modal-two" | "close"
  >("close");

  const handleShowModalTwo = () => {
    setModalState("modal-two");
  };

  const handleShowModalTwoclose = () => setModalState("close");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <div className="createbody">
      <h4 className="pl-5 pt-5">Add Table</h4>
      <br></br>

      <Form onSubmit={getTableData} className="pl-5">
        <Row className="pr-5">
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
                Capacity
              </Form.Label>
              <Col sm lg="4">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1 createbody"
                  id="box"
                >
                  <option>Select Capacity Plan</option>
                  <option value="1">S1</option>
                  <option value="2">S2</option>
                  <option value="3">S3</option>
                </Form.Select>
              </Col>
              <Form.Label column="lg" lg={2} className="p-1 m-0">
                <i
                  className="bi bi-info-circle-fill"
                  onClick={handleShowModalTwo}
                ></i>
              </Form.Label>
            </Row>
            <br></br>
            <Modal
              show={modalState === "modal-two"}
              onHide={handleShowModalTwoclose}
              size="lg"
            >
              <Modal.Header>
                <Modal.Title className="text-center">Add Column</Modal.Title>
                <button
                  type="button"
                  className="close"
                  onClick={handleShowModalTwoclose}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Modal.Header>
              <Modal.Body>
                <Table bordered className="pt-2 createbody text-center">
                  <thead>
                    <tr id="test">
                      <th>Capacity</th>
                      <th>Name</th>
                      <th>Replicas</th>
                      <th>Shards</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ravi</td>
                      <td>Mark</td>
                      <td>true</td>
                      <td>false</td>
                    </tr>
                    <tr>
                      <td>SHubham</td>
                      <td>Mark</td>
                      <td>true</td>
                      <td>false</td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleShowModalTwoclose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Row>
              <Form.Label
                column="lg"
                lg={3}
                className="pl-5 text-center createbody"
              >
                columns List :
              </Form.Label>
              <Col sm lg="8" className="ml-2 mt-5 pl-1  table-responsive ">
                <Table bordered className="text-center">
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
      <Row className="mb-5  mt-3">
        <div className="col-md-3 text-center mr-5"></div>
        <div className="col-md-2 text-center mr-0 pr-0 mb-4 ">
          <Button
            variant="btn btn-primary"
            type="submit"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            onClick={handleShow}
          >
            Add Column
          </Button>
        </div>
        <br></br>
        <div className="col-md-2 text-center ml-0 pl-0">
          <Button
            variant="btn  btn-success"
            type="submit"
            className=" pl-4 pr-4"
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
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <br></br>
    </div>
  );
}
