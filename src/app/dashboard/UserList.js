import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getTenantUserList } from "../redux/actions/TenantActions";
import RenderList from "../shared/RenderList";
toast.configure();

export default function UserList() {
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState(" ");
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.setTenantUserList);
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
      getTenantUserList(currentPage, search).then((res) => {
        console.log("in Teanant List", res);
        dispatch(res);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const searchFilter = (e) => {
    e.preventDefault();
    setSelected(1);
    mainCall(1, search);
  };
  const datalist = {
    list: [...userList.list],
    fields: [
      "id",
      "userName",
      "email",
      "tenantName",
      "createdDateTime",
      "isDeleted",
    ],
  };
  const headings = [
    { title: "ID", className: "text-center" },
    { title: "User Name", className: "text-center" },
    { title: "Email", className: "text-center" },
    { title: "Tenant Name", className: "text-center" },
    { title: "created Date & Time", className: "text-center" },
    { title: "status", className: "text-center" },
  ];
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-around">
              <h2 className="card-title">User List</h2>
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
                handlePageClick={handlePageClick}
                pageCount={userList.count}
                selected={selected}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
