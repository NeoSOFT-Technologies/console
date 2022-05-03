import React, { useEffect, useState } from "react";
import { Row, Form, Col, Modal } from "react-bootstrap";
// import Spinner from "../../../../../../../../components/loader/Loader";
// import { setForm } from "../../../../../../../../store/features/gateway/api/update/slice";
import { addCertificate } from "../../../../../../../../store/features/gateway/certificate/create/slice";
import { getAllCertificate } from "../../../../../../../../store/features/gateway/certificate/list/slice";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../../store/hooks";
// import { setFormData } from "../../../../../../../resources/api/api-constants";

export default function MutualTLS() {
  const dispatch = useAppDispatch();
  const updateState = useAppSelector((RootState) => RootState.updateApiState);
  const certificateState = useAppSelector(
    (RootState) => RootState.getAllCertificateState
  );
  console.log("state", certificateState);
  // const [certId, setCertId] = useState<any>([]);
  const [file, setFile] = useState<any>([]);
  const [radio, setRadio] = useState("uploadCert");
  const [fileName, setFileName] = useState<any>("");
  const mainCall = async () => {
    dispatch(getAllCertificate());
  };
  useEffect(() => {
    mainCall();
  }, []);
  const handleAddNewCertificate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (radio === "uploadCert") {
      const data = new FormData();
      data.append("file", fileName);
      console.log("formData", data);
      dispatch(addCertificate(data));
    }
    // else {
    //   const obj = [...updateState.data.form.CertIds, certId];
    //   dispatch(setForm({ ...updateState.data.form, CertIds: obj }));
    //   setCertId([""]);
    // }
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShow(true);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRadio(value);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { value } = event.target;
    // // setCertId(value);
  };
  const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("value", e.target.files![0]);
    setFileName(e.target.files![0]);
    setFile(e.target.value);
  };
  const deletetheFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFile([]);
  };
  return (
    <div>
      <>
        <div className="border rounded p-2">
          Changing the Authentication mode on an active API can have severe
          consequences for your users. Please be aware that this will stop the
          current keys working for this API.
        </div>
        <br />
        <p>
          Only clients with whitelisted SSL certificates will be allowed to
          access your API.
        </p>
        <button
          className=" btn btn-sm btn-dark btn-sm float-right mb-2"
          // onClick={(e) => handleAddCertificate(e)}
          onClick={(e) => handleShow(e)}
        >
          <span className="bi bi-plus-lg"></span>&nbsp;Add new Certificate
        </button>

        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Add New Certificate</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md="6">
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Upload Certificate"
                    id="uploadCert"
                    value="uploadCert"
                    name="group1"
                    checked={radio === "uploadCert"}
                    onChange={(e) => handleRadioChange(e)}
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <Form.Check
                    type="radio"
                    label="Certificate Id"
                    id="certId"
                    value="certId"
                    name="group1"
                    checked={radio === "certId"}
                    onChange={(e) => handleRadioChange(e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            {radio === "certId" ? (
              <>
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
                      // value={certId}
                      onChange={(e: any) => handleInputChange(e)}
                    />
                    {/* <Form.Control.Feedback type="invalid">
                    {state.data.errors?.Name}
                  </Form.Control.Feedback> */}
                  </Form.Group>
                  {/* <input type="text" className="form-control" /> */}
                </div>
              </>
            ) : (
              <>
                <div>
                  Upload new SSL certificate in PEM format. If the crtificate
                  should have a private key, convert both the public certificate
                  and the associated private key to PEM format and the
                  concatenate them to a single file.
                </div>
                <br />
                <div>
                  <Form.Group className="mb-3 ">
                    <Form.Label>Upload Certificate file</Form.Label>
                    <br />
                    <div className="form-control pb-4 mb-1">
                      <input
                        name="file"
                        value={file}
                        onChange={(e: any) => handlefile(e)}
                        type="file"
                      />
                      <button
                        className="float-end btn btn-sm"
                        onClick={(e) => deletetheFile(e)}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </div>
                  </Form.Group>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn-dark rounded float-end"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-success rounded float-end"
              onClick={handleAddNewCertificate}
            >
              Add
            </button>
          </Modal.Footer>
        </Modal>
        <br />
        <br />
        <Row className="ml-1 mr-1">
          <table className="table table-bordered ">
            <thead className="thead-dark">
              <tr>
                <th>
                  {updateState.data.form.CertIds.length} selected Certificates{" "}
                </th>
                <th>Select from exisiting certificates</th>
              </tr>
            </thead>
            <tbody>
              {certificateState.loading === false ? (
                certificateState.data?.form.map((data: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>
                        <label>
                          {/* {data}{" "} */}
                          <button type="button" className="btn ml-5">
                            -
                          </button>
                        </label>
                      </td>
                      <td>
                        <label>
                          {data[index].CertificateId}
                          <button type="button" className="btn ml-5">
                            +
                          </button>
                        </label>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </Row>
      </>
    </div>
  );
}
