import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
export default function Dashboard() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    let url = " http://localhost:3001/Registration";
    axios.get(url).then((res) => {
      setDetails(res.data);
    });
  }, []);
  const email = sessionStorage.getItem("user");
  console.log(email);

  console.log(details);
  //console.log(sessionStorage.getItem("user"));
  return (
    <>
      <Container>
        {details &&
          details.map((val) => {
            if (val.email === email) {
              return (
                <Card style={{ width: "550px" }} className="m-1 p-2">
                  <Card.Title
                    style={{ fontSize: "32px" }}
                    className="text-center"
                  >
                    Tenant Details
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
                      Name:&nbsp; <span>{val.name} </span>
                    </Card.Text>
                    <Card.Text>
                      <span>Description:&nbsp;{val.description}</span>
                    </Card.Text>
                    <Card.Text>
                      <span>UserId:&nbsp;{val.userid}</span>
                    </Card.Text>
                    <Card.Text>
                      <span> Email:&nbsp;{val.email}</span>
                    </Card.Text>

                    <hr />
                  </Card.Body>
                </Card>
              );
            }
          })}
      </Container>
    </>
  );
}
