import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import { RootState } from "../../../../../store";
import { useAppSelector } from "../../../../../store/hooks";
import { IUserDataState } from "../../../../../types";

const TenantDashboard = () => {
  const navigate = useNavigate();
  const user: IUserDataState = useAppSelector(
    (state: RootState) => state.userData
  );
  useEffect(() => {
    if (!user.loading && user.error) {
      navigate("/error", { state: user.error });
    }
  }, [user.loading]);

  return (
    <React.Fragment>
      {user.loading ? (
        <Spinner />
      ) : (
        user.data && (
          <Container>
            <Card className="m-1 p-2 fit-to-content">
              <Card.Title style={{ fontSize: "32px" }} className="text-center">
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
                  Name :&nbsp; <span>{user.data.tenantName} </span>
                </Card.Text>
                <Card.Text>
                  <span>Description :&nbsp;{user.data.description}</span>
                </Card.Text>
                <Card.Text>
                  <span>Created Date :&nbsp;{user.data.createdDateTime}</span>
                </Card.Text>
                <hr />
              </Card.Body>
            </Card>
          </Container>
        )
      )}
    </React.Fragment>
  );
};
export default TenantDashboard;
