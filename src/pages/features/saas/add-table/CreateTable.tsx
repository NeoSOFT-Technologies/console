import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Modal, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { createTable } from "../../../../store/features/saas/manage-table/create-table/slice";
import { capacityPlans } from "../../../../store/features/saas/manage-table/get-capacity-plans/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ICreateTable, ITableCreateData } from "../../../../types/saas";
import "./style.css";

export default function CreateTables() {
  const dispatch = useAppDispatch();
  const createTables = useAppSelector((state) => state.createTableState);
  const capacityData = useAppSelector((state) => state.capacityPlansState);
  // const capacityPlans = useAppSelector((state) => state.capacityPlansState);
  const [modalState, setModalState] = useState<
    "modal-one" | "modal-two" | "close"
  >("close");

  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("string");
  const [required, setRequireds] = useState(false);
  const [sortable, setSortable] = useState(false);
  const [filterable, setFilterable] = useState(false);
  const [multiValue, setMultiValue] = useState(false);
  const [storable, setStorable] = useState(false);
  const [partialSearch, setPartialSearch] = useState(false);
  const [tableName, setTableName] = useState("");
  const [sku, setSku] = useState("B");
  const [isSubmit, setIsSubmit] = useState(true);
  const [isEditColumn, setIsEditColumn] = useState(true);
  const [editColumnId, setEditColumnId] = useState("");
  const [columnsDataArray, setColumnsDataArray]: any = useState([]);

  const [columnformErrors, setColumnFormErrors] = useState({ name });
  const [formErrors, setFormErrors] = useState({ message: "" });
  const handleShowModalTwo = () => {
    setModalState("modal-two");
  };

  const handleShowModalTwoclose = () => setModalState("close");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toUppercase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // const validate = (values: string) => {
  //   const errors = { name: "" };
  //   const regex = /^[A-Za-z]+$/g;
  //   const whiteRegex = /^\S+(\s+\S+)*$/;

  //   // const regex = /^[\d\b]+$/;
  //   if (values === "") {
  //     console.log("inside validate name");
  //     errors.name = "Column Name is required!";
  //   } else if (!regex.test(values)) {
  //     console.log("else if length", values.length);
  //     errors.name = "column Name Should be alphabets Only ..!";
  //   } else if (!whiteRegex.test(values)) {
  //     console.log("else if length", values);
  //     errors.name = "Should Start with Alphabet";
  //   }

  //   console.log(" returnerror validate", errors);
  //   console.log(" validate values fun", values.length);
  //   return errors;
  // };

  // form submit event
  const handleAddColumnSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // const unique = new Date().getTime().toString;
    // creating an object

    const columnData = {
      id: Date.now().toString(),
      name,
      type,
      required,
      partialSearch,
      filterable,
      sortable,
      multiValue,
      storable,
    };
    console.log(" object with check is", isEditColumn);
    console.log(" object with id", columnData);
    const values = columnData.name;
    let errors = { name: "" };

    // column already Exist checking;
    function itemExists(itemName: any) {
      return columnsDataArray.some(function (el: { name: any }) {
        return el.name === itemName;
      });
    }

    // input checking either num or alphabet

    const startRegex = /^[\dA-Za-z]*$/g;
    const whiteRegex = /^((?!\s).)*$/gm;
    if (values === "") {
      console.log("inside validate name");
      errors.name = "Please Enter Column Name";
      setColumnFormErrors(errors);
    } else if (!whiteRegex.test(values)) {
      console.log("else if userid", values);
      errors.name = "white Space And Special symbol Not Allowed";
      setColumnFormErrors(errors);
    } else if (!startRegex.test(values)) {
      errors.name = "Column name must be aphabet or number";
    } else if (itemExists(columnData.name) && isEditColumn) {
      console.log("else if");
      errors = { name: "Column Name Already Exist" };
      setColumnFormErrors(errors);
    } else if (!itemExists(columnData.name) && isEditColumn) {
      console.log("true coldata isedit true", isEditColumn);
      setColumnsDataArray([...columnsDataArray, columnData]);
      setName("");
      setType("string");
      setRequireds(false);
      setFilterable(false);
      setMultiValue(false);
      setPartialSearch(false);
      setStorable(false);
      setSortable(false);
      errors.name = "";
      setColumnFormErrors(errors);
      setShow(false);
    } else if (!itemExists(columnData.name) && isEditColumn) {
      console.log("false itemexisst trueisedit", isEditColumn);
      setColumnsDataArray([...columnsDataArray, columnData]);
      setName("");
      setType("string");
      setRequireds(false);
      setFilterable(false);
      setMultiValue(false);
      setPartialSearch(false);
      setStorable(false);
      setSortable(false);
      errors.name = "";
      setColumnFormErrors(errors);
      setShow(false);
    } else if (!itemExists(columnData.name) && !isEditColumn) {
      console.log("inside add table condition check", isEditColumn);
      setColumnsDataArray(
        columnsDataArray.map((val: any) => {
          if (val.id === editColumnId) {
            return {
              ...val,
              ...columnData,
            };
          }
          return val;
        })
      );
      console.log("edit block enter resaet");
      setName("");
      setType("string");
      setRequireds(false);
      setFilterable(false);
      setMultiValue(false);
      setPartialSearch(false);
      setStorable(false);
      setSortable(false);
      errors.name = "";
      setColumnFormErrors(errors);
      setShow(false);
      setIsEditColumn(true);
    } else if (itemExists(columnData.name) && !isEditColumn) {
      console.log("inside add table condition check", isEditColumn);
      setColumnsDataArray(
        columnsDataArray.map((val: any) => {
          if (val.id === editColumnId) {
            return {
              ...val,
              ...columnData,
            };
          }
          return val;
        })
      );
      console.log("edit block enter resaet");
      setName("");
      setType("string");
      setRequireds(false);
      setFilterable(false);
      setMultiValue(false);
      setPartialSearch(false);
      setStorable(false);
      setSortable(false);
      errors.name = "";
      setColumnFormErrors(errors);
      setShow(false);
      setIsEditColumn(true);
    }
  };

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
    console.log("columns array", columnsDataArray);
    dispatch(capacityPlans());
    localStorage.setItem("columnsDataArray", JSON.stringify(columnsDataArray));
  }, [columnsDataArray]);

  useEffect(() => {
    if (formErrors.message.length === 0 && isSubmit === true) {
      console.log("use state");
    } else {
      ToastAlert("Please insert Correct Data", "error");
    }
  }, [createTables.data, createTables.error]);

  // useEffect(() => {
  //   console.log("before in use effect", columnformErrors.name);
  //   if (Object.keys(columnformErrors).length === 0) {
  //     console.log("use Effect", columnformErrors.name);
  //   }
  // }, [columnformErrors]);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
    }
  }, [formErrors]);

  // const [tenantId] = useState("");
  const createTableData: React.FormEventHandler<HTMLFormElement> = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    setFormErrors({ message: "" });
    console.log("param", name);

    if (isSubmit === false) {
      setUser("");
      setTableName("");
      setSku("B");
      setColumnsDataArray([]);
      setIsSubmit(true);
      setFormErrors({ message: "" });
      dispatch(createTable(params));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;
    // console.log("checking name", name);
    // console.log("checking name", value);
    console.log(event.target.value);
    setTableName(event.target.value);
    const inputValue = event.target.value;

    const startRegex = /^[\dA-Za-z]*$/g;
    const whiteRegex = /^((?!\s).)*$/gm;

    if (inputValue === "") {
      setFormErrors({ message: "Please fill Out this field" });
    } else if (!whiteRegex.test(inputValue)) {
      setIsSubmit(true);
      setFormErrors({
        message: "white Space And Special symbol Not Allowed",
      });
    } else if (!startRegex.test(inputValue)) {
      setIsSubmit(true);
      setFormErrors({ message: "Table name must be aphabet or number" });
    } else {
      setFormErrors({ message: "" });
      setIsSubmit(false);
    }
  };

  const deleteColumn = (ind: any) => {
    console.log("deletecolumn method id", ind);
    const updateColumn = columnsDataArray.filter((val: any) => {
      return ind !== val.id;
    });
    setColumnsDataArray(updateColumn);
  };
  const editColumn = (ind: any) => {
    setShow(true);
    const getEditObj = columnsDataArray.find((val: any) => {
      return val.id === ind;
    });
    setEditColumnId(getEditObj.id);
    console.log("edit column", getEditObj);
    setName(getEditObj.name);
    setType(getEditObj.type);
    setRequireds(getEditObj.required);
    setPartialSearch(getEditObj.partialSearch);
    setFilterable(getEditObj.filterable);
    setSortable(getEditObj.sortable);
    setMultiValue(getEditObj.multiValue);
    setStorable(getEditObj.storable);
    setIsEditColumn(false);
  };
  const getCapacityData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    console.log("table data", capacityData.data);
    dispatch(capacityPlans());
  };

  return (
    <div className="createbody ">
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
                    name="tableName"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <p>{formErrors.message}</p>
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
                  className="text-center"
                  onChange={(e) => setSku(e.target.value)}
                >
                  {capacityData.data?.map(
                    (
                      val: {
                        sku: any;
                      },
                      index: any
                    ) => (
                      <option key={`option${index}`} value={val.sku}>
                        {val.sku}
                      </option>
                    )
                  )}
                </Form.Select>
              </Col>
              <Form.Label column="lg" lg={2} className="p-1 m-0">
                <Form onClick={getCapacityData}>
                  <i
                    className="bi bi-info-circle-fill"
                    onClick={handleShowModalTwo}
                  ></i>
                  <Modal
                    show={modalState === "modal-two"}
                    onHide={handleShowModalTwoclose}
                    size="lg"
                  >
                    <Modal.Header>
                      <Modal.Title className="text-center">
                        <div className=" w-100 text-center">Capacity Plans</div>
                      </Modal.Title>
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
                      {" "}
                      {/* <Button
                    variant="btn  btn-success"
                    type="submit"
                    className=" pl-4 pr-4"
                  >
                    Save
                  </Button> */}
                      <Table bordered className="pt-2 createbody text-center">
                        <thead>
                          <tr id="test">
                            <th>Sku</th>
                            <th>Name</th>
                            <th>Replicas</th>
                            <th>Shards</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capacityData.data !== undefined && (
                            <>
                              {capacityData.data.map(
                                (
                                  val:
                                    | {
                                        sku:
                                          | string
                                          | number
                                          | boolean
                                          | React.ReactElement<
                                              any,
                                              | string
                                              | React.JSXElementConstructor<any>
                                            >
                                          | React.ReactFragment
                                          | React.ReactPortal
                                          | null
                                          | undefined;
                                        name:
                                          | string
                                          | number
                                          | boolean
                                          | React.ReactElement<
                                              any,
                                              | string
                                              | React.JSXElementConstructor<any>
                                            >
                                          | React.ReactFragment
                                          | React.ReactPortal
                                          | null
                                          | undefined;
                                        replicas:
                                          | string
                                          | number
                                          | boolean
                                          | React.ReactElement<
                                              any,
                                              | string
                                              | React.JSXElementConstructor<any>
                                            >
                                          | React.ReactFragment
                                          | React.ReactPortal
                                          | null
                                          | undefined;
                                        shards:
                                          | string
                                          | number
                                          | boolean
                                          | React.ReactElement<
                                              any,
                                              | string
                                              | React.JSXElementConstructor<any>
                                            >
                                          | React.ReactFragment
                                          | React.ReactPortal
                                          | null
                                          | undefined;
                                      }
                                    | null
                                    | undefined,
                                  index: React.Key | null | undefined
                                ) => (
                                  <tr key={`row${index}`}>
                                    {val !== null && val !== undefined && (
                                      <>
                                        <td key={index}>{val.sku}</td>
                                        <td key={index}>{val.name}</td>
                                        <td key={index}>{val.replicas}</td>
                                        <td key={index}>{val.shards}</td>
                                      </>
                                    )}
                                  </tr>
                                )
                              )}
                            </>
                          )}
                        </tbody>
                      </Table>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        onClick={handleShowModalTwoclose}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Form>
              </Form.Label>
            </Row>
            <br></br>

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
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {columnsDataArray.map(
                      (
                        val:
                          | {
                              id: any;
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
                          | undefined
                      ) => (
                        <tr key={val?.id}>
                          {val !== null && val !== undefined && (
                            <>
                              <td>{val.name}</td>
                              <td>{val.type}</td>
                              <td>{JSON.stringify(val.required)}</td>
                              <td>{JSON.stringify(val.partialSearch)}</td>
                              <td>{JSON.stringify(val.filterable)}</td>
                              <td>{JSON.stringify(val.sortable)}</td>
                              <td>{JSON.stringify(val.multiValue)}</td>
                              <td>{JSON.stringify(val.storable)}</td>
                              <td>
                                <i
                                  className="bi bi-pencil-square"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  onClick={() => editColumn(val.id)}
                                ></i>
                              </td>
                              <td>
                                <i
                                  className="bi bi-trash3-fill"
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter"
                                  onClick={() => deleteColumn(val.id)}
                                ></i>
                              </td>
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
              disabled={isSubmit}
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
                  <Form.Label className="ml-5 pt-2 ">Name</Form.Label>
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
                  <p>{columnformErrors.name}</p>
                </Col>
              </Row>

              <Row>
                <Col sm lg="4">
                  <Form.Label className="ml-5 pt-2 ">Type</Form.Label>
                </Col>

                <Col sm lg="7">
                  <Form.Select
                    aria-label="Default select example"
                    className="text-center pl-4"
                    id="dropdown-basic"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="string">string</option>
                    <option value="boolean">boolean</option>
                    <option value="long">long</option>
                    <option value="date">date</option>
                    <option value="int">int</option>
                    <option value="double">double</option>
                    <option value="text">text</option>
                    <option value="float">float</option>
                  </Form.Select>

                  {/* <select
                    name="languages"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="string">string</option>
                    <option value="boolean">boolean</option>
                    <option value="long" selected>
                      long
                    </option>
                    <option value="date">date</option>
                    <option value="int">int</option>
                    <option value="double">double</option>
                    <option value="text">text</option>
                    <option value="float">float</option>
                  </select> */}
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
                      {toUppercase(required.toString())}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100 mt-0 pt-0">
                      <Dropdown.Item
                        className="w-100 text-center"
                        value={required}
                        onClick={() => {
                          setRequireds(true);
                        }}
                      >
                        True
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100 text-center"
                        value={required}
                        onClick={() => {
                          setRequireds(false);
                        }}
                      >
                        False
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
                      {toUppercase(partialSearch.toString())}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100 mt-0 pt-0 text-center">
                      <Dropdown.Item
                        className="w-100"
                        value={partialSearch}
                        onClick={() => {
                          setPartialSearch(true);
                        }}
                      >
                        True
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100"
                        value={partialSearch}
                        onClick={() => {
                          setPartialSearch(false);
                        }}
                      >
                        False
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col sm lg="4">
                  <Form.Label className="ml-5 pt-2">Filterable</Form.Label>
                </Col>
                <Col sm lg="7">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="w-100 text-dark bg-white"
                    >
                      {toUppercase(filterable.toString())}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100 mt-0 pt-0 text-center">
                      <Dropdown.Item
                        className="w-100 text-center"
                        value={filterable}
                        onClick={() => {
                          setFilterable(true);
                        }}
                      >
                        True
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100 text-center"
                        value={filterable}
                        onClick={() => {
                          setFilterable(false);
                        }}
                      >
                        False
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
                      {toUppercase(sortable.toString())}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100 mt-0 pt-0 text-center">
                      <Dropdown.Item
                        className="w-100 text-center"
                        value={sortable}
                        onClick={() => {
                          setSortable(true);
                        }}
                      >
                        True
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100 text-center"
                        value={sortable}
                        onClick={() => {
                          setSortable(false);
                        }}
                      >
                        False
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
                      {toUppercase(multiValue.toString())}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100 mt-0 pt-0 text-center">
                      <Dropdown.Item
                        value={multiValue}
                        className="w-100 text-center"
                        onClick={() => {
                          setMultiValue(true);
                        }}
                      >
                        True
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="w-100 text-center"
                        value={multiValue}
                        onClick={() => {
                          setMultiValue(false);
                        }}
                      >
                        False
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
                      // id="dropdown-basic"
                      aria-label="Default select example"
                      className="w-100 text-dark bg-white"
                    >
                      {toUppercase(storable.toString())}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100 mt-0 pt-0 text-center dropdwn">
                      <Dropdown.Item
                        className="w-100  text-center"
                        value={storable}
                        onClick={() => {
                          setStorable(true);
                        }}
                      >
                        True
                      </Dropdown.Item>
                      <Dropdown.Item
                        aria-label="Default select example"
                        className="w-100  text-center"
                        value={storable}
                        onClick={() => {
                          setStorable(false);
                        }}
                      >
                        False
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
