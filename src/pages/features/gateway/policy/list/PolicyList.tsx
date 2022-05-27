import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  AuthGuard,
  access,
} from "../../../../../components/gateway/auth-guard";
import RenderList from "../../../../../components/gateway/list/RenderList";
import Spinner from "../../../../../components/loader/Loader";
import { ToastAlert } from "../../../../../components/toast-alert/toast-alert";
import { RootState } from "../../../../../store";
import { emptyState } from "../../../../../store/features/gateway/policy/create/payload";
import {
  setForm,
  setFormError,
} from "../../../../../store/features/gateway/policy/create/slice";
import { deletePolicy } from "../../../../../store/features/gateway/policy/delete/slice";
import {
  IPolicyListState,
  IPolicyDataList,
  IPolicyData,
} from "../../../../../store/features/gateway/policy/list/index";
import { getPolicyList } from "../../../../../store/features/gateway/policy/list/slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import statusAndDateHelper from "../../../../../utils/gateway/helper";

export default function PolicyList() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [DeletePolicyId, SetDeletePolicyId] = useState<string>();
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const policyList: IPolicyListState = useAppSelector(
    (state: RootState) => state.policyListState
  );
  const failure: any = () => ToastAlert(policyList.error!, "error");
  const [datalist, setDataList] = useState<IPolicyDataList>({
    list: [],
    fields: [],
  });
  const mainCall = (currentPage: number, pageSize: number) => {
    dispatch(getPolicyList({ currentPage, pageSize }));
  };
  useEffect(() => {
    // console.log("UseEffect", policyList.data);
    if (policyList.data && policyList.data?.Policies?.length > 0) {
      const listPolicy: IPolicyData[] = [];
      // const currentState = [...policyList.data.Policies];
      for (const item of policyList.data?.Policies) {
        const policy = statusAndDateHelper(item);
        listPolicy.push(policy);
      }
      setDataList({
        list: [...listPolicy],
        fields: ["Name", "State", "ApisTxt", "AuthType"],
      });
    }
  }, [policyList.data]);

  useEffect(() => {
    mainCall(1, 4);
  }, []);

  const handlePageClick = (pageSelected: number) => {
    mainCall(pageSelected, 4);
    setSelected(pageSelected);
  };

  const searchFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSelected(1);
    mainCall(1, 4);
  };

  const NavigateCreatePolicy = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    console.log("emptystate", emptyState);
    dispatch(setForm(emptyState.data.form));
    dispatch(setFormError(emptyState.data.errors));
    navigate("/gateway/policies/create");
  };
  //   const handleUserDetails = (val: ITenantUserData) => {
  //     console.log(val);
  //     // navigate("/userdetails");
  //     navigate(`/userdetails/${val.id}`, { state: { ...val } });
  //   };

  const NavigateUpdate = (val: IPolicyData) => {
    if (val.Id) {
      dispatch(setForm(emptyState.data.form));
      dispatch(setFormError(emptyState.data.errors));
      navigate(`/gateway/policies/update/${val.Id}`);
    }
  };

  function deletePolicyFromState(id: string) {
    const newState = datalist.list.filter((item) => item.Id !== id);
    // console.log(newState);
    const pageCount = policyList.data?.TotalCount;
    if (newState.length === 0 && pageCount !== 1) {
      mainCall(selected - 1, 4);
      setSelected(selected - 1);
    } else mainCall(selected, 4);

    setDataList({
      list: [...newState],
      fields: ["Name", "State", "ApisTxt", "AuthType"],
    });
  }
  const handleDelete = async (Id: string) => {
    setShow(false);
    console.log("delete clicked", Id);
    const result = await dispatch(deletePolicy(Id));

    if (result.meta.requestStatus === "rejected") {
      await ToastAlert(result.payload.message, "error");
    } else {
      deletePolicyFromState(Id);
      await ToastAlert("Policy Deleted Successfully", "success");
    }
  };
  const handleCancel = () => setShow(false);
  const deletePolicyFunction = (val: IPolicyData) => {
    if (val.Id && val.Id) {
      setShow(true);
      SetDeletePolicyId(val.Id);
    }
  };

  const headings = [
    { title: "Policy Name" },
    { title: "Status" },
    { title: "Access Rights" },
    { title: "Authentication Type" },
  ];
  const actions = [];
  const editAction = {
    className: "btn btn-sm btn-light",
    iconClassName: "bi bi-pencil-square menu-icon",
    buttonFunction: NavigateUpdate,
  };
  const delAction = {
    className: "btn btn-sm btn-light",
    iconClassName: "bi bi-trash-fill menu-icon",
    buttonFunction: deletePolicyFunction,
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

  if (isViewAuthorized || isDelAuthorized) {
    headings.push({ title: "Action" });
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
        {policyList.loading ? (
          <Spinner />
        ) : policyList.error ? (
          <div>{failure()}</div>
        ) : (
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
                    {" "}
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
              <div className="align-items-center">
                <div className="search-field justify-content-around">
                  <form className="h-50">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control bg-parent border-1"
                        placeholder="Search Policy"
                        // onChange={(e) => setSearch(e.target.value)}
                      />
                      <button
                        className=" btn  btn-success btn-sm"
                        onClick={(e) => searchFilter(e)}
                      >
                        <i className=" bi bi-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <br />
              {policyList.loading && <Spinner />}
              <div className="table-responsive">
                {!policyList.loading && policyList.data && (
                  <RenderList
                    headings={headings}
                    data={datalist}
                    actions={actions}
                    handlePageClick={handlePageClick}
                    pageCount={policyList.data.TotalCount}
                    selected={selected}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
