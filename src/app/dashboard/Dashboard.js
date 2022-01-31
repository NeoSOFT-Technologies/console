import React from "react";
import { Container, Card } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div>
      <Container align="center">
        <Card style={{ width: "550px" }} className="m-1 p-2">
          <Card.Title style={{ fontSize: "32px" }}>Tenant Details</Card.Title>
          <hr />
          <Card.Body
            style={{ fontSize: "20px", fontWeight: "bold", textAlign: "left" }}
          >
            <Card.Text>
              Name:&nbsp; <span>tenant1 </span>
            </Card.Text>
            <Card.Text>
              {" "}
              <span>Description:&nbsp;This is tenant details </span>{" "}
            </Card.Text>
            <Card.Text>
              <span> Email:&nbsp;tenant@gmail.com</span>
            </Card.Text>

            <hr />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
