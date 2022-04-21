import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RenderList from "../../../../../components/list/RenderList";
import { requestUserListURL } from "../../../../../resources/constants";
import { deleteUserReset } from "../../../../../store/features/tenant/delete-user/slice";
import { useAppDispatch } from "../../../../../store/hooks";

export default function UserList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(deleteUserReset());
  }, []);

  const handleUserDetails = (value: any) => {
    navigate(`/tenant/users/${value._cells[0].data}`, {
      state: {
        userName: value._cells[0].data,
        email: value._cells[1].data,
        tenantName: "Jeff",
      },
    });
  };

  const headings = [
    {
      name: "User Name",
      data: "userName",
    },
    {
      name: "Email",
      data: "email",
    },
    {
      name: "Created Date and Time",
      data: "createdTimestamp",
    },
  ];
  const url = requestUserListURL || "/api/user?";
  const actions = {
    classNames: "btn btn-sm btn-dark",
    func: (val: any) => handleUserDetails(val),
  };
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <Card>
          <Card.Body>
            <h1 className="card-title">Users</h1>
            <div className="table-responsive">
              <RenderList
                headings={headings}
                url={url}
                actions={actions}
                searchBy={"userName"}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
