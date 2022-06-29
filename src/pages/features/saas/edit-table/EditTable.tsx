import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import {
  ColNameErrMsg,
  regexForColName,
  multivaledDataTypes,
  singleValedDataTypes,
  tableHeadings,
  dataTypelist,
} from "../../../../resources/saas/constant";
import {
  deleteColumn,
  getTableSchema,
  addOrEditColumn,
} from "../../../../store/features/saas/manage-table/get-table-schema/slice";
import { updateTableSchema } from "../../../../store/features/saas/manage-table/update-table-schema/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  IErrorColumnInput,
  ITableColumnData,
  ITableSchema,
} from "../../../../types/saas";
import "./style.css";

type LocationState = { tableName: string; tenantId: string };
export default function EditTable() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log(location);
  const { tableName, tenantId } = location.state as LocationState;

  const tableData = useAppSelector((state) => state.getTableSchemaState);
  const updateTableSchemaState = useAppSelector(
    (state) => state.updateTableSchemaState
  );
  const addColumn = "Add Column";
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedColHeading, setSelectedColHeading] = useState<string>("");
  const [selectedColAction, setSelectedColAction] = useState<string>("");
  const [readonlyState, setReadonlyState] = useState<boolean>(true);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [showModalButton, setShowModalButton] = useState<boolean>(false);
  const [isSortableDisable, setIsSortableDisable] = useState<boolean>(true);
  const [isTypeDisable, setIsTypeDisable] = useState<boolean>(true);
  const [showDataTypes, setShowDataTypes] = useState<string[]>([]);
  const tableSchemaObject: ITableSchema = {
    tenantId,
    tableName,
  };
  const [error, setError] = useState<IErrorColumnInput>({
    name: "",
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
  const deleteModalShow = (columData: ITableColumnData) => {
    if (columData.name.toLowerCase() === "id") {
      ToastAlert("Column not allowed to delete", "warning");
    } else {
      setSelectedColumnData(columData);
      setDeleteModal(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      ...error,
      name: regexForColName.test(event.target.value) ? "" : ColNameErrMsg,
    });
    setSelectedColumnData({ ...selectedColumnData, name: event.target.value });
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
  const handleValidate = () => {
    return error.name === "";
  };
  const processColumn = () => {
    if (handleValidate()) {
      if (selectedColumnData.name !== "" && selectedColumnData.type !== "") {
        const objIndex: number | any = tableData.data?.findIndex(
          (item: ITableColumnData) =>
            item.name.toLowerCase() === selectedColumnData.name.toLowerCase()
        );

        if (selectedColHeading === addColumn && objIndex > -1) {
          ToastAlert("Column already exists", "warning");
        } else {
          dispatch(
            addOrEditColumn({
              selectedColumnData,
              objIndex,
              selectedColHeading,
            })
          );
          setShow(false);
        }
      } else {
        ToastAlert("Please Fill All Fields", "warning");
      }
    }
  };
  const handleShow = (
    columData: ITableColumnData,
    selectedColumnHeading: string
  ) => {
    setSelectedColHeading(selectedColumnHeading);
    if (selectedColumnHeading === addColumn) {
      setShowModalButton(true);
      setIsSortableDisable(false);
      setIsTypeDisable(false);
      setShowDataTypes(singleValedDataTypes);
      setSelectedColumnData({
        name: "",
        type: "string",
        required: false,
        partialSearch: false,
        filterable: false,
        sortable: false,
        multiValue: false,
        storable: false,
      });
      setSelectedColAction(addColumn);
      setReadonlyState(false);
    } else {
      setShowModalButton(false);
      setIsSortableDisable(true);
      setIsTypeDisable(true);
      setSelectedColumnData(columData);
      setSelectedColAction("Save Changes");
      setReadonlyState(true);
    }
    setShow(true);
  };
  const getDataTypeOptions = (val: string, index: number) => {
    return (
      <option className="text-center" key={index} value={val}>
        {val.toString().charAt(0).toUpperCase() + val.toString().slice(1)}
      </option>
    );
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
    <div className="createbody pb-5">
      <h3 className="pl-5 pt-5 text-center">Edit Table</h3>
      <br></br>
      {updateTableSchemaState.loading ? <Spinner></Spinner> : <div></div>}
      <Form onSubmit={updateTable} className="pl-5">
        <Row className="pr-5">
          <Col>
            <Row>
              <Col sm lg="6">
                <Form.Group className="mb-3">
                  <Form.Label className="text-left createbody mb-2">
                    User
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="text-center"
                    value={tenantId}
                    name="tenantName"
                    disabled
                  />
                </Form.Group>
              </Col>

              <Col sm lg="6">
                <Form.Group>
                  <Form.Label className=" createbody mb-2">
                    Table Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="text-center"
                    data-testid="table-name-input"
                    value={tableName}
                    name="tableName"
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm lg="12" className="  table-responsive ">
                <Form.Label className=" createbody mb-2">Columns :</Form.Label>
                {tableData.data !== undefined && tableData.data.length > 0 ? (
                  <Table bordered className="text-center">
                    <thead>
                      <tr id="test">
                        {tableHeadings.map((val, index) => (
                          <th key={`row${index}`}>
                            <b>{val}</b>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.data?.map((val, index) => (
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
                              className="bi bi-eye-fill"
                              data-toggle="modal"
                              data-testid="edit-col-btn"
                              onClick={() => handleShow(val, "View Column")}
                            ></i>
                          </td>
                          {val.required === true ? (
                            <td className="text-danger disabled">
                              <i
                                className="bi bi-trash-fill"
                                data-testid="delete-col-btn"
                                onClick={() => deleteModalShow(val)}
                              ></i>
                            </td>
                          ) : (
                            <td className="text-danger">
                              <i
                                className="bi bi-trash-fill"
                                data-testid="delete-col-btn"
                                onClick={() => deleteModalShow(val)}
                              ></i>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h2 className="text-center">No Data</h2>
                )}
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
              data-testid="add-col-btn"
              disabled={updateTableSchemaState.loading}
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
              disabled={updateTableSchemaState.loading}
              data-testid="send-update-request-btn"
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
                    data-testid="add-col-name-input"
                    readOnly={readonlyState}
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
                  // id="box"
                  value={JSON.stringify(selectedColumnData.multiValue)}
                  disabled={readonlyState}
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
                  // id="box"
                  value={selectedColumnData.partialSearch.toString()}
                  disabled={readonlyState}
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
                  {selectedColHeading === addColumn
                    ? showDataTypes.map((val, index) =>
                        getDataTypeOptions(val, index)
                      )
                    : dataTypelist.map((val, index) =>
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
                  disabled={readonlyState}
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
                  <b>Filterable</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  // id="box"
                  value={selectedColumnData.filterable.toString()}
                  disabled={readonlyState}
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
                  <b>Storable</b>
                </Form.Label>
              </Col>
              <Col sm lg="7">
                <Form.Select
                  aria-label="Default select example"
                  className="w-100 pr-3 pt-1 pb-1"
                  value={selectedColumnData.storable.toString()}
                  disabled={readonlyState}
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
          {showModalButton ? (
            <Button
              className="text-center"
              variant="success"
              data-testid="save-col-change-btn"
              onClick={processColumn}
            >
              {selectedColAction}
            </Button>
          ) : (
            ""
          )}
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
