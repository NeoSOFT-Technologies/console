import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { IUserDataState } from "../../../../types";
export default function RoleAndPermissions() {
  const user: IUserDataState = useSelector(
    (state: RootState) => state.userData
  );
  return (
    <Card className="w-75 mx-auto p-2">
      <h1 className="mx-auto p-1">Roles & Permissions</h1>
      <hr />
      <h3>Roles</h3>
      <div>
        {user &&
          user.data?.roles !== undefined &&
          user.data?.roles.map((val, i) => (
            <span key={i} className="roles">
              {" "}
              {val}
            </span>
          ))}
      </div>
      <h3>Permissions</h3>
      <div>
        {user &&
          user.data?.permissions !== undefined &&
          user.data?.permissions.map((val, i) => (
            <span key={i} className="permissions">
              {" "}
              {val}
            </span>
          ))}
      </div>
    </Card>
  );
}
