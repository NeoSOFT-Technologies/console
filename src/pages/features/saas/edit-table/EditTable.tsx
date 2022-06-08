import React, { useEffect, useState } from "react";
import { Button, Col, InputGroup, Modal, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  deleteColumn,
  getTableSchema,
  addOrEditColumn,
} from "../../../../store/features/saas/manage-table/get-table-schema/slice";
import { updateTableSchema } from "../../../../store/features/saas/manage-table/update-table-schema/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ITableColumnData, ITableSchema } from "../../../../types/saas";
import "./style.css";

type LocationState = { tableName: string; tenantId: string };
export default function EditTable() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { tableName, tenantId } = location.state as LocationState;
  const tableData = useAppSelector((state) => state.getTableSchemaState);
  const updateTableSchemaState = useAppSelector(
    (state) => state.updateTableSchemaState
  );
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedColHeading, setselectedColHeading] = useState<string>("");
  const [selectedColAction, setSelectedColAction] = useState<string>("");
  const [readonlyState, setReadonlyState] = useState<boolean>(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const tableSchemaObject: ITableSchema = {
    tenantId,
    tableName,
  };
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
    setShow(false);
  };
  const deleteModalClose = () => {
    setDeleteModal(false);
  };
  const deleteModalShow = (columData: ITableColumnData) => {
    setSelectedColumnData(columData);
    setDeleteModal(true);
  };

  const processColumn = () => {
    const objIndex: Number | any = tableData.data?.findIndex(
      (item: ITableColumnData) => item.name === selectedColumnData.name
    );
    if (selectedColHeading === "Add Column" && objIndex > -1) {
      ToastAlert("Column already exists", "error");
    } else {
      dispatch(
        addOrEditColumn({ selectedColumnData, objIndex, selectedColHeading })
      );
      setShow(false);
    }
  };
  const handleShow = (
    columData: ITableColumnData,
    selectedColumnHeading: string
  ) => {
    setselectedColHeading(selectedColumnHeading);
    if (selectedColumnHeading === "Add Column") {
      setSelectedColumnData({
        name: "",
        type: "",
        required: false,
        partialSearch: false,
        filterable: false,
        sortable: false,
        multiValue: false,
        storable: false,
      });
      setSelectedColAction("Add Column");
      setReadonlyState(false);
    } else {
      setSelectedColumnData(columData);
      setSelectedColAction("Save Changes");
      setReadonlyState(true);
    }
    setShow(true);
  };

  const updateTable: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    setShowSuccessMsg(true);
    dispatch(
      updateTableSchema({
        requestParams: tableSchemaObject,
        requestData: {
          tableName,
          columns: tableData.data as ITableColumnData[],
        },
      })
    );
  };

  const removeColumn = () => {
    dispatch(deleteColumn({ selectedColumnData }));
    deleteModalClose();
  };

  useEffect(() => {
    dispatch(getTableSchema(tableSchemaObject));
  }, []);

  useEffect(() => {
    if (
      !updateTableSchemaState.loading &&
      !updateTableSchemaState.error &&
      updateTableSchemaState?.data &&
      showSuccessMsg
    ) {
      ToastAlert("Table updated successfully", "success");
    }
    if (!updateTableSchemaState.loading && updateTableSchemaState.error) {
      ToastAlert(updateTableSchemaState.error as string, "error");
    }
  }, [updateTableSchemaState.loading, updateTableSchemaState.error]);
  return (
    <div className="createbody">
      <h4 className="pl-5 pt-5">Edit Table</h4>
      <br></br>
      {updateTableSchemaState.loading ? <Spinner></Spinner> : <div></div>}
      <Form onSubmit={updateTable} className="pl-5">
        <Row>
          <Col>
            <Row>
              <Form.Label
                column="lg"
                lg={3}
                className="pl-5 text-center createbody"
              >
                <b>User</b>
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
                <b>Table Name</b>
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
            {/* <Row>
              <Form.Label
                column="lg"
                lg={3}
                className="pl-5 text-center createbody"
              >
                <b>Capacity</b>
              </Form.Label>
              <Col sm lg="4">
                <InputGroup
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1 createbody"
                  id="box"
                >
                  {"B"}
                </InputGroup>
              </Col>
              <Form.Label column="lg" lg={2} className="p-1 m-0">
                <div>
                  <i className="bi bi-info-circle-fill"></i>
                </div>
              </Form.Label>
            </Row> */}
            <Form.Label
              column="lg"
              lg={3}
              className="pl-5 text-center createbody"
            >
              <b>Columns :</b>
            </Form.Label>

            <Row>
              <Col sm lg="8" className="ml-0 mt-3 pl-1 pr-0 ">
                {tableData.data !== undefined && tableData.data.length > 0 ? (
                  <Table
                    bordered
                    className="text-center pr-0 table-marginLeft "
                  >
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
                      {tableData.data.map((val, index) => (
                        <tr key={`row${index}`}>
                          <td>{val.name}</td>
                          <td>{val.type}</td>
                          <td>{val.required.toString()}</td>
                          <td>{val.partialSearch.toString()}</td>
                          <td>{val.filterable.toString()}</td>
                          <td>{val.sortable.toString()}</td>
                          <td>{val.multiValue.toString()}</td>
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
                              onClick={() => deleteModalShow(val)}
                            ></i>
                          </td>
                        </tr>
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

        <Row className="mb-5  mt-3">
          <div className="col-md-3 text-center mr-5"></div>
          <div className="col-md-2 text-center mr-0 pr-0 mb-4 ">
            <Button
              variant="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              disabled={updateTableSchemaState.loading}
              onClick={() => handleShow(selectedColumnData, "Add Column")}
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
              disabled={updateTableSchemaState.loading}
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
                  <input
                    type="text"
                    className="form-control text-center read-only"
                    placeholder="Name"
                    value={selectedColumnData.name}
                    aria-label="Name"
                    aria-describedby="basic-addon"
                    readOnly={readonlyState}
                    onChange={(e) => {
                      setSelectedColumnData({
                        ...selectedColumnData,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
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
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control text-center read-only"
                    value={selectedColumnData.type}
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon"
                    readOnly={readonlyState}
                    onChange={(e) => {
                      setSelectedColumnData({
                        ...selectedColumnData,
                        type: e.target.value,
                      });
                    }}
                  />
                </div>
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
                  id="box"
                  value={selectedColumnData.required.toString()}
                  onChange={(e) => {
                    setSelectedColumnData({
                      ...selectedColumnData,
                      required: JSON.parse(e.target.value),
                    });
                  }}
                >
                  {/* <option
                    className="text-center"
                    value={selectedColumnData.required.toString()}
                  >
                    {selectedColumnData.required
                      .toString()
                      .charAt(0)
                      .toUpperCase() +
                      selectedColumnData.required.toString().slice(1)}
                  </option>
                  <option
                    className="text-center"
                    value={(!selectedColumnData.required).toString()}
                  >
                    {(!selectedColumnData.required).toString()}
                  </option> */}
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
                  id="box"
                  value={selectedColumnData.partialSearch.toString()}
                  onChange={(e) => {
                    setSelectedColumnData({
                      ...selectedColumnData,
                      partialSearch: JSON.parse(e.target.value),
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
                  <b>Filterable</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
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
                  <b>Sortable</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
                  value={selectedColumnData.sortable.toString()}
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
                  <b>Multivalue</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
                  value={selectedColumnData.multiValue.toString()}
                  onChange={(e) => {
                    setSelectedColumnData({
                      ...selectedColumnData,
                      multiValue: JSON.parse(e.target.value),
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
                  <b>Storable</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  id="box"
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
      <br></br>
    </div>
  );
}
