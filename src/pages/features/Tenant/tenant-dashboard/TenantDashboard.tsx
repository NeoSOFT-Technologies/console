import React, { useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
// import { getTenantUserList } from "../../../../store/features/tenant/tenant-user-list/slice";
// import { useAppDispatch } from "../../../../store/hooks";
import { IUserDataState } from "../../../../types";

const TenantDashboard = () => {
  // const dispatch = useAppDispatch();
  const user: IUserDataState = useSelector(
    (state: RootState) => state.userData
  );
  useEffect(() => {
    console.log(user.data, "KOKOK");
    // setTimeout(
    //   () =>
    //     dispatch(
    //       getTenantUserList({ currentPage: 1, search: "", tenantName: "Paras" })
    //     ),
    //   3000
    // );
  }, [user.data]);

  return (
    <React.Fragment>
      <Container>
        {!!user.data && (
          <Card style={{ width: "550px" }} className="m-1 p-2">
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
                Name:&nbsp; <span>{user.data.tenantName} </span>
              </Card.Text>
              <Card.Text>
                <span>Description:&nbsp;{user.data.description}</span>
              </Card.Text>
              <Card.Text>
                <span> Email:&nbsp;{user.data.email}</span>
              </Card.Text>

              <hr />
            </Card.Body>
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
};
export default TenantDashboard;
