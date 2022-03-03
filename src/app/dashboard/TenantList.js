import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { getTenantList } from "../redux/actions/TenantActions";
import RenderList from "../shared/RenderList";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
toast.configure();

export default function TenantList() {
  const dispatch = useDispatch();
  const tenantList = useSelector((state) => state.setTenantList);

  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState(" ");
  const [checkactive, setCheckactive] = useState({
    btn1: false,
    btn2: false,
    btn3: true,
  });

  useEffect(() => {
    mainCall(1, search);
  }, []);
  const handlePageClick = (selected) => {
    mainCall(selected, search);
    setSelected(selected);
  };
  const mainCall = (currentPage, search) => {
    try {
      console.log(currentPage);
      getTenantList(currentPage, search).then((res) => {
        console.log("in Teanant List", res);
        dispatch(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const NavigateTenant = (tenantDetails) => {
    console.log(tenantDetails);
    console.log(tenantDetails.id);
    navigate(`/tenant/${tenantDetails.id}`, {
      state: { tenantDetails: tenantDetails },
    });
  };

  const searchFilter = (e) => {
    e.preventDefault();
    setSelected(1);
    mainCall(1, search);
  };
  const actions = [
    {
      className: "btn btn-sm btn-dark",
      iconClassName: "mdi mdi-cog",
      buttonFunction: NavigateTenant,
    },
  ];
  const datalist = {
    list: [...tenantList.list],
    fields: ["userid", "description", "lastlogin"],
  };
  const headings = [
    { title: "Tenant ID" },
    { title: "Description", className: "w-100" },
    { title: "LastLogin", className: "w-100" },
    { title: "Action", className: "text-center" },
  ];

  return (
    <>
      {/* <div className="d-flex justify-content-between ">
        <span> */}
      <Button
        className={
          checkactive.btn1 ? "ml-4  w5 btn-light " : "ml-4  w5 btn-secondary"
        }
        onClick={() => setCheckactive({ btn1: true, btn2: false, btn3: false })}
      >
        Active
      </Button>
      <Button
        className={checkactive.btn2 ? "  w5 btn-light " : "  w5 btn-secondary"}
        onClick={() => setCheckactive({ btn1: false, btn2: true, btn3: false })}
      >
        InActive
      </Button>
      <Button
        className={checkactive.btn3 ? "  w5 btn-light " : "  w5 btn-secondary"}
      >
        All
      </Button>
      {/* </span> */}
      <span className="w-50 text-right  d-inline-block">No.of tenants:35</span>

      {/* </div>  */}

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
                      placeholder="Search projects"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      className=" btn  btn-success btn-sm"
                      onClick={(e) => searchFilter(e)}
                    >
                      <i className=" mdi mdi-magnify"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="table-responsive">
              <RenderList
                headings={headings}
                data={datalist}
                actions={actions}
                handlePageClick={handlePageClick}
                pageCount={tenantList.count}
                selected={selected}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
