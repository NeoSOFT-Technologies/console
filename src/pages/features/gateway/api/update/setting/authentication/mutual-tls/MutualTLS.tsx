import React, { useEffect, useState } from "react";
import { Row, Form, Col, Modal } from "react-bootstrap";
import {
  access,
  AuthGuard,
} from "../../../../../../../../components/auth-gaurd";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
import Tooltips from "../../../../../../../../components/tooltips/Tooltips";
import { setForm } from "../../../../../../../../store/features/gateway/api/update/slice";
import { addCertificate } from "../../../../../../../../store/features/gateway/certificate/create/slice";
import { IGetAllCertificateData } from "../../../../../../../../store/features/gateway/certificate/list/index";
import {
  getAllCertificate,
  setFormCert,
} from "../../../../../../../../store/features/gateway/certificate/list/slice";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../../../../../store/hooks";
export default function MutualTLS() {
  const dispatch = useAppDispatch();
  const updateState = useAppSelector((RootState) => RootState.updateApiState);
  const certificateState = useAppSelector(
    (RootState) => RootState.getAllCertificateState
  );
  const [certId, setCertId] = useState<any>([]);
  const [certId1, setCertId1] = useState<any>("");
  const [file, setFile] = useState<any>("");
  const [radio, setRadio] = useState("uploadCert");
  const [fileName, setFileName] = useState<any>("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);
  const handleClose = () => {
    setFile("");
    setCertId1("");
    setShow(false);
  };

  const listObj = (obj: any) => {
    return {
      CertId: obj?.CertId,
      Issuer: obj?.Issuer,
      SignatureAlgorithm: obj?.SignatureAlgorithm,
      Subject: obj?.Subject,
      Thumbprint: obj?.Thumbprint,
      ValidNotAfter: obj?.ValidNotAfter,
      ValidNotBefore: obj?.ValidNotBefore,
      showDetails: false,
    };
  };
  const mainCall = async () => {
    const result1 = await dispatch(getAllCertificate());
    if (updateState.data.form.CertIds.length > 0) {
      // Look
      for (const arr2 of updateState.data.form.CertIds) {
        const objCertState = result1.payload.CertificateCollection.find(
          (obj1: IGetAllCertificateData) => obj1.CertId === arr2
        );
        const list = listObj(objCertState);
        const idAlreadyExist = certId.some((x: any) => x?.CertId === arr2);
        if (!idAlreadyExist) {
          certId.push(list);
        }
        console.log("certid", certId);
      }
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  const radioUploadCert = async () => {
    let result: any;
    if (fileName.name.includes(".pem")) {
      const data = new FormData();
      data.append("file", fileName);
      result = await dispatch(addCertificate(data));

      mainCall();
      setFile("");
      setFileName("");

      if (result.meta.requestStatus === "rejected") {
        ToastAlert(result.payload.message, "error");
      } else if (result.meta.requestStatus === "fulfilled") {
        ToastAlert("Certificate Added Successfully!!", "success");
        handleClose();
      }
    } else {
      ToastAlert("Please select the .pem file type", "error");
      setFile("");
      setFileName("");
    }
  };
  function radioCertId() {
    const certobjId = certificateState.data?.CertificateCollection;
    const certIdExistCertState = certobjId?.some(
      (x: any) => x?.CertId === certId1
    );
    if (certIdExistCertState) {
      const certIdExistUpdateState =
        updateState.data.form?.CertIds?.includes(certId1);
      if (!certIdExistUpdateState) {
        const arrUpdateState = [...updateState.data.form.CertIds, certId1];
        dispatch(
          setForm({ ...updateState.data.form, CertIds: arrUpdateState })
        );
        handleClose();
      } else {
        ToastAlert("Certificate already selected", "error");
      }
      const objCertState = certificateState.data?.CertificateCollection.find(
        (obj1) => obj1.CertId === certId1
      );
      const list = listObj(objCertState);
      const idAlreadyExist = certId.some((x: any) => x?.CertId === certId1);
      if (!idAlreadyExist) {
        setCertId([...certId, list]);
      }
    } else {
      ToastAlert("Certificate of Id " + certId1 + " is not available", "error");
    }
  }
  const handleAddNewCertificate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (radio === "uploadCert") {
      radioUploadCert();
    } else {
      radioCertId();
      setCertId1("");
    }
  };
  useEffect(() => {
    mainCall();
  }, []);

  const handleShow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShow(true);
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFile("");
    setCertId1("");
    setRadio(value);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCertId1(value);
  };
  const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.item(0)); // look
    setFile(e.target.value);
  };
  const deletetheFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFile("");
    setFileName("");
  };
  const handlePlusButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const certobjId =
      certificateState.data?.CertificateCollection[index]?.CertId || ""; // Look
    const certIdExistUpdateState =
      updateState.data.form?.CertIds?.includes(certobjId);
    if (!certIdExistUpdateState) {
      const arrUpdateState = [
        ...updateState.data.form.CertIds,
        certificateState.data?.CertificateCollection[index].CertId,
      ];
      dispatch(setForm({ ...updateState.data.form, CertIds: arrUpdateState }));
      const list = listObj(certificateState.data?.CertificateCollection[index]);
      const idAlreadyExist = certId.some((x: any) => x?.CertId === certobjId);
      if (!idAlreadyExist) {
        certId.push(list);
      }
    } else {
      ToastAlert("Already selected", "error");
    }
  };
  const handleMinusButton = (
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    const row = [...updateState.data.form.CertIds];
    row.splice(index, 1);
    dispatch(setForm({ ...updateState.data.form, CertIds: row }));
    const row1 = [...certId];
    row1.splice(index, 1);
    setCertId(row1);
  };
  const handleDropLeftTable = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const data = [...(certificateState.data?.CertificateCollection || [])]; // Look
    data[index] = {
      ...data[index],
      showDetails: !data[index].showDetails,
    };
    dispatch(setFormCert(data));
  };

  const handleDropRightTable = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const data = [...certId];
    data[index] = {
      ...data[index],
      showDetails: !data[index].showDetails,
    };
    setCertId(data);
  };
  function certDetails(certObj: any, index: any) {
    return certObj[index].showDetails ? (
      <div>
        <label>Issuer Common Name : {certObj[index].Issuer.slice(3, 12)}</label>
        <br />
        <label>
          Subject Common Name : {certObj[index].Subject.slice(3, 12)}
        </label>
        <br />
        <label>Not Before : {certObj[index].ValidNotAfter}</label>
        <br />
        <label>Not After : {certObj[index].ValidNotBefore}</label>
      </div>
    ) : (
      <></>
    );
  }
  return (
    <div>
      <>
        <Col md={12}>
          <div className="float-left mt-2">
            <b>Mutual TLS</b>
          </div>
          <Tooltips
            content="Changing the Authentication mode on an active API can have severe
            consequences for your users. Please be aware that this will stop the
            current keys working for this API."
          />
        </Col>
        <br />
        <br />
        <p>
          Only clients with whitelisted SSL certificates will be allowed to
          access your API.
        </p>
        <AuthGuard resource={access.resources.Api} scope={access.scopes.Edit}>
          <button
            className=" btn btn-sm btn-dark btn-sm float-right mb-2"
            onClick={(e) => handleShow(e)}
          >
            <span className="bi bi-plus-lg"></span>&nbsp;Add new Certificate
          </button>
        </AuthGuard>

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
                      value={certId1}
                      onChange={(e: any) => handleInputChange(e)}
                    />
                  </Form.Group>
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
              disabled={file.length === 0 && certId1 === ""}
              onClick={handleAddNewCertificate}
            >
              Add
            </button>
          </Modal.Footer>
        </Modal>
        <br />
        <br />
        <Row className="ml-1 mr-1">
          <Col md="6">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Select from exisiting certificates</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {certificateState.data?.CertificateCollection !== undefined &&
                  certificateState.data?.CertificateCollection.length > 0 ? (
                    certificateState.data?.CertificateCollection.map(
                      (data: any, index: any) => {
                        return (
                          <tr key={index}>
                            <td>
                              <label>
                                {data.CertId}
                                <br />
                                <br />
                                {certDetails(
                                  certificateState.data?.CertificateCollection,
                                  index
                                )}
                              </label>
                            </td>

                            <td>
                              <button
                                type="button"
                                data-testid="handlePlus-button"
                                className="btn"
                                onClick={(e: any) => handlePlusButton(e, index)}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                data-testid="handleDropLeft-table"
                                className="btn"
                                onClick={(e: any) =>
                                  handleDropLeftTable(e, index)
                                }
                              >
                                <i
                                  className={`${
                                    certificateState.data
                                      ?.CertificateCollection[index].showDetails
                                      ? "bi bi-chevron-up"
                                      : "bi bi-chevron-down"
                                  }`}
                                ></i>
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
          <Col md="6">
            <div className="table-responsive">
              <table className="table table-bordered ">
                <thead className="thead-dark">
                  <tr>
                    <th>
                      {updateState.data.form.CertIds.length} selected
                      Certificates{" "}
                    </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {loader === false &&
                  updateState.data.form.CertIds.length === certId.length &&
                  updateState.data.form.CertIds.length > 0 ? (
                    updateState.data.form.CertIds.map(
                      (data: any, index: any) => {
                        return (
                          <tr key={index}>
                            <td>
                              <label>
                                {data}
                                <br />
                                <br />
                                {certId.length ===
                                updateState.data.form.CertIds.length ? (
                                  certDetails(certId, index)
                                ) : (
                                  <></>
                                )}
                              </label>
                            </td>
                            <td>
                              <button
                                type="button"
                                data-testid="handleMinus-button"
                                className="btn"
                                onClick={(e: any) =>
                                  handleMinusButton(e, index)
                                }
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                data-testid="handleDropRight-table"
                                className="btn"
                                onClick={(e: any) =>
                                  handleDropRightTable(e, index)
                                }
                              >
                                <i
                                  className={`${
                                    certId[index].showDetails
                                      ? "bi bi-chevron-up"
                                      : "bi bi-chevron-down"
                                  }`}
                                ></i>
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </>
    </div>
  );
}
