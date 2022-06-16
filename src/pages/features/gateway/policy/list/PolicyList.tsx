import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { access, AuthGuard } from "../../../../../components/auth-gaurd";
import RenderList, {
  refreshGrid,
} from "../../../../../components/list/RenderList";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";

import { emptyState } from "../../../../../store/features/gateway/policy/create/payload";
import {
  setForm,
  setFormError,
} from "../../../../../store/features/gateway/policy/create/slice";
import { deletePolicy } from "../../../../../store/features/gateway/policy/delete/slice";
import { useAppDispatch } from "../../../../../store/hooks";
import { formatCommaSeparated } from "../../../../../utils/gateway/helper";

export default function PolicyList() {
  const navigate = useNavigate();
  const [DeletePolicyId, SetDeletePolicyId] = useState<string>();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const NavigateCreatePolicy = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    dispatch(setForm(emptyState.data.form));
    dispatch(setFormError(emptyState.data.errors));
    navigate("/gateway/policies/create");
  };

  const NavigateUpdate = (val: any) => {
    if (val) {
      dispatch(setForm(emptyState.data.form));
      dispatch(setFormError(emptyState.data.errors));
      navigate(`/gateway/policies/update/${val._cells[0].data}`);
    }
  };

  const deleteAction = (val: any) => {
    if (val) {
      setShow(true);
      SetDeletePolicyId(val._cells[0].data);
    }
  };
  const handleDelete = async (Id: string) => {
    setShow(false);
    const result = await dispatch(deletePolicy(Id));

    if (result.meta.requestStatus === "rejected") {
      ToastAlert(result.payload.message, "error");
    } else {
      ToastAlert("Policy Deleted Successfully", "success");
      // This will be used for reloading the Grid after delete operation
      refreshGrid();
    }
  };
  const handleCancel = () => setShow(false);

  const headings = [
    {
      name: "Policy Id",
      data: "Id",
      hidden: true,
    },
    {
      name: "Name",
      data: "Name",
      navigate: (val: any) => NavigateUpdate(val),
    },
    {
      name: "Status",
      data: "State",
    },
    {
      name: "Access Rights",
      data: "ApisTxt",
      format: (val: any) => formatCommaSeparated(val),
    },
    {
      name: "Authentication Type",
      data: "AuthType",
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
    resource: access.resources.Policy,
    scope: access.scopes.View,
  });
  if (isViewAuthorized) {
    actions.push(editAction);
  }
  const isDelAuthorized = AuthGuard({
    resource: access.resources.Policy,
    scope: access.scopes.Delete,
  });
  if (isDelAuthorized) {
    actions.push(delAction);
  }

  return (
    <>
      <Modal show={show} onHide={handleCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Policy ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn-danger"
            onClick={() => handleDelete(DeletePolicyId!)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div
            className="card-header mt-4 mb-3 bg-white"
            style={{ padding: "0.5rem 2.5rem" }}
          >
            <div className="align-items-center">
              <AuthGuard
                resource={access.resources.Policy}
                scope={access.scopes.Create}
              >
                <button
                  className=" btn  btn-success btn-sm d-flex float-right mb-4"
                  onClick={(e) => NavigateCreatePolicy(e)}
                >
                  Create Policy &nbsp;
                  <span className="bi bi-plus-lg"></span> &nbsp;
                </button>
              </AuthGuard>
              <h5>
                <b>POLICY LIST</b>
              </h5>
            </div>
          </div>
          <div className="card-body pt-4">
            <RenderList
              headings={headings}
              url={`Policy?`}
              actionsList={actions}
              searchBy={"apiName"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
