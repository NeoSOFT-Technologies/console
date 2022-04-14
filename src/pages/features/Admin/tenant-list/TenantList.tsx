import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RenderList from "../../../../components/list/RenderList";
import Spinner from "../../../../components/loader/Loader";
import { RootState } from "../../../../store";
import { deleteTenantReset } from "../../../../store/features/admin/delete-tenant/slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import { ITenantListState } from "../../../../types/index";

export default function TenantList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [url, setUrl] = useState(
    process.env.REACT_APP_API_BASEURL + "/api/tenants?" ||
      "http://localhost:3000/api/tenants?"
  );
  const tenantList: ITenantListState = useAppSelector(
    (state: RootState) => state.tenantList
  );
  const [checkactive, setCheckactive] = useState({
    btn1: false,
    btn2: false,
    btn3: true,
  });
  useEffect(() => {
    dispatch(deleteTenantReset());
  }, []);

  const NavigateTenant = (value: any) => {
    // console.log(value);
    navigate(`/tenantdetails/${value._cells[0].data}`, {
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
  // console.log(process.env.REACT_APP_API_BASEURL);
  // const url =
  //   process.env.REACT_APP_API_BASEURL + "/api/tenants?" ||
  //   "http://localhost:3000/api/tenants?";
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
          setUrl(
            process.env.REACT_APP_API_BASEURL + "/api/tenants?isDeleted=false&"
          );
        }}
      >
        Active
      </Button>
      <Button
        className={checkactive.btn2 ? "  w5 btn-light " : "  w5 btn-secondary"}
        data-testid="inactive"
        onClick={() => {
          setCheckactive({ btn1: false, btn2: true, btn3: false });
          setUrl(
            process.env.REACT_APP_API_BASEURL + "/api/tenants?isDeleted=true&"
          );
        }}
      >
        InActive
      </Button>
      <Button
        className={checkactive.btn3 ? "  w5 btn-light " : "  w5 btn-secondary"}
        data-testid="all"
        onClick={() => {
          setCheckactive({ btn1: false, btn2: false, btn3: true });
          setUrl(process.env.REACT_APP_API_BASEURL + "/api/tenants?");
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
            {tenantList.loading && <Spinner />}
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
