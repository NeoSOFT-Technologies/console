import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  ColNameErrMsg,
  multivaledDataTypes,
  regexForColName,
  singleValedDataTypes,
  tableHeadings,
  TableNameErrMsg,
} from "../../../../resources/saas/constant";
import { RootState } from "../../../../store";
import { getTenantDetails } from "../../../../store/features/saas/input-data/slice";
import { createTable } from "../../../../store/features/saas/manage-table/create-table/slice";
import { capacityPlans } from "../../../../store/features/saas/manage-table/get-capacity-plans/slice";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  ICreateTable,
  IErrorColumnInput,
  ITableColumnData,
} from "../../../../types/saas";
import "./style.css";

export default function CreateTables() {
  const dispatch = useAppDispatch();
  const createtablestate = useAppSelector((state) => state.createTableState);
  const capacityData = useAppSelector((state) => state.capacityPlansState);
  const tenantDetails = useAppSelector((state) => state.getTenantDetailState);
  const addColumn = "Add Column";
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableConfirmationModal, setTableConfirmationModal] = useState(false);
  const [capacityModal, setCapacityModal] = useState(false);
  const [selectedColHeading, setSelectedColHeading] = useState<string>("");
  const [selectedColAction, setSelectedColAction] = useState<string>("");
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [isSortableDisable, setIsSortableDisable] = useState<boolean>(true);
  const [isTypeDisable, setIsTypeDisable] = useState<boolean>(true);
  const [showDataTypes, setShowDataTypes] = useState<string[]>([]);
  const tenantDetail = useAppSelector((state) => state.userData);
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );

  const [finalTableObj, setFinalTableObj] = useState<ICreateTable>({
    tenantId: "",
    tenantName: "Select tenant",
    requestData: {
      tableName: "",
      sku: "B",
      columns: [],
    },
  });
  const [error, setError] = useState<IErrorColumnInput>({
    name: "",
    tableName: "",
  });
  const [selectedColumnData, setSelectedColumnData] =
    useState<ITableColumnData>({
      name: "",
      type: "",
      required: false,
      partialSearch: false,
      filterable: false,
      sortable: false,
      multiValue: false,
      storable: false,
    });
  const handleClose = () => {
    setError({
      name: "",
    });
    setShow(false);
  };
  const deleteModalClose = () => {
    setDeleteModal(false);
  };
  const tableConfirmationModalClose = () => {
    setTableConfirmationModal(false);
  };
  const tableConfirmationModalShow = () => {
    setTableConfirmationModal(true);
  };
  const deleteModalShow = (columData: ITableColumnData) => {
    if (columData.name.toLowerCase() === "id") {
      ToastAlert("Column not allowed to delete", "warning");
    } else {
      setSelectedColumnData(columData);
      setDeleteModal(true);
    }
  };

  const capacityModalClose = () => {
    setCapacityModal(false);
  };
  const capacityModalShow = () => {
    setCapacityModal(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "tableName":
        setError({
          ...error,
          [name]: regexForColName.test(value) ? "" : TableNameErrMsg,
        });
        setFinalTableObj({
          ...finalTableObj,
          requestData: { ...finalTableObj.requestData, tableName: value },
        });
        break;
      case "name":
        setError({
          ...error,
          [name]: regexForColName.test(value) ? "" : ColNameErrMsg,
        });
        setSelectedColumnData({
          ...selectedColumnData,
          name: event.target.value,
        });
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "tenantName":
        setFinalTableObj({
          ...finalTableObj,
          tenantId: value.split("/")[0],
          tenantName: value.split("/")[1],
        });
        break;
      case "capacityPlan":
        setFinalTableObj({
          ...finalTableObj,
          requestData: { ...finalTableObj.requestData, sku: value },
        });
        break;
      default:
        break;
    }
  };
  const multivalueOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumnData((previous) => {
      return { ...previous, multiValue: JSON.parse(event.target.value) };
    });
    setSelectedColumnData((previous) => {
      return { ...previous, type: "" };
    });

    if (JSON.parse(event.target.value)) {
      setSelectedColumnData((previous) => {
        return { ...previous, sortable: false };
      });
      setIsSortableDisable(true);
      setShowDataTypes(multivaledDataTypes);
      setSelectedColumnData((previous) => {
        return { ...previous, type: "strings" };
      });
      if (selectedColumnData.partialSearch) {
        setSelectedColumnData((previous) => {
          return { ...previous, type: "strings" };
        });
        setIsTypeDisable(true);
      } else {
        setIsTypeDisable(false);
      }
    } else {
      setIsSortableDisable(false);
      setShowDataTypes(singleValedDataTypes);
      setSelectedColumnData((previous) => {
        return { ...previous, type: "string" };
      });
    }
  };

  const partialSearchOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedColumnData((previous) => {
      return { ...previous, partialSearch: JSON.parse(event.target.value) };
    });
    if (JSON.parse(event.target.value)) {
      setIsTypeDisable(true);
      if (selectedColumnData.multiValue) {
        setSelectedColumnData((previous) => {
          return { ...previous, type: "strings" };
        });
      } else {
        setSelectedColumnData((previous) => {
          return { ...previous, type: "string" };
        });
      }
    } else {
      setIsTypeDisable(false);
    }
  };
  const processColCondition = () => {
    const objIndex: number | any = finalTableObj.requestData.columns.findIndex(
      (item: ITableColumnData) =>
        item.name.toLowerCase() === selectedColumnData.name.toLowerCase()
    );
    if (selectedColHeading === addColumn) {
      if (objIndex > -1) {
        ToastAlert("Column already exists", "warning");
      } else {
        const newColList: ITableColumnData[] =
          finalTableObj.requestData.columns;
        newColList.push(selectedColumnData);
        setFinalTableObj({
          ...finalTableObj,
          requestData: {
            ...finalTableObj.requestData,
            columns: newColList,
          },
        });
        setShow(false);
      }
    } else {
      if (objIndex > -1) {
        const newColList: ITableColumnData[] =
          finalTableObj.requestData.columns;
        newColList[objIndex] = selectedColumnData;
        setFinalTableObj({
          ...finalTableObj,
          requestData: {
            ...finalTableObj.requestData,
            columns: newColList,
          },
        });
        setShow(false);
      } else {
        ToastAlert("Column already exists", "warning");
      }
    }
  };
  const processColumn = () => {
    if (error.name === "") {
      if (selectedColumnData.name !== "" && selectedColumnData.type !== "") {
        processColCondition();
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    }
  };
  const handleShowCondition = (columData: ITableColumnData) => {
    if (columData.multiValue) {
      setShowDataTypes(multivaledDataTypes);
      setIsSortableDisable(true);
      columData.partialSearch
        ? setIsTypeDisable(true)
        : setIsTypeDisable(false);
    } else {
      setShowDataTypes(singleValedDataTypes);
      setIsSortableDisable(false);
      columData.partialSearch
        ? setIsTypeDisable(true)
        : setIsTypeDisable(false);
    }
  };

  const handleShow = (
    columData: ITableColumnData,
    selectedColumnHeading: string
  ) => {
    setSelectedColHeading(selectedColumnHeading);
    if (selectedColumnHeading === addColumn) {
      setIsSortableDisable(false);
      setIsTypeDisable(false);
      setShowDataTypes(singleValedDataTypes);
      setSelectedColumnData({
        name: "",
        type: "string",
        required: false,
        partialSearch: false,
        filterable: true,
        sortable: false,
        multiValue: false,
        storable: true,
      });
      setSelectedColAction(addColumn);
      setShow(true);
    } else {
      if (columData.name.toLowerCase() === "id") {
        ToastAlert("Column not allowed to edit", "warning");
      } else {
        setSelectedColumnData(columData);
        setSelectedColAction("Save Changes");
        handleShowCondition(columData);
        setShow(true);
      }
    }
  };
  const getDataTypeOptions = (val: string, index: number) => {
    return (
      <option className="text-center" key={index} value={val}>
        {val.toString().charAt(0).toUpperCase() + val.toString().slice(1)}
      </option>
    );
  };
  const addTable: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (error.tableName === "" && finalTableObj.requestData.tableName !== "") {
      if (finalTableObj.requestData.columns.length === 0) {
        ToastAlert("Provide atleast one column", "warning");
      } else {
        tableConfirmationModalShow();
      }
    } else {
      ToastAlert("Provide valid inputs", "warning");
    }
  };

  const removeColumn = () => {
    finalTableObj.requestData.columns =
      finalTableObj.requestData.columns.filter((obj) => {
        return obj.name.toLowerCase() !== selectedColumnData.name.toLowerCase();
      });
    deleteModalClose();
  };

  const saveTable = () => {
    setShowSuccessMsg(true);
    dispatch(createTable(finalTableObj));
    setTableConfirmationModal(false);
  };

  useEffect(() => {
    if (!finalTableObj.tenantId) {
      if (authenticationState.data === "admin") {
        dispatch(getTenantDetails());
      }
    } else {
      dispatch(getTables(finalTableObj.tenantId));
    }
  }, [finalTableObj.tenantId]);

  useEffect(() => {
    dispatch(capacityPlans());
    if (!capacityData.loading && capacityData.error) {
      ToastAlert("something went wrong", "error");
    }
    if (tenantDetail.data?.tenantId) {
      setFinalTableObj({
        ...finalTableObj,
        tenantId: tenantDetail.data?.tenantId.toString(),
      });
    } else {
      dispatch(getTenantDetails());
    }
  }, []);

  useEffect(() => {
    if (
      !createtablestate.loading &&
      !createtablestate.error &&
      createtablestate?.data &&
      showSuccessMsg
    ) {
      ToastAlert("Table created successfully", "success");
      setFinalTableObj({
        tenantId: "",
        tenantName: "Select tenant",
        requestData: { tableName: "", sku: "B", columns: [] },
      });
    }
    if (!createtablestate.loading && createtablestate.error) {
      ToastAlert(createtablestate.error.message, "error");
    }
  }, [createtablestate.loading, createtablestate.error]);
  return (
    <div className="createbody pb-5">
      <h3 className="pl-5 pt-5 text-center">Add Table</h3>
      <br></br>
      {createtablestate.loading ? <Spinner></Spinner> : <div></div>}
      <Form onSubmit={addTable} className="pl-5">
        <Row className="pr-5">
          <Col>
            <Row>
              <Col sm lg="6">
                <Form.Group className="mb-3">
                  <Form.Label className="text-left createbody mb-2">
                    User
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="text-center"
                    name="tenantName"
                    data-testid="tenant-name-select"
                    onChange={handleSelectChange}
                    required
                    value={finalTableObj.tenantId}
                  >
                    {authenticationState.data === "tenant" ? (
                      <option value={tenantDetail.data?.tenantId}>
                        {tenantDetail.data?.tenantName}
                      </option>
                    ) : (
                      <>
                        <option value={finalTableObj.tenantId}>
                          {finalTableObj.tenantName}
                        </option>
                        {tenantDetails.data?.map((val, index) => (
                          <option
                            key={`option${index}`}
                            value={val.id + "/" + val.tenantName}
                          >
                            {val.tenantName}
                          </option>
                        ))}
                      </>
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col sm lg="6">
                <Form.Group>
                  <Form.Label className=" createbody mb-2">
                    Table Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Table Name"
                    className="text-center"
                    value={finalTableObj.requestData.tableName}
                    name="tableName"
                    onChange={handleInputChange}
                    required
                    data-testid="table-name-input-box"
                    isInvalid={!!error.tableName}
                    isValid={
                      !error.tableName && !!finalTableObj.requestData.tableName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.tableName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="6">
                <Form.Group>
                  <Form.Label className=" createbody mb-2">
                    Capacity Plans
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="text-center"
                    onChange={handleSelectChange}
                    data-testid="capacity-plan-dropdown"
                    name="capacityPlan"
                    value={finalTableObj.requestData.sku}
                    required
                  >
                    {capacityData.data?.map((val: { sku: any }, index: any) => (
                      <option key={`option${index}`} value={val.sku}>
                        {val.sku}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Form.Label column="lg" lg={2} className="p-1 pt-3 mt-3">
                <i
                  className="bi bi-info-circle-fill"
                  onClick={capacityModalShow}
                  data-testid="capacity-plan-info-btn"
                ></i>
              </Form.Label>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="12" className="  table-responsive ">
                <Form.Label className=" createbody mb-2">Columns :</Form.Label>

                <Table bordered className="text-center">
                  <thead>
                    <tr id="test">
                      {tableHeadings.map((val, index) => (
                        <th key={`row${index}`}>
                          <b>{val.toLowerCase() === "view" ? "Edit" : val}</b>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {finalTableObj.requestData.columns !== undefined &&
                  finalTableObj.requestData.columns.length > 0 ? (
                    <tbody>
                      {finalTableObj.requestData.columns.map((val, index) => (
                        <tr key={`row${index}`}>
                          <td>{val.name}</td>
                          <td>{val.multiValue.toString()}</td>
                          <td>{val.partialSearch.toString()}</td>
                          <td>{val.type}</td>
                          <td>{val.sortable.toString()}</td>
                          <td>{val.required.toString()}</td>
                          <td>{val.filterable.toString()}</td>
                          <td>{val.storable.toString()} </td>
                          <td className="text-align-middle  text-primary">
                            <i
                              className="bi bi-pencil-square"
                              data-toggle="modal"
                              data-testid="edit-col-btn"
                              onClick={() => handleShow(val, "Edit Column")}
                            ></i>
                          </td>
                          <td className="text-danger">
                            <i
                              className="bi bi-trash-fill"
                              data-testid="delete-col-btn"
                              onClick={() => deleteModalShow(val)}
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <></>
                  )}
                </Table>
              </Col>
            </Row>
          </Col>
          <br></br>
        </Row>
        <Row className="mb-5  mt-3">
          <div className="col-md-3 text-center mr-5"></div>
          <div className="col-md-2 text-center mr-0 pr-0 mb-4 ">
            <Button
              variant="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              data-testid="add-column-button"
              disabled={createtablestate.loading}
              onClick={() => handleShow(selectedColumnData, addColumn)}
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
              disabled={createtablestate.loading}
              data-testid="save-table-button"
            >
              Save
            </Button>
          </div>
        </Row>
      </Form>
      <Modal
        show={show}
        data={selectedColumnData}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="text-center">
            {selectedColHeading}
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={handleClose}
            aria-label="Close"
            data-testid="close-modal-btn"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">
                  <b>Name</b>
                </Form.Label>
              </Col>

              <Col sm lg="7">
                <div className="input-group ">
                  <Form.Control
                    type="text"
                    className="form-control text-center read-only"
                    placeholder="Name"
                    name="name"
                    value={selectedColumnData.name}
                    aria-label="Name"
                    aria-describedby="basic-addon"
                    data-testid="column-name-popup"
                    isInvalid={!!error.name}
                    isValid={!error.name && !!selectedColumnData.name}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.name}
                  </Form.Control.Feedback>
                </div>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">
                  <b>Multivalue</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  value={JSON.stringify(selectedColumnData.multiValue)}
                  onChange={(e) => multivalueOnChange(e)}
                >
                  <option className="text-center" value="true">
                    True
                  </option>
                  <option className="text-center" value="false">
                    False
                  </option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 p-0">
                  <b>Partial Search</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  value={selectedColumnData.partialSearch.toString()}
                  onChange={partialSearchOnChange}
                >
                  <option className="text-center" value="true">
                    True
                  </option>
                  <option className="text-center" value="false">
                    False
                  </option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">
                  <b>Type</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  value={selectedColumnData.type.toString()}
                  disabled={isTypeDisable}
                  onChange={(e) => {
                    setSelectedColumnData({
                      ...selectedColumnData,
                      type: e.target.value,
                    });
                  }}
                >
                  {showDataTypes.map((val, index) =>
                    getDataTypeOptions(val, index)
                  )}
                </Form.Select>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">
                  <b>Sortable</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  // id="box"
                  value={selectedColumnData.sortable.toString()}
                  disabled={isSortableDisable}
                  onChange={(e) => {
                    setSelectedColumnData({
                      ...selectedColumnData,
                      sortable: JSON.parse(e.target.value),
                    });
                  }}
                >
                  <option className="text-center" value="true">
                    True
                  </option>
                  <option className="text-center" value="false">
                    False
                  </option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">
                  <b>Required</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  // id="box"
                  value={selectedColumnData.required.toString()}
                  onChange={(e) => {
                    setSelectedColumnData({
                      ...selectedColumnData,
                      required: JSON.parse(e.target.value),
                    });
                  }}
                >
                  <option className="text-center" value="true">
                    True
                  </option>
                  <option className="text-center" value="false">
                    False
                  </option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">
                  <b className="mr-5">Filterable</b>
                  <i
                    className="bi bi-info-circle-fill"
                    data-testid="capacity-plan-info-btn"
                    title="If true, the value of the field can be used in queries to retrieve
                    matching documents"
                  ></i>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  // id="box"
                  value={selectedColumnData.filterable.toString()}
                  onChange={(e) => {
                    setSelectedColumnData({
                      ...selectedColumnData,
                      filterable: JSON.parse(e.target.value),
                    });
                  }}
                >
                  <option className="text-center" value="true">
                    True
                  </option>
                  <option className="text-center" value="false">
                    False
                  </option>
                </Form.Select>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="4">
                <Form.Label className="ml-5 pt-2">
                  <b className="mr-5">Storable</b>
                  <i
                    className="bi bi-info-circle-fill"
                    data-testid="capacity-plan-info-btn"
                    title="If true, the actual value of the field can be retrieved by queries."
                  ></i>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  value={selectedColumnData.storable.toString()}
                  onChange={(e) => {
                    setSelectedColumnData({
                      ...selectedColumnData,
                      storable: JSON.parse(e.target.value),
                    });
                  }}
                >
                  <option className="text-center" value="true">
                    True
                  </option>
                  <option className="text-center" value="false">
                    False
                  </option>
                </Form.Select>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer className="save-column-changes-button">
          <Button
            className="text-center"
            variant="success"
            data-testid="add-column-btn-popup"
            onClick={processColumn}
          >
            {selectedColAction}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={deleteModal}
        data={selectedColumnData}
        onHide={deleteModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{selectedColumnData.name}</b>{" "}
          column?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={deleteModalClose}>
            No, Cancel
          </Button>
          <Button variant="danger" onClick={() => removeColumn()}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={tableConfirmationModal}
        data={finalTableObj}
        onHide={tableConfirmationModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Table Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Note:</b> The Following Column Properties Could Not Be Changed in
          Future , in order to change please contact admin <br></br>
          <br></br>
          <b>Are You Sure You Want to Create Table ?</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={tableConfirmationModalClose}>
            No, Cancel
          </Button>
          <Button variant="danger" onClick={() => saveTable()}>
            Yes, Create
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Modal show={filerableModal}>
        <Modal.Body>
          <h5>
            If true, the value of the field can be used in queries to retrieve
            matching documents
          </h5>
        </Modal.Body>
      </Modal> */}
      <Modal show={capacityModal} onHide={capacityModalClose} size="lg">
        <Modal.Header>
          <Modal.Title className="text-center">
            <div className=" w-100 text-center">Capacity Plans</div>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={capacityModalClose}
            aria-label="Close"
            data-testid="capacity-plan-info-close-btn"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Table bordered className="pt-2 createbody text-center">
            <thead>
              <tr>
                <th>Sku</th>
                <th>Name</th>
                <th>Replicas</th>
                <th>Shards</th>
              </tr>
            </thead>
            <tbody>
              {capacityData.data?.map((val, index) => (
                <tr key={`row${index}`}>
                  <td key={index}>{val.sku}</td>
                  <td key={index}>{val.name}</td>
                  <td key={index}>{val.replicas}</td>
                  <td key={index}>{val.shards}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={capacityModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <br></br>
    </div>
  );
}
