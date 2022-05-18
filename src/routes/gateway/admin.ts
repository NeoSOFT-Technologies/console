import { AuthGuard, access } from "../../components/gateway/auth-guard";
const adminGatewayRoutes = [
  {
    id: "dashboard",
    path: "/gateway/dashboard",
    title: "Dashboard",
    icon: "bi bi-house-fill menu-icon",
  },
];
const ApiMenu = {
  id: "api",
  path: "/gateway/apis",
  title: "APIs",
  icon: "bi bi-list menu-icon",
};
const KeyMenu = {
  id: "key",
  path: "/gateway/keys",
  title: "Keys",
  icon: "bi bi-key-fill menu-icon",
};

const PolicyMenu = {
  id: "policy",
  path: "/gateway/policies",
  title: "Policies",
  icon: "bi bi-file-earmark-fill menu-icon",
};

// This will get all user permitted resources
const menus: string[] = AuthGuard({
  resource: undefined,
});

// This will add menu on side bar only when user has access to resource
if (menus && menus.length > 0) {
  if (menus.includes(access.resources.Api)) {
    adminGatewayRoutes.push(ApiMenu);
  }
  if (menus.includes(access.resources.Key)) {
    adminGatewayRoutes.push(KeyMenu);
  }
  if (menus.includes(access.resources.Policy)) {
    adminGatewayRoutes.push(PolicyMenu);
  }
}

export default adminGatewayRoutes;
