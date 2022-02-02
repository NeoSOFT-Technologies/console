import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function RegisterUser() {
  let [name, setName] = useState("");

  return (
    <div>
      <Container className="mt-3 w-75 bg-white p-4">
        <h1 className="text-center text-dark pb-3">Register New User</h1>

        <Form>
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
              required="true"
            />
            {name != "" && name.length < 4 && (
              <span className="text-danger">Enter Name correctly</span>
            )}
          </Form.Group>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea2">Small textarea</label>
            <textarea
              className="form-control rounded-0"
              id="exampleFormControlTextarea2"
              rows="5"
              required="true"
            ></textarea>
          </div>
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
