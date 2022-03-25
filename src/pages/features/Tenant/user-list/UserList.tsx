import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RenderList from "../../../../components/list/RenderList";
import { ITenantUserData } from "../../../../types";
export default function UserList() {
  const navigate = useNavigate();
  const [checkactive, setCheckactive] = useState({
    btn1: false,
    btn2: false,
    btn3: true,
  });

  const handleUserDetails = (value: ITenantUserData) => {
    console.log(value);
    navigate("/userdetails");
    // navigate(`/userdetails/${value.id}`, { state: { ...value } });
  };

  const headings = [
    {
      name: "ID",
      data: "id",
    },
    {
      name: "User Name",
      data: "userName",
    },
    {
      name: "Email",
      data: "email",
    },
    {
      name: "Tenant Name",
      data: "tenantName",
    },
    {
      name: "Created Date & Time",
      data: "createdDateTime",
    },
    {
      name: "Status",
      data: "isDeleted",
    },
  ];
  const url =
    process.env.REACT_APP_API_BASEURL + "/api/tenant-user?" ||
    "http://localhost:3000/api/tenant-user?";
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
              data-testid="active-button"
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
              data-testid="inactive-button"
              onClick={() =>
                setCheckactive({ btn1: false, btn2: true, btn3: false })
              }
            >
              Inactive
            </Button>
            <Button
              variant={checkactive.btn3 ? "dark" : "secondary"}
              className="w5"
              data-testid="all-button"
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
              <RenderList headings={headings} url={url} actions={actions} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
