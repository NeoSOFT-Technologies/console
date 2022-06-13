import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { access, AuthGuard } from "../../../../../components/auth-gaurd";
import RenderList, {
  refreshGrid,
} from "../../../../../components/list/RenderList";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { deleteApi } from "../../../../../store/features/gateway/api/delete/slice";
import { useAppDispatch } from "../../../../../store/hooks";
import {
  // formatClick,
  formatDate,
  formatStatus,
} from "../../../../../utils/gateway/helper";

export default function APIList() {
  const navigate = useNavigate();
  const [DeleteApiId, SetDeleteApiId] = useState<string>();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const NavigateCreateApi = () => {
    navigate("/gateway/apis/create");
  };

  const NavigateUpdate = (val: any) => {
    navigate(`/gateway/apis/update/${val._cells[0].data}`);
  };

  const deleteAction = async (val: any) => {
    if (val) {
      setShow(true);
      SetDeleteApiId(val._cells[0].data);
    }
  };
  const handleDelete = async (Id: string) => {
    setShow(false);
    const result = await dispatch(deleteApi(Id));

    if (result.meta.requestStatus === "rejected") {
      ToastAlert(result.payload.message, "error");
    } else {
      ToastAlert("Api Deleted Successfully", "success");
      // This will be used for reloading the Grid after delete operation
      refreshGrid();
    }
  };
  const handleCancel = () => setShow(false);

  const headings = [
    {
      name: "Id",
      data: "Id",
      hidden: true,
    },
    {
      name: "Name",
      data: "Name",
      navigate: (val: any) => NavigateUpdate(val),
    },
    {
      name: "Target Url",
      data: "TargetUrl",
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
    resource: access.resources.Api,
    scope: access.scopes.View,
  });
  if (isViewAuthorized) {
    actions.push(editAction);
  }
  const isDelAuthorized = AuthGuard({
    resource: access.resources.Api,
    scope: access.scopes.Delete,
  });
  if (isDelAuthorized) {
    actions.push(delAction);
  }
  return (
    <>
      <Modal show={show} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Api</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Api ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            data-testid="deleteBtn"
            variant="primary"
            className="btn-danger"
            onClick={() => handleDelete(DeleteApiId!)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div
            className="card-header mt-2 bg-white"
            style={{ padding: "0.5rem 1.5rem" }}
          >
            <div className="align-items-center">
              <AuthGuard
                resource={access.resources.Api}
                scope={access.scopes.Create}
              >
                <button
                  type="button"
                  className=" btn btn-sm btn-success btn-sm d-flex float-right mb-2"
                  onClick={() => NavigateCreateApi()}
                >
                  Create API &nbsp;
                  <span className="bi bi-plus-lg"></span> &nbsp;
                </button>
              </AuthGuard>

              <span>
                <b>API LIST</b>
              </span>
            </div>
          </div>
          <div className="card-body pt-4">
            <br />
            <RenderList
              headings={headings}
              url={`ApplicationGateway?`}
              actionsList={actions}
              searchBy={"apiName"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
