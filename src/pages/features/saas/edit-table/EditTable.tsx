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
  const [editTableState, setEditTableState] = useState(() => {
    return {
      show: false,
      deleteModal: false,
      selectedColHeading: "",
      selectedColAction: "",
      readonlyState: true,
      showSuccessMsg: false,
      showModalButton: false,
      isSortableDisable: true,
      isTypeDisable: true,
      showDataTypes: [] as string[],
      error: {
        name: "",
      } as IErrorColumnInput,
      selectedColumnData: {
        name: "",
        type: "",
        required: false,
        partialSearch: false,
        filterable: false,
        sortable: false,
        multiValue: false,
        storable: false,
      } as ITableColumnData,
    };
  });
  const addColumn = "Add Column";
  const tableSchemaObject: ITableSchema = {
    tenantId,
    tableName,
  };
  function setSelectedColData(columnData: ITableColumnData) {
    setEditTableState((previousState) => {
      return {
        ...previousState,
        selectedColumnData: columnData,
      };
    });
  }
  function setSelectedColType(type: string) {
    setEditTableState((previousState) => {
      return {
        ...previousState,
        selectedColumnData: {
          ...previousState.selectedColumnData,
          type,
        },
      };
    });
  }
  const handleClose = () => {
    setEditTableState((previousState) => {
      return {
        ...previousState,
        error: {
          ...previousState.error,
          name: "",
        },
      };
    });
    setEditTableState((previousState) => {
      return {
        ...previousState,
        show: false,
      };
    });
  };
  const deleteModalClose = () => {
    setEditTableState((previousState) => {
      return { ...previousState, deleteModal: false };
    });
  };
  const deleteModalShow = (columData: ITableColumnData) => {
    if (columData.name.toLowerCase() === "id") {
      ToastAlert("Column not allowed to delete", "warning");
    } else {
      setSelectedColData(columData);
      setEditTableState((previousState) => {
        return { ...previousState, deleteModal: true };
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTableState((previousState) => {
      return {
        ...previousState,
        error: {
          ...previousState.error,
          name: regexForColName.test(event.target.value) ? "" : ColNameErrMsg,
        },
      };
    });
    setEditTableState((previousState) => {
      return {
        ...previousState,
        selectedColumnData: {
          ...previousState.selectedColumnData,
          name: event.target.value,
        },
      };
    });
  };

  const multivalueOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditTableState((previousState) => {
      return {
        ...previousState,
        selectedColumnData: {
          ...previousState.selectedColumnData,
          multiValue: JSON.parse(event.target.value),
        },
      };
    });
    setEditTableState((previousState) => {
      return {
        ...previousState,
        selectedColumnData: {
          ...previousState.selectedColumnData,
          type: "",
        },
      };
    });

    if (JSON.parse(event.target.value)) {
      setEditTableState((previousState) => {
        return {
          ...previousState,
          selectedColumnData: {
            ...previousState.selectedColumnData,
            sortable: false,
          },
        };
      });
      setEditTableState((previousState) => {
        return { ...previousState, isSortableDisable: true };
      });
      setEditTableState((previousState) => {
        return { ...previousState, showDataTypes: multivaledDataTypes };
      });
      setSelectedColType("strings");
      if (editTableState.selectedColumnData.partialSearch) {
        setEditTableState((previousState) => {
          return { ...previousState, isTypeDisable: true };
        });
      } else {
        setEditTableState((previousState) => {
          return { ...previousState, isTypeDisable: false };
        });
      }
    } else {
      setEditTableState((previousState) => {
        return { ...previousState, isSortableDisable: false };
      });
      setEditTableState((previousState) => {
        return { ...previousState, showDataTypes: singleValedDataTypes };
      });
      setSelectedColType("string");
    }
  };

  const partialSearchOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEditTableState((previousState) => {
      return {
        ...previousState,
        selectedColumnData: {
          ...previousState.selectedColumnData,
          partialSearch: JSON.parse(event.target.value),
        },
      };
    });
    if (JSON.parse(event.target.value)) {
      setEditTableState((previousState) => {
        return { ...previousState, isTypeDisable: true };
      });
      if (editTableState.selectedColumnData.multiValue) {
        setSelectedColType("strings");
      } else {
        setSelectedColType("string");
      }
    } else {
      setEditTableState((previousState) => {
        return { ...previousState, isTypeDisable: false };
      });
    }
  };
  const handleValidate = () => {
    return editTableState.error.name === "";
  };
  const processColumn = () => {
    if (handleValidate()) {
      if (
        editTableState.selectedColumnData.name !== "" &&
        editTableState.selectedColumnData.type !== ""
      ) {
        const objIndex: number | any = tableData.data?.findIndex(
          (item: ITableColumnData) =>
            item.name.toLowerCase() ===
            editTableState.selectedColumnData.name.toLowerCase()
        );

        if (editTableState.selectedColHeading === addColumn && objIndex > -1) {
          ToastAlert("Column already exists", "warning");
        } else {
          const selectedColumnData = editTableState.selectedColumnData;
          const selectedColHeading = editTableState.selectedColHeading;
          dispatch(
            addOrEditColumn({
              selectedColumnData,
              objIndex,
              selectedColHeading,
            })
          );
          setEditTableState((previousState) => {
            return { ...previousState, show: false };
          });
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
    setEditTableState((previousState) => {
      return { ...previousState, selectedColHeading: selectedColumnHeading };
    });
    if (selectedColumnHeading === addColumn) {
      setEditTableState((previousState) => {
        return { ...previousState, showModalButton: true };
      });
      setEditTableState((previousState) => {
        return { ...previousState, isSortableDisable: false };
      });
      setEditTableState((previousState) => {
        return { ...previousState, isTypeDisable: false };
      });
      setEditTableState((previousState) => {
        return { ...previousState, showDataTypes: singleValedDataTypes };
      });
      setEditTableState((previousState) => {
        return {
          ...previousState,
          selectedColumnData: {
            name: "",
            type: "string",
            required: false,
            partialSearch: false,
            filterable: false,
            sortable: false,
            multiValue: false,
            storable: false,
          },
        };
      });
      setEditTableState((previousState) => {
        return { ...previousState, selectedColAction: addColumn };
      });
      setEditTableState((previousState) => {
        return { ...previousState, readonlyState: false };
      });
    } else {
      setEditTableState((previousState) => {
        return { ...previousState, showModalButton: false };
      });
      setEditTableState((previousState) => {
        return { ...previousState, isSortableDisable: true };
      });
      setEditTableState((previousState) => {
        return { ...previousState, isTypeDisable: true };
      });
      setSelectedColData(columData);
      setEditTableState((previousState) => {
        return { ...previousState, selectedColAction: "Save Changes" };
      });
      setEditTableState((previousState) => {
        return { ...previousState, readonlyState: true };
      });
    }
    setEditTableState((previousState) => {
      return { ...previousState, show: true };
    });
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
    setEditTableState((previousState) => {
      return { ...previousState, showSuccessMsg: true };
    });
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
    const selectedColumnData = editTableState.selectedColumnData;
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
      editTableState.showSuccessMsg
    ) {
      ToastAlert("Table updated successfully", "success");
    }
    if (!updateTableSchemaState.loading && updateTableSchemaState.error) {
      ToastAlert(updateTableSchemaState.error.message, "error");
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
              onClick={() =>
                handleShow(editTableState.selectedColumnData, addColumn)
              }
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
        show={editTableState.show}
        data={editTableState.selectedColumnData}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="text-center">
            {editTableState.selectedColHeading}
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
                    value={editTableState.selectedColumnData.name}
                    aria-label="Name"
                    aria-describedby="basic-addon"
                    data-testid="add-col-name-input"
                    readOnly={editTableState.readonlyState}
                    isInvalid={!!editTableState.error.name}
                    isValid={
                      !editTableState.error.name &&
                      !!editTableState.selectedColumnData.name
                    }
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {editTableState.error.name}
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
                  value={JSON.stringify(
                    editTableState.selectedColumnData.multiValue
                  )}
                  disabled={editTableState.readonlyState}
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
                  value={editTableState.selectedColumnData.partialSearch.toString()}
                  disabled={editTableState.readonlyState}
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
                  value={editTableState.selectedColumnData.type.toString()}
                  disabled={editTableState.isTypeDisable}
                  onChange={(e) => {
                    setEditTableState((previousState) => {
                      return {
                        ...previousState,
                        selectedColumnData: {
                          ...previousState.selectedColumnData,
                          type: e.target.value,
                        },
                      };
                    });
                  }}
                >
                  {editTableState.selectedColHeading === addColumn
                    ? editTableState.showDataTypes.map((val, index) =>
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
                  value={editTableState.selectedColumnData.sortable.toString()}
                  disabled={editTableState.isSortableDisable}
                  onChange={(e) => {
                    setEditTableState((previousState) => {
                      return {
                        ...previousState,
                        selectedColumnData: {
                          ...previousState.selectedColumnData,
                          sortable: JSON.parse(e.target.value),
                        },
                      };
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
                  value={editTableState.selectedColumnData.required.toString()}
                  disabled={editTableState.readonlyState}
                  onChange={(e) => {
                    setEditTableState((previousState) => {
                      return {
                        ...previousState,
                        selectedColumnData: {
                          ...previousState.selectedColumnData,
                          required: JSON.parse(e.target.value),
                        },
                      };
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
                  value={editTableState.selectedColumnData.filterable.toString()}
                  disabled={editTableState.readonlyState}
                  onChange={(e) => {
                    setEditTableState((previousState) => {
                      return {
                        ...previousState,
                        selectedColumnData: {
                          ...previousState.selectedColumnData,
                          filterable: JSON.parse(e.target.value),
                        },
                      };
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
                  value={editTableState.selectedColumnData.storable.toString()}
                  disabled={editTableState.readonlyState}
                  onChange={(e) => {
                    setEditTableState((previousState) => {
                      return {
                        ...previousState,
                        selectedColumnData: {
                          ...previousState.selectedColumnData,
                          storable: JSON.parse(e.target.value),
                        },
                      };
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
          {editTableState.showModalButton ? (
            <Button
              className="text-center"
              variant="success"
              data-testid="save-col-change-btn"
              onClick={processColumn}
            >
              {editTableState.selectedColAction}
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
      <Modal
        show={editTableState.deleteModal}
        data={editTableState.selectedColumnData}
        onHide={deleteModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <b>{editTableState.selectedColumnData.name}</b> column?
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
