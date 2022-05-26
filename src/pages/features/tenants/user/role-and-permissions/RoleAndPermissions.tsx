import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../../components/loader/Loader";
import RolesAndPermissions from "../../../../../components/roles-and-permissions/RolesAndPermissions";
import { RootState } from "../../../../../store";
import { useAppSelector } from "../../../../../store/hooks";
import { IUserDataState } from "../../../../../types";

export default function RoleAndPermissions() {
  const navigate = useNavigate();
  const user: IUserDataState = useAppSelector(
    (state: RootState) => state.userData
  );
  useEffect(() => {
    if (!user.loading && user.error) {
      navigate("/error", {
        state: {
          code: user.error.statusCode,
          message: user.error.message,
        },
      });
    }
  }, [user.loading]);

  return (
    <>
      {user.loading ? (
        <Spinner />
      ) : (
        user.data && (
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
        )
      )}
    </>
  );
}
