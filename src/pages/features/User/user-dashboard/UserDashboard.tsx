import React from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Spinner from "../../../../components/loader/Loader";
import { RootState } from "../../../../store";
import { IUserDataState } from "../../../../types";
import Error500 from "../../../error-pages/Error500";
import "./userDashboard.scss";

export default function UserDashboard() {
  const user: IUserDataState = useSelector(
    (state: RootState) => state.userData
  );

  return (
    <React.Fragment>
      {user.loading && <Spinner />}
      {!user.loading && user.error && <Error500 />}
      {!user.loading && user.data && (
        <Container>
          {!!user.data && (
            <Card className="mx-auto my-1 p-2 w-75">
              <Card.Title className="text-center font-32">
                User Details
              </Card.Title>
              <hr />
              <Card.Body>
                <table className="w-100">
                  <tr>
                    <td>UserName</td>
                    <td>{user.data.username}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user.data.email}</td>
                  </tr>
                  <tr>
                    <td>Tenant name</td>
                    <td>{user.data.tenantName}</td>
                  </tr>
                  <tr>
                    <td>Date Of Creation</td>
                    <td>{user.data.createdTimestamp}</td>
                  </tr>
                </table>
                <hr />
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </React.Fragment>
  );
}
