import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { inputTableDataWithNrt } from "../../../../store/features/saas/input-data/with-nrt/slice";
import { inputTableDataWithoutNrt } from "../../../../store/features/saas/input-data/without-nrt/slice";
import { getTables } from "../../../../store/features/saas/manage-table/get-tables/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IInputData, ITableSchema } from "../../../../types/saas";

export default function InputData() {
  const dispatch = useAppDispatch();
  const inputDataWithNrt = useAppSelector(
    (state) => state.inputDataWithNrtState
  );
  const inputDataWithoutNrt = useAppSelector(
    (state) => state.inputDataWithOutNrtState
  );

  const [tenantId, setTenantId] = useState("");
  const [tableName, setTableName] = useState("");
  const [inputData, setInputData] = useState("");
  const [isNrtChecked, setIsNrtChecked] = useState(false);
  const tableData = useAppSelector((state) => state.getTableState);
  console.log({ tenantId, tableName, isNrtChecked, inputData });
  const params: ITableSchema = {
    tenantId,
    tableName,
  };
  const initialState: IInputData = {
    inputData,
    requestParams: params,
  };

  function isValidJSONObject() {
    try {
      if (
        inputData !== null &&
        inputData.trim().startsWith("[{") &&
        JSON.parse(inputData) &&
        inputData.trim().endsWith("}]")
      ) {
        console.log("JSON object true");
        return true;
      } else {
        console.log("JSON object false");
        return false;
      }
    } catch (error) {
      console.log("error" + error);
      return false;
    }
  }

  const getInputData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (isValidJSONObject()) {
      if (isNrtChecked) {
        dispatch(inputTableDataWithNrt(initialState));
      } else {
        dispatch(inputTableDataWithoutNrt(initialState));
      }
    } else {
      ToastAlert("Invalid Data", "error");
    }
  };
  useEffect(() => {
    dispatch(getTables(tenantId));
  }, [tenantId]);
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
    }
  }, [inputDataWithNrt.loading, inputDataWithoutNrt.loading]);
  const handleOnChange = () => {
    setIsNrtChecked(!isNrtChecked);
  };

  return (
    <div>
      {inputDataWithNrt.loading || inputDataWithoutNrt.loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="bg-white">
            <div className="mb-4 mt-3">
              <h3 className="font-weight-normal text-justify text-center">
                Insert Data
              </h3>
              <Form onSubmit={getInputData}>
                <Row className="justify-content-center">
                  <Col md={6} className="justify-content-center">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>User :</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="user"
                        value={tenantId}
                        className="text-center"
                        onChange={(e) => setTenantId(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Table Name :</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="text-center"
                        onChange={(e) => setTableName(e.target.value)}
                      >
                        <option>Table Name</option>
                        {tableData.data?.map((val, index) => (
                          <option key={`option${index}`} value={val}>
                            {val}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formBasicEmail">
                      <div className="ml-4">
                        <Form.Check
                          value="NRT"
                          checked={isNrtChecked}
                          onChange={handleOnChange}
                        />
                        <label className="pl-2">NRT</label>
                      </div>
                    </Form.Group>
                    <Form.Group controlId="jsonInput">
                      <Form.Label className="mb-2">Data</Form.Label>
                      <Form.Control
                        as="textarea"
                        className="h:100"
                        value={inputData}
                        placeholder="JSON input"
                        onChange={(e) => setInputData(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3 mt-3"
                      controlId="formBasicEmail"
                    >
                      <Button
                        className="btn btn-block btn-primary btn-md font-weight-medium auth-form-btn btn btn-primary"
                        type="submit"
                        id="save"
                        disabled={
                          inputDataWithNrt.loading ||
                          inputDataWithoutNrt.loading
                        }
                      >
                        Save
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
