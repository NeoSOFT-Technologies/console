import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Accordion, AccordionButton } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import GlobalLimitApi from "../global-limit/GlobalLimitApi";
import { IPropsHelper } from "../global-limit/rate-limit-helper";
import Ipathpermission from "./path-file";
// import IpathpermissionKey from "./path-file-Key";
interface IProps {
  requiredInterface: IPropsHelper;
  state?: IKeyCreateState;
  policystate?: IPolicyCreateState;
  apidata?: any;
  apistate?: any;
  indexdata?: number;
  current: string;
  setForm: ActionCreatorWithPayload<any, string>;
  setFormError: ActionCreatorWithPayload<any, string>;
}
export default function PathBased(props: IProps) {
  const [isActive, setisActive] = useState<boolean>(false);
  const [isActiveApi, setisActiveApi] = useState<boolean>(false);
  const [versions, setversion] = useState<string[]>([]);
  const [Limits, setLimits] = useState<any>({
    Rate: -1,
    Per: -1,
    Throttle_interval: -1,
    Throttle_retry_limit: -1,
    Max_query_depth: -1,
    Quota_max: -1,
    Quota_renews: -1,
    Quota_remaining: -1,
    Quota_renewal_rate: 0,
    Set_by_policy: false,
  });
  const newFormData: any = { ...Limits };
  const setFieldValue = () => {
    const apisList = [...props.requiredInterface.formProp!];
    setLimits(newFormData);
    apisList[props.requiredInterface.index!] = {
      ...apisList[props.requiredInterface.index!],
      Limit: { ...newFormData },
    };
    console.log("mylist", apisList);
    props.requiredInterface.dispatch(
      props.requiredInterface.setForm!({
        ...props.requiredInterface.form,
        [props.requiredInterface.propName!]: apisList,
      })
    );
  };

  const { id } = useParams();
  const setNull = () => {
    const apisList = [...props.requiredInterface.formProp];
    // ? [...props.policystate?.data.form.APIs!]
    // : [...props.state?.data.form.AccessRights!];
    apisList[props.requiredInterface.index!] = {
      ...apisList[props.requiredInterface.index!],
      Limit: undefined,
    };

    props.requiredInterface.dispatch(
      props.requiredInterface.setForm!({
        ...props.requiredInterface.form,
        [props.requiredInterface.propName!]: apisList,
      })
    );
    // props.current === "policy"
    //   ? dispatch(
    //       setForm({
    //         ...props.policystate?.data.form,
    //         APIs: apisList,
    //       })
    //     )
    //   : dispatch(
    //       setForms({
    //         ...props.state?.data.form,
    //         AccessRights: apisList,
    //       })
    //     );
  };

  function setfieldsvalues(isActiveApis: any) {
    if (id === undefined) {
      if (isActiveApis === false) {
        setNull();
      } else if (isActiveApis === true) {
        setFieldValue();
      }
    } else {
      if (
        isActiveApis === true &&
        props.requiredInterface.formProp[props.requiredInterface.index!]
          .Limit === null
      ) {
        setFieldValue();
      } else if (
        isActiveApis === false &&
        props.requiredInterface.formProp[props.requiredInterface.index!]
          .Limit !== null
      ) {
        setNull();
      } else if (
        isActiveApis === true &&
        (props.requiredInterface.formProp[props.requiredInterface.index!]
          .Limit !== null ||
          props.requiredInterface.formProp[props.requiredInterface.index!]
            .Limit !== undefined)
      ) {
        console.log("properly coming or not");
        setFieldValue();
      } else if (
        isActiveApis === false &&
        (props.requiredInterface.formProp[props.requiredInterface.index!]
          .Limit === null ||
          props.requiredInterface.formProp[props.requiredInterface.index!]
            .Limit !== undefined)
      ) {
        setNull();
      }
    }
  }
  const setPathValuesNull = () => {
    const apisList = [...props.requiredInterface.formProp!];
    apisList[props.requiredInterface.index!] = {
      ...apisList[props.requiredInterface.index!],
      AllowedUrls: [],
    };

    props.requiredInterface.dispatch(
      props.requiredInterface.setForm!({
        ...props.requiredInterface.form,
        [props.requiredInterface.propName!]: apisList,
      })
    );
  };

  function setpathfieldvalues(isActives: any) {
    if (id === undefined) {
      if (isActives === false) {
        setPathValuesNull();
      }
    } else {
      if (isActives === false) {
        setPathValuesNull();
      }
    }
  }
  useEffect(() => {
    if (id === undefined) {
      setisActiveApi(false);
      setNull();
    } else {
      if (
        props.requiredInterface.formProp[props.requiredInterface.index!]
          .Limit !== undefined
      ) {
        if (
          props.requiredInterface.formProp[props.requiredInterface.index!]
            .Limit !== null
        ) {
          if (
            props.requiredInterface.formProp[props.requiredInterface.index!]
              .Limit?.Rate === -1 &&
            props.requiredInterface.formProp[props.requiredInterface.index!]
              .Limit?.Per === -1 &&
            props.requiredInterface.formProp[props.requiredInterface.index!]
              .Limit?.Throttle_retry_limit === -1 &&
            props.requiredInterface.formProp[props.requiredInterface.index!]
              .Limit?.Quota_max === -1
          ) {
            setNull();
            setisActiveApi(false);
            setNull();
          } else {
            setisActiveApi(true);
          }
        } else {
          setisActiveApi(false);
        }
      } else {
        setisActiveApi(false);
      }
    }
  }, [id]);

  useEffect(() => {
    id === undefined
      ? setisActive(false)
      : props.requiredInterface.formProp[props.requiredInterface.index!]!
          .AllowedUrls !== undefined &&
        props.requiredInterface.formProp[props.requiredInterface.index!]!
          .AllowedUrls.length > 0
      ? setisActive(true)
      : setisActive(false);
  }, []);

  const setPathPermission = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    if (event.target.getAttribute("name") === "isActiveApi") {
      setfieldsvalues(Boolean(value));
      setisActiveApi(Boolean(value));
    } else {
      setisActive(Boolean(value));
      setpathfieldvalues(Boolean(value));
    }
  };

  const handleversion = (event: any) => {
    const value = event.target.value;
    if (value.length > 0) {
      const mapped = versions;
      const found = mapped.includes(value);
      if (!found) {
        setversion([...versions, value]);
      }
      const apisLists = [...props.requiredInterface.formProp];
      const version = [...apisLists[props.requiredInterface.index!].Versions!];
      const checkexisting = version.includes(value);
      if (!checkexisting) {
        version.push(value);
      }
      apisLists[props.requiredInterface.index!] = {
        ...apisLists[props.requiredInterface.index!],
        Versions: [...version],
      };
      props.requiredInterface.dispatch(
        props.requiredInterface.setForm!({
          ...props.requiredInterface.form,
          [props.requiredInterface.propName!]: apisLists,
        })
      );
    }
  };

  const deleteversion = (event: any, index: any) => {
    event.preventDefault();
    const rows = [...versions];
    rows.splice(index, 1);
    setversion(rows);

    const apisLists = [...props.requiredInterface.formProp];
    const version = [...apisLists[props.requiredInterface.index!].Versions!];
    version.splice(index, 1);
    apisLists[props.requiredInterface.index!] = {
      ...apisLists[props.requiredInterface.index!],
      Versions: [...version],
    };
    props.requiredInterface.dispatch(
      props.requiredInterface.setForm!({
        ...props.requiredInterface.form,
        [props.requiredInterface.propName!]: apisLists,
      })
    );
  };
  const removeAccess = (event: any, index: any) => {
    event.preventDefault();
    if (props.requiredInterface.formProp!.length > 0) {
      const removeApi = [...props.requiredInterface.formProp!];
      removeApi.splice(index, 1);

      props.requiredInterface.dispatch(
        props.requiredInterface.setForm!({
          ...props.requiredInterface.form,
          [props.requiredInterface.propName!]: removeApi,
        })
      );
      const error = [...props.requiredInterface.errorProp!];
      error.splice(index, 1);
      props.requiredInterface.dispatch(
        props.requiredInterface.setFormError!({
          ...props.requiredInterface.errors,
          [props.requiredInterface.errorProp]: error,
        })
      );
    }
  };
  return (
    <div>
      {props.requiredInterface.form?.loading ? (
        <Spinner />
      ) : (
        <div className="card mt-4">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <div style={{ display: "inline-flex", width: "100%" }}>
                <AccordionButton>
                  {props.requiredInterface.formProp[
                    props.requiredInterface.index!
                  ].Name +
                    " | " +
                    props.requiredInterface.formProp[
                      props.requiredInterface.index!
                    ].AuthType}
                </AccordionButton>
                <button
                  type="button"
                  style={{ width: "5%" }}
                  onClick={(e: any) =>
                    removeAccess(e, props.requiredInterface.index)
                  }
                >
                  <i className="bi bi-trash-fill menu-icon"></i>
                </button>
              </div>
              <Accordion.Body>
                <div>
                  <Row>
                    <Col md="12">
                      <Form.Group className="mb-3 mt-3">
                        <Form.Select
                          style={{ height: 46 }}
                          name="Versions"
                          value=""
                          onChange={(e: any) => handleversion(e)}
                        >
                          <option value="" className="bg-light">
                            --- Select Versions ---
                          </option>
                          {props.requiredInterface.formProp[
                            props.requiredInterface.index!
                          ].MasterVersions?.map(
                            (datalist: any, index: number) => {
                              return (
                                <option key={index} value={datalist}>
                                  {datalist}
                                </option>
                              );
                            }
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      {props.requiredInterface.form !== undefined &&
                      props.requiredInterface.formProp[
                        props.requiredInterface.index!
                      ].Versions?.length > 0 ? (
                        <div
                          style={{ width: "100%" }}
                          className="float-lg-left border rounded p-4"
                        >
                          {props.requiredInterface.formProp[
                            props.requiredInterface.index!
                          ].Versions.map((data: any, index: any) => {
                            return (
                              <div key={index} className="border-0">
                                <i
                                  className="bi bi-x-circle-fill float-left"
                                  style={{ marginLeft: 30 }}
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
                            This Api with inherit the Global Limit settings
                            above unless per Api limits and quotas are set here.
                          </Form.Label>
                        </Form.Group>
                        {isActiveApi
                          ? GlobalLimitApi(props.requiredInterface)
                          : " "}
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
                        <Ipathpermission r={props.requiredInterface} />
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
      )}
    </div>
  );
}
