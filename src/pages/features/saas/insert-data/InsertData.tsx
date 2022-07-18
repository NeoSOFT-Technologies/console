import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { RootState } from "../../../../store";
import { getTenantDetails } from "../../../../store/features/saas/input-data/slice";
import {
  inputTableDataWithNrt,
  resetInputDataWithNrtState,
} from "../../../../store/features/saas/input-data/with-nrt/slice";
import {
  inputTableDataWithoutNrt,
  resetInputDataWithoutNrtState,
} from "../../../../store/features/saas/input-data/without-nrt/slice";
import { getTableSchema } from "../../../../store/features/saas/manage-table/get-table-schema/slice";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IInputData, ITableSchema } from "../../../../types/saas";
import styles from "./InsertData.module.css";

export default function InsertData() {
  const dispatch = useAppDispatch();
  const inputDataWithNrt = useAppSelector(
    (state) => state.inputDataWithNrtState
  );
  const inputDataWithoutNrt = useAppSelector(
    (state) => state.inputDataWithOutNrtState
  );
  const [insertTenant, setInsertTenant] = useState({
    tenantId: "",
    tableName: "",
    inputData: "",
    isNrtChecked: false,
  });
  const [showMsg, setShowMsg] = useState(false);
  const tenantDetails = useAppSelector((state) => state.getTenantDetailState);
  const tableData = useAppSelector((state) => state.getTableState);
  const tableSchema = useAppSelector((state) => state.getTableSchemaState);
  const tenantDetail = useAppSelector((state) => state.userData);
  const authenticationState = useAppSelector(
    (state: RootState) => state.loginType
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement> | any
  ) => {
    const { name, value } = event.target;
    const setData = () => {
      setInsertTenant({
        ...insertTenant,
        [name]: value,
      });
    };
    switch (name) {
      case "tenantId": {
        setInsertTenant({
          ...insertTenant,
          [name]: value,
          tableName: "",
          inputData: "",
        });

        break;
      }
      case "isNrtChecked": {
        setInsertTenant({
          ...insertTenant,
          isNrtChecked: !insertTenant.isNrtChecked,
        });

        break;
      }
      case "tableName": {
        setData();
        break;
      }
      case "inputData": {
        setData();
        break;
      }
      default: {
        setInsertTenant({ ...insertTenant, [name]: value });
      }
    }
  };

  const params: ITableSchema = {
    tenantId: insertTenant.tenantId,
    tableName: insertTenant.tableName,
    tenantName: "",
  };
  const initialState: IInputData = {
    inputData: insertTenant.inputData,
    requestParams: params,
  };

  // JSON DATA VALIADTION FUNCTION
  function isValidJSONObject() {
    try {
      if (
        insertTenant.inputData !== null &&
        insertTenant.inputData.trim().startsWith("[{") &&
        JSON.parse(insertTenant.inputData) &&
        insertTenant.inputData.trim().endsWith("}]")
      ) {
        console.log("JSON object true");
        return true;
      } else {
        console.log("JSON object false");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // GET TABLE SCHEMA
  const schemaData = tableSchema.data?.map(
    (val) => `"${val.name}":"${val.type}"`
  );

  function showtenantDetail() {
    return authenticationState.data === "tenant" ? (
      <option>{tenantDetail.data?.tenantName}</option>
    ) : (
      <>
        <option value="">Select Tenant</option>
        {tenantDetails.data?.map((val, index) => (
          <option key={`option${index}`} value={val.id?.toString()}>
            {val.tenantName}
          </option>
        ))}
      </>
    );
  }
  const getInputData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    setShowMsg(true);
    if (insertTenant.inputData.toString() === "") {
      ToastAlert("Please Enter atleast one data", "error");
    } else if (isValidJSONObject()) {
      if (insertTenant.isNrtChecked) {
        dispatch(inputTableDataWithNrt(initialState));
      } else {
        dispatch(inputTableDataWithoutNrt(initialState));
      }
    } else {
      ToastAlert("Invalid Data", "error");
    }
  };

  useEffect(() => {
    // THIS IS TRIGGERED WHEN TENANT IS SELECTED FROM THE DROPDOWN
    if (!insertTenant.tenantId && authenticationState.data === "admin") {
      dispatch(getTenantDetails());
    }
  }, [insertTenant.tenantId]);

  useEffect(() => {
    if (tenantDetail.data?.tenantId) {
      // TENANT
      setInsertTenant({
        ...insertTenant,
        tenantId: tenantDetail.data?.tenantId.toString(),
      });
    } else {
      // ADMIN
      dispatch(getTenantDetails());
    }
  }, []);

  useEffect(() => {
    if (insertTenant.tableName !== "") {
      dispatch(getTableSchema(params));
    }
  }, [insertTenant.tableName]);

  // DATA INSERT SUCCESFULLY OR NOT
  useEffect(() => {
    if (
      (!inputDataWithNrt.loading &&
        !inputDataWithNrt.error &&
        inputDataWithNrt?.data) ||
      (!inputDataWithoutNrt.loading &&
        !inputDataWithoutNrt.error &&
        inputDataWithoutNrt?.data)
    ) {
      ToastAlert("Data Saved successfully", "success");
      dispatch(resetInputDataWithNrtState());
      dispatch(resetInputDataWithoutNrtState());
      setInsertTenant({
        ...insertTenant,
        inputData: "",
      });
    } else if (
      !inputDataWithNrt.loading &&
      inputDataWithNrt.error &&
      insertTenant.isNrtChecked &&
      showMsg
    ) {
      ToastAlert(inputDataWithNrt.error.message, "error");
    } else if (
      !inputDataWithoutNrt.loading &&
      inputDataWithoutNrt.error &&
      !insertTenant.isNrtChecked &&
      showMsg
    ) {
      ToastAlert(inputDataWithoutNrt.error.message, "error");
    }
  }, [
    inputDataWithNrt.loading,
    inputDataWithoutNrt.loading,
    inputDataWithNrt.error,
    inputDataWithoutNrt.error,
  ]);

  return (
    <div>
      {inputDataWithNrt.loading || inputDataWithoutNrt.loading ? (
        <Spinner />
      ) : (
        <div>
          <div className={styles.card}>
            <Container className="m-1">
              <h4 className="text-center text-dark pb-2 pt-3">Insert Data</h4>
              <Form
                onSubmit={getInputData}
                data-testid="form-input"
                className="p-4"
              >
                <Row>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Tenant :</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-center"
                        name="tenantId"
                        id="tenantName"
                        data-testid="tenant-name-select"
                        value={insertTenant.tenantId}
                        onChange={(e) => {
                          handleInputChange(e);
                          dispatch(getTables(e.target.value));
                        }}
                        required
                      >
                        {showtenantDetail()}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group className="mb-3">
                      <Form.Label>Table Name :</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-center"
                        name="tableName"
                        required
                        onChange={(e) => handleInputChange(e)}
                        data-testid="table-name-select"
                        value={insertTenant.tableName}
                      >
                        <option value=""> Select Table</option>
                        {tableData.data?.map((val, index) => (
                          <option key={`option${index}`} value={val.tableName}>
                            {val.tableName}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <Form.Group>
                      <div className="ml-3 p-1">
                        <Form.Check
                          name="isNrtChecked"
                          onChange={(e) => handleInputChange(e)}
                        />
                        <label className="pl-2">NRT</label>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="mb-3">
                      <label>InputData Schema :</label>
                      <div className={`${styles.div} bg-dark text-white p-3`}>
                        {"[{"}
                        {schemaData?.toString()}
                        {"}]"}
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <Form.Group className="mb-3" controlId="jsonInput">
                      <Form.Label>Data :</Form.Label>
                      <Form.Control
                        as="textarea"
                        type="textarea"
                        rows={4}
                        name="inputData"
                        value={insertTenant.inputData}
                        data-testid="json-input-box"
                        placeholder="JSON input"
                        onChange={(e) => handleInputChange(e)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3 mt-3">
                      <Button
                        className="btn btn-block btn-primary btn-md font-weight-medium auth-form-btn btn btn-primary"
                        type="submit"
                        id="save"
                        disabled={
                          inputDataWithNrt.loading ||
                          inputDataWithoutNrt.loading
                        }
                        data-testid="save-btn"
                      >
                        Save
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}
