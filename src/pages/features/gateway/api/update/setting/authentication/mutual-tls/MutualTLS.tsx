import React, { useEffect, useState } from "react";
import { Row, Form, Col, Modal } from "react-bootstrap";
import { ToastAlert } from "../../../../../../../../components/toast-alert/toast-alert";
// import Spinner from "../../../../../../../../components/loader/Loader";
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
// import { setFormData } from "../../../../../../../resources/api/api-constants";
export default function MutualTLS() {
  const dispatch = useAppDispatch();
  const updateState = useAppSelector((RootState) => RootState.updateApiState);
  const certificateState = useAppSelector(
    (RootState) => RootState.getAllCertificateState
  );
  const addCertificateState = useAppSelector(
    (RootState) => RootState.addCertificateState
  );
  // const [divShow, setDivShow] = useState<any>(false);
  const [certId, setCertId] = useState<any>([]);
  const [certId1, setCertId1] = useState<any>([]);
  const [file, setFile] = useState<any>([]);
  const [radio, setRadio] = useState("uploadCert");
  const [fileName, setFileName] = useState<any>("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);
  // const [loader1, setLoader1] = useState(true);
  const handleClose = () => {
    setFile([]);
    setCertId1([]);
    setShow(false);
  };
  const mainCall = async () => {
    const result1 = await dispatch(getAllCertificate());
    if (updateState.data.form.CertIds.length > 0) {
      for (let i = 0; i < updateState.data.form.CertIds.length; i++) {
        const arr2 = updateState.data.form.CertIds[i];
        console.log("arr", arr2);
        const objCertState = result1.payload.CertificateCollection.find(
          (obj1: IGetAllCertificateData) => obj1.CertId === arr2
        );
        console.log(objCertState);
        const list = {
          CertId: objCertState?.CertId,
          Issuer: objCertState?.Issuer,
          SignatureAlgorithm: objCertState?.SignatureAlgorithm,
          Subject: objCertState?.Subject,
          Thumbprint: objCertState?.Thumbprint,
          ValidNotAfter: objCertState?.ValidNotAfter,
          ValidNotBefore: objCertState?.ValidNotBefore,
          showDetails: false,
        };
        // setCertId([...certId, list]);
        const idAlreadyExist = certId.some((x: any) => x?.CertId === arr2);
        console.log("idAlreadyExist", idAlreadyExist);
        if (!idAlreadyExist) {
          certId.push(list);
        }
      }
      setLoader(false);
      console.log("result", certId);
    } else {
      setLoader(false);
    }
  };
  const handleAddNewCertificate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (radio === "uploadCert") {
      const data = new FormData();
      data.append("file", fileName);
      const result = await dispatch(addCertificate(data));
      mainCall();
      setFile([]);
      console.log("satteadd", addCertificateState);
      if (result.meta.requestStatus === "rejected") {
        ToastAlert(result.payload.message, "error");
      } else if (result.meta.requestStatus === "fulfilled") {
        ToastAlert("Certificate Added Successfully!!", "success");
        handleClose();
      }
    } else {
      const certobjId = certificateState.data?.CertificateCollection;
      const certIdExistCertState = certobjId!.some(
        (x: any) => x?.CertId === certId1
      );
      console.log("certIdExistCertState", certIdExistCertState);
      if (certIdExistCertState) {
        const certIdExistUpdateState =
          updateState.data.form?.CertIds?.includes(certId1);
        console.log("certIdExistUpdateState", certIdExistUpdateState);
        if (!certIdExistUpdateState) {
          const arrUpdateState = [...updateState.data.form.CertIds, certId1];
          dispatch(
            setForm({ ...updateState.data.form, CertIds: arrUpdateState })
          );
          handleClose();
        } else {
          ToastAlert("Already selected", "error");
        }
        const objCertState = certificateState.data!.CertificateCollection.find(
          (obj1) => obj1.CertId === certId1
        );
        const list = {
          CertId: objCertState?.CertId,
          Issuer: objCertState?.Issuer,
          SignatureAlgorithm: objCertState?.SignatureAlgorithm,
          Subject: objCertState?.Subject,
          Thumbprint: objCertState?.Thumbprint,
          ValidNotAfter: objCertState?.ValidNotAfter,
          ValidNotBefore: objCertState?.ValidNotBefore,
          showDetails: false,
        };
        const idAlreadyExist = certId.some((x: any) => x?.CertId === certId1);
        console.log("idAlreadyExist", idAlreadyExist);
        if (!idAlreadyExist) {
          setCertId([...certId, list]);
        }
      }
      setCertId1([]);
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
    setFile([]);
    setCertId1([]);
    setRadio(value);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCertId1(value);
  };
  const handlefile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files![0]);
    setFile(e.target.value);
  };
  const deletetheFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setFile([""]);
  };
  const handlePlusButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    const certobjId =
      certificateState.data?.CertificateCollection[index]?.CertId!;
    const certIdExistUpdateState =
      updateState.data.form?.CertIds?.includes(certobjId);
    if (!certIdExistUpdateState) {
      const arrUpdateState = [
        ...updateState.data.form.CertIds,
        certificateState.data?.CertificateCollection[index].CertId,
      ];
      dispatch(setForm({ ...updateState.data.form, CertIds: arrUpdateState }));

      const list = {
        CertId: certificateState.data?.CertificateCollection[index]?.CertId,
        Issuer: certificateState.data?.CertificateCollection[index]?.Issuer,
        SignatureAlgorithm:
          certificateState.data?.CertificateCollection[index]
            ?.SignatureAlgorithm,
        Subject: certificateState.data?.CertificateCollection[index]?.Subject,
        Thumbprint:
          certificateState.data?.CertificateCollection[index]?.Thumbprint,
        ValidNotAfter:
          certificateState.data?.CertificateCollection[index]?.ValidNotAfter,
        ValidNotBefore:
          certificateState.data?.CertificateCollection[index]?.ValidNotBefore,
        showDetails: false,
      };

      // const len =
      //   updateState.data.form.CertIds.length === 0
      //     ? 1
      //     : updateState.data.form.CertIds.length;
      for (let i = 0; i < updateState.data.form.CertIds.length; i++) {
        const arr2 = updateState.data.form.CertIds[i + 1];
        console.log("Arr2", arr2);
        const idAlreadyExist = certId.some((x: any) => x?.CertId === arr2);
        console.log("idAlreadyExist", idAlreadyExist);
        if (!idAlreadyExist) {
          // setCertId([...certId, list]);
          certId.push(list);
        }
      }
    } else {
      ToastAlert("Already selected", "error");
    }
  };
  console.log("update", updateState.data.form);
  const handleMinusButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
    const data = [...certificateState.data?.CertificateCollection!];
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
  console.log("123", certId);
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
            <table className="table table-bordered responsive">
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
                              {certificateState.data?.CertificateCollection[
                                index
                              ].showDetails ? (
                                <div>
                                  <label>
                                    Issuer Common Name :{" "}
                                    {certificateState.data?.CertificateCollection[
                                      index
                                    ].Issuer.slice(3, 12)}
                                  </label>
                                  <br />
                                  <label>
                                    Subject Common Name :{" "}
                                    {certificateState.data?.CertificateCollection[
                                      index
                                    ].Subject.slice(3, 12)}
                                  </label>
                                  <br />
                                  <label>
                                    Not Before :{" "}
                                    {
                                      certificateState.data
                                        ?.CertificateCollection[index]
                                        .ValidNotAfter
                                    }
                                  </label>
                                  <br />
                                  <label>
                                    Not After :{" "}
                                    {
                                      certificateState.data
                                        ?.CertificateCollection[index]
                                        .ValidNotBefore
                                    }
                                  </label>
                                </div>
                              ) : (
                                <></>
                              )}
                            </label>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn"
                              onClick={(e: any) => handlePlusButton(e, index)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn"
                              onClick={(e: any) =>
                                handleDropLeftTable(e, index)
                              }
                            >
                              <i
                                className={`${
                                  certificateState.data?.CertificateCollection[
                                    index
                                  ].showDetails
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
          </Col>
          <Col md="6">
            <table className="table table-bordered ">
              <thead className="thead-dark">
                <tr>
                  <th>
                    {updateState.data.form.CertIds.length} selected Certificates{" "}
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loader === false &&
                updateState.data.form.CertIds.length === certId.length &&
                updateState.data.form.CertIds.length > 0 ? (
                  updateState.data.form.CertIds.map((data: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td>
                          <label>
                            {data}
                            <br />
                            <br />
                            {certId.length ===
                            updateState.data.form.CertIds.length ? (
                              certId[index].showDetails ? (
                                <div>
                                  <label>
                                    Issuer Common Name :{" "}
                                    {certId[index].Issuer.slice(3, 12)}
                                  </label>
                                  <br />
                                  <label>
                                    Subject Common Name :{" "}
                                    {certId[index].Subject.slice(3, 12)}
                                  </label>
                                  <br />
                                  <label>
                                    Not Before : {certId[index].ValidNotAfter}
                                  </label>
                                  <br />
                                  <label>
                                    Not After : {certId[index].ValidNotBefore}
                                  </label>
                                </div>
                              ) : (
                                <></>
                              )
                            ) : (
                              <></>
                            )}
                          </label>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn"
                            onClick={(e: any) => handleMinusButton(e, index)}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                        </td>
                        {certId.length > 0 &&
                        certId.length ===
                          updateState.data.form.CertIds.length ? (
                          <td>
                            <button
                              type="button"
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
                        ) : (
                          <></>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </>
    </div>
  );
}
