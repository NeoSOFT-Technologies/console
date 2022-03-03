import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
//import { addTenantData } from "../config/Myservices";
import { useNavigate } from "react-router";
import { regexForName } from "../constants/constantVariables";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export default function TenantDatabaseForm() {
  const navigate = useNavigate();
  const [tenant, setTenant] = useState({
    databasename: null,
    description: null,
  });
  const [err, setErr] = useState({
    databasename: null,
  });
  const success = (data) =>
    toast.success(data, { position: toast.POSITION.BOTTOM_RIGHT });
  const databasename = useRef(null);
  const addtenant = (e) => {
    e.preventDefault();
    if (!regexForName.test(tenant.databasename)) {
      setErr({
        ...err,
        databasename: true,
      });
      databasename.current.focus();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setErr({
        databasename: false,
      });
      let newUser = {
        ...tenant,
      };
      //addTenantData(newUser);
      console.log(newUser);
      success("Created database");
      navigate("/registertenant", { state: newUser });
      //addTenantData(newUser);
    }
  };
  return (
    <>
      <div className=" w-75 bg-white mx-auto ">
        <h1 className="text-center text-dark pb-2 pt-3">
          Create New Tenant Database
        </h1>
        <Form onSubmit={(e) => addtenant(e)} className="p-4">
          <Form.Group className="mb-3">
            <Form.Label>Tenant Database Name :</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              databasename="databasename"
              ref={databasename}
              value={tenant.databasename}
              isInvalid={err.databasename}
              isValid={err.no}
              onChange={(e) => {
                setTenant({ ...tenant, databasename: e.target.value });
              }}
              required
            />
            {tenant.databasename && !regexForName.test(tenant.databasename) && (
              <span className="text-danger">
                Name Should Not Cantain Any Special Character or Number
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Tenant Database Description:</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              className="form-control rounded-0"
              id="description"
              placeholder="Here...."
              value={tenant.description}
              onChange={(e) => {
                setTenant({ ...tenant, description: e.target.value });
              }}
              required
            />
          </Form.Group>
          <Button className="info" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
