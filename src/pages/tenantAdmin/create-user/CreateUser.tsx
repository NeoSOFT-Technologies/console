import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { regexForEmail } from "../../../resources/constants";

export default function Createuser() {
  const [name, setName] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <Container className="mt-3 w-75 bg-white p-4">
        <h1 className="text-center text-dark pb-3">Create User</h1>

        <Form>
          <Form.Group>
            <label htmlFor="exampleFormControlSelect2">Type:</label>
            <select className="form-control" id="exampleFormControlSelect2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              id="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
            {name !== "" && name.length < 4 && (
              <span className="text-danger">Enter Name correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            {email !== "" && !regexForEmail.test(email) && (
              <span className="text-danger">Enter email correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pasword:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            {password !== "" && password.length < 8 && (
              <span className="text-danger">Enter password correctly</span>
            )}
          </Form.Group>
          <Button className="info" type="submit">
            Submit
          </Button>
          <Button className="btn btn-light" type="reset">
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
}
