import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
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

export default function InputData(this: any) {
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
  // const [tenantId, setTenantId] = useState("");
  // const [tableName, setTableName] = useState("");
  // const [inputData, setInputData] = useState("");
  // const [isNrtChecked, setIsNrtChecked] = useState(false);
  const tableData = useAppSelector((state) => state.getTableState);
  const tableSchema = useAppSelector((state) => state.getTableSchemaState);
  console.log({
    tenantId: insertTenant.tenantId,
    tableName: insertTenant.tableName,
    isNrtChecked: insertTenant.isNrtChecked,
    inputData: insertTenant.inputData,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement> | any
  ) => {
    const { name, value } = event.target;
    console.log(name, value);
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
        setInsertTenant({
          ...insertTenant,
          [name]: value,
          inputData: "",
        });

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
  };
  const initialState: IInputData = {
    inputData: insertTenant.inputData,
    requestParams: params,
  };

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
        return true;
      }
    } catch (error) {
      console.log("error" + error);
      return true;
    }
  }

  // const handleOnChange = () => {
  //   setIsNrtChecked(!insertTenant.isNrtChecked);
  // };
  // const tableNameOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setTableName(event.target.value);
  //   // alert(JSON.stringify(tableSchema.data));
  // };

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
    dispatch(getTenantDetails());
  }, []);

  useEffect(() => {
    if (insertTenant.tableName !== "") {
      dispatch(getTableSchema(params));
    }
  }, [insertTenant.tableName]);

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
        isNrtChecked: false,
      });
    } else if (
      !inputDataWithNrt.loading &&
      inputDataWithNrt.error &&
      insertTenant.isNrtChecked &&
      showMsg
    ) {
      ToastAlert(inputDataWithNrt.error as string, "error");
    } else if (
      !inputDataWithoutNrt.loading &&
      inputDataWithoutNrt.error &&
      !insertTenant.isNrtChecked &&
      showMsg
    ) {
      ToastAlert(inputDataWithoutNrt.error as string, "error");
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
                      <Form.Label>Tenant Name :</Form.Label>
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
                        <option value="">Select Tenant</option>
                        {tenantDetails.data?.map((val, index) => (
                          <option
                            key={`option${index}`}
                            value={val.id.toString()}
                          >
                            {val.tenantName}
                          </option>
                        ))}
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
                          <option key={`option${index}`} value={val}>
                            {val}
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
                          //  checked={insertTenant.isNrtChecked}
                          // value={insertTenant.isNrtChecked.toString()}
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
                        {tableSchema.data?.map(
                          (val) =>
                            JSON.stringify(val.name).toString() +
                            " : " +
                            val.type +
                            ", "
                        )}
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
