import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { access, AuthGuard } from "../../../../../components/auth-gaurd";
import RenderList, {
  refreshGrid,
} from "../../../../../components/list/RenderList";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { gridPageSize } from "../../../../../resources/gateway/common";
import { emptyState } from "../../../../../store/features/gateway/key/create/payload";
import {
  setFormErrors,
  setForms,
} from "../../../../../store/features/gateway/key/create/slice";
import { deleteKey } from "../../../../../store/features/gateway/key/delete/slice";
import { useAppDispatch } from "../../../../../store/hooks";
import { formatDate, formatStatus } from "../../../../../utils/gateway/helper";

export default function KeyList() {
  const navigate = useNavigate();
  const [DeleteKeyId, SetDeleteKeyId] = useState<string>();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const NavigateCreateKey = () => {
    dispatch(setForms(emptyState.data.form));
    dispatch(setFormErrors(emptyState.data.errors));
    navigate("/gateway/keys/create");
  };

  const NavigateUpdate = (val: any) => {
    if (val) {
      dispatch(setForms(emptyState.data.form));
      dispatch(setFormErrors(emptyState.data.errors));
      navigate(`/gateway/keys/update/${val._cells[0].data}`);
    }
  };
  const deleteAction = (val: any) => {
    if (val) {
      setShow(true);
      SetDeleteKeyId(val._cells[0].data);
    }
  };
  const handleDelete = async (id: string) => {
    setShow(false);
    const result = await dispatch(deleteKey(id));

    if (result.meta.requestStatus === "rejected") {
      ToastAlert(result.payload.message, "error");
    } else {
      ToastAlert("Key Deleted Successfully", "success");
      // This will be used for reloading the Grid after delete operation
      refreshGrid();
    }
  };
  const handleCancel = () => setShow(false);

  const actions = [];
  const delAction = {
    iconClassName: "bi bi-trash-fill menu-icon",
    classNames: "btn btn-sm btn-light",
    func: (val: any) => deleteAction(val),
  };
  const editAction = {
    iconClassName: "bi bi-pencil-square menu-icon",
    classNames: "btn btn-sm btn-light mr-2",
    func: (val: any) => NavigateUpdate(val),
  };

  const isViewAuthorized = AuthGuard({
    resource: access.resources.Key,
    scope: access.scopes.view,
  });
  if (isViewAuthorized) {
    actions.push(editAction);
  }
  const isDelAuthorized = AuthGuard({
    resource: access.resources.Key,
    scope: access.scopes.Delete,
  });
  if (isDelAuthorized) {
    actions.push(delAction);
  }

  const headings = [
    {
      name: "Id",
      data: "Id",
      hidden: true,
    },
    {
      name: "Key Name",
      data: "KeyName",
      navigate: (val: any) => NavigateUpdate(val),
    },
    {
      name: "Status",
      data: "Status",
      format: (val: any) => formatStatus(val),
    },
    {
      name: "Created Date",
      data: "CreatedDateTxt",
      format: (val: any) => formatDate(val),
    },
  ];

  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <Modal show={show} onHide={handleCancel} centered>
            <Modal.Header closeButton>
              <Modal.Title>Delete Key</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this Key ?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="btn-danger"
                onClick={() => handleDelete(DeleteKeyId!)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <div
            className="card-header mt-4 mb-3 bg-white"
            style={{ padding: "0.5rem 2.5rem" }}
          >
            <div className="align-items-center">
              <div>
                <AuthGuard
                  resource={access.resources.Key}
                  scope={access.scopes.Create}
                >
                  <button
                    className=" btn  btn-success btn-sm d-flex float-right mb-4"
                    onClick={() => NavigateCreateKey()}
                  >
                    Create Key &nbsp;
                    <span className="bi bi-plus-lg"></span> &nbsp;
                  </button>
                </AuthGuard>
                <h5>
                  <b>KEY LIST</b>
                </h5>
              </div>
            </div>
          </div>
          <div className="card-body pt-4">
            <RenderList
              headings={headings}
              url={`Key/GetAllKeys?`}
              actionsList={actions}
              searchBy={"Name"}
              pageSizeList={gridPageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}
