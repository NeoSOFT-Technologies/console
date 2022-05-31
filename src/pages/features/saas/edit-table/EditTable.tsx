import React, { useEffect, useState } from "react";
import { Button, Col, InputGroup, Modal, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { getTableSchema } from "../../../../store/features/saas/manage-table/get-table-schema/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ITableColumnData, ITableSchema } from "../../../../types/saas";
import "./style.css";

type LocationState = { tableName: string; tenantId: string };
export default function GetTables() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { tableName, tenantId } = location.state as LocationState;

  const tableData = useAppSelector((state) => state.getTableSchemaState);
  console.log(tableData);

  const obj: ITableSchema = {
    tenantId,
    tableName,
  };
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [required, setRequired] = useState(Boolean);
  const [partialSearch, setPartialSearch] = useState(Boolean);
  const [filterable, setFilterable] = useState(Boolean);
  const [sortable, setSortable] = useState(Boolean);
  const [multiValue, setMultiValue] = useState(Boolean);
  const [storable, setStorable] = useState(Boolean);

  useEffect(() => {
    dispatch(getTableSchema(obj));
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (columData: ITableColumnData) => {
    setName(columData.name);
    setType(columData.type);
    setRequired(columData.required);
    setPartialSearch(columData.partialSearch);
    setFilterable(columData.filterable);
    setSortable(columData.sortable);
    setMultiValue(columData.multiValue);
    setStorable(columData.storable);

    setShow(true);
  };
  const obj2: ITableColumnData = {
    name,
    type,
    required,
    partialSearch,
    filterable,
    sortable,
    multiValue,
    storable,
  };

  return (
    <div className="createbody">
      <h4 className="pl-5 pt-5">Edit Table</h4>
      <br></br>

      <Form className="pl-5">
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
                <InputGroup
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1 createbody"
                  id="box"
                >
                  {tenantId}
                </InputGroup>
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
                <InputGroup
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1 createbody"
                  id="box"
                >
                  {tableName}
                </InputGroup>
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
                {tableData.data !== undefined &&
                tableData.data.columns.length > 0 ? (
                  <Table bordered className="text-center pr-0">
                    <thead>
                      <tr id="test">
                        <th>Name</th>
                        <th>Type</th>
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
                      {tableData.data.columns.map((val) => (
                        <>
                          <tr>
                            <td>{val.name}</td>
                            <td>{val.type}</td>
                            <td>{val.required.toString()}</td>
                            <td>{val.partialSearch.toString()}</td>
                            <td>{val.filterable.toString()}</td>
                            <td>{val.sortable.toString()}</td>
                            <td>{val.multiValue.toString()}</td>
                            <td>{val.storable.toString()} </td>
                            <td>
                              <i
                                className="bi bi-pencil-square "
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                onClick={() => handleShow(val)}
                              ></i>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h2>No Data</h2>
                )}
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

      <Modal show={show} data={obj2} onHide={handleClose} size="lg">
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
                    className="form-control text-center read-only"
                    placeholder="Name"
                    value={obj2.name}
                    aria-label="Name"
                    aria-describedby="basic-addon"
                  />
                </div>
              </Col>
            </Row>

            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">Type</Form.Label>
              </Col>

              <Col sm lg="7">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control text-center read-only"
                    value={obj2.type}
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
                  <option
                    className="text-center"
                    value={obj2.required.toString()}
                  >
                    {obj2.required.toString()}
                  </option>
                  <option
                    className="text-center"
                    value={(!obj2.required).toString()}
                  >
                    {(!obj2.required).toString()}
                  </option>
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
                  <option
                    className="text-center"
                    value={obj2.partialSearch.toString()}
                  >
                    {obj2.partialSearch.toString()}
                  </option>
                  <option
                    className="text-center"
                    value={(!obj2.partialSearch).toString()}
                  >
                    {(!obj2.partialSearch).toString()}
                  </option>
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
                  <option
                    className="text-center"
                    value={obj2.filterable.toString()}
                  >
                    {obj2.filterable.toString()}
                  </option>
                  <option
                    className="text-center"
                    value={(!obj2.filterable).toString()}
                  >
                    {(!obj2.filterable).toString()}
                  </option>
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
                  <option
                    className="text-center"
                    value={obj2.sortable.toString()}
                  >
                    {obj2.sortable.toString()}
                  </option>
                  <option
                    className="text-center"
                    value={(!obj2.sortable).toString()}
                  >
                    {(!obj2.sortable).toString()}
                  </option>
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
                  <option
                    className="text-center"
                    value={obj2.multiValue.toString()}
                  >
                    {obj2.multiValue.toString()}
                  </option>
                  <option
                    className="text-center"
                    value={(!obj2.multiValue).toString()}
                  >
                    {(!obj2.multiValue).toString()}
                  </option>
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
                  <option
                    className="text-center"
                    value={obj2.storable.toString()}
                  >
                    {obj2.storable.toString()}
                  </option>
                  <option
                    className="text-center"
                    value={(!obj2.storable).toString()}
                  >
                    {(!obj2.storable).toString()}
                  </option>
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
