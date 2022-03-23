import apiFactory from "../utils/api";

export function getUserListService(tenantName: string, page: number) {
  return apiFactory().get(`/api/user?tenantName=${tenantName}&page=${page}`);
}

export function updateUserDataService() {
  // need to modify
  const tmp = {
    userName: "string",
    action: {
      email: "string",
      enabled: true,
      realmRoles: ["string"],
    },
  };
  return apiFactory().patch(`/api/user`, tmp);
}
