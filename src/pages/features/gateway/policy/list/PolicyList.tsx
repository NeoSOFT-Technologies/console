import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";
import RenderList from "../../../../components/list/RenderList";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getPolicyList } from "../../../../store/features/policy/list/slice";
import {
  IPolicyListState,
  IPolicyDataList,
  IPolicyData,
} from "../../../../store/features/policy/list/index";

import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/ToasterAlert/ToastAlert";
import { deletePolicy } from "../../../../store/features/policy/delete/slice";

export default function PolicyList() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  // const [search, setSearch] = useState(" ");
  const dispatch = useAppDispatch();
  const policyList: IPolicyListState = useAppSelector(
    (state: RootState) => state.policyListState
  );
  // const failure: any = () => navigate("/error-pages/error-500");
  const failure: any = () => ToastAlert(policyList.error!, "error");
  // const [checkactive, setCheckactive] = useState({
  //   btn1: false,
  //   btn2: false,
  //   btn3: true,
  // });
  const [datalist, setDataList] = useState<IPolicyDataList>({
    list: [],
    fields: [],
  });
  const mainCall = (currentPage: number) => {
    dispatch(getPolicyList({ currentPage }));
  };
  useEffect(() => {
    // console.log("UseEffect", policyList.data);
    if (policyList.data && policyList.data?.Policies?.length > 0) {
      setDataList({
        list: [...policyList.data.Policies],
        fields: ["Name", "State", "Apis", "AuthType"],
      });
    }
  }, [policyList.data]);

  useEffect(() => {
    mainCall(1);
  }, []);

  const handlePageClick = (pageSelected: number) => {
    mainCall(pageSelected);
    setSelected(pageSelected);
  };

  const searchFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSelected(1);
    mainCall(1);
  };

  const NavigateCreatePolicy = (
    val: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    val.preventDefault();
    navigate("/policy/create");
  };
  //   const handleUserDetails = (val: ITenantUserData) => {
  //     console.log(val);
  //     // navigate("/userdetails");
  //     navigate(`/userdetails/${val.id}`, { state: { ...val } });
  //   };

  function deletePolicyFromState(id: string) {
    const newState = datalist.list.filter((item) => item.Id !== id);
    // console.log(newState);
    const pageCount = policyList.data?.TotalCount;
    if (newState.length === 0 && pageCount !== 1) {
      mainCall(selected - 1);
      setSelected(selected - 1);
    } else mainCall(selected);

    setDataList({
      list: [...newState],
      fields: ["Name", "State", "Apis", "AuthType"],
    });
  }
  const deletePolicyFunction = async (val: IPolicyData) => {
    if (val.Id) {
      if (window.confirm("Are you sure you want to delete this Policy ?")) {
        const result = await dispatch(deletePolicy(val.Id));

        if (result.meta.requestStatus === "rejected") {
          await ToastAlert(result.payload.message, "error");
        } else {
          deletePolicyFromState(val.Id);
          await ToastAlert("Policy Deleted Successfully", "success");
        }
      }
    }
  };

  const headings = [
    { title: "Policy Name" },
    { title: "Status" },
    { title: "Access Rights" },
    { title: "Authentication Type" },
    { title: "Action", className: "text-center" },
  ];
  const actions = [
    {
      className: "btn btn-sm btn-light",
      iconClassName: "bi bi-pencil-square menu-icon",
    },
    {
      className: "btn btn-sm btn-light",
      iconClassName: "bi bi-trash-fill menu-icon",
      buttonFunction: deletePolicyFunction,
    },
  ];
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        {policyList.loading ? (
          <Spinner />
        ) : !policyList.loading && policyList.error !== null ? (
          <div>{failure()}</div>
        ) : (
          <div className="card">
            <div
              className="card-header mt-4 mb-3 bg-white"
              style={{ padding: "0.5rem 2.5rem" }}
            >
              <div className="align-items-center">
                <button
                  className=" btn  btn-success btn-sm d-flex float-right mb-4"
                  onClick={(e) => NavigateCreatePolicy(e)}
                >
                  {" "}
                  Create Policy &nbsp;
                  <span className="bi bi-plus-lg"></span> &nbsp;
                </button>
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
