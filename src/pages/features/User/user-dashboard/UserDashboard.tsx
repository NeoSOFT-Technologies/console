import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Spinner from "../../../../components/loader/Loader";
import { ToastAlert } from "../../../../components/toast-alert/toast-alert";
import { regForPassword } from "../../../../resources/constants";
import { RootState } from "../../../../store";
import { updateUser } from "../../../../store/features/user/update-user/slice";
import { useAppDispatch } from "../../../../store/hooks";
import { IUserDataState } from "../../../../types";
import Error500 from "../../../error-pages/Error500";
import "./userDashboard.scss";
export default function UserDashboard() {
  const user: IUserDataState = useSelector(
    (state: RootState) => state.userData
  );
  const [editable, setEditable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = useState({
    oldpassword: "",
    newpassword: "",
  });
  useEffect(() => {
    // console.log(user.data);
  }, [user.data]);
  const updateUserPassword = () => {
    if (currentUser.newpassword === "" || currentUser.oldpassword === "") {
      ToastAlert("fill the required fields", "warning");
    } else if (currentUser.oldpassword !== user.data?.password) {
      ToastAlert("old password not match", "error");
    } else if (
      currentUser.newpassword &&
      !regForPassword.test(currentUser.newpassword)
    ) {
      ToastAlert("password requirement not match", "warning");
    } else {
      if (user.data?.id !== undefined) {
        dispatch(
          updateUser({ id: user.data?.id, password: currentUser.newpassword })
        );
      }
      ToastAlert("password updated", "success");
      setEditable(false);
      setCurrentUser({
        oldpassword: "",
        newpassword: "",
      });
    }
  };
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
                    <td>UserId</td>
                    <td>{user.data.userid}</td>
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
                    <td>{user.data.createdDateTime}</td>
                  </tr>
                  {editable && (
                    <div>
                      <tr>
                        <td>Old Password</td>
                        <td>
                          <Form.Group className="mb-1">
                            <Form.Control
                              type="password"
                              name="oldpassword"
                              value={currentUser.oldpassword}
                              onChange={(e) =>
                                setCurrentUser({
                                  ...currentUser,
                                  oldpassword: e.target.value,
                                })
                              }
                            />
                            <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                          </Form.Group>
                        </td>
                      </tr>
                      <tr>
                        <td>New Password</td>
                        <td>
                          <Form.Group>
                            <Form.Control
                              type="password"
                              name="newpassword"
                              value={currentUser.newpassword}
                              onChange={(e) =>
                                setCurrentUser({
                                  ...currentUser,
                                  newpassword: e.target.value,
                                })
                              }
                            />
                            {currentUser.newpassword &&
                              !regForPassword.test(currentUser.newpassword) && (
                                <p className="text-danger font-small w-100">
                                  password should be 8-16 length and
                                  <br />
                                  contain a special character and number
                                </p>
                              )}
                          </Form.Group>
                        </td>
                      </tr>
                    </div>
                  )}
                </table>
                <hr />
                {editable ? (
                  <>
                    <Button onClick={() => updateUserPassword()}>Update</Button>
                    <Button
                      className="btn-danger"
                      onClick={() => {
                        setEditable(false);
                        setCurrentUser({
                          oldpassword: "",
                          newpassword: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setEditable(true)}>Edit</Button>
                )}
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
    </React.Fragment>
  );
}
