import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addTenantData } from "../config/Myservices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  regexForEmail,
  regexForName,
  regexForUser,
} from "../constants/constantVariables";
toast.configure();

export default function RegisterUser() {
  const name = useRef(null);
  const userid = useRef(null);
  const email = useRef(null);
  const [tenant, setTenant] = useState({
    name: null,
    description: null,
    userid: null,
    email: null,
    password: null,
    type: "tenant",
  });
  const [err, setErr] = useState({
    name: null,
    userid: null,
    email: null,
    no: null,
  });
  const success = (data) =>
    toast.success(data, { position: toast.POSITION.BOTTOM_RIGHT });
  const addtenant = (e) => {
    e.preventDefault();
    if (!regexForName.test(tenant.name)) {
      setErr({
        ...err,
        name: true,
      });
      name.current.focus();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (!regexForUser.test(tenant.userid)) {
      setErr({
        ...err,
        userid: true,
        name: false,
      });
      userid.current.focus();
    } else if (!regexForEmail.test(tenant.email)) {
      setErr({
        ...err,
        email: true,
        userid: false,
      });
      email.current.focus();
    } else {
      setErr({
        email: false,
        userid: false,
        name: false,
        no: true,
      });
      let newUser = {
        ...tenant,
        password: tenant.email.substring(0, tenant.email.search("@")),
      };
      addTenantData(newUser);
      success("Registered successfully");
      // setTimeout(() => {
      //   window.location.reload(false);
      // }, 500);
      setTenant({
        name: "",
        description: "",
        userid: "",
        email: "",
        password: "",
        type: "tenant",
      });
      setErr({
        ...err,
        no: false,
      });
    }
  };
  const clearData = (e) => {
    e.preventDefault();
    setTenant({
      name: "",
      description: "",
      userid: "",
      email: "",
      password: "",
      type: "tenant",
    });
  };
  return (
    <>
      <div className=" w-75 bg-white mx-auto">
        <h1 className="text-center text-dark pb-2">Register New Tenant</h1>
        <Form onSubmit={(e) => addtenant(e)} className="p-4">
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
            <label htmlFor="exampleFormControlTextarea2">Description :</label>
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
            <Form.Control
              type="text"
              placeholder="Enter Email"
              ref={email}
              value={tenant.email}
              isValid={err.no}
              isInvalid={err.email}
              onChange={(e) => {
                setTenant({ ...tenant, email: e.target.value });
              }}
              required
            />
            {tenant.email && !regexForEmail.test(tenant.email) && (
              <span className="text-danger">Enter a Valid Mail Id</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              type="text"
              value="Password Will Be Auto Genrated "
              disabled
            />
          </Form.Group>
          <Button className="info" type="submit">
            Submit
          </Button>
          <Button
            className="btn btn-light"
            type="reset"
            onClick={(e) => clearData(e)}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </>
  );
}
