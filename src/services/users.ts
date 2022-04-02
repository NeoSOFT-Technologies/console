import apiFactory from "../utils/api";

export function getUserListService(tenantName: string, page: number) {
  apiFactory().get(`/api/user?tenantName=${tenantName}&page=${page}`);
  return {
    data: {
      tenantName: "Rahul kenchi",
      description: "i am going to win the world",
      email: "rahul768@gmail.com",
      password: "rahul768",
      type: "admin",
      id: 5,
      roles: ["user"],
    },
  };
}

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
  console.log(body);
  return apiFactory().patch(`/api/user`, body);
}

export function updateUserPassword(id: number, password: string) {
  console.log(
    "🚀 ~ file: users.ts ~ line 21 ~ updateUserPassword ~ id",
    id,
    password
  );
  return {
    data: "",
  };
}

export function getUserDetailsService(tenantName: string, userName: string) {
  return apiFactory().get(
    `/api/user-info?tenantName=${tenantName}&userName=${userName}`
  );
}
