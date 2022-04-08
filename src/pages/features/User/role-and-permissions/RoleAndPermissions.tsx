import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import RolesAndPermissions from "../../../../components/roles-and-permissions/RolesAndPermissions";
import { RootState } from "../../../../store";
import { IUserDataState } from "../../../../types";
export default function RoleAndPermissions() {
  const user: IUserDataState = useSelector(
    (state: RootState) => state.userData
  );
  console.log(user);
  return (
    <Card className="w-75 mx-auto p-2">
      <h1 className="mx-auto p-1">Roles & Permissions</h1>
      <hr />
      {user && user.data?.roles !== undefined && (
        <RolesAndPermissions
          heading="Roles"
          list={user.data?.roles}
          classes="roles"
        />
      )}
      {user && user.data?.permissions !== undefined && (
        <RolesAndPermissions
          heading="Permissions"
          list={user.data?.permissions}
          classes="permissions"
        />
      )}
    </Card>
  );
}
