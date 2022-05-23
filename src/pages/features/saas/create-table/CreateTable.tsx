import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Modal, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { createTable } from "../../../../store/features/saas/manage-table/create-table/slice";
// import { capacityPlans } from "../../../../store/features/saas/manage-table/get-capacity-plans/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  ICreateTable,
  ITableColumnData,
  ITableCreateData,
} from "../../../../types/saas";
import "./style.css";

export default function GetTables() {
  const dispatch = useAppDispatch();
  const createTables = useAppSelector((state) => state.createTableState);
  // const capacityPlans = useAppSelector((state) => state.capacityPlansState);
  const [modalState, setModalState] = useState<
    "modal-one" | "modal-two" | "close"
  >("close");

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [required, setRequireds] = useState(true || false);
  const [sortable, setSortable] = useState(true);
  const [filterable, setFilterable] = useState(true);
  const [multiValue, setMultiValue] = useState(true);
  const [storable, setStorable] = useState(true);
  const [partialSearch, setPartialSearch] = useState(true);
  const [tableName, setTableName] = useState("");
  const [sku, setSku] = useState("B");
  const handleShowModalTwo = () => {
    setModalState("modal-two");
  };

  const handleShowModalTwoclose = () => setModalState("close");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [columnsDataArray, setColumnsDataArray]: any = useState([]);

  // form submit event
  const handleAddColumnSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // creating an object
    const columnData: ITableColumnData = {
      name,
      type,
      required,
      partialSearch,
      filterable,
      sortable,
      multiValue,
      storable,
    };
    setColumnsDataArray([...columnsDataArray, columnData]);
    setName("");
    setType("");
  };

  // const initialState: ITableColumnData = {
  //   name,
  //   type,
  //   required,
  //   sortable,
  //   filterable,
  //   multiValue,
  //   storable,
  //   partialSearch,
  // };

  // let columns: { name: string, type: string, required: boolean, sortable:boolean, filterable:boolean, multiValue:boolean , storable:boolean , partialSearch:boolean }[] = [
  // const schColumns: ITableColumnData[] = [
  //   {
  //     name: "abc",
  //     type: "string",
  //     required: true,
  //     sortable: true,
  //     filterable: true,
  //     multiValue: false,
  //     storable: true,
  //     partialSearch: false,
  //   },
  //   {
  //     name: "xyz",
  //     type: "string",
  //     required: true,
  //     sortable: true,
  //     filterable: true,
  //     multiValue: false,
  //     storable: true,
  //     partialSearch: false,
  //   },
  //   {
  //     name: "qwe",
  //     type: "string",
  //     required: true,
  //     sortable: true,
  //     filterable: true,
  //     multiValue: false,
  //     storable: true,
  //     partialSearch: false,
  //   },
  // ];

  const params1: ITableCreateData = {
    tableName,
    sku,
    columns: columnsDataArray,
  };

  const params: ICreateTable = {
    tenantId: user,
    requestData: params1,
  };
  // saving data to local storage
  useEffect(() => {
    console.log("here is data", columnsDataArray);
    localStorage.setItem("columnsDataArray", JSON.stringify(columnsDataArray));
  }, [columnsDataArray]);

  useEffect(() => {
    console.log("params", params);
  }, [createTables.data, createTables.error]);

  // const [tenantId] = useState("");
  const createTableData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // console.log(tenantId);
    dispatch(createTable(params));
    if (createTables.data !== undefined) alert(createTables.data.message);
    else alert("Something went to Wrong");
  };

  return (
    <div className="createbody">
      <h4 className="pl-5 pt-5">Add Table</h4>
      <br></br>

      <Form onSubmit={createTableData} className="pl-5">
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
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="User"
                    className="text-center"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </Form.Group>
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
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Table Name"
                    className="text-center"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                  />
                </Form.Group>
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
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className="w-100 text-dark bg-white"
                  >
                    {sku.toString()}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item
                      className="w-100"
                      onClick={() => {
                        setSku("B");
                      }}
                    >
                      B
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="w-100"
                      onClick={() => {
                        setSku("S1");
                      }}
                    >
                      S1
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="w-100"
                      onClick={() => {
                        setSku("S2");
                      }}
                    >
                      S2
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
                      <th>Type</th>
                      <th>Required</th>
                      <th>Partial Search</th>
                      <th>Filterable</th>
                      <th>Sortable</th>
                      <th>Multivalue</th>
                      <th>Storable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {columnsDataArray.map(
                      (
                        val:
                          | {
                              name: any;
                              type: any;
                              required: any;
                              partialSearch: any;
                              filterable: any;
                              sortable: any;
                              multiValue: any;
                              storable: any;
                            }
                          | null
                          | undefined,
                        index: React.Key | null | undefined
                      ) => (
                        <tr key={`row${index}`}>
                          {val !== null && val !== undefined && (
                            <>
                              <td key={index}>{JSON.stringify(val.name)}</td>
                              <td>{JSON.stringify(val.type)}</td>
                              <td>{JSON.stringify(val.required)}</td>
                              <td>{JSON.stringify(val.partialSearch)}</td>
                              <td>{JSON.stringify(val.filterable)}</td>
                              <td>{JSON.stringify(val.sortable)}</td>
                              <td>{JSON.stringify(val.multiValue)}</td>
                              <td>{JSON.stringify(val.storable)}</td>
                            </>
                          )}
                        </tr>
                      )
                    )}
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
        <Row className="mb-5  mt-3">
          <div className="col-md-3 text-center mr-5"></div>
          <div className="col-md-2 text-center mr-0 pr-0 mb-4 ">
            <Button
              variant="btn btn-primary"
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
      </Form>

      <Modal show={show} onHide={handleClose} size="lg">
        <Form onSubmit={handleAddColumnSubmit}>
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      className="form-control text-center"
                      placeholder="type"
                      aria-label="Title"
                      aria-describedby="basic-addon"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
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
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="w-100 text-dark bg-white"
                    >
                      {required.toString()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setRequireds(true);
                        }}
                      >
                        true
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setRequireds(false);
                        }}
                      >
                        false
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col sm lg="4">
                  <Form.Label className="ml-5 p-0">Partial Search</Form.Label>
                </Col>
                <Col sm lg="7">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="w-100 text-dark bg-white"
                    >
                      {partialSearch.toString()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setPartialSearch(true);
                        }}
                      >
                        true
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setPartialSearch(false);
                        }}
                      >
                        false
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <br></br>

              <Row Row>
                <Col sm lg="4">
                  <Form.Label className="ml-5 pt-2">Filterable</Form.Label>
                </Col>
                <Col sm lg="7">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="w-100 text-dark bg-white"
                    >
                      {filterable.toString()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setFilterable(true);
                        }}
                      >
                        true
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setFilterable(false);
                        }}
                      >
                        false
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col sm lg="4">
                  <Form.Label className="ml-5 pt-2">Sortable</Form.Label>
                </Col>
                <Col sm lg="7">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="w-100 text-dark bg-white"
                    >
                      {sortable.toString()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setSortable(true);
                        }}
                      >
                        true
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setSortable(false);
                        }}
                      >
                        false
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col sm lg="4">
                  <Form.Label className="ml-5 pt-2">Multivalue</Form.Label>
                </Col>
                <Col sm lg="7">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="w-100 text-dark bg-white"
                    >
                      {multiValue.toString()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setMultiValue(true);
                        }}
                      >
                        true
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setMultiValue(false);
                        }}
                      >
                        false
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col sm lg="4">
                  <Form.Label className="ml-5 pt-2">Storable</Form.Label>
                </Col>
                <Col sm lg="7">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="w-100 text-dark bg-white"
                    >
                      {storable.toString()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setStorable(true);
                        }}
                      >
                        true
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100"
                        onClick={() => {
                          setStorable(false);
                        }}
                      >
                        false
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Add Column
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <br></br>
    </div>
  );
}
