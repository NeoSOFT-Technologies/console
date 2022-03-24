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
