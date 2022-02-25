import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateTenantData, deleteTenantData } from "../config/Myservices";
import { regexForName, regexForUser } from "../constants/constantVariables";
import { useDispatch, useSelector } from "react-redux";
import { getTenantList } from "../redux/actions/TenantActions";
import RenderList from "../shared/RenderList";
toast.configure();

export default function TenantList() {
  const name = useRef(null);
  const userid = useRef(null);
  const dispatch = useDispatch();
  const tenantList = useSelector((state) => state.setTenantList);
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState(" ");
  const [tenant, setTenant] = useState({
    name: null,
    description: null,
    userid: null,
    email: null,
    type: "tenant",
  });
  const [err, setErr] = useState({
    name: null,
    userid: null,
    email: null,
    no: null,
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
  const renderTenant = (val) => {
    setTenant(val);
    setModalShow(true);
  };
  const deleteTenant = (val) => {
    deleteTenantData(val.id).then(() => {
      mainCall(selected, search);
    });
    toast.error("Tenant Removed", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    });
  };

  const updateTenant = async () => {
    setErr({
      ...err,
      no: false,
    });
    if (!regexForName.test(tenant.name)) {
      setErr({
        ...err,
        name: true,
      });
      name.current.focus();
    } else if (!regexForUser.test(tenant.userid)) {
      setErr({
        ...err,
        userid: true,
        name: false,
      });
      userid.current.focus();
    } else {
      setErr({
        userid: false,
        name: false,
        no: true,
      });
      let updated = {
        ...tenant,
      };
      updateTenantData(tenant.id, updated).then(() => {
        mainCall(selected, search);
      });
      setModalShow(false);
      toast.success("Tenant Details Update", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const searchFilter = (e) => {
    e.preventDefault();
    setSelected(1);
    mainCall(1, search);
  };
  const actions = [
    {
      className: "btn btn-sm btn-success",
      iconClassName: "mdi mdi-sync",
      buttonFunction: renderTenant,
    },
    {
      className: "btn btn-sm btn-danger",
      iconClassName: "mdi mdi-delete",
      buttonFunction: deleteTenant,
    },
    {
      className: "btn btn-sm btn-dark",
      iconClassName: "mdi mdi-cog",
    },
  ];
  const datalist = {
    list: [...tenantList.list],
    fields: ["userid", "description"],
  };
  const headings = [
    { title: "User ID" },
    { title: "Description", className: "w-100" },
    { title: "Action", className: "text-center" },
  ];
  return (
    <>
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
      {tenant && (
        <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Tenant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className=" bg-white">
              <Form className="p-4">
                <Form.Group className="mb-3">
                  <Form.Label>Name :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    ref={name}
                    value={tenant.name}
                    isInvalid={err.name}
                    isValid={err.no}
                    onChange={(e) => {
                      setTenant({ ...tenant, name: e.target.value });
                    }}
                    required
                  />
                  {tenant.name && !regexForName.test(tenant.name) && (
                    <span className="text-danger">
                      Name Should Not Cantain Any Special Character or Number
                    </span>
                  )}
                </Form.Group>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea2">
                    Description :
                  </label>
                  <textarea
                    className="form-control rounded-0"
                    id="description"
                    placeholder="Here...."
                    rows="3"
                    value={tenant.description}
                    onChange={(e) => {
                      setTenant({ ...tenant, description: e.target.value });
                    }}
                    required
                  />
                </div>
                <Form.Group className="mb-3">
                  <Form.Label>UserID :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter User ID"
                    ref={userid}
                    isValid={err.no}
                    value={tenant.userid}
                    isInvalid={err.userid}
                    onChange={(e) => {
                      setTenant({ ...tenant, userid: e.target.value });
                    }}
                    required
                  />
                  {tenant.userid && !regexForUser.test(tenant.userid) && (
                    <span className="text-danger">
                      Id Should Contain alphabet, number.(i.e. : paras123,
                      p_A_r_A_s_1)
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email :</Form.Label>
                  <Form.Control type="text" disabled value={tenant.email} />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="info" onClick={() => updateTenant()}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
