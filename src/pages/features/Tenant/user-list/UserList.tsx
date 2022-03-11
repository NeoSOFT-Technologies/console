import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import RenderList from "../../../../components/list/RenderList";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../store";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getTenantUserList } from "../../../../store/features/tenant/tenant-user-list/slice";
import {
  ITenantUserData,
  ITenantUserDataList,
  ITenantUserListState,
} from "../../../../types";
export default function UserList() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState(" ");
  const dispatch = useAppDispatch();
  const userList: ITenantUserListState = useAppSelector(
    (state: RootState) => state.tenantUserList
  );
  const [checkactive, setCheckactive] = useState({
    btn1: false,
    btn2: false,
    btn3: true,
  });
  const [datalist, setDataList] = useState<ITenantUserDataList>({
    list: [],
    fields: [],
  });
  const mainCall = (currentPage: number, searchUser: string) => {
    dispatch(getTenantUserList({ currentPage, search: searchUser }));
  };
  useEffect(() => {
    console.log(userList);
    if (userList.data) {
      setDataList({
        list: [...userList.data.list],
        fields: [
          "id",
          "userName",
          "email",
          "tenantName",
          "createdDateTime",
          "isDeleted",
        ],
      });
    }
  }, [userList.data]);

  useEffect(() => {
    mainCall(1, search);
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
  const handleUserDetails = (val: ITenantUserData) => {
    console.log(val);
    // navigate("/userdetails");
    navigate(`/userdetails/${val.id}`, { state: { ...val } });
  };

  const headings = [
    { title: "ID", className: "text-center" },
    { title: "User Name", className: "text-center" },
    { title: "Email", className: "text-center" },
    { title: "Tenant Name", className: "text-center" },
    { title: "Created Date & Time", className: "text-center" },
    { title: "Status", className: "text-center" },
    { title: "Action", className: "text-center" },
  ];
  const actions = [
    {
      className: "btn btn-sm btn-dark",
      iconClassName: "bi bi-gear-fill",
      buttonFunction: handleUserDetails,
    },
  ];
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <Card>
          <Card.Header>
            <Button
              variant={checkactive.btn1 ? "dark" : "secondary"}
              className="w5"
              onClick={() =>
                setCheckactive({ btn1: true, btn2: false, btn3: false })
              }
            >
              Active
            </Button>
            <Button
              variant={checkactive.btn2 ? "dark" : "secondary"}
              className="w5"
              onClick={() =>
                setCheckactive({ btn1: false, btn2: true, btn3: false })
              }
            >
              Inactive
            </Button>
            <Button
              variant={checkactive.btn3 ? "dark" : "secondary"}
              className="w5"
              onClick={() =>
                setCheckactive({ btn1: false, btn2: false, btn3: true })
              }
            >
              All
            </Button>
            <span className="w-50 text-right  d-inline-block">
              Total User: 35
            </span>
          </Card.Header>
          <Card.Header>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="card-title">User List</h2>
              <div className="search-field ">
                <form className="h-50">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-parent border-1"
                      placeholder="Search User"
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
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              {userList.data && (
                <RenderList
                  headings={headings}
                  data={datalist}
                  actions={actions}
                  handlePageClick={handlePageClick}
                  pageCount={userList.data.count}
                  selected={selected}
                />
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
