import React, { useState } from "react";
import { Form, Row, Col, Accordion } from "react-bootstrap";
import Ipathpermission from "../../../../pages/features/common-settings/path-based-permission/path-file";
import { IKeyCreateState } from "../../../../store/features/key/create";
import { IPolicyCreateState } from "../../../../store/features/policy/create";
import { IApiGetByIdState } from "../../../../store/features/api/update";
import GlobalLimitApi from "../global-limit/GlobalLimitApi";
interface IProps {
  state?: IKeyCreateState;
  policystate?: IPolicyCreateState;
  apidata?: any;
  apistate?: IApiGetByIdState;
  indexdata?: number;
  current: string;
}
export default function PathBased(props: IProps) {
  const [isActive, setisActive] = useState<boolean>(false);
  const [isActiveApi, setisActiveApi] = useState<boolean>(false);
  const [versions, setversion] = useState<string[]>([]);
  const lis = props.apistate?.data.form.Versions;
  // console.log("versionslog", lis);
  const setPathPermission = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    if (event.target.getAttribute("name") === "isActiveApi") {
      setisActiveApi(Boolean(value));
    } else {
      setisActive(Boolean(value));
    }
  };
  const handleversion = (event: any) => {
    const value = event.target.value;
    const mapped = versions;
    const found = mapped.includes(value);
    if (!found) {
      setversion([...versions, value]);
    }
  };
  // const ind = props.indexdata;
  // let ApiName = null;
  // if (props.indexdata !== null)
  //   ApiName = props.state?.data.form.accessRights[ind].apiName;

  const deleteversion = (event: any, index: any) => {
    event.preventDefault();
    const rows = [...versions];
    rows.splice(index, 1);
    setversion(rows);
  };
  return (
    <>
      <div className="card mt-4">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              {/* {ApiName} */}
              {props.current === "policy"
                ? props.policystate?.data.form.ApIs[props.indexdata!].Name
                : props.state?.data.form.AccessRights[props.indexdata!].ApiName}
            </Accordion.Header>

            <Accordion.Body>
              <div>
                <Row>
                  <Col md="12">
                    <Form.Group className="mb-3 mt-3">
                      <Form.Select
                        style={{ height: 46 }}
                        name="method"
                        onChange={(e: any) => handleversion(e)}
                      >
                        {lis?.map((datalist: any, index: any) => {
                          return (
                            <option key={index} value={datalist.Name}>
                              {datalist.Name}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    {versions.length > 0 ? (
                      <div
                        style={{ width: 960 }}
                        className="float-lg-left border rounded p-4"
                      >
                        {versions.map((data: any, index: any) => {
                          return (
                            <div key={index} className="border-0">
                              <i
                                className="bi bi-x-circle-fill float-left"
                                style={{ marginLeft: 40 }}
                                onClick={(e: any) => deleteversion(e, index)}
                              >
                                &nbsp;&nbsp;{data}
                              </i>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
                <div className="w-100 p-3 border rounded mt-3">
                  <Row>
                    <Col md="12">
                      <Form.Group className="mt-6">
                        <Form.Label>
                          <b>Set Per Api Limits and Quota</b>
                        </Form.Label>
                        <Form.Check
                          className="float-lg-end"
                          type="switch"
                          name="isActiveApi"
                          onChange={setPathPermission}
                          checked={isActiveApi}
                          id="isActiveApi"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group className="mt-6">
                        <Form.Label>
                          {" "}
                          This Api with inherit the Global Limit settings above
                          unless per Api limits and quotas are set here.
                        </Form.Label>
                      </Form.Group>
                      {isActiveApi ? (
                        <GlobalLimitApi
                          state={props.state}
                          index={props.indexdata}
                        />
                      ) : (
                        " "
                      )}
                    </Col>
                  </Row>
                </div>
                <div className="w-100 p-3 mt-3 border rounded">
                  <Row>
                    <Col md="12">
                      <Form.Group className="mt-6">
                        <Form.Label>
                          <b>Path Based Permission</b>
                        </Form.Label>
                        <Form.Check
                          className="float-lg-end"
                          type="switch"
                          name="isActive"
                          onChange={setPathPermission}
                          checked={isActive}
                          id="isActive"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group className="mt-6">
                        <Form.Label>
                          {" "}
                          Restrict access on per-path and per method basis to
                          only allow access to specific portion of the API.
                        </Form.Label>
                      </Form.Group>
                    </Col>
                    {isActive ? (
                      <Ipathpermission
                        state={props.state}
                        policystate={props.policystate}
                        apidata={props.apidata}
                        indexdata={props.indexdata}
                        current={props.current}
                      />
                    ) : (
                      " "
                    )}
                  </Row>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}
