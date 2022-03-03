import React from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AdminDashboard() {
  const user = useSelector((state) => state.setUserData);
  return (
    <>
      <Container>
        {!!user && (
          <Card style={{ width: "550px" }} className="m-1 p-2">
            <Card.Title style={{ fontSize: "32px" }} className="text-center">
              Admin Details
            </Card.Title>
            <hr />
            <Card.Body
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              <Card.Text>
                Name:&nbsp; <span>{user.name} </span>
              </Card.Text>
              <Card.Text>
                <span>Description:&nbsp;{user.description}</span>
              </Card.Text>
              <Card.Text>
                <span>UserId:&nbsp;{user.userid}</span>
              </Card.Text>
              <Card.Text>
                <span> Email:&nbsp;{user.email}</span>
              </Card.Text>

              <hr />
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
