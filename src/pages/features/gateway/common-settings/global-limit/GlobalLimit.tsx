import React, { useEffect, useState } from "react";
import { Accordion, AccordionButton, Col, Form, Row } from "react-bootstrap";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { IKeyCreateState } from "../../../../../store/features/gateway/key/create";
import { setForms } from "../../../../../store/features/gateway/key/create/slice";
import { IPolicyCreateState } from "../../../../../store/features/gateway/policy/create";
import { getPolicybyId } from "../../../../../store/features/gateway/policy/create/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { refreshGrid } from "../../key/create/access-rights/apply-policy/policy-list/PolicyList";

interface IProps {
  isDisabled: boolean;
  state?: IKeyCreateState | IPolicyCreateState;
  index?: number;
  policyId?: string;
  msg: string;
}

export default function GlobalLimit(props: IProps) {
  const dispatch = useAppDispatch();
  const states = useAppSelector((RootState) => RootState.createKeyState);
  const [loader, setLoader] = useState(true);
  // const [localState, setLocalState] = useState({} as IPolicyCreateState);
  // const globalNames: any[] = [];
  const state: IPolicyCreateState = useAppSelector(
    (RootStates) => RootStates.createPolicyState
  );
  const mainCall = async (id: string) => {
    if (id !== null && id !== "" && id !== undefined) {
      await dispatch(getPolicybyId(id));
      setLoader(false);
    }
  };

  useEffect(() => {
    mainCall(props.policyId!);
  }, []);

  useEffect(() => {
    if (
      props.policyId !== null &&
      props.policyId !== "" &&
      props.policyId !== undefined &&
      loader === false &&
      state.loading === false
    ) {
      console.log("second use effect -", loader);

      const manageState = async () => {
        const APIs: any[] = [];

        const policyByIdTemp = [...states.data.form.PolicyByIds!];

        const globalItem = {
          Name: "",
          MaxQuota: 0,
          QuotaRate: 0,
          Rate: 0,
          Per: 0,
          QuotaRenewalRate: 0,
          ThrottleInterval: 0,
          ThrottleRetries: 0,
        };
        let policyName = "";
        let AuthType = "";

        policyName = policyName + state.data.form.Name;
        console.log("myApis", state);
        for (const a of state.data.form.APIs) {
          AuthType = a.AuthType!;
          if (a.Limit === null) {
            globalItem.Name = globalItem.Name.concat(a.Name, ",");
            globalItem.MaxQuota = state.data.form.Quota;
            globalItem.QuotaRate = state.data.form.QuotaRenewalRate;
            globalItem.Rate = state.data.form.Rate;
            globalItem.Per = state.data.form.Per;
            globalItem.ThrottleInterval = state.data.form.ThrottleInterval;
            globalItem.ThrottleRetries = state.data.form.ThrottleRetries;
          }

          if (a.Limit !== null) {
            const policyState = a;
            APIs.push(policyState);
          }
        }
        // console.log("Names", globalItem.Name);
        if (globalItem.Name === "") {
          policyByIdTemp[props.index!] = {
            ...policyByIdTemp[props.index!],
            Global: undefined,
            APIs,
            policyName,
            AuthType,
          };

          await dispatch(
            setForms({
              ...states.data.form,
              PolicyByIds: policyByIdTemp,
            })
          );
        } else {
          policyByIdTemp[props.index!] = {
            ...policyByIdTemp[props.index!],
            Global: globalItem,
            APIs,
            policyName,
            AuthType,
          };
          await dispatch(
            setForms({
              ...states.data.form,
              PolicyByIds: policyByIdTemp,
            })
          );
        }
      };
      manageState();
    }
  }, [loader]);

  const removeAccess = (event: any, index: any) => {
    event.preventDefault();
    const removePolicyByIds = [...states.data.form.PolicyByIds!];
    const removePolicies = [...states.data.form.Policies];
    const rowId: string =
      states.data.form.Policies[index] +
      "," +
      states.data.form.PolicyByIds![index].policyName;
    refreshGrid(rowId, states.data.form.Policies[index]);
    const PolicyName = removePolicyByIds[index]?.policyName;
    removePolicyByIds.splice(index, 1);
    removePolicies.splice(index, 1);
    ToastAlert(`${PolicyName} removed`, "warning");
    dispatch(
      setForms({
        ...states.data.form,
        PolicyByIds: removePolicyByIds,
        Policies: removePolicies,
      })
    );
  };
  console.log("states", states.data.form);
  return (
    <>
      {loader === false &&
      state.loading === false &&
      states.data.form !== undefined &&
      states.data.form?.PolicyByIds!.length > props.index! &&
      (states.data.form.PolicyByIds![props.index!].APIs!.length > 0 ||
        Object.keys(states.data.form.PolicyByIds![props.index!].Global!)
          .length > 0) ? (
        <>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <div style={{ display: "inline-flex", width: "100%" }}>
                <AccordionButton>
                  <b>
                    {states.data.form.PolicyByIds![props.index!].policyName}
                    &nbsp;
                  </b>
                  {" | "}
                  {states.data.form.PolicyByIds![props.index!].AuthType}
                </AccordionButton>
                <button
                  type="button"
                  style={{ width: "5%" }}
                  onClick={(e: any) => removeAccess(e, props.index)}
                >
                  <i className="bi bi-trash-fill menu-icon"></i>
                </button>
              </div>
              <Accordion.Body>
                {(
                  states.data.form.PolicyByIds![props.index!].APIs as any[]
                ).map((data: any, index: number) => {
                  return data.Limit !== null ? (
                    <div className="card" key={index}>
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {data.Name}
                            {" |"} <b> &nbsp;Per Api Limits and Quota</b>
                          </Accordion.Header>

                          <Accordion.Body>
                            <Row>
                              <Row>
                                <Col md="4">
                                  <Form.Group className="mb-3">
                                    <Form.Label className="mt-2">
                                      <b>Rate Limiting</b>
                                    </Form.Label>
                                    <Form.Check
                                      type="switch"
                                      data-testid="rate-switch"
                                      id="disableGlobalRate"
                                      name="GlobalLimit.IsDisabled"
                                      label="Disable rate limiting"
                                      disabled={true}
                                      className="ml-4"
                                      checked={
                                        data.Limit.rate === -1 ||
                                        data.Limit.rate === 0 ||
                                        data.Limit.per === 0
                                      }
                                    />
                                    <Form.Label className="mt-3">
                                      Rate
                                    </Form.Label>
                                    <br />

                                    <Form.Control
                                      className="mt-2"
                                      type="text"
                                      id="rate"
                                      placeholder="Enter Rate"
                                      value={
                                        props.isDisabled &&
                                        (data.Limit === null || undefined)
                                          ? states.data.form.PolicyByIds![
                                              props.index!
                                            ].Global!.Rate
                                          : data.Limit.rate === -1 ||
                                            data.Limit.rate === 0 ||
                                            data.Limit.per === 0
                                          ? "Unlimited"
                                          : data.Limit.rate
                                      }
                                      name="Rate"
                                      disabled={true}
                                    />
                                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                    <Form.Label className="mt-3">
                                      Per (Seconds)
                                    </Form.Label>
                                    <br />
                                    <Form.Control
                                      className="mt-2"
                                      type="text"
                                      id="per"
                                      placeholder="Enter time"
                                      value={
                                        props.isDisabled &&
                                        (data.Limit === null || undefined)
                                          ? states.data.form.PolicyByIds![
                                              props.index!
                                            ].Global!.Per
                                          : data.Limit.per === -1 ||
                                            data.Limit.per === 0 ||
                                            data.Limit.rate === 0
                                          ? "Unlimited"
                                          : data.Limit.per
                                      }
                                      name="RateLimit.Per"
                                      disabled={true}
                                    />
                                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                  </Form.Group>
                                </Col>
                                <Col md="4">
                                  <Form.Group className="mb-3">
                                    <Form.Label className="mt-2">
                                      <b>Throttling</b>
                                    </Form.Label>
                                    <Form.Check
                                      type="switch"
                                      data-testid="throttle-switch"
                                      id="disableThrottling"
                                      name="Throttling.IsDisabled"
                                      label="Disable Throttling"
                                      disabled={true}
                                      className="ml-4"
                                      checked={
                                        data.Limit.throttle_interval === -1 ||
                                        data.Limit.throttle_interval === 0 ||
                                        data.Limit.throttle_retry_limit === 0
                                      }
                                    />
                                    <Form.Label className="mt-3">
                                      Throttle retry limit
                                    </Form.Label>
                                    <br />
                                    <Form.Control
                                      className="mt-2"
                                      type="text"
                                      id="retry"
                                      name="Throttling.Retry"
                                      value={
                                        props.isDisabled &&
                                        (data.Limit === null || undefined)
                                          ? states.data.form.PolicyByIds![
                                              props.index!
                                            ].Global!.ThrottleRetries
                                          : data.Limit.throttle_retry_limit ===
                                              -1 ||
                                            data.Limit.throttle_retry_limit ===
                                              0 ||
                                            data.Limit.throttle_interval === 0
                                          ? "Disabled Throttling"
                                          : data.Limit.throttle_retry_limit
                                      }
                                      // value={throttleDefault}
                                      disabled={true}
                                    />

                                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                    <Form.Label className="mt-3">
                                      Throttle interval
                                    </Form.Label>
                                    <br />
                                    <Form.Control
                                      className="mt-2"
                                      type="text"
                                      id="interval"
                                      value={
                                        props.isDisabled &&
                                        (data.Limit === null || undefined)
                                          ? states.data.form.PolicyByIds![
                                              props.index!
                                            ].Global!.ThrottleInterval
                                          : data.Limit.throttle_interval ===
                                              -1 ||
                                            data.Limit.throttle_interval ===
                                              0 ||
                                            data.Limit.throttle_retry_limit ===
                                              0
                                          ? "Disabled Throttling"
                                          : data.Limit.throttle_interval
                                      }
                                      name="Throttling.Interval"
                                      disabled={true}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md="4">
                                  <Form.Group className="mb-3">
                                    <Form.Label className="mt-2">
                                      <b>Usage Quota</b>
                                    </Form.Label>
                                    <Form.Check
                                      type="switch"
                                      id="unlimitedRequests"
                                      name="unlimitedRequests.IsDisabled"
                                      label="Unlimited requests"
                                      disabled={true}
                                      className="ml-4"
                                      checked={
                                        data.Limit.quota_max === -1 ||
                                        data.Limit.quota_max === 0
                                      }
                                    />
                                    <Form.Label className="mt-3">
                                      Max requests per period
                                    </Form.Label>
                                    <br />
                                    <Form.Control
                                      className="mt-2"
                                      type="text"
                                      id="quotaPer"
                                      value={
                                        props.isDisabled &&
                                        (data.Limit === null || undefined)
                                          ? states.data.form.PolicyByIds![
                                              props.index!
                                            ].Global!.MaxQuota
                                          : data.Limit.quota_max === -1 ||
                                            data.Limit.quota_max === 0
                                          ? "Unlimited"
                                          : data.Limit.quota_max
                                      }
                                      name="Quota.Per"
                                      disabled={true}
                                    />
                                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                    <Form.Label className="mt-3">
                                      Quota resets every
                                    </Form.Label>
                                    <Form.Select
                                      className="mt-2"
                                      style={{ height: 46 }}
                                      value={data.Limit.quota_renewal_rate}
                                      disabled={true}
                                    >
                                      <option value={-1}>never</option>
                                      <option value={3600}>1 hour</option>
                                      <option value={21_600}>6 hour</option>
                                      <option value={43_200}>12 hour</option>
                                      <option value={604_800}>1 week</option>
                                      <option value={2.628e6}>1 month</option>
                                      <option value={1.577e7}>6 months</option>
                                      <option value={3.154_67}>
                                        12 months
                                      </option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Row>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ) : (
                    ""
                  );
                })}
                {states.data.form.PolicyByIds![props.index!].Global !==
                undefined ? (
                  <>
                    <div className="card">
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {states.data.form.PolicyByIds![
                              props.index!
                            ].Global!.Name.slice(0, -1)}
                            {" |"}
                            <b>&nbsp;Global Limits and Quota</b>
                          </Accordion.Header>

                          <Accordion.Body>
                            <Row>
                              <Row>
                                <Col md="4">
                                  {props.msg !== "" &&
                                  props.isDisabled === true ? (
                                    <Form.Group className="mb-3">
                                      <Form.Label className="mt-2">
                                        <b>Rate Limiting</b>
                                      </Form.Label>
                                      <div
                                        className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2"
                                        style={{ background: "#ADD8E6" }} // #96DED1
                                      >
                                        Rate Limit {props.msg}
                                      </div>
                                    </Form.Group>
                                  ) : (
                                    <Form.Group className="mb-3">
                                      <Form.Label className="mt-2">
                                        <b>Rate Limiting</b>
                                      </Form.Label>
                                      <Form.Check
                                        type="switch"
                                        id="disableGlobalRate"
                                        name="GlobalLimit.IsDisabled"
                                        label="Disable rate limiting"
                                        disabled={true}
                                        className="ml-4"
                                        checked={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Rate === -1 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Rate === 0 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Per === 0
                                        }
                                      />
                                      <Form.Label className="mt-3">
                                        Rate
                                      </Form.Label>
                                      <br />

                                      <Form.Control
                                        className="mt-2"
                                        type="text"
                                        id="rate"
                                        placeholder="Enter Rate"
                                        value={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Rate === -1 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Rate === 0 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Per === 0
                                            ? "Unlimited"
                                            : states.data.form.PolicyByIds![
                                                props.index!
                                              ].Global!.Rate
                                        }
                                        name="Rate"
                                        disabled={true}
                                      />
                                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                      <Form.Label className="mt-3">
                                        Per (Seconds)
                                      </Form.Label>
                                      <br />
                                      <Form.Control
                                        className="mt-2"
                                        type="text"
                                        id="per"
                                        placeholder="Enter time"
                                        value={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Per === -1 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Per === 0 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.Rate === 0
                                            ? "Unlimited"
                                            : states.data.form.PolicyByIds![
                                                props.index!
                                              ].Global!.Per
                                        }
                                        name="RateLimit.Per"
                                        disabled={true}
                                      />
                                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                    </Form.Group>
                                  )}
                                </Col>
                                <Col md="4">
                                  {props.msg !== "" &&
                                  props.isDisabled === true ? (
                                    <Form.Group className="mb-3">
                                      <Form.Label className="mt-2">
                                        <b>Throttling</b>
                                      </Form.Label>
                                      <div
                                        className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2 "
                                        style={{ background: "#ADD8E6" }}
                                      >
                                        Throttling {props.msg}
                                      </div>
                                    </Form.Group>
                                  ) : (
                                    <Form.Group className="mb-3">
                                      <Form.Label className="mt-2">
                                        <b>Throttling</b>
                                      </Form.Label>
                                      <Form.Check
                                        type="switch"
                                        id="disableThrottling"
                                        name="Throttling.IsDisabled"
                                        label="Disable Throttling"
                                        disabled={true}
                                        className="ml-4"
                                        checked={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleRetries === -1 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleRetries === 0 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleInterval === 0
                                        }
                                      />
                                      <Form.Label className="mt-3">
                                        Throttle retry limit
                                      </Form.Label>
                                      <br />
                                      <Form.Control
                                        className="mt-2"
                                        type="text"
                                        id="retry"
                                        name="Throttling.Retry"
                                        value={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleRetries === -1 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleRetries === 0 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleInterval === 0
                                            ? "Disabled Throttling"
                                            : states.data.form.PolicyByIds![
                                                props.index!
                                              ].Global!.ThrottleRetries
                                        }
                                        // value={throttleDefault}
                                        disabled={true}
                                      />

                                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                      <Form.Label className="mt-3">
                                        Throttle interval
                                      </Form.Label>
                                      <br />
                                      <Form.Control
                                        className="mt-2"
                                        type="text"
                                        id="interval"
                                        value={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleInterval === -1 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleInterval === 0 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.ThrottleRetries === 0
                                            ? "Disabled Throttling"
                                            : states.data.form.PolicyByIds![
                                                props.index!
                                              ].Global!.ThrottleInterval
                                        }
                                        name="Throttling.Interval"
                                        disabled={true}
                                      />
                                    </Form.Group>
                                  )}
                                </Col>
                                <Col md="4">
                                  {props.msg !== "" &&
                                  props.isDisabled === true ? (
                                    <Form.Group className="mb-3">
                                      <Form.Label className="mt-2">
                                        <b>Usage Quota</b>
                                      </Form.Label>
                                      <div
                                        className="mr-4 pt-3 pb-3 mt-2 border border-4 rounded-4 pl-2"
                                        style={{ background: "#ADD8E6" }}
                                      >
                                        Usage Quota {props.msg}
                                      </div>
                                    </Form.Group>
                                  ) : (
                                    <Form.Group className="mb-3">
                                      <Form.Label className="mt-2">
                                        <b>Usage Quota</b>
                                      </Form.Label>
                                      <Form.Check
                                        type="switch"
                                        id="unlimitedRequests"
                                        name="unlimitedRequests.IsDisabled"
                                        label="Unlimited requests"
                                        disabled={true}
                                        className="ml-4"
                                        checked={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.MaxQuota === -1 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.MaxQuota === 0
                                        }
                                      />
                                      <Form.Label className="mt-3">
                                        Max requests per period
                                      </Form.Label>
                                      <br />
                                      <Form.Control
                                        className="mt-2"
                                        type="text"
                                        id="quotaPer"
                                        value={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.MaxQuota === -1 ||
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.MaxQuota === 0
                                            ? "Unlimited"
                                            : states.data.form.PolicyByIds![
                                                props.index!
                                              ].Global!.MaxQuota
                                        }
                                        name="Quota.Per"
                                        disabled={true}
                                      />
                                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                                      <Form.Label className="mt-3">
                                        Quota resets every
                                      </Form.Label>
                                      <Form.Select
                                        className="mt-2"
                                        style={{ height: 46 }}
                                        value={
                                          states.data.form.PolicyByIds![
                                            props.index!
                                          ].Global!.QuotaRenewalRate
                                        }
                                        disabled={true}
                                      >
                                        <option value={-1}>never</option>
                                        <option value={3600}>1 hour</option>
                                        <option value={21_600}>6 hour</option>
                                        <option value={43_200}>12 hour</option>
                                        <option value={604_800}>1 week</option>
                                        <option value={2.628e6}>1 month</option>
                                        <option value={1.577e7}>
                                          6 months
                                        </option>
                                        <option value={3.154_67}>
                                          12 months
                                        </option>
                                      </Form.Select>
                                    </Form.Group>
                                  )}
                                </Col>
                              </Row>
                            </Row>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}
