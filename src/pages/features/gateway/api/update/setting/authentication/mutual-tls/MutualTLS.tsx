import React, { useState } from "react";
import { Row, Form } from "react-bootstrap";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../store/hooks";
// import { setFormData } from "../../../../../../../resources/api/api-constants";
import { setForm } from "../../../../../../../store/features/api/update/slice";

export default function MutualTLS() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((RootState) => RootState.updateApiState);
  const [certId, setCertId] = useState<any>([]);
  const handleAddNewCertificate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const obj = [...state.data.form.CertIds, certId];
    dispatch(setForm({ ...state.data.form, CertIds: obj }));
    setCertId([""]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCertId(value);
  };
  return (
    <div>
      <div className="border rounded p-2">
        Changing the Authentication mode on an active API can have severe
        consequences for your users. Please be aware that this will stop the
        current keys working for this API.
      </div>
      <br />
      <p>
        Only clients with whitelisted SSL certificates will be allowed to access
        your API.
      </p>
      <button
        className=" btn btn-sm btn-dark btn-sm float-right mb-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        // onClick={(e) => handleAddCertificate(e)}
        onClick={(e) => e.preventDefault()}
      >
        <span className="bi bi-plus-lg"></span>&nbsp;Add new Certificate
      </button>
      <div className="modal fade" id="exampleModal" aria-hidden="true">
        <div className="modal-dialog modal-md modal-dialog-top">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Add New Certificates</h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                Specify the existing certificate ID or path to the certificate
                file located on the gateway server.
              </div>
              <br />
              <div>
                <Form.Group className="mb-3 ">
                  <Form.Label> Certificate Id:</Form.Label>
                  <br />
                  <Form.Control
                    className="mt-2"
                    type="text"
                    id="certId"
                    name="certId"
                    value={certId}
                    onChange={(e: any) => handleInputChange(e)}
                  />
                  {/* <Form.Control.Feedback type="invalid">
                    {state.data.errors?.Name}
                  </Form.Control.Feedback> */}
                </Form.Group>
                {/* <input type="text" className="form-control" /> */}
              </div>
              <button
                type="button"
                className="btn-success rounded float-end"
                onClick={handleAddNewCertificate}
              >
                Add
              </button>
              <button
                type="button"
                className="btn-dark rounded float-end mr-3"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Row className="ml-1 mr-1">
        <table className="table table-bordered ">
          <thead className="thead-dark">
            <tr>
              <th>0 selected Certificates </th>
              <th>Select from exisiting certificates</th>
            </tr>
          </thead>
          <tbody>
            {state.data.form.CertIds.map((data: any, index: any) => {
              return (
                <tr key={index}>
                  <td>
                    <label>
                      {data}{" "}
                      <button type="button" className="btn ml-5">
                        -
                      </button>
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Row>
    </div>
  );
}
