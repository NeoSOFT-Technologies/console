import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RenderList from "../../../../../components/list/RenderList";
import {
  requestTenantListUrlInactive,
  requestTenantListUrlActive,
  requestTenantListUrlAll,
} from "../../../../../resources/constants";
import { deleteTenantReset } from "../../../../../store/features/admin/delete-tenant/slice";
import { useAppDispatch } from "../../../../../store/hooks";

export default function TenantList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [url, setUrl] = useState(
    requestTenantListUrlActive || "/api/tenants?isDeleted=false&"
  );
  const [checkactive, setCheckactive] = useState({
    btn1: true,
    btn2: false,
    btn3: false,
  });

  useEffect(() => {
    dispatch(deleteTenantReset());
  }, []);

  const NavigateTenant = (value: any) => {
    // console.log(value);
    navigate(`/tenant/admin/tenants/${value._cells[0].data}`, {
      state: {
        tenantName: value._cells[0].data,
        description: value._cells[1].data,
      },
    });
  };
  const headings = [
    {
      name: "Tenant Name",
      data: "tenantName",
    },
    {
      name: "Description",
      data: "description",
    },
    {
      name: "Created Date and Time",
      data: "createdDateTime",
    },
  ];
  const actions = {
    classNames: "btn btn-sm btn-dark",
    func: (val: any) => NavigateTenant(val),
  };

  return (
    <>
      <Button
        className={
          checkactive.btn1 ? "ml-4  w5 btn-light " : "ml-4  w5 btn-secondary"
        }
        data-testid="active"
        onClick={() => {
          setCheckactive({ btn1: true, btn2: false, btn3: false });
          setUrl(requestTenantListUrlActive);
        }}
      >
        Active
      </Button>
      <Button
        className={checkactive.btn2 ? "  w5 btn-light " : "  w5 btn-secondary"}
        data-testid="inactive"
        onClick={() => {
          setCheckactive({ btn1: false, btn2: true, btn3: false });
          setUrl(requestTenantListUrlInactive);
        }}
      >
        InActive
      </Button>
      <Button
        className={checkactive.btn3 ? "  w5 btn-light " : "  w5 btn-secondary"}
        data-testid="all"
        onClick={() => {
          setCheckactive({ btn1: false, btn2: false, btn3: true });
          setUrl(requestTenantListUrlAll);
        }}
      >
        All
      </Button>

      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-around">
              <h2 className="card-title">Tenant List</h2>
            </div>
            <div className="table-responsive">
              <RenderList
                headings={headings}
                url={url}
                actions={actions}
                searchBy={"tenantName"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
