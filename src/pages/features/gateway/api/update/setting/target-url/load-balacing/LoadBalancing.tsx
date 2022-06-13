import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
import {
  setFormErrors,
  regexForTargetUrl,
} from "../../../../../../../../resources/gateway/api/api-constants";
import { setForm } from "../../../../../../../../store/features/gateway/api/update/slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/hooks";
export default function LoadBalancing() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  console.log("state", state);
  const [addUrl, setaddUrl] = useState<any>([]);
  console.log("addurl", addUrl);
  const [arrUrl, setArrUrl] = useState<any>([]);
  const [addFormData, setAddFormData] = useState<any>({
    LoadBalancingTargets: "",
  });
  const [loading, setLoading] = useState(true);
  const trafficCalculation = (index: number) => {
    let weightSum = 0;
    for (const element of addUrl) {
      weightSum += Number(element.weighting);
    }
    const traffic: number = 100 / weightSum;
    const percentage: number = traffic * addUrl[index].weighting;
    const trafficPercentage =
      Math.round((percentage + Number.EPSILON) * 100) / 100;
    return trafficPercentage;
  };
  const setArrayLength = () => {
    if (state.data.form.LoadBalancingTargets.length > 0) {
      for (let i = 0; i < state.data.form.LoadBalancingTargets.length; i++) {
        const urlExistLocalState = addUrl!.some(
          (x: any) =>
            x?.loadBalancing === state.data.form.LoadBalancingTargets[i]
        );
        console.log("as", urlExistLocalState);
        arrUrl.push(state.data.form.LoadBalancingTargets[i]);
        if (!urlExistLocalState) {
          const sameUrlArray = state.data.form.LoadBalancingTargets.filter(
            (item) => item === state.data.form.LoadBalancingTargets[i]
          );
          const urlWeightCount = sameUrlArray.length;
          console.log("movies", sameUrlArray);
          console.log("count", urlWeightCount);
          const weightObj: any = {
            loadBalancing: state.data.form.LoadBalancingTargets[i],
            weighting: urlWeightCount,
            traffic: 0,
          };
          addUrl.push(weightObj);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("useeffect");
    setArrayLength();
  }, []);
  const handleTrafficElement = (index: number) => {
    const weightObj = [...addUrl];
    console.log("traffic", weightObj);
    const tra = trafficCalculation(index);
    weightObj[index] = {
      ...weightObj[index],
      traffic: tra,
    };
    return weightObj[index].traffic;
  };
  const handleFormInputChange = (event: any) => {
    const { name, value } = event.target;

    switch (name) {
      case "LoadBalancingTargets":
        setFormErrors(
          {
            ...state.data.errors,
            [name]: regexForTargetUrl.test(value) ? "" : "Enter a valid Url ",
          },
          dispatch
        );
        break;
      default:
        break;
    }
    const formobj = { ...addFormData };
    formobj[name] = value;
    setAddFormData(formobj);
  };
  const handleAddClick = () => {
    const urlAlreadyExist = addUrl.some(
      (x: any) => x?.loadBalancing === addFormData.LoadBalancingTargets
    );
    console.log("123", urlAlreadyExist);
    if (!urlAlreadyExist) {
      const loadObj = {
        loadBalancing: addFormData.LoadBalancingTargets,
        weighting: 1,
        traffic: 0,
      };
      setaddUrl([...addUrl, loadObj]);
      setArrUrl([...arrUrl, addFormData.LoadBalancingTargets]);

      const rowObj: any = [
        ...state.data.form.LoadBalancingTargets,
        addFormData.LoadBalancingTargets,
      ];

      console.log("add", rowObj);
      dispatch(setForm({ ...state.data.form, LoadBalancingTargets: rowObj }));
      setLoading(false);
    } else {
      ToastAlert("Url Already Added ", "error");
    }
    setAddFormData({ ...addFormData, LoadBalancingTargets: "" });
  };
  const deleteTableRows = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const row: any = [...arrUrl];
    for (let i = 0; i < addUrl[index].weighting; i++) {
      console.log("we", addUrl[index].weighting);

      const url: string = addUrl[index].loadBalancing;
      const indexLocalState = row.indexOf(url);
      row.splice(indexLocalState, 1);
      setArrUrl(row);
    }
    dispatch(setForm({ ...state.data.form, LoadBalancingTargets: row }));
    console.log("st1", state.data.form);
    const weightObj = [...addUrl];
    weightObj.splice(index, 1);
    setaddUrl(weightObj);
  };
  const handleWeighting = (e: any, index: number) => {
    const { name, value } = e.target;
    const number = addUrl[index].weighting;
    const formobj = [...addUrl];
    formobj[index] = { ...formobj[index], [name]: value };
    setaddUrl(formobj);
    if (number < formobj[index].weighting) {
      setArrUrl([...arrUrl, addUrl[index].loadBalancing]);
      const rowObj: any = [
        ...state.data.form.LoadBalancingTargets,
        addUrl[index].loadBalancing,
      ];
      console.log("add", rowObj);
      dispatch(setForm({ ...state.data.form, LoadBalancingTargets: rowObj }));
    }
    if (number > formobj[index].weighting) {
      const url: string = addUrl[index].loadBalancing;
      const objLocalState = [...arrUrl];
      const indexLocalState = objLocalState.indexOf(url);
      objLocalState.splice(indexLocalState, 1);
      setArrUrl(objLocalState);
      const objState: any = [...state.data.form.LoadBalancingTargets];
      const indexState = objState.indexOf(url);
      objState.splice(indexState, 1);
      dispatch(setForm({ ...state.data.form, LoadBalancingTargets: objState }));
    }
  };
  return (
    <div>
      <Row>
        <i className="mb-3">
          Application Gateway can perform round-robin load balancing on a series
          of upstream targets, you will need to add all of the targets using the
          fields below.
        </i>
        <br />
        <br />
        <Form.Label> Add Target URL&apos;s :</Form.Label>
        <Col md="10">
          <Form.Group className="mb-3">
            <Form.Control
              className="mt-2"
              type="text"
              id="LoadBalancingTargets"
              value={addFormData.LoadBalancingTargets || ""}
              placeholder="Please enter target(s) and hit enter key"
              name="LoadBalancingTargets"
              isInvalid={!!state.data.errors?.LoadBalancingTargets}
              isValid={!state.data.errors?.LoadBalancingTargets}
              onChange={handleFormInputChange}
            />
            <Form.Control.Feedback type="invalid">
              {state.data.errors?.LoadBalancingTargets}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md="2">
          <Form.Group className="mt-2 mb-3">
            <Button
              onClick={handleAddClick}
              variant="dark"
              disabled={
                !addFormData.LoadBalancingTargets ||
                !!state.data.errors?.LoadBalancingTargets
              }
            >
              Add
            </Button>{" "}
          </Form.Group>
        </Col>
        <i>
          If you add a trailing &apos;/ &apos; to your listen path, you can only
          make requests that include the trailing &apos;/ &apos;
        </i>
      </Row>
      <div className="container">
        <div className="row">
          <div className="col-sm-11">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Upstream Target</th>
                  <th>Weighting</th>
                  <th>Traffic</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loading === false ? (
                <tbody>
                  {/* {state.data.form.LoadBalancingTargets.map( */}
                  {addUrl.map((data: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td>
                          <label>{data.loadBalancing}</label>
                        </td>
                        <td>
                          <input
                            type="number"
                            name="weighting"
                            min="1"
                            // value={weight[index].weighting}
                            // value={addUrl[index].weighting}
                            value={data.weighting}
                            className="form-control"
                            onChange={(evnt) => handleWeighting(evnt, index)}
                          />
                        </td>

                        <td>
                          <label>{handleTrafficElement(index)} % </label>
                        </td>
                        <td>
                          <button
                            className="btn btn-default bi bi-trash-fill"
                            onClick={(e) => deleteTableRows(e, index)}
                          ></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <></>
              )}
            </table>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
}
