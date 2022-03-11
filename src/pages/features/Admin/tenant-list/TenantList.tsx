import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import RenderList from "../../../../components/list/RenderList";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getTenantList } from "../../../../store/features/admin/tenant-list/slice";

import {
  ITenantDataList,
  ITenantListState,
  ITenantDetails,
} from "../../../../types/index";
import Spinner from "../../../../components/loader/Loader";

export default function TenantList() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState(" ");
  const dispatch = useAppDispatch();
  const tenantList: ITenantListState = useAppSelector(
    (state: RootState) => state.tenantList
  );
  const [checkactive, setCheckactive] = useState({
    btn1: false,
    btn2: false,
    btn3: true,
  });
  const [datalist, setDataList] = useState<ITenantDataList>({
    list: [],
    fields: [],
  });
  const mainCall = (currentPage: number, searchUser: string) => {
    dispatch(getTenantList({ currentPage, search: searchUser }));
  };
  useEffect(() => {
    console.log(tenantList.data);
    if (tenantList.data) {
      setDataList({
        list: [...tenantList.data.list],
        fields: ["userid", "description", "lastlogin"],
      });
    }
  }, [tenantList.data]);

  useEffect(() => {
    mainCall(1, "");
  }, []);

  const handlePageClick = (pageSelected: number) => {
    mainCall(pageSelected, search);
    setSelected(pageSelected);
  };

  const searchFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSelected(1);
    mainCall(1, search);
  };
  //   const handleUserDetails = (val: ITenantUserData) => {
  //     console.log(val);
  //     // navigate("/userdetails");
  //     navigate(`/userdetails/${val.id}`, { state: { ...val } });
  //   };

  const NavigateTenant = (val: ITenantDetails) => {
    console.log(val);
    navigate("/tenantdetails", {
      state: { val },
    });
  };

  const headings = [
    { title: "Tenant ID" },
    { title: "Description", className: "w-100" },
    { title: "Last Login", className: "w-100" },
    { title: "Action", className: "text-center" },
  ];
  const actions = [
    {
      className: "btn btn-sm btn-dark",
      iconClassName: "bi bi-gear-fill",
      buttonFunction: NavigateTenant,
    },
  ];
  return (
    <>
      <Button
        className={
          checkactive.btn1 ? "ml-4  w5 btn-light " : "ml-4  w5 btn-secondary"
        }
        data-testid="active"
        onClick={() => setCheckactive({ btn1: true, btn2: false, btn3: false })}
      >
        Active
      </Button>
      <Button
        className={checkactive.btn2 ? "  w5 btn-light " : "  w5 btn-secondary"}
        data-testid="inactive"
        onClick={() => setCheckactive({ btn1: false, btn2: true, btn3: false })}
      >
        InActive
      </Button>
      <Button
        className={checkactive.btn3 ? "  w5 btn-light " : "  w5 btn-secondary"}
        data-testid="all"
        onClick={() => setCheckactive({ btn1: false, btn2: false, btn3: true })}
      >
        All
      </Button>
      <span className="w-50 text-right  d-inline-block">No.of tenants:35</span>

      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-around">
              <h2 className="card-title">Tenant List</h2>
              <div className="search-field ">
                <form className="h-50">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-parent border-1"
                      placeholder="Search Tenant"
                      onChange={(e) => setSearch(e.target.value)}
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
            {tenantList.loading && <Spinner />}
            <div className="table-responsive">
              {!tenantList.loading && tenantList.data && (
                <RenderList
                  headings={headings}
                  data={datalist}
                  actions={actions}
                  handlePageClick={handlePageClick}
                  pageCount={tenantList.data.count}
                  selected={selected}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
