import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RenderList from "../../../../../components/list/RenderList";
import { requestUserListURL } from "../../../../../resources/constants";
import { deleteUserReset } from "../../../../../store/features/tenant/delete-user/slice";
import { useAppDispatch } from "../../../../../store/hooks";

export default function UserList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checkactive, setCheckactive] = useState({
    btn1: false,
    btn2: false,
    btn3: true,
  });
  useEffect(() => {
    dispatch(deleteUserReset());
  }, []);

  const handleUserDetails = (value: any) => {
    navigate(`/userdetails/${value._cells[0].data}`, {
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
          <Card.Header>
            <Button
              data-testid="active"
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
              data-testid="inactive"
              onClick={() =>
                setCheckactive({ btn1: false, btn2: true, btn3: false })
              }
            >
              Inactive
            </Button>
            <Button
              variant={checkactive.btn3 ? "dark" : "secondary"}
              className="w5"
              data-testid="all"
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
            </div>
          </Card.Header>
          <Card.Body>
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
