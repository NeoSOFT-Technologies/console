import apiFactory from "../utils/api";

interface IConditions {
  username: string;
  email: string;
  roles: string[];
}

export function updateUserDataService(data: IConditions) {
  const body = {
    userName: data.username,
    action: {
      email: data.email,
      realmRoles: [...data.roles],
    },
  };
  return apiFactory().patch(`/api/user`, body);
}

export function getUserDetailsService(tenantName: string, userName: string) {
  return apiFactory().get(
    `/api/user-info?tenantName=${tenantName}&userName=${userName}`
  );
}
