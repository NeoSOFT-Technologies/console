import React from "react";
import Error401 from "../../../pages/error-pages/Error401";
import getUserPermissions from "../../../utils/gateway/permission.helper";

type component = {
  children?: any;
  resource?: any;
  scope?: any;
  protect?: boolean;
};

// This will be used by Button Actions and AppRoutes
export const access: any = {
  resources: {
    Api: "api",
    Key: "key",
    Policy: "policy",
  },
  scopes: {
    Create: "create",
    Edit: "edit",
    Delete: "delete",
    View: "view",
  },
  protect: true,
};

// This will be used when Auth is turned off
const menus: string[] = [
  access.resources.Api,
  access.resources.Key,
  access.resources.Policy,
];
export function AuthGuard({ children, resource, scope, protect }: component) {
  let authorized = true;
  let permissions: any;

  // This will execute when Auth is turned on
  if (process.env.REACT_APP_GATEWAY_ENABLE_AUTH === "true") {
    // This will get Resource Based Permissions
    permissions = getUserPermissions(resource);

    // This will check specific resource has specific scope
    if (resource && scope) {
      authorized =
        scope && permissions.scopes && permissions.scopes.length > 0
          ? permissions.scopes.includes(scope)
          : false;
    }
  }
  // This will execute when Auth is turned off
  else {
    permissions = menus;
  }

  // This will check if AuthGuard is invoked from Action Buttons, or AppRoutes or Menus
  if (children) {
    // This will execute when AuthGuard is invoked from AppRoutes
    if (protect) {
      return authorized ? children : <Error401 />;
    }
    // This will execute when AuthGuard is invoked from Action Buttons
    else {
      return authorized ? children : <></>;
    }
  }
  // This will execute when AuthGuard is invoked from Menus
  else if (resource === undefined && permissions) {
    return permissions;
  }

  return authorized;
}
