import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Spinner from "../../../../components/loader/Loader";
import { RootState } from "../../../../store";
import { IUserDataState } from "../../../../types";
const AdminDashboard = () => {
  const user: IUserDataState = useSelector(
    (state: RootState) => state.userData
  );
  useEffect(() => {
    // console.log(user.data);
  }, [user.data]);

  return user.loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Container>
        {!!user.data && (
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
                Name:&nbsp; <span>{user.data.username} </span>
              </Card.Text>
              <Card.Text>
                <span>
                  Created Date and Time :&nbsp;{user.data.createdTimestamp}
                </span>
              </Card.Text>
              <Card.Text>
                <span> Number of Tenants:&nbsp;{user.data.count}</span>
              </Card.Text>
              <Card.Text>
                <span>
                  {" "}
                  Roles:&nbsp;
                  <ul>
                    {user?.data?.roles?.map((ele) => (
                      <li key={`${ele}`}>{ele}</li>
                    ))}
                  </ul>
                </span>
              </Card.Text>

              <hr />
            </Card.Body>
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
};
export default AdminDashboard;
