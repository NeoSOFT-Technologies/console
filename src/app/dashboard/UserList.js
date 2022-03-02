import React, { useState, useEffect } from "react";
import RenderList from "../shared/RenderList";
// import { useSelector } from "react-redux";

export default function UserList() {
  const USERLIST = {
    list: [
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
      {
        id: "1",
        userName: "User1",
        email: "user1@gmail.com",
        tenantName: "Tenant1",
        createdDateTime: "Mar 01 2022 11:51:39",
        isDeleted: "false",
      },
    ],
    count: 2,
  };
  const [selected, setSelected] = useState(1);
  const [userList, setUserList] = useState({});
  useEffect(() => {
    setUserList(USERLIST);
  }, [userList]);

  const headings = [
    { title: "ID" },
    { title: "User Name" },
    { title: "Email" },
    { title: "Tenant Name" },
    { title: "created Date & Time" },
    { title: "status" },
  ];

  const datalist = {
    list: userList.list,
    fields: [
      "id",
      "userName",
      "email",
      "tenantName",
      "createdDateTime",
      "isDeleted",
    ],
  };
  const handlePageClick = (selected) => {
    // mainCall(selected, search);
    setSelected(selected);
  };
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-around">
              <h2 className="card-title">User List</h2>
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

// using GRIDJS
// import React from "react";
// import { Grid } from "gridjs-react";

// export default function UserList() {
//   return (
//     <div>
//       <h2>UserList</h2>
//       <Grid
//         data={USERLIST}
//         columns={[
//           "id",
//           "userName",
//           "email",
//           "tenantName",
//           "createdDateTime",
//           "isDeleted",
//         ]}
//         search={true}
//         pagination={{
//           enabled: true,
//           limit: 5,
//         }}
//       />
//     </div>
//   );
// }
