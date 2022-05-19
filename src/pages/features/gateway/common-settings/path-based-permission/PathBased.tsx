import React, { useEffect, useState } from "react";
import { Form, Row, Col, Accordion, AccordionButton } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import { IApiGetByIdState } from "../../../../../store/features/gateway/api/update";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import { setForms } from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import { setForm } from "../../../../../store/features/gateway/policy/create/slice";
import { useAppDispatch } from "../../../../../store/hooks";
import GlobalLimitApi from "../global-limit/GlobalLimitApi";
import Ipathpermission from "./path-file";
interface IProps {
  state?: IKeyCreateState;
  policystate?: IPolicyCreateState;
  apidata?: any;
  apistate?: any;
  indexdata?: number;
  current: string;
}
export default function PathBased(props: IProps) {
  const [isActive, setisActive] = useState<boolean>(false);
  const [isActiveApi, setisActiveApi] = useState<boolean>(false);
  const [versions, setversion] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const [Limits, setLimits] = useState<any>({
    rate: -1,
    per: -1,
    throttle_interval: -1,
    throttle_retry_limit: -1,
    max_query_depth: -1,
    quota_max: -1,
    quota_renews: -1,
    quota_remaining: -1,
    quota_renewal_rate: 0,
    set_by_policy: false,
  });
  const [LimitsKey, setLimitsKey] = useState<any>({
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
  const newFormDatakey: any = { ...LimitsKey };
  const setFieldValue = () => {
    const apisList =
      props.current === "policy"
        ? [...props.policystate?.data.form.APIs!]
        : [...props.state?.data.form.AccessRights!];
    setLimits(newFormData);
    setLimitsKey(newFormDatakey);
    props.current === "policy"
      ? (apisList[props.indexdata!] = {
          ...apisList[props.indexdata!],
          Limit: { ...newFormData },
        })
      : (apisList[props.indexdata!] = {
          ...apisList[props.indexdata!],
          Limit: { ...newFormDatakey },
        });
    props.current === "policy"
      ? dispatch(
          setForm({
            ...props.policystate?.data.form,
            APIs: apisList,
          })
        )
      : dispatch(
          setForms({
            ...props.state?.data.form,
            AccessRights: apisList,
          })
        );
  };

  const { id } = useParams();
  const setNull = () => {
    const apisList =
      props.current === "policy"
        ? [...props.policystate?.data.form.APIs!]
        : [...props.state?.data.form.AccessRights!];
    apisList[props.indexdata!] = {
      ...apisList[props.indexdata!],
      Limit: undefined,
    };
    props.current === "policy"
      ? dispatch(
          setForm({
            ...props.policystate?.data.form,
            APIs: apisList,
          })
        )
      : dispatch(
          setForms({
            ...props.state?.data.form,
            AccessRights: apisList,
          })
        );
  };

  function setfieldsvalues(isActiveApis: any) {
    if (id === undefined) {
      if (isActiveApis === false) {
        setNull();
      } else if (isActiveApis === true) {
        setFieldValue();
      }
    } else {
      if (props.current === "policy") {
        if (
          isActiveApis === true &&
          props.policystate?.data.form.APIs[props.indexdata!].Limit === null
        ) {
          setFieldValue();
        } else if (
          isActiveApis === false &&
          props.policystate?.data.form.APIs[props.indexdata!].Limit !== null
        ) {
          setNull();
        } else if (
          isActiveApis === true &&
          props.policystate?.data.form.APIs[props.indexdata!].Limit !== null
        ) {
          setFieldValue();
        } else if (
          isActiveApis === false &&
          props.policystate?.data.form.APIs[props.indexdata!].Limit === null
        ) {
          setNull();
        }
      } else {
        if (
          isActiveApis === true &&
          props.state?.data.form.AccessRights[props.indexdata!].Limit === null
        ) {
          setFieldValue();
        } else if (
          isActiveApis === false &&
          (props.state?.data.form.AccessRights[props.indexdata!].Limit !==
            undefined ||
            props.state?.data.form.AccessRights[props.indexdata!].Limit !==
              null)
        ) {
          setNull();
        } else if (
          isActiveApis === true &&
          (props.state?.data.form.AccessRights[props.indexdata!].Limit !==
            undefined ||
            props.state?.data.form.AccessRights[props.indexdata!].Limit !==
              null)
        ) {
          setFieldValue();
        } else if (
          isActiveApis === false &&
          (props.state?.data.form.AccessRights[props.indexdata!].Limit ===
            undefined ||
            props.state?.data.form.AccessRights[props.indexdata!].Limit ===
              null)
        ) {
          setNull();
        }
      }
    }
  }
  useEffect(() => {
    if (id === undefined) {
      setisActiveApi(false);
      setNull();
    } else {
      if (props.current === "policy") {
        if (
          props.policystate?.data.form.APIs[props.indexdata!].Limit !== null
        ) {
          if (
            props.policystate?.data.form.APIs[props.indexdata!].Limit?.rate ===
              -1 &&
            props.policystate?.data.form.APIs[props.indexdata!].Limit?.per ===
              -1 &&
            props.policystate?.data.form.APIs[props.indexdata!].Limit
              ?.throttle_retry_limit === -1 &&
            props.policystate?.data.form.APIs[props.indexdata!].Limit
              ?.quota_max === -1
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
        if (
          props.state?.data.form.AccessRights[props.indexdata!].Limit !== null
        ) {
          if (
            props.state?.data.form.AccessRights[props.indexdata!].Limit
              ?.Rate === -1 &&
            props.state?.data.form.AccessRights[props.indexdata!].Limit?.Per ===
              -1 &&
            props.state?.data.form.AccessRights[props.indexdata!].Limit
              ?.Throttle_retry_limit === -1 &&
            props.state?.data.form.AccessRights[props.indexdata!].Limit
              ?.Quota_max === -1
          ) {
            setisActiveApi(false);
          } else {
            setisActiveApi(true);
          }
        } else {
          setisActiveApi(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (id === undefined) {
      setisActive(false);
    } else {
      if (props.current === "policy") {
        props.policystate?.data.form.APIs[props.indexdata!].AllowedUrls !==
          undefined &&
        props.policystate?.data.form.APIs[props.indexdata!].AllowedUrls.length >
          0
          ? setisActive(true)
          : setisActive(false);
      } else {
        props.state?.data.form.AccessRights[props.indexdata!].AllowedUrls !==
          undefined &&
        props.state?.data.form.AccessRights[props.indexdata!].AllowedUrls!
          .length > 0
          ? setisActive(true)
          : setisActive(false);
      }
    }
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
    }
  };

  const handleversion = (event: any) => {
    const value = event.target.value;
    const mapped = versions;
    const found = mapped.includes(value);
    if (!found) {
      setversion([...versions, value]);
    }
    const apisLists =
      props.current === "policy"
        ? [...props.policystate?.data.form.APIs!]
        : [...props.state?.data.form.AccessRights!];
    const version = [...apisLists[props.indexdata!].Versions!];
    const checkexisting = version.includes(value);
    if (!checkexisting) {
      version.push(value);
    }
    apisLists[props.indexdata!] = {
      ...apisLists[props.indexdata!],
      Versions: [...version],
    };
    props.current === "policy"
      ? dispatch(setForm({ ...props.policystate?.data.form, APIs: apisLists }))
      : dispatch(
          setForms({ ...props.state?.data.form, AccessRights: apisLists })
        );
  };

  const deleteversion = (event: any, index: any) => {
    event.preventDefault();
    const rows = [...versions];
    rows.splice(index, 1);
    setversion(rows);

    const apisLists =
      props.current === "policy"
        ? [...props.policystate?.data.form.APIs!]
        : [...props.state?.data.form.AccessRights!];
    const version = [...apisLists[props.indexdata!].Versions!];
    version.splice(index, 1);
    apisLists[props.indexdata!] = {
      ...apisLists[props.indexdata!],
      Versions: [...version],
    };
    props.current === "policy"
      ? dispatch(setForm({ ...props.policystate?.data.form, APIs: apisLists }))
      : dispatch(
          setForms({ ...props.state?.data.form, AccessRights: apisLists })
        );
  };
  const removeAccess = (event: any, index: any, current: string) => {
    event.preventDefault();
    if (
      current === "policy" &&
      props.policystate?.data.form !== undefined &&
      props.policystate?.data.form.APIs!.length > 0
    ) {
      const removeApi = [...props.policystate?.data.form.APIs!];

      removeApi.splice(index, 1);
      dispatch(setForm({ ...props.policystate?.data.form, APIs: removeApi }));
    } else if (
      current === "key" &&
      props.state?.data.form !== undefined &&
      props.state?.data.form.AccessRights!.length > 0
    ) {
      const removeApi = [...props.state?.data.form.AccessRights!];

      const ApiName = props.state?.data.form.AccessRights[index]?.ApiName;
      removeApi.splice(index, 1);

      ToastAlert(`${ApiName} removed`, "warning");
      dispatch(
        setForms({ ...props.state?.data.form, AccessRights: removeApi })
      );
    }
  };
  return (
    <div>
      {props.policystate?.loading ? (
        <Spinner />
      ) : (
        <div className="card mt-4">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <div style={{ display: "inline-flex", width: "100%" }}>
                <AccordionButton>
                  {props.current === "policy"
                    ? props.policystate?.data.form.APIs[props.indexdata!].Name +
                      " | " +
                      props.policystate?.data.form.APIs[props.indexdata!]
                        .AuthType
                    : props.state?.data.form.AccessRights[props.indexdata!]
                        .ApiName}
                </AccordionButton>
                <button
                  type="button"
                  style={{ width: "5%" }}
                  onClick={(e: any) =>
                    removeAccess(e, props.indexdata, props.current)
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
                          name="method"
                          onChange={(e: any) => handleversion(e)}
                        >
                          {props.current === "key"
                            ? props.state?.data.form.AccessRights[
                                props.indexdata!
                              ].MasterVersions?.map(
                                (datalist: any, index: number) => {
                                  return (
                                    <option key={index} value={datalist}>
                                      {datalist}
                                    </option>
                                  );
                                }
                              )
                            : props.policystate?.data.form.APIs[
                                props.indexdata!
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
                      {props.state?.data.form !== undefined &&
                      props.state?.data.form.AccessRights[props.indexdata!]
                        .Versions?.length > 0 ? (
                        <div
                          style={{ width: 960 }}
                          className="float-lg-left border rounded p-4"
                        >
                          {props.state?.data.form.AccessRights[
                            props.indexdata!
                          ].Versions.map((data: any, index: any) => {
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
                            This Api with inherit the Global Limit settings
                            above unless per Api limits and quotas are set here.
                          </Form.Label>
                        </Form.Group>
                        {isActiveApi ? (
                          <GlobalLimitApi
                            state={props.policystate}
                            keystate={props.state}
                            index={props.indexdata}
                            current={props.current}
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
      )}
    </div>
  );
}
