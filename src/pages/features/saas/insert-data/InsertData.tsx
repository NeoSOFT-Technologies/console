import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { inputTableDataWithNrt } from "../../../../store/features/saas/input-data/with-nrt/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { IInputData, ITableSchema } from "../../../../types/saas";

export default function InputData() {
  const dispatch = useAppDispatch();
  const inputDatas = useAppSelector((state) => state.inputDataWithNrtState);

  const [tenantId, setTenantId] = useState("");
  const [tableName, setTableName] = useState("");
  const [inputData, setInputData] = useState("[]");
  const [isNrtChecked, setIsNrtChecked] = useState(false);
  console.log({ tenantId, tableName, isNrtChecked, inputData });
  const params: ITableSchema = {
    tenantId,
    tableName,
  };
  const initialState: IInputData = {
    inputData,
    requestParams: params,
  };
  const getInputData: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    // console.log(tenantId);
    alert("Befor Dispatch -: " + JSON.stringify(initialState));

    dispatch(inputTableDataWithNrt(initialState));
  };
  useEffect(() => {
    // console.log(tableData);
    console.log("Use Effect of Input Data " + JSON.stringify(inputDatas));
  }, [inputDatas.data, inputDatas.error]);
  const handleOnChange = () => {
    setIsNrtChecked(!isNrtChecked);
  };
  return (
    <div className=" bg-white">
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
              <Form.Control
                type="text"
                placeholder="Table Name"
                value={tableName}
                className="text-center"
                onChange={(e) => setTableName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <div className="ml-4">
                <Form.Check
                  value="NRT"
                  checked={isNrtChecked}
                  onChange={handleOnChange}
                />
              </div>
              <div className=" ml-4 mr-3">
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
            <Form.Group className="mb-3 mt-3 ml-5" controlId="formBasicEmail">
              <Button
                className="w-50 ml-5"
                variant="primary"
                type="submit"
                id="save"
              >
                Save
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
